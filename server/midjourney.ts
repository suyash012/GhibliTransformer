import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Define the response interface
interface MidjourneyResponse {
  id: string;
  imageUrl?: string;
  status: 'pending' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

// Replicate API client for Midjourney-like transformations
export class MidjourneyAPI {
  private apiKey: string;
  private baseUrl: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.replicate.com/v1/predictions';
  }

  // Create a new image transformation
  async createImageTransformation(
    inputImagePath: string,
    prompt: string
  ): Promise<MidjourneyResponse> {
    try {
      // Read image file as base64
      const imageBuffer = fs.readFileSync(inputImagePath);
      const base64Image = imageBuffer.toString('base64');
      
      const payload = {
        version: "28cea91bdfced0e2dc7fda466cc7a07f7c7917dd86df1b0d8cee4b76c618",
        input: {
          prompt: `Studio Ghibli style. ${prompt}`,
          image: `data:image/jpeg;base64,${base64Image}`,
          num_outputs: 1,
          guidance_scale: 7.5,
          prompt_strength: 0.8,
          num_inference_steps: 50
        }
      };

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json() as any;
        throw new Error(`API error: ${errorData?.error || response.statusText}`);
      }

      const data = await response.json() as any;
      
      return {
        id: data.id,
        status: 'pending'
      };
    } catch (error: any) {
      console.error('Error creating transformation:', error);
      return {
        id: '',
        status: 'error',
        error: error.message
      };
    }
  }

  // Check the status of a transformation
  async checkTransformationStatus(jobId: string): Promise<MidjourneyResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json() as any;
        throw new Error(`API error: ${errorData?.error || response.statusText}`);
      }

      const data = await response.json() as any;
      
      if (data.status === 'succeeded') {
        const imageUrl = data.output?.[0];
        return {
          id: jobId,
          imageUrl,
          status: 'completed'
        };
      } else if (data.status === 'failed') {
        return {
          id: jobId,
          status: 'error',
          error: data.error || 'Transformation failed'
        };
      } else {
        return {
          id: jobId,
          status: 'pending',
          progress: data.status === 'processing' ? 0.5 : 0.1
        };
      }
    } catch (error: any) {
      console.error('Error checking transformation status:', error);
      return {
        id: jobId,
        status: 'error',
        error: error.message
      };
    }
  }

  // Download the transformed image
  async downloadTransformedImage(imageUrl: string, outputPath: string): Promise<string> {
    try {
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(outputPath, buffer);
      
      return outputPath;
    } catch (error: any) {
      console.error('Error downloading image:', error);
      throw new Error(`Failed to download image: ${error.message}`);
    }
  }

  // Analyze the transformed image
  async analyzeImage(imagePath: string): Promise<{ description: string; styleNotes: string[] }> {
    // Simple static analysis for now
    return {
      description: "Transformed with Studio Ghibli's magical aesthetic",
      styleNotes: [
        "Vibrant, hand-painted color palette characteristic of Ghibli films",
        "Soft, dreamlike lighting and atmosphere",
        "Delicate linework and attention to natural details",
        "Whimsical elements added to enhance the magical feel"
      ]
    };
  }
}

// Create and export the API instance
export const midjourneyAPI = new MidjourneyAPI(process.env.REPLICATE_API_KEY || '');

// Export utility function that matches the previous API
export async function transformImageToGhibliStyle(
  inputImagePath: string,
  outputImagePath: string
): Promise<string> {
  try {
    // Start the transformation job
    const transformJob = await midjourneyAPI.createImageTransformation(
      inputImagePath,
      "Transform this image into Studio Ghibli art style. Maintain the composition but apply Hayao Miyazaki's iconic aesthetic with soft lighting, vibrant colors, hand-drawn quality, and dreamy atmosphere. Match the style of films like Spirited Away and My Neighbor Totoro."
    );
    
    if (transformJob.status === 'error' || !transformJob.id) {
      throw new Error(transformJob.error || 'Failed to start transformation');
    }
    
    // Poll for completion
    let result: MidjourneyResponse = { id: transformJob.id, status: 'pending' };
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes timeout (checking every 5 seconds)
    
    while (result.status === 'pending' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between checks
      result = await midjourneyAPI.checkTransformationStatus(transformJob.id);
      attempts++;
    }
    
    if (result.status !== 'completed' || !result.imageUrl) {
      throw new Error(result.error || 'Transformation failed or timed out');
    }
    
    // Download the transformed image
    await midjourneyAPI.downloadTransformedImage(result.imageUrl, outputImagePath);
    
    return outputImagePath;
  } catch (error: any) {
    console.error('Error transforming image:', error);
    throw new Error(`Failed to transform image: ${error.message}`);
  }
}

export async function analyzeImage(
  imagePath: string
): Promise<{ description: string; styleNotes: string[] }> {
  return midjourneyAPI.analyzeImage(imagePath);
}