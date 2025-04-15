"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface IApiPost {
  postId: number;
  postTitle: string;
  postDescription: string;
  postCreatedDate: string;
  postSourceUrl: string;
  authorName: string | null;
  postImageUrl: string;
}

const AdminBlogsPage = () => {
  const [posts, setPosts] = useState<IApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
      if (!res.ok) throw new Error("API lỗi");
      const data: IApiPost[] = await res.json();
      setPosts(data);
    } catch (err) {
      setError("Không thể tải bài viết");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    if (!confirm("Bạn có chắc chắn muốn xoá bài viết này?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Xoá thất bại");
      await fetchPosts();
    } catch (err) {
      alert("Xoá bài viết thất bại");
    }
  };

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lý bài viết (Admin)</h1>
          <Link
            href="/admin/blogs/create"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Tạo bài viết
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.postId}
              className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${post.postImageUrl}` || "/images/placeholder.jpg"}
                alt={post.postTitle}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="font-semibold text-lg mb-2">{post.postTitle}</h3>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {post.postDescription}
                </p>
                <div className="text-xs text-gray-500 mb-1">
                  Ngày đăng: {new Date(post.postCreatedDate).toLocaleDateString("vi-VN")}
                </div>
                <div className="text-xs text-gray-500 mb-3">
                  Tác giả: {post.authorName || "Ẩn danh"}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/admin/blogs/${post.postId}`}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                  >
                    Xem
                  </Link>
                  <Link
                    href={`/admin/blogs/edit/${post.postId}`}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(post.postId)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogsPage;
