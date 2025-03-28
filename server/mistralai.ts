import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { Mistral } from '@mistralai/mistralai';

// Interface to match the previous API responses
interface ImageTransformResponse {
  id: string;
  imageUrl?: string;
  status: 'pending' | 'completed' | 'error';
  progress?: number;
  error?: string;
}

// MistralAI class for handling the image transformations
export class MistralAI {
  private client: Mistral;
  private model: string = 'mistral-large-latest';
  
  constructor(apiKey: string) {
    this.client = new Mistral({ apiKey });
  }

  // This is a simulated method to match the previous API
  // In reality, MistralAI doesn't directly transform images,
  // so we'll need to adapt our approach
  async transformImageToGhibliStyle(
    inputImagePath: string,
    outputImagePath: string
  ): Promise<string> {
    try {
      // For demonstration, we'll use Mistral to generate a description of how to transform the image
      // and then fetch a sample Ghibli-style image from a free API to simulate the transformation
      
      // Read image as base64 to describe 
      const imageBuffer = fs.readFileSync(inputImagePath);
      const base64Image = imageBuffer.toString('base64');
      
      // First, get a description of the image using Mistral
      const description = await this.getImageDescription(inputImagePath);
      
      // Then use the description to "transform" the image
      // For this demo, we'll fetch a placeholder image
      const width = 800;
      const height = 600;
      
      // Use a placeholder image service (completely random for demo purposes)
      const imageUrl = `https://picsum.photos/${width}/${height}`;
      
      // Download the placeholder image
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(outputImagePath, buffer);
      
      return outputImagePath;
    } catch (error: any) {
      console.error('Error transforming image:', error);
      throw new Error(`Failed to transform image: ${error.message}`);
    }
  }

  // Get a description of the image
  async getImageDescription(imagePath: string): Promise<string> {
    try {
      // For demo purposes, we'll return a static description
      // In a real implementation, you'd need to use a multimodal model
      // that can process images, which Mistral might offer in the future
      return "A beautiful scene that would look magical in Ghibli style";
    } catch (error: any) {
      console.error('Error getting image description:', error);
      return "Image to be transformed into Ghibli style";
    }
  }

  // Generate analysis of the image
  async analyzeGhibliImage(imagePath: string): Promise<{ description: string; styleNotes: string[] }> {
    try {
      // Simulate an analysis using Mistral's text capabilities
      const response = await this.client.chat.complete({
        model: this.model,
        messages: [
          {
            role: "system",
            content: "You are an art expert specializing in Studio Ghibli's visual style. Analyze this Ghibli-style image and provide insights."
          },
          {
            role: "user",
            content: `Describe this image in Ghibli style and list 4 key style elements. The image shows a landscape.`
          }
        ]
      });
      
      // Extract content and parse it into our required format
      let description = "Transformed with Studio Ghibli's magical aesthetic";
      
      if (response.choices && response.choices.length > 0 && response.choices[0].message.content) {
        const content = response.choices[0].message.content;
        
        if (typeof content === 'string') {
          // Simple parsing for demo purposes
          const lines = content.split('\n').filter((line: string) => line.trim() !== '');
          if (lines.length > 0) {
            description = lines[0];
          }
        }
      }
      
      // Extract style notes
      const styleNotes = [
        "Vibrant, hand-painted color palette characteristic of Ghibli films",
        "Soft, dreamlike lighting and atmosphere",
        "Delicate linework and attention to natural details",
        "Whimsical elements added to enhance the magical feel"
      ];
      
      return {
        description: description.substring(0, 100), // Limit length
        styleNotes
      };
    } catch (error: any) {
      console.error('Error analyzing image:', error);
      // Return fallback analysis
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
}

// Create and export the API instance
export const mistralAI = new MistralAI(process.env.MISTRAL_API_KEY || '');

// Export utility functions that match the previous API for compatibility
export async function transformImageToGhibliStyle(
  inputImagePath: string,
  outputImagePath: string
): Promise<string> {
  return mistralAI.transformImageToGhibliStyle(inputImagePath, outputImagePath);
}

export async function analyzeImage(
  imagePath: string
): Promise<{ description: string; styleNotes: string[] }> {
  return mistralAI.analyzeGhibliImage(imagePath);
}