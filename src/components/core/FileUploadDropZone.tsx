"use client";
import React, { useState } from "react";
import {
  Upload,
  X,
  FileText,
  Image,
  File as FileIcon,
  Loader2,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_BYTES,
  MAX_UPLOAD_FILES_NUMBER,
} from "@/lib/constants";

const FileUploadDropZone: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([]);

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
    const toastId = toast.loading(`Uploading ${file.name}...`);

    return new Promise<void>((resolve) => {
      if (uploadingFiles.includes(file.name)) {
        toast.error(`${file.name} is already being uploaded`, { id: toastId });
        resolve();
        return;
      }

      setUploadingFiles((prev) => [...prev, file.name]);

      setTimeout(() => {
        setFiles((prev) => {
          const isDuplicate = prev.some(
            (existingFile) => existingFile.name === file.name
          );
          return isDuplicate ? prev : [...prev, file];
        });

        setUploadingFiles((prev) =>
          prev.filter((fileName) => fileName !== file.name)
        );

        toast.success(`File uploaded: ${file.name}`, { id: toastId });
        resolve();
      }, 2000);
    });
  };

  const handleFileSelection = async (selectedFiles: File[]) => {
    const existingFilesSize = files.reduce(
      (total, file) => total + file.size,
      0
    );
    const newFilesSize = selectedFiles.reduce(
      (total, file) => total + file.size,
      0
    );
    const totalSize = existingFilesSize + newFilesSize;

    if (files.length + selectedFiles.length > MAX_UPLOAD_FILES_NUMBER) {
      toast.error(`Cannot upload files`, {
        description: `Maximum of ${MAX_UPLOAD_FILES_NUMBER} files allowed.`,
      });
      return;
    }

    if (totalSize > MAX_FILE_SIZE_BYTES) {
      toast.error(`Exceeds total file size limit`, {
        description: `Total file size cannot exceed ${MAX_FILE_SIZE} MB.`,
      });
      return;
    }

    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > MAX_FILE_SIZE_BYTES
    );
    if (oversizedFiles.length > 0) {
      oversizedFiles.forEach((file) => {
        toast.error("File too large", {
          description: `${file.name} exceeds the maximum size of ${MAX_FILE_SIZE} MB.`,
        });
      });
    }

    const validFiles = selectedFiles.filter(
      (file) =>
        file.size <= MAX_FILE_SIZE_BYTES &&
        !files.some((existingFile) => existingFile.name === file.name)
    );

    if (validFiles.length === 0) {
      if (selectedFiles.some((file) => file.size > MAX_FILE_SIZE_BYTES)) {
        return;
      }

      toast.error("Duplicate files", {
        description: `All selected files have already been uploaded.`,
      });
      return;
    }

    for (const file of validFiles) {
      await simulateUpload(file);
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    toast.info("File removed", { description: fileToRemove.name });
  };

  const clearAllFiles = () => {
    setFiles([]);
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
              disabled: files.length >= MAX_UPLOAD_FILES_NUMBER,
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
