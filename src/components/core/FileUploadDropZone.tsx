"use client";
import React, { useState, useRef } from "react";
import { Upload, X, FileText, Image, File as FileIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_BYTES, MAX_UPLOAD_FILES_NUMBER } from "@/lib/constants";

const FileUploadDropZone: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const uploadTimersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const getFileIcon = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    const iconMap: { [key: string]: React.ReactNode } = {
      jpg: <Image className="text-blue-500" />,
      jpeg: <Image className="text-blue-500" />,
      png: <Image className="text-blue-500" />,
      pdf: <FileText className="text-red-500" />,
      doc: <FileText className="text-red-500" />,
      docx: <FileText className="text-red-500" />,
    };
    return iconMap[ext || ""] || <FileIcon className="text-gray-500" />;
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    maxFiles: MAX_UPLOAD_FILES_NUMBER,
    maxSize: MAX_FILE_SIZE,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
    },
    multiple: true,
  });

  const simulateUpload = (file: File) => {
    let progress = 0;
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: Math.min(progress, 100),
        }));

        if (progress >= 100) {
          clearInterval(interval);
          delete uploadTimersRef.current[file.name];
          setUploadProgress((prev) => {
            const updated = { ...prev };
            delete updated[file.name];
            return updated;
          });
          resolve();
        }
      }, 200);

      uploadTimersRef.current[file.name] = interval;
    });
  };

  const handleFileSelection = async (selectedFiles: File[]) => {
    if (files.length + selectedFiles.length > MAX_UPLOAD_FILES_NUMBER) {
      toast.error(`Cannot upload files`, {
        description: `Maximum of ${MAX_UPLOAD_FILES_NUMBER} files allowed. Please select ${MAX_UPLOAD_FILES_NUMBER} or fewer files.`,
      });
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      const isValidSize = file.size <= MAX_FILE_SIZE_BYTES
      if (!isValidSize) {
        toast.error("File too large", {
          description: `${file.name} exceeds the maximum size of ${MAX_FILE_SIZE} MB.`,
        });
      }
      return isValidSize;
    });

    const uniqueNewFiles = validFiles.filter(
      (file) => !files.some((existingFile) => existingFile.name === file.name)
    );

    const updatedFiles = [...files, ...uniqueNewFiles];
    setFiles(updatedFiles);

    for (const file of uniqueNewFiles) {
      await simulateUpload(file);
      toast.success("File uploaded", { description: file.name });
    }
  };

  const removeFile = (fileToRemove: File) => {
    if (uploadTimersRef.current[fileToRemove.name]) {
      clearInterval(uploadTimersRef.current[fileToRemove.name]);
      delete uploadTimersRef.current[fileToRemove.name];
    }

    setFiles(files.filter((file) => file !== fileToRemove));
    setUploadProgress((prev) => {
      const updated = { ...prev };
      delete updated[fileToRemove.name];
      return updated;
    });

    toast.info("File removed", { description: fileToRemove.name });
  };

  const clearAllFiles = () => {
    Object.values(uploadTimersRef.current).forEach(clearInterval);
    uploadTimersRef.current = {};
    setFiles([]);
    setUploadProgress({});
    toast.success("All files cleared");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-6 w-6" />
          <span>File Uploader</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps({
            className: `
              p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
              ${
                isDragActive
                  ? "bg-blue-50 border-blue-500"
                  : "bg-gray-50 border-gray-300"
              }
              ${
                files.length >= MAX_UPLOAD_FILES_NUMBER
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
            `,
          })}
        >
          <input
            {...getInputProps({
              onChange: (e) =>
                handleFileSelection(Array.from(e.target.files || [])),
            })}
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <Upload className="h-12 w-12 text-gray-500" />
            <p className="text-gray-600 font-semibold">
              {files.length >= MAX_UPLOAD_FILES_NUMBER
                ? `Maximum of ${MAX_UPLOAD_FILES_NUMBER} files reached`
                : isDragActive
                ? "Drop files here"
                : "Drag 'n' drop files here, or click to select files"}
            </p>
            <p className="text-xs text-gray-500">
              Max file size: {MAX_FILE_SIZE} MB | Max files:{" "}
              {MAX_UPLOAD_FILES_NUMBER}
            </p>
            {files.length < MAX_UPLOAD_FILES_NUMBER && (
              <Button type="button" onClick={open}>
                Select Files
              </Button>
            )}
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Uploaded Files</h3>
              <Button variant="outline" size="sm" onClick={clearAllFiles}>
                Clear All
              </Button>
            </div>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center space-x-4 p-3 bg-white border rounded-lg shadow-sm"
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    {getFileIcon(file)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    {uploadProgress[file.name] && (
                      <Progress
                        value={uploadProgress[file.name]}
                        className="mt-2"
                      />
                    )}
                  </div>
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
