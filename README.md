# Ghiblify - Transform Images into Studio Ghibli Art Style

Ghiblify is a web application that transforms ordinary photos into artwork inspired by Studio Ghibli's distinctive visual aesthetic using AI image processing.

![Ghiblify App](https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3)

## Features

- **Upload & Transform**: Convert your photos into Ghibli-style artwork with one click
- **Real-time Processing**: Watch as your image is processed in real-time
- **Style Analysis**: Get insights about the artistic elements added to your transformed image
- **Comparison View**: Compare the original and transformed images side by side

## Technology Stack

- **Frontend**: React, TailwindCSS, Shadcn UI components
- **Backend**: Express.js
- **AI Integration**: Mistral AI API for image transformation and analysis

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js 18 or higher
- npm or yarn
- A Mistral AI API key (get one at [Mistral AI Platform](https://mistral.ai))

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ghiblify.git
   cd ghiblify
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Mistral AI API key:
   ```
   MISTRAL_API_KEY=your_api_key_here
   ```

### Running the Application

Start the development server:
```bash
npm run dev
```

This will launch both the backend server and frontend application. Access the app at [http://localhost:5000](http://localhost:5000).

## Usage

1. Open the application in your browser
2. Click the "Upload Image" button or drag and drop an image
3. Wait for the AI to process your image (this typically takes 10-15 seconds)
4. View and download your transformed Ghibli-style image
5. Check out the AI-generated analysis describing the artistic elements

## Folder Structure

```
ghiblify/
├── client/            # Frontend React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   ├── pages/       # Application pages
│   │   └── App.tsx      # Main application component
├── server/            # Backend Express server
│   ├── routes.ts      # API endpoints
│   ├── mistralai.ts   # Mistral AI integration
│   ├── storage.ts     # Data storage layer
│   └── index.ts       # Server entry point
├── shared/            # Shared types and utilities
├── uploads/           # Directory for uploaded images
│   ├── original/      # Original uploaded images
│   └── processed/     # Transformed images
└── README.md          # Project documentation
```

## API Endpoints

- `POST /api/images/upload` - Upload and process an image
- `GET /api/images/:id` - Get information about a processed image

## Development Notes

### How the AI Transformation Works

The application uses the Mistral AI API to transform images. The process involves:

1. The user uploads an image
2. The backend saves the original image
3. The image is sent to the Mistral AI service for processing
4. The transformed image is saved and returned to the user
5. The AI also provides an analysis of the artistic elements applied

### Adding Additional Transformation Styles

To add more transformation styles (e.g., specific Ghibli movies like "Spirited Away" or "My Neighbor Totoro"):

1. Modify the `transformImageToGhibliStyle` function in `server/mistralai.ts`
2. Add the new style option to the frontend UI in `client/src/components/ImageUploader.tsx`
3. Update the prompt templates to include style-specific instructions

## Future Enhancements

- Multiple Ghibli style options (Spirited Away, Totoro, Howl's Moving Castle, etc.)
- Adjustable style intensity
- Batch processing for multiple images
- User accounts to save transformation history
- Social sharing capabilities

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Inspired by the beautiful art of Studio Ghibli
- Powered by Mistral AI image processing
- Built with React and Express.js