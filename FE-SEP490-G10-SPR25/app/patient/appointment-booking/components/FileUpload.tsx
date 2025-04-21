import React from "react";
import { FileImage } from "lucide-react";

const FileUpload = () => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center">
        <FileImage className="w-4 h-4 mr-2" />
        Tải lên phác đồ điều trị trước (nếu có)
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
        <div className="space-y-1 text-center">
          <div className="flex text-sm text-gray-600 justify-center">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
              <span>Tải ảnh lên</span>
              <input type="file" className="sr-only" />
            </label>
            <p className="pl-1">hoặc kéo thả tại đây</p>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
