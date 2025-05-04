"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Upload, Plus, X, Send } from "lucide-react";

interface PostSection {
  sectionTitle: string;
  sectionContent: string;
  sectionIndex: number;
  postImageUrl: string;
  postImageFile?: File;
  imagePreview?: string;
}

const EditBlogDoctorPage = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postSourceUrl, setPostSourceUrl] = useState("");
  const [postAuthorId, setPostAuthorId] = useState<number | null>(null);
  const [sections, setSections] = useState<PostSection[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`);
      const data = await res.json();
      setPostTitle(data.postTitle);
      setPostDescription(data.postDescription);
      setPostSourceUrl(data.postSourceUrl);
      setPostAuthorId(data.authorId);
      setSections(
        data.postSections.map((s: any, index: number) => ({
          ...s,
          sectionIndex: index,
          imagePreview: s.postImageUrl ? `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${s.postImageUrl}` : undefined
        }))
      );
    };
    fetchPost();
  }, [postId]);

  const handleAddSection = () => {
    setSections(prev => [
      ...prev,
      { sectionTitle: "", sectionContent: "", sectionIndex: prev.length, postImageUrl: "" }
    ]);
    setTimeout(() => {
      fileInputRefs.current = fileInputRefs.current.slice(0, sections.length + 1);
    }, 0);
  };

  const handleSectionChange = (index: number, key: keyof PostSection, value: any) => {
    const updated = [...sections];
    updated[index][key] = value;

    if (key === "postImageFile" && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          updated[index].imagePreview = e.target.result as string;
          setSections([...updated]);
        }
      };
      reader.readAsDataURL(value);
    } else if (key === "postImageFile" && !value) {
      updated[index].imagePreview = undefined;
      updated[index].postImageFile = undefined;
      setSections(updated);
    } else {
      setSections(updated);
    }
  };

  const handleDeleteSection = (index: number) => {
    setSections(prev => prev.filter((_, i) => i !== index));
    fileInputRefs.current = fileInputRefs.current.filter((_, i) => i !== index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleSectionChange(index, "postImageFile", file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sections.length === 0) {
      alert("Bạn cần ít nhất 1 section");
      return;
    }

    if (sections.some(sec => !sec.imagePreview)) {
      alert("Mỗi phần cần có một ảnh minh họa");
      return;
    }

    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("postDescription", postDescription);
    formData.append("postSourceUrl", postSourceUrl);
    if (postAuthorId !== null) formData.append("postAuthorId", postAuthorId.toString());

    const sectionsToSend = sections.map((sec, idx) => {
      if (sec.postImageFile) {
        formData.append("files", sec.postImageFile, `section_${idx}_${sec.postImageFile.name}`);
        return { ...sec, postImageUrl: "" };
      }
      return sec;
    });

    formData.append("postSectionsJson", JSON.stringify(sectionsToSend));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`, {
        method: "PUT",
        body: formData
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Sửa bài viết thất bại: " + text);
      } else {
        alert("Sửa bài viết thành công");
        router.push("/doctor/blogs");
      }
    } catch (err) {
      alert("Lỗi kết nối server");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Chỉnh sửa bài viết</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="Tiêu đề" className="w-full p-3 border rounded" required />
        <textarea value={postDescription} onChange={(e) => setPostDescription(e.target.value)} placeholder="Mô tả" className="w-full p-3 border rounded" required />
        <input value={postSourceUrl} onChange={(e) => setPostSourceUrl(e.target.value)} placeholder="Nguồn" className="w-full p-3 border rounded" />

        <h2 className="text-lg font-semibold mt-6">Sections</h2>
        {sections.map((sec, i) => (
          <div key={i} className="border p-4 rounded space-y-2 relative">
            <button type="button" onClick={() => handleDeleteSection(i)} className="absolute top-2 right-2 text-red-500">
              <X className="h-4 w-4" />
            </button>

            <input
              value={sec.sectionTitle}
              onChange={(e) => handleSectionChange(i, "sectionTitle", e.target.value)}
              placeholder={`Tiêu đề phần ${i + 1}`}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              value={sec.sectionContent}
              onChange={(e) => handleSectionChange(i, "sectionContent", e.target.value)}
              placeholder="Nội dung"
              className="w-full p-2 border rounded"
              required
            />

            <div>
              {sec.imagePreview ? (
                <div className="relative group">
                  <img src={sec.imagePreview} alt="Ảnh hiện tại" className="w-full h-48 object-cover mb-2" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex justify-center items-center">
                    <button
                      type="button"
                      onClick={() => handleSectionChange(i, "postImageFile", undefined)}
                      className="bg-red-500 text-white p-2 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed p-4 text-center cursor-pointer rounded hover:border-blue-500"
                  onDrop={(e) => handleDrop(e, i)}
                  onClick={() => fileInputRefs.current[i]?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="text-sm">Kéo ảnh vào hoặc bấm để chọn</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => (fileInputRefs.current[i] = el)}
                    onChange={(e) => handleSectionChange(i, "postImageFile", e.target.files?.[0])}
                  />
                </div>
              )}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-5 py-2.5 rounded-lg bg-blue-600 text-white flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Đang lưu...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Lưu chỉnh sửa
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBlogDoctorPage;
