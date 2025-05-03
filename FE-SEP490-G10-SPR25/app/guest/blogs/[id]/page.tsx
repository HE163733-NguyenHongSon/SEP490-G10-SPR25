"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/common/components/BackButton";

interface PostSection {
  sectionTitle: string;
  sectionContent: string;
  postImageUrl?: string;
  sectionIndex: number;
}

interface Comment {
  commentId: number;
  content: string;
  userId?: number;
  userName?: string;
  commentOn: string;
  repliedCommentId?: number | null;
  numberOfLikes: number;
}

interface PostDetail {
  postId: number;
  postTitle: string;
  postDescription: string;
  postCreatedDate: string;
  postSourceUrl: string;
  postImageUrl?: string;
  postCategory?: string;
  authorName?: string;
  postSections: PostSection[];
  comments: Comment[];
}

const GuestBlogDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`
        );
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        const data: PostDetail = await res.json();
        setPost(data);
      } catch (err) {
        setError("Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error || "Không tìm thấy bài viết"}</div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_blogs.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>

      <div className="relative container w-90 text-gray-600 p-5 mt-20 mb-5 z-30 bg-white rounded-xl shadow-2xl">
        <BackButton fallbackPath="/guest/blogs" />

        <article className="max-w-4xl mx-auto py-8 px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.postTitle}</h1>
            <div className="flex items-center text-gray-500 text-sm mb-6">
              <span className="mr-4">
                Tác giả: {post.authorName || "Không rõ"}
              </span>
              <span>
                Ngày đăng: {new Date(post.postCreatedDate).toLocaleDateString("vi-VN")}
              </span>
            </div>
            {post.postImageUrl && (
              <div className="relative w-full h-[400px] mb-6">
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${post.postImageUrl}`}
                  alt={post.postTitle}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <p className="text-lg text-gray-700 leading-relaxed">
              {post.postDescription}
            </p>
          </header>

          <div className="prose max-w-none">
            {post.postSections.map((section) => (
              <section key={section.sectionIndex} className="mb-8">
                {section.sectionTitle && (
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {section.sectionTitle}
                  </h2>
                )}
                <div dangerouslySetInnerHTML={{ __html: section.sectionContent }} />
                {section.postImageUrl && (
                  <div className="relative w-full h-[300px] my-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${section.postImageUrl}`}
                      alt={section.sectionTitle || "Section image"}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 border-t pt-8">
            <h3 className="text-2xl font-semibold mb-6">Bình luận ({post.comments.length})</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="text-center">
                <p className="text-lg mb-4">Đăng nhập để tham gia thảo luận</p>
                <p className="text-gray-600 mb-6">Bạn cần đăng nhập để có thể bình luận và tương tác với các bình luận khác</p>
                <Link href="/common/auth/login">
                  <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-white text-lg font-medium">
                    Đăng nhập ngay
                  </button>
                </Link>
              </div>
            </div>

            {post.comments.length > 0 ? (
              <div className="space-y-6">
                {post.comments
                  .filter(c => !c.repliedCommentId)
                  .map(comment => (
                    <div key={comment.commentId} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{comment.userName || "Ẩn danh"}</div>
                          <div className="text-gray-500 text-sm">
                            {new Date(comment.commentOn).toLocaleString("vi-VN")}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2">{comment.content}</p>
                      
                      {/* Replies */}
                      <div className="ml-8 mt-4 space-y-4">
                        {post.comments
                          .filter(c => c.repliedCommentId === comment.commentId)
                          .map(reply => (
                            <div key={reply.commentId} className="bg-white p-3 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium">{reply.userName || "Ẩn danh"}</div>
                                  <div className="text-gray-500 text-sm">
                                    {new Date(reply.commentOn).toLocaleString("vi-VN")}
                                  </div>
                                </div>
                              </div>
                              <p className="mt-2">{reply.content}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">Chưa có bình luận nào.</p>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default GuestBlogDetailPage; 