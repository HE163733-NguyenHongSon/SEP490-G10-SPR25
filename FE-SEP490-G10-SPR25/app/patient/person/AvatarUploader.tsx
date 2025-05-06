"use client";

import React, { useState, useRef } from "react";
import { Button, Image, message } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

interface AvatarUploaderProps {
  avatarUrl?: string;
  userId: string;
  onUploaded?: () => void;
}

const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  avatarUrl,
  userId,
  onUploaded,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    if (selectedFile && userId) {
      const ext = selectedFile.name.substring(
        selectedFile.name.lastIndexOf(".")
      );
      const newFileName = `user_${userId}${ext}`;
      const renamedFile = new File([selectedFile], newFileName, {
        type: selectedFile.type,
      });

      const formData = new FormData();
      formData.append("files", renamedFile);

      fetch("http://localhost:5220/api/Storage/UploadFiles", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(() => {
          message.success("Cập nhật ảnh đại diện thành công!");
          setSelectedFile(null);
          setPreview(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          onUploaded?.(); // Gọi callback
        })
        .catch((err) => {
          console.error("Upload error:", err);
          message.error("Có lỗi khi upload ảnh");
        });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-3 border-r-2 border-gray-300 py-5 w-1/2">
      <div className="w-[100px] h-[100px] overflow-hidden rounded-lg">
        <Image
          className="object-cover w-full h-full"
          src={preview || `${imgUrl}/${avatarUrl}?t=${Date.now()}`}
          alt="avatar patient"
          width={100}
          height={100}
        />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <Button
          icon={<UploadOutlined />}
          onClick={() => fileInputRef.current?.click()}
        >
          Chọn ảnh
        </Button>
        {selectedFile && (
          <>
            <Button
              type="primary"
              onClick={handleUpload}
              style={{ marginLeft: 8 }}
            >
              Cập nhật ảnh
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleRemove}
              style={{ marginLeft: 8 }}
            >
              Xoá ảnh
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AvatarUploader;
