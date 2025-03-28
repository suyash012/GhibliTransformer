import { useState } from "react";
import { useImageProcessing } from "../hooks/useImageProcessing";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ImageUploader } from "../components/ImageUploader";
import { ProcessingStatus } from "../components/ProcessingStatus";
import { ImageResult } from "../components/ImageResult";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { FAQSection } from "../components/FAQSection";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [appState, setAppState] = useState<"initial" | "processing" | "result" | "error">("initial");
  const { 
    uploadImage, 
    resetImage, 
    imageData, 
    isUploading, 
    isProcessing, 
    isCompleted, 
    isError,
    error
  } = useImageProcessing();

  // Update app state based on image processing status
  useState(() => {
    if (isUploading || isProcessing) {
      setAppState("processing");
    } else if (isCompleted) {
      setAppState("result");
    } else if (isError) {
      setAppState("error");
    }
  });

  const handleUploadStart = () => {
    setAppState("processing");
  };

  const handleReset = () => {
    resetImage();
    setAppState("initial");
  };

  const handleNewImage = () => {
    resetImage();
    setAppState("initial");
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/80 bg-blend-overlay relative">
      {/* Background clouds */}
      <div className="clouds fixed inset-0 pointer-events-none z-[-1] opacity-80 bg-blend-soft-light" 
           style={{ 
             backgroundImage: "url('https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=2000&ixlib=rb-4.0.3')",
             backgroundSize: "cover",
             backgroundPosition: "center"
           }}></div>
      
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4 md:px-6 lg:py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Transform Your Images into <span className="text-primary">Ghibli Art Style</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the magic of Studio Ghibli's iconic art style with our AI-powered image converter.
            Upload your photos and transform them with just one click.
          </p>
        </section>
        
        {/* Main App */}
        <Card className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-6 md:p-8 overflow-hidden">
          <CardContent className="p-0">
            {appState === "initial" && (
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <ImageUploader onUploadStart={handleUploadStart} />
                
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-md bg-gray-100 aspect-video flex flex-col items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <p className="text-gray-500">Example transformation</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-md overflow-hidden aspect-video bg-gray-100">
                      <div className="w-full h-full bg-gradient-to-br from-amber-400/30 to-amber-400/10"></div>
                    </div>
                    <div className="rounded-md overflow-hidden aspect-video bg-gray-100">
                      <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-2">Example transformations</p>
                </div>
              </div>
            )}
            
            {appState === "processing" && <ProcessingStatus />}
            
            {appState === "result" && imageData && (
              <ImageResult imageData={imageData} onNewImage={handleNewImage} />
            )}
            
            {appState === "error" && (
              <ErrorDisplay 
                message={error?.message} 
                onReset={handleReset} 
              />
            )}
          </CardContent>
        </Card>
        
        {/* FAQ Section */}
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
}
