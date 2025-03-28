import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { transformImageToGhibliStyle, analyzeImage } from "./mistralai";
import type { Image } from "@shared/schema";
import { storage } from "./storage";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create upload directories if they don't exist
const uploadsDir = path.join(__dirname, "../uploads");
const originalDir = path.join(uploadsDir, "original");
const processedDir = path.join(uploadsDir, "processed");

// Create directories if they don't exist
[uploadsDir, originalDir, processedDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

export async function processImage(image: Image): Promise<Image> {
  try {
    const outputPath = path.join(processedDir, `processed_${path.basename(image.originalPath)}`);
    
    // Transform image
    await transformImageToGhibliStyle(image.originalPath, outputPath);
    
    // Update image record with processed path
    const updatedImage = {
      ...image,
      processedPath: outputPath,
      status: "completed",
    };
    
    // Store the updated image record
    return storage.updateImage(image.id, updatedImage);
  } catch (error) {
    // Update status to error
    const updatedImage = {
      ...image,
      status: "error",
    };
    return storage.updateImage(image.id, updatedImage);
  }
}

export async function getImageAnalysis(imagePath: string) {
  return analyzeImage(imagePath);
}

export function validateImage(file: Express.Multer.File): boolean {
  // Check file type
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return false;
  }
  
  // Check file size (10MB max)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
}

export function getOriginalDir(): string {
  return originalDir;
}

export function getProcessedDir(): string {
  return processedDir;
}

export function deleteImage(imagePath: string): void {
  try {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    console.error(`Failed to delete image at ${imagePath}:`, error);
  }
}
