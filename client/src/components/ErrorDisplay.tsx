import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  message?: string;
  onReset: () => void;
}

export function ErrorDisplay({ message, onReset }: ErrorDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">Something went wrong</h3>
      <p className="text-gray-500 mb-6">
        {message || "We couldn't process your image. Please try again with a different image."}
      </p>
      <Button onClick={onReset}>
        Try Again
      </Button>
    </div>
  );
}
