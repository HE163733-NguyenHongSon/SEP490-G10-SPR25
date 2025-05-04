import React, { useState, useEffect, useRef } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Image, Typography } from "antd";

const { Text } = Typography;

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load file từ localStorage khi load component
  useEffect(() => {
    const base64 = localStorage.getItem("uploadedFileBase64");
    const name = localStorage.getItem("uploadedFileName");

    if (base64 && name) {
      setPreview(base64);
    }
  }, []);

  // Khi file được chọn => tạo preview và lưu localStorage
  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        localStorage.setItem("uploadedFileBase64", base64);
        localStorage.setItem("uploadedFileName", selectedFile.name);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
      localStorage.removeItem("uploadedFileBase64");
      localStorage.removeItem("uploadedFileName");
    }
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Text strong>Phác đồ điều trị trước đây (nếu có):</Text>
      <div style={{ marginTop: 10 }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {!selectedFile ? (
          <Button
            icon={<UploadOutlined />}
            type="dashed"
            onClick={() => fileInputRef.current?.click()}
          >
            Tải lên file
          </Button>
        ) : (
          <>
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={200}
                style={{ marginBottom: 10, borderRadius: 8 }}
              />
            )}
            <br />
            <Button danger icon={<DeleteOutlined />} onClick={handleRemove}>
              Xóa file
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
