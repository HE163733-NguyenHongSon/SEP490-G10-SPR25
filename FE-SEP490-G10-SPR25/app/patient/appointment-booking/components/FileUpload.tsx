import React, { useState, useEffect, useRef } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Image, Typography } from "antd";

const { Text } = Typography;

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Kiểm tra nếu có file đã được lưu trong localStorage
    const storedFile = localStorage.getItem("uploadedFileBase64");
    const storedFileName = localStorage.getItem("uploadedFileName");

    if (storedFile && storedFileName) {
      setPreview(storedFile);
      setSelectedFile(new File([new Blob([storedFile])], storedFileName, { type: 'image/jpeg' }));
    }
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result as string;
        // Lưu file vào localStorage
        localStorage.setItem("uploadedFileBase64", base64File);
        localStorage.setItem("uploadedFileName", selectedFile.name);
        setPreview(base64File);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);  // Xóa preview khi không còn file
      localStorage.removeItem("uploadedFileBase64");
      localStorage.removeItem("uploadedFileName");
    }
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
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
            onClick={handleUploadClick}
          >
            Tải lên file
          </Button>
        ) : (
          <div style={{ marginTop: 10 }}>
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={200}
                style={{ marginBottom: 10, borderRadius: 8 }}
              />
            )}
            <br />
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleRemoveImage}
            >
              Xóa file
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
