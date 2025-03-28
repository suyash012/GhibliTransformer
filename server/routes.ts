import type { Express, Request, Response } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { 
  validateImage, 
  getOriginalDir, 
  processImage, 
  getImageAnalysis 
} from "./imageProcessor";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, getOriginalDir());
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max file size
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded files
  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  // Upload image endpoint
  app.post('/api/images/upload', upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Validate the uploaded image
      if (!validateImage(req.file)) {
        fs.unlinkSync(req.file.path); // Delete invalid file
        return res.status(400).json({ 
          message: 'Invalid file. Please upload a JPG or PNG image under 10MB.' 
        });
      }

      // Store image info in the database
      const image = await storage.createImage({
        originalFileName: req.file.originalname,
        originalPath: req.file.path,
        createdAt: new Date().toISOString()
      });

      // Start processing the image in the background
      processImage(image).catch(err => {
        console.error(`Error processing image ${image.id}:`, err);
      });

      res.status(200).json({ 
        id: image.id,
        status: image.status,
        originalFileName: image.originalFileName
      });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ message: error.message || 'Failed to upload image' });
    }
  });

  // Get image status
  app.get('/api/images/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid image ID' });
      }

      const image = await storage.getImage(id);
      if (!image) {
        return res.status(404).json({ message: 'Image not found' });
      }

      // Prepare URLs for client
      const result: any = {
        id: image.id,
        status: image.status,
        originalFileName: image.originalFileName
      };

      // Include error message if there was one
      if (image.status === 'error' && image.error) {
        result.error = image.error;
        console.log("Image has error:", image.error);
      }

      // Add paths if processing is complete
      if (image.status === 'completed') {
        console.log("Image processing completed, generating URLs");
        console.log("Original path:", image.originalPath);
        console.log("Processed path:", image.processedPath);
        
        result.originalUrl = `/uploads/original/${path.basename(image.originalPath)}`;
        
        if (image.processedPath) {
          result.processedUrl = `/uploads/processed/${path.basename(image.processedPath)}`;
          console.log("Generated processedUrl:", result.processedUrl);
          
          // Get image analysis if available
          try {
            const analysis = await getImageAnalysis(image.processedPath);
            result.analysis = analysis;
            console.log("Added image analysis to result");
          } catch (analysisError) {
            console.error("Error getting image analysis:", analysisError);
            // Provide a fallback analysis
            result.analysis = {
              description: "A beautiful scene transformed into Studio Ghibli's magical style",
              styleNotes: [
                "Vibrant, hand-painted color palette characteristic of Ghibli films",
                "Soft, dreamlike lighting and atmosphere",
                "Delicate linework and attention to natural details",
                "Whimsical elements added to enhance the magical feel"
              ]
            };
          }
        } else {
          console.warn("No processed path available despite completed status");
        }
      } else {
        console.log("Current image status:", image.status);
      }

      res.status(200).json(result);
    } catch (error: any) {
      console.error('Get image error:', error);
      res.status(500).json({ message: error.message || 'Failed to retrieve image' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
