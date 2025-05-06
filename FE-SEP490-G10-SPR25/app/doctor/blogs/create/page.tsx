"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Plus, X, Image, AlertCircle, Send, CheckCircle } from "lucide-react";
import { getCurrentUser } from "@/common/services/authService";

interface PostSection {
  sectionTitle: string;
  sectionContent: string;
  sectionIndex: number;
  postImageFile?: File;
  imagePreview?: string;
}

const CreateBlogDoctorPage = () => {
  const router = useRouter();
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postSourceUrl, setPostSourceUrl] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number>(1); // Default to 1 or fetch from auth system
  const [sections, setSections] = useState<PostSection[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "warning";
  }>({
    show: false,
    message: "",
    type: "success",
  });
  
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = getCurrentUser();
      if (user?.userId) {
        setCurrentUserId(Number(user.userId));
      }
    };
    fetchCurrentUser();
  }, []);

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      { sectionTitle: "", sectionContent: "", sectionIndex: prev.length }
    ]);
    
    // Update refs array for new file input
    setTimeout(() => {
      fileInputRefs.current = fileInputRefs.current.slice(0, sections.length + 1);
    }, 0);
  };

  const handleSectionChange = (index: number, key: keyof PostSection, value: any) => {
    setSections((prev) => {
      const updated = [...prev];
  
      if (key === "postImageFile" && value instanceof File) {
        // preview ảnh
        const reader = new FileReader();
        reader.onload = (e) => {
          updated[index].imagePreview = e.target?.result as string;
          updated[index].postImageFile = value;
          setSections([...updated]);
        };
        reader.readAsDataURL(value);
      } else {
        updated[index][key] = value;
        return updated;
      }
  
      return prev; // return cũ nếu đang async set preview
    });
  };


  const handleRemoveSection = (index: number) => {
    setSections(prev => prev.filter((_, i) => i !== index));
    fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLDivElement;
    element.classList.add("border-blue-500", "bg-blue-50");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLDivElement;
    element.classList.remove("border-blue-500", "bg-blue-50");
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLDivElement;
    element.classList.remove("border-blue-500", "bg-blue-50");
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleSectionChange(index, "postImageFile", file);
    }
  };

  const showNotification = (message: string, type: "success" | "error" | "warning") => {
    setNotification({
      show: true,
      message,
      type,
    });
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (sections.length === 0) {
      showNotification("Bạn cần thêm ít nhất 1 section cho bài viết", "warning");
      return;
    }
  
    if (sections.some((sec) => !sec.postImageFile)) {
      showNotification("Mỗi phần nội dung cần có ảnh minh họa", "warning");
      return;
    }
  
    setIsSubmitting(true);
  
    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("postDescription", postDescription);
    formData.append("postSourceUrl", postSourceUrl);
    formData.append("postAuthorId", currentUserId.toString());
  
    const sectionsToSend = sections.map((sec, idx) => {
      // 👇 Thêm file vào formData với tên duy nhất
      if (sec.postImageFile) {
        formData.append("files", sec.postImageFile, `section_${idx}_${sec.postImageFile.name}`);
      }
  
      return {
        sectionTitle: sec.sectionTitle,
        sectionContent: sec.sectionContent,
        sectionIndex: idx,
        postImageUrl: "", // để backend tự xử lý
      };
    });
  
    formData.append("postSectionsJson", JSON.stringify(sectionsToSend));
    
    // ✅ Log kiểm tra form data
    for (const [key, val] of formData.entries()) {
      console.log("FormData:", key, val);
    }
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        const text = await res.text();
        console.error("Lỗi chi tiết:", text);
        showNotification(`Tạo bài viết thất bại: ${text}`, "error");
      } else {
        showNotification("Tạo bài viết thành công", "success");
        setTimeout(() => {
          router.push("/doctor/blogs");
        }, 2000);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      showNotification("Lỗi kết nối tới server", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300 flex items-center gap-3
            ${notification.type === "success" ? "bg-green-100 border-l-4 border-green-500 text-green-800" : ""}
            ${notification.type === "error" ? "bg-red-100 border-l-4 border-red-500 text-red-800" : ""}
            ${notification.type === "warning" ? "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800" : ""}`}
        >
          {notification.type === "success" && <CheckCircle className="h-5 w-5" />}
          {notification.type === "error" && <AlertCircle className="h-5 w-5" />}
          {notification.type === "warning" && <AlertCircle className="h-5 w-5" />}
          <span>{notification.message}</span>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Tạo bài viết mới</h1>
          <p className="text-gray-600 mb-6">Chia sẻ kiến thức y khoa chuyên môn của bạn</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Tiêu đề bài viết
                </label>
                <input
                  id="title"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Nhập tiêu đề hấp dẫn"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Mô tả tóm tắt
                </label>
                <textarea
                  id="description"
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  placeholder="Mô tả ngắn gọn về nội dung bài viết"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all min-h-[100px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="source" className="block text-sm font-medium text-gray-700">
                  Nguồn tham khảo (nếu có)
                </label>
                <input
                  id="source"
                  value={postSourceUrl}
                  onChange={(e) => setPostSourceUrl(e.target.value)}
                  placeholder="URL nguồn tham khảo"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Nội dung bài viết</h2>
                <span className="text-sm text-gray-600">
                  {sections.length} section{sections.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {sections.length === 0 ? (
                <div className="text-center py-12 px-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium mb-2">Chưa có nội dung</h3>
                  <p className="text-gray-600 mb-4">Bắt đầu bằng cách thêm một phần nội dung cho bài viết</p>
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Thêm section
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {sections.map((sec, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm relative group">
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(i)}
                        className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition-colors"
                        aria-label="Remove section"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="mb-4">
                        <div className="inline-block bg-blue-50 text-blue-700 text-xs font-medium rounded-full px-2.5 py-0.5 mb-2">
                          Section {i + 1}
                        </div>
                        <input
                          value={sec.sectionTitle}
                          onChange={(e) => handleSectionChange(i, "sectionTitle", e.target.value)}
                          placeholder={`Tiêu đề phần ${i + 1}`}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all mb-3"
                          required
                        />
                        <textarea
                          value={sec.sectionContent}
                          onChange={(e) => handleSectionChange(i, "sectionContent", e.target.value)}
                          placeholder="Nội dung chi tiết của phần này..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all min-h-[150px] mb-4"
                          required
                        />
                        
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hình ảnh minh họa
                          </label>
                          
                          {sec.imagePreview ? (
                            <div className="relative rounded-lg border border-gray-200 overflow-hidden group">
                              <img 
                                src={sec.imagePreview} 
                                alt="Section preview" 
                                className="w-full h-48 object-cover"
                              />
                              
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleSectionChange(i, "postImageFile", undefined);
                                    handleSectionChange(i, "imagePreview", undefined);
                                  }}
                                  className="bg-red-500 text-white p-2 rounded-full"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) => handleDrop(e, i)}
                              onClick={() => fileInputRefs.current[i]?.click()}
                            >
                              <Upload className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                              <p className="text-sm font-medium mb-1">Kéo thả hình ảnh vào đây</p>
                              <p className="text-xs text-gray-500 mb-2">hoặc click để chọn file</p>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF (tối đa 10MB)</p>
                              
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleSectionChange(i, "postImageFile", e.target.files?.[0])}
                                ref={(el) => (fileInputRefs.current[i] = el)}
                                className="hidden"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={handleAddSection}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Thêm section mới
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2.5 rounded-lg bg-blue-600 text-white flex items-center
                  ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}
                  transition-colors`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Đăng bài viết
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogDoctorPage;