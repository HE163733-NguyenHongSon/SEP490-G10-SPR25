import React, { useState } from "react";
import { FileImage, X } from "lucide-react";
import { Image } from "antd";
import { useDispatch } from "react-redux";
import { setPriorExaminationImg, clearPriorExaminationImg } from "../bookingSlice";

const FileUpload = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      dispatch(setPriorExaminationImg(selectedFile)); // Lưu vào Redux
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    dispatch(clearPriorExaminationImg()); // Xoá khỏi Redux
    setPreview(null);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <FileImage className="w-4 h-4 mr-2" />
        Tải lên phác đồ điều trị trước (nếu có)
      </label>

      <div className="mt-1 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
        <div className="space-y-1 text-center">
          {preview ? (
            <div className="relative w-28 h-28 border border-gray-300 mx-auto rounded-md overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-white text-gray-500 rounded-full p-1 shadow hover:text-red-500"
                title="Xoá ảnh"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex text-sm text-gray-600 justify-center">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                <span>Tải ảnh lên</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">hoặc kéo thả tại đây</p>
            </div>
          )}
          <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
