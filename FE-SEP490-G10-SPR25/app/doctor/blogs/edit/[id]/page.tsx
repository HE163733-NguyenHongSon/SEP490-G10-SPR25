"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface PostSection {
  sectionTitle: string;
  sectionContent: string;
  sectionIndex: number;
  postImageUrl: string;
  postImageFile?: File;
}

const EditBlogDoctorPage = () => {
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postSourceUrl, setPostSourceUrl] = useState("");
  const [postAuthorId, setPostAuthorId] = useState<number | null>(null);
  const [sections, setSections] = useState<PostSection[]>([]);

  // Fetch dữ liệu bài viết khi load trang
  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`);
      const data = await res.json();
      setPostTitle(data.postTitle);
      setPostDescription(data.postDescription);
      setPostSourceUrl(data.postSourceUrl);
      setPostAuthorId(data.authorId);
      setSections(data.postSections);
    };
    fetchPost();
  }, [postId]);

  const handleAddSection = () => {
    setSections(prev => [
      ...prev,
      { sectionTitle: "", sectionContent: "", sectionIndex: prev.length, postImageUrl: "" }
    ]);
  };

  const handleDeleteSection = (index: number) => {
    setSections(prev => prev.filter(s => s.sectionIndex !== index));
  };

  const handleSectionChange = (index: number, key: keyof PostSection, value: any) => {
    const updated = [...sections];
    const idx = updated.findIndex(s => s.sectionIndex === index);
    updated[idx][key] = value;
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sections.length === 0) {
      alert("Bạn cần ít nhất 1 section");
      return;
    }

    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("postDescription", postDescription);
    formData.append("postSourceUrl", postSourceUrl);
    if (postAuthorId !== null) formData.append("postAuthorId", postAuthorId.toString());

    const sectionsToSend = sections.map(sec => {
      if (sec.postImageFile) {
        formData.append("files", sec.postImageFile);
        return { ...sec, postImageUrl: "" };  // Báo cho backend biết cần replace ảnh
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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa bài viết</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="Tiêu đề" className="w-full p-2 border rounded" required />
        <textarea value={postDescription} onChange={(e) => setPostDescription(e.target.value)} placeholder="Mô tả" className="w-full p-2 border rounded" required />
        <input value={postSourceUrl} onChange={(e) => setPostSourceUrl(e.target.value)} placeholder="Nguồn" className="w-full p-2 border rounded" />
        <input
  type="number"
  value={postAuthorId !== null ? postAuthorId : ""}
  onChange={(e) => {
    const value = e.target.value;
    setPostAuthorId(value ? Number(value) : null);
  }}
  placeholder="Mã tác giả"
  className="w-full p-2 border rounded"
/>


        <h2 className="text-lg font-semibold mt-6">Sections</h2>
        {sections.map((sec) => (
          <div key={sec.sectionIndex} className="border p-4 rounded space-y-2">
            <input
              value={sec.sectionTitle}
              onChange={(e) => handleSectionChange(sec.sectionIndex, "sectionTitle", e.target.value)}
              placeholder={`Tiêu đề phần ${sec.sectionIndex}`}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              value={sec.sectionContent}
              onChange={(e) => handleSectionChange(sec.sectionIndex, "sectionContent", e.target.value)}
              placeholder="Nội dung"
              className="w-full p-2 border rounded"
              required
            />
            <div>
              {sec.postImageUrl && (
                <img
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${sec.postImageUrl}`}
                    alt="Ảnh hiện tại"
                    className="w-40 mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleSectionChange(sec.sectionIndex, "postImageFile", e.target.files?.[0])}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="button" onClick={() => handleDeleteSection(sec.sectionIndex)} className="text-red-500">
              Xoá section
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddSection} className="bg-blue-500 text-white px-4 py-2 rounded">
          + Thêm section
        </button>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          Lưu chỉnh sửa
        </button>
      </form>
    </div>
  );
};

export default EditBlogDoctorPage;
