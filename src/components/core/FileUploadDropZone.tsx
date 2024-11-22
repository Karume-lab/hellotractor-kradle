"use client";

import React, { useState, useCallback } from "react";
import { Upload, X, FileText, Image, File as FileIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";

interface FileUploadDropZoneProps {
  maxFiles?: number;
  maxSize?: number;
  onUploadComplete?: (urls: string[]) => void;
  onFilesChange?: (files: File[]) => void;
  allowedFileTypes?: string[];
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const FileUploadDropZone: React.FC<FileUploadDropZoneProps> = ({
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024,
  onUploadComplete,
  onFilesChange,
  allowedFileTypes = ["image/*", "application/pdf", "application/msword"],
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const isMaxFilesReached = files.length >= maxFiles;

  const getFileIcon = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    const iconMap: Record<string, JSX.Element> = {
      jpg: <Image className="text-blue-500" />,
      jpeg: <Image className="text-blue-500" />,
      png: <Image className="text-blue-500" />,
      gif: <Image className="text-blue-500" />,
      pdf: <FileText className="text-red-500" />,
      doc: <FileText className="text-blue-500" />,
      docx: <FileText className="text-blue-500" />,
    };
    return iconMap[ext || ""] || <FileIcon className="text-gray-500" />;
  };

  const handleFileSelection = async (selectedFiles: File[]) => {
    try {
      if (isMaxFilesReached) {
        toast.error(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const validFiles = selectedFiles.filter(
        (file) =>
          file.size <= maxSize &&
          !files.some((existing) => existing.name === file.name)
      );

      if (!validFiles.length) {
        toast.error("No valid files selected");
        return;
      }

      const loadingToast = toast.loading("Uploading files...");
      const uploadResult = await startUpload(validFiles);

      if (!uploadResult) {
        toast.dismiss(loadingToast);
        throw new Error("Upload failed");
      }

      const uploadedUrls = uploadResult.map((file) => file.url);
      setFiles((prev) => [...prev, ...validFiles]);
      onFilesChange?.([...files, ...validFiles]);
      onUploadComplete?.(uploadedUrls);

      toast.dismiss(loadingToast);
      toast.success(
        `Successfully uploaded ${validFiles.length} file${
          validFiles.length > 1 ? "s" : ""
        }`
      );
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    }
  };

  const removeFile = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    toast.success("File removed");
  };

  const clearAllFiles = () => {
    setFiles([]);
    onFilesChange?.([]);
    toast.success("All files cleared");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileSelection,
    maxFiles: maxFiles - files.length,
    maxSize,
    accept: allowedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    disabled: isUploading || isMaxFilesReached,
    onDropRejected: () => toast.error(`Maximum ${maxFiles} files allowed`),
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          <span>File Upload</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          {...getRootProps({
            className: cn(
              "p-8 border-2 border-dashed rounded-lg transition-colors",
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50",
              (isUploading || isMaxFilesReached) &&
                "opacity-50 cursor-not-allowed"
            ),
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <Upload
              className={cn(
                "h-12 w-12",
                isDragActive ? "text-blue-500" : "text-gray-400"
              )}
            />
            <p className="text-sm text-gray-600 font-medium text-center">
              {isMaxFilesReached
                ? `Maximum ${maxFiles} files reached.`
                : isDragActive
                ? "Drop files here..."
                : "Drag & drop files here, or click to select"}
            </p>
            <p className="text-xs text-gray-500">
              Max size: {formatFileSize(maxSize)} | Remaining:{" "}
              {Math.max(0, maxFiles - files.length)} file
              {Math.max(0, maxFiles - files.length) === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">
                Files ({files.length}/{maxFiles})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFiles}
                disabled={isUploading}
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-3 p-3 bg-white border rounded-lg"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    {getFileIcon(file)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => removeFile(file)}
                    disabled={isUploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploadDropZone;
