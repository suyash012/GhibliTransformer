import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { useImageProcessing } from "../hooks/useImageProcessing";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";

interface ImageUploaderProps {
  onUploadStart: () => void;
}

export function ImageUploader({ onUploadStart }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { uploadImage } = useImageProcessing();
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileSelection = useCallback((file: File) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG or PNG image.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    // Notify parent component
    onUploadStart();

    // Upload the image
    uploadImage(file);
  }, [onUploadStart, uploadImage, toast]);

  const openFileDialog = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="flex-grow md:w-1/2">
      <div 
        className={`border-3 border-dashed border-primary rounded-xl p-8 mb-6 flex flex-col items-center justify-center min-h-[300px] text-center cursor-pointer transition-all ${
          isDragging ? "bg-primary/10 border-primary" : "hover:bg-primary/5 hover:border-primary/70"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <UploadCloud className="w-16 h-16 mb-4 text-primary" />
        <h3 className="text-lg font-bold text-gray-700 mb-2">Upload your image</h3>
        <p className="text-gray-500 mb-4">Drag & drop your file here or click to browse</p>
        <p className="text-sm text-gray-400">Supports JPG, PNG (Max 10MB)</p>
        
        <input 
          type="file" 
          id="fileInput" 
          className="hidden" 
          accept="image/jpeg, image/png"
          onChange={handleFileInputChange}
        />
      </div>
      
      <Card className="bg-amber-50 border-amber-200 p-4">
        <h4 className="font-bold text-gray-700 flex items-center">
          <svg className="w-5 h-5 mr-2 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          Tips for best results
        </h4>
        <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Use clear, well-lit images</li>
          <li>Landscapes and nature scenes work best</li>
          <li>Avoid images with complex details</li>
          <li>Square or landscape orientation is ideal</li>
        </ul>
      </Card>
    </div>
  );
}
