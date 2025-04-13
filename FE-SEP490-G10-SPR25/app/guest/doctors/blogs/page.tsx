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

const DoctorBlogsPage = () => {
  const [posts, setPosts] = useState<IApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center mt-10">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý bài viết</h1>
        <Link
          href="/doctor/posts/create"
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
              src={post.postImageUrl || "/images/placeholder.jpg"}
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
              <div className="text-xs text-gray-500 mb-2">
                Ngày đăng: {new Date(post.postCreatedDate).toLocaleDateString("vi-VN")}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/doctor/posts/${post.postId}`}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
                >
                  Xem
                </Link>
                <Link
                  href={`/doctor/posts/edit/${post.postId}`}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Sửa
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorBlogsPage;