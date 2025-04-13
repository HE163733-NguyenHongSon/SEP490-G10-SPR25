"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PostSection {
  sectionTitle: string;
  sectionContent: string;
  sectionIndex: number;
  postImageUrl?: string;
}

const CreateBlogAdminPage = () => {
  const router = useRouter();
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postSourceUrl, setPostSourceUrl] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [postAuthorId, setPostAuthorId] = useState<number | null>(null); // 👈 thêm authorId nếu cần gửi
  const [sections, setSections] = useState<PostSection[]>([]);

  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      { sectionTitle: "", sectionContent: "", sectionIndex: prev.length }
    ]);
  };

  const handleSectionChange = (index: number, key: keyof PostSection, value: string) => {
    const updated = [...sections];
    updated[index][key] = value;
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (sections.length === 0) {
      alert("Bạn cần thêm ít nhất 1 section cho bài viết");
      return;
    }

    const payload: any = {
      postTitle,
      postDescription,
      postSourceUrl,
      postImageUrl,
      postCategory,
      authorBio,
      postSections: sections,
    };

    if (postAuthorId !== null) payload.postAuthorId = postAuthorId; // 👈 thêm nếu có

    console.log("Payload gửi:", JSON.stringify(payload, null, 2));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Lỗi chi tiết:", text);
        alert("Tạo bài viết thất bại: " + text);
      } else {
        alert("Tạo bài viết thành công");
        router.push("/admin/blogs");
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Lỗi kết nối tới server.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tạo bài viết mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={postTitle} onChange={(e) => setPostTitle(e.target.value)} placeholder="Tiêu đề" className="w-full p-2 border rounded" required />
        <textarea value={postDescription} onChange={(e) => setPostDescription(e.target.value)} placeholder="Mô tả" className="w-full p-2 border rounded" required />
        <input value={postSourceUrl} onChange={(e) => setPostSourceUrl(e.target.value)} placeholder="Nguồn (nếu có)" className="w-full p-2 border rounded" />
        <input value={postImageUrl} onChange={(e) => setPostImageUrl(e.target.value)} placeholder="Ảnh bài viết" className="w-full p-2 border rounded" />
        <input value={postCategory} onChange={(e) => setPostCategory(e.target.value)} placeholder="Chuyên mục" className="w-full p-2 border rounded" />
        <input value={authorBio} onChange={(e) => setAuthorBio(e.target.value)} placeholder="Giới thiệu tác giả" className="w-full p-2 border rounded" />

        {/* Nếu cần nhập authorId bằng tay (tạm thời) */}
        <input type="number" value={postAuthorId ?? ""} onChange={(e) => setPostAuthorId(Number(e.target.value))} placeholder="Mã tác giả (PostAuthorId)" className="w-full p-2 border rounded" />

        <h2 className="text-lg font-semibold mt-6">Sections</h2>
        {sections.map((sec, i) => (
          <div key={i} className="border p-4 rounded space-y-2">
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
            <input
              value={sec.postImageUrl || ""}
              onChange={(e) => handleSectionChange(i, "postImageUrl", e.target.value)}
              placeholder="Ảnh (nếu có)"
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <button type="button" onClick={handleAddSection} className="bg-blue-500 text-white px-4 py-2 rounded">
          + Thêm section
        </button>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          Gửi bài viết
        </button>
      </form>
    </div>
  );
};

export default CreateBlogAdminPage;
