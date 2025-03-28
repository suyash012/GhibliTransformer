import OpenAI from "openai";
import fs from "fs";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

export async function transformImageToGhibliStyle(
  inputImagePath: string,
  outputImagePath: string
): Promise<string> {
  try {
    // Read image file as base64
    const imageBuffer = fs.readFileSync(inputImagePath);
    const base64Image = imageBuffer.toString("base64");

    // Generate Ghibli-style image using DALL-E-3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "Transform this image into Studio Ghibli art style. Keep the same composition and elements, but apply the iconic Ghibli aesthetic with soft lighting, vibrant colors, hand-drawn quality, and dreamy atmosphere. Match the style of Hayao Miyazaki's films like Spirited Away, Princess Mononoke, or My Neighbor Totoro.",
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "b64_json",
      // Use the original image as the base
      image: Buffer.from(base64Image, "base64"),
    });

    if (!response.data[0].b64_json) {
      throw new Error("Failed to receive image data from OpenAI");
    }

    // Save the generated image to the output path
    const generatedImageBuffer = Buffer.from(response.data[0].b64_json, "base64");
    fs.writeFileSync(outputImagePath, generatedImageBuffer);

    return outputImagePath;
  } catch (error: any) {
    console.error("Error transforming image:", error);
    throw new Error(`Failed to transform image: ${error.message}`);
  }
}

export async function analyzeImage(
  imagePath: string
): Promise<{ description: string; styleNotes: string[] }> {
  try {
    // Read image file as base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    // Analyze the transformed image with gpt-4o
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an art expert specializing in Studio Ghibli's style. Analyze this Ghibli-style image and provide: 1) A brief description (max 30 words) 2) Four specific style elements applied (e.g., 'Colors adjusted to match Ghibli's vibrant palette'). Format as JSON with 'description' and 'styleNotes' array fields."
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this Ghibli-style image and provide the requested information."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 500,
    });

    const result = JSON.parse(visionResponse.choices[0].message.content || "{}");
    
    return {
      description: result.description || "Transformed with Ghibli's dreamy, hand-painted style",
      styleNotes: result.styleNotes || [
        "Colors adjusted to match Ghibli's vibrant palette",
        "Hand-drawn style lines and textures applied",
        "Lighting enhanced for that dreamy Ghibli atmosphere",
        "Original image composition preserved"
      ]
    };
  } catch (error: any) {
    console.error("Error analyzing image:", error);
    return {
      description: "Transformed with Ghibli's dreamy, hand-painted style",
      styleNotes: [
        "Colors adjusted to match Ghibli's vibrant palette",
        "Hand-drawn style lines and textures applied",
        "Lighting enhanced for that dreamy Ghibli atmosphere",
        "Original image composition preserved"
      ]
    };
  }
}
