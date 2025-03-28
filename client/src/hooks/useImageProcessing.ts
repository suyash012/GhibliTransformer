import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export interface ImageData {
  id: number;
  status: string;
  originalFileName: string;
  originalUrl?: string;
  processedUrl?: string;
  error?: string; // Add error field
  analysis?: {
    description: string;
    styleNotes: string[];
  };
}

export function useImageProcessing() {
  const [currentImageId, setCurrentImageId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Upload image mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      
      const response = await apiRequest("POST", "/api/images/upload", formData);
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentImageId(data.id);
    },
    onError: (error) => {
      toast({
        title: "Upload failed",
        description: error.message || "Could not upload image. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Get image status query
  const imageQuery = useQuery<ImageData>({
    queryKey: currentImageId ? [`/api/images/${currentImageId}`] : [],
    enabled: !!currentImageId,
    refetchInterval: (data) => {
      // Poll every 2 seconds if the status is pending
      if (data?.status === "pending") {
        return 2000;
      }
      // Stop polling once complete or error
      return false;
    }
  });

  // Reset state
  const resetImage = () => {
    setCurrentImageId(null);
    queryClient.removeQueries({ queryKey: [`/api/images/${currentImageId}`] });
  };

  // Handle image upload
  const uploadImage = (file: File) => {
    uploadMutation.mutate(file);
  };

  return {
    uploadImage,
    resetImage,
    imageData: imageQuery.data as ImageData | undefined,
    isUploading: uploadMutation.isPending,
    isProcessing: imageQuery.data?.status === "pending",
    isCompleted: imageQuery.data?.status === "completed",
    isError: uploadMutation.isError || imageQuery.data?.status === "error",
    error: uploadMutation.error,
    currentImageId
  };
}
