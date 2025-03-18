"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";

type PetImageUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const PetImageUploader = ({ files, onChange }: PetImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Only take up to 3 files
      const newFiles = [...(files || []), ...acceptedFiles].slice(0, 3);
      onChange(newFiles);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
  });

  const removeImage = (index: number) => {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {files?.map((file, index) => (
          <div key={index} className="relative">
            <Image
              src={convertFileToUrl(file)}
              width={200}
              height={200}
              alt={`Pet image ${index + 1}`}
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}

        {(!files || files.length < 3) && (
          <div
            {...getRootProps()}
            className="file-upload h-[200px] flex flex-col items-center justify-center"
          >
            <input {...getInputProps()} />
            <Image
              src="/assets/icons/upload.svg"
              width={40}
              height={40}
              alt="upload"
            />
            <div className="file-upload_label text-center">
              <p className="text-14-regular">
                <span className="text-green-500">Click para subir foto </span>o
                arrastra y suelta
              </p>
              <p className="text-12-regular">
                SVG, PNG, JPG o GIF (max. 800x400px)
              </p>
            </div>
          </div>
        )}
      </div>
      {files && files.length > 0 && (
        <p className="text-sm text-white-500">
          {files.length}/3 imágenes seleccionadas
        </p>
      )}
    </div>
  );
};

export default PetImageUploader;
