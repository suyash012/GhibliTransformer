import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, DownloadIcon } from "lucide-react";
import { ComparisonSlider } from "./ComparisonSlider";
import { ImageData } from "../hooks/useImageProcessing";
import { FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";

interface ImageResultProps {
  imageData: ImageData;
  onNewImage: () => void;
}

export function ImageResult({ imageData, onNewImage }: ImageResultProps) {
  const [copyButtonText, setCopyButtonText] = useState("Copy Link");

  const handleDownload = () => {
    if (!imageData.processedUrl) return;
    
    // Create a temporary link to download the image
    const link = document.createElement("a");
    link.href = imageData.processedUrl;
    link.download = `ghiblified_${imageData.originalFileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    const shareLink = `${window.location.origin}/share/${imageData.id}`;
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => setCopyButtonText("Copy Link"), 2000);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-700">Your Ghiblified Image</h3>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={onNewImage}
            className="flex items-center"
          >
            <ArrowUpIcon className="w-5 h-5 mr-2" />
            New Image
          </Button>
          <Button 
            onClick={handleDownload}
            className="flex items-center"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      {imageData.originalUrl && imageData.processedUrl && (
        <ComparisonSlider 
          beforeImage={imageData.originalUrl} 
          afterImage={imageData.processedUrl} 
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <h4 className="font-bold text-gray-700 mb-2">About Your Transformation</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            {imageData.analysis?.styleNotes ? (
              imageData.analysis.styleNotes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>{note}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Colors adjusted to match Ghibli's vibrant palette</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Hand-drawn style lines and textures applied</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Lighting enhanced for that dreamy Ghibli atmosphere</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Original image resolution preserved</span>
                </li>
              </>
            )}
          </ul>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-bold text-gray-700 mb-2">Share Your Creation</h4>
          <div className="flex space-x-2 mb-4">
            <Button 
              className="flex-1 flex items-center justify-center bg-[#1877F2] hover:bg-[#1877F2]/90"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
            >
              <FaFacebook className="w-5 h-5 mr-2" />
              Facebook
            </Button>
            <Button 
              className="flex-1 flex items-center justify-center bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Check out my Ghiblified image!&url=${encodeURIComponent(window.location.href)}`, '_blank')}
            >
              <FaTwitter className="w-5 h-5 mr-2" />
              Twitter
            </Button>
            <Button 
              className="flex-1 flex items-center justify-center bg-[#E60023] hover:bg-[#E60023]/90"
              onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(imageData.processedUrl || '')}&description=My Ghiblified image`, '_blank')}
            >
              <FaPinterest className="w-5 h-5 mr-2" />
              Pinterest
            </Button>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              value={`${window.location.origin}/share/${imageData.id}`}
              className="w-full px-4 py-2 border border-gray-300 rounded-md pr-24" 
              readOnly
            />
            <Button 
              className="absolute right-1 top-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm h-8"
              variant="ghost"
              onClick={handleCopyLink}
            >
              {copyButtonText}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h4 className="font-bold text-gray-700 mb-4">Try these styles next</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="p-3 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all">
            <div className="w-full h-28 bg-gray-100 rounded-md mb-2 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10"></div>
            </div>
            <span className="block text-sm font-medium">Mononoke</span>
          </button>
          <button className="p-3 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all">
            <div className="w-full h-28 bg-gray-100 rounded-md mb-2 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-purple-400/10"></div>
            </div>
            <span className="block text-sm font-medium">Spirited Away</span>
          </button>
          <button className="p-3 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all">
            <div className="w-full h-28 bg-gray-100 rounded-md mb-2 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-green-400/30 to-teal-400/10"></div>
            </div>
            <span className="block text-sm font-medium">Totoro</span>
          </button>
          <button className="p-3 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all">
            <div className="w-full h-28 bg-gray-100 rounded-md mb-2 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-amber-400/30 to-orange-400/10"></div>
            </div>
            <span className="block text-sm font-medium">Howl's Castle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
