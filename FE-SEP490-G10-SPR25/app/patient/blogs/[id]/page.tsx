"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as signalR from "@microsoft/signalr";
import { getCurrentUser } from "@/common/services/authService";
import { Trash2, Edit2, Reply, Send } from "lucide-react";
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

const PatientBlogDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [hubConnection, setHubConnection] =
    useState<signalR.HubConnection | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

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

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user && user.userId) {
        setCurrentUserId(Number(user.userId));
        setCurrentUserName(user.userName || user.userName || "User");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const connect = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/hubs/comments`)
      .withAutomaticReconnect()
      .build();

    connect.on("ReceiveComment", (message: Comment) => {
      setPost((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: [...prev.comments, message],
        };
      });
    });

    connect.on("UpdateComment", (updatedComment: Comment) => {
      setPost((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: prev.comments.map((c) =>
            c.commentId === updatedComment.commentId ? updatedComment : c
          ),
        };
      });
    });

    connect.on("DeleteComment", (commentId: number) => {
      setPost((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: prev.comments.filter((c) => c.commentId !== commentId),
        };
      });
    });

    connect
      .start()
      .then(() => console.log("Kết nối SignalR thành công"))
      .catch((err) => console.error("Lỗi khi kết nối SignalR:", err));

    setHubConnection(connect);

    return () => {
      connect.stop();
    };
  }, []);

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.commentId);
    setEditedContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  const startReplying = (commentId: number) => {
    setReplyingToId(commentId);
    setReplyContent("");
  };

  const cancelReplying = () => {
    setReplyingToId(null);
    setReplyContent("");
  };

  const handleSaveEdit = async (commentId: number) => {
    if (!editedContent.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedContent),
        }
      );

      if (res.ok) {
        const updatedComment = await res.json();
        if (hubConnection) {
          await hubConnection.invoke("UpdateComment", updatedComment);
        } else {
          setPost((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              comments: prev.comments.map((c) =>
                c.commentId === commentId ? { ...c, content: editedContent } : c
              ),
            };
          });
        }
        setEditingCommentId(null);
      } else {
        console.error("Lỗi khi cập nhật bình luận");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu cập nhật:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa bình luận này?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUserId,
          }),
        }
      );

      if (res.ok) {
        if (hubConnection) {
          await hubConnection.invoke("DeleteComment", commentId);
        } else {
          setPost((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              comments: prev.comments.filter((c) => c.commentId !== commentId),
            };
          });
        }
      } else {
        console.error("Lỗi khi xóa bình luận");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu xóa:", error);
    }
  };

  const handleSendReply = async (parentCommentId: number) => {
    if (!replyContent.trim() || !id || !currentUserId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: replyContent,
            postId: parseInt(id as string),
            userId: currentUserId,
            userName: currentUserName,
            repliedCommentId: parentCommentId,
          }),
        }
      );

      if (res.ok) {
        const saved = await res.json();
        if (hubConnection) {
          await hubConnection.invoke("SendComment", saved);
        }
        setReplyContent("");
        setReplyingToId(null);
      } else {
        console.error("Lỗi khi gửi phản hồi");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu phản hồi:", error);
    }
  };

  const renderComment = (
    comment: Comment,
    allComments: Comment[],
    level = 0
  ) => {
    const replies = allComments.filter(
      (c) => c.repliedCommentId === comment.commentId
    );
    const isCurrentUserComment = comment.userId === currentUserId;
    const indent = Math.min(level, 5);

    return (
      <div
        key={comment.commentId}
        className={`border-l-4 pl-4 mb-6 ${
          isCurrentUserComment ? "border-blue-400" : "border-gray-200"
        }`}
        style={{ marginLeft: `${indent * 16}px` }}
      >
        <div
          className={`p-4 rounded-lg ${
            isCurrentUserComment ? "bg-blue-50" : "bg-gray-50"
          }`}
        >
          {editingCommentId === comment.commentId ? (
            <div className="mb-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full border rounded-md p-2 mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveEdit(comment.commentId)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
                >
                  Lưu
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition-colors text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-1">
                <span className="font-medium text-blue-600">
                  {comment.userName || "Người dùng ẩn danh"}
                </span>
                {isCurrentUserComment && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(comment)}
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.commentId)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-800 mb-2">{comment.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>
                  {new Date(comment.commentOn).toLocaleString("vi-VN")}
                </span>
                <button
                  onClick={() => startReplying(comment.commentId)}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <Reply size={14} />
                  <span>Phản hồi</span>
                </button>
              </div>
            </>
          )}
        </div>

        {replyingToId === comment.commentId && (
          <div className="mt-3 mb-4 ml-4">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Viết phản hồi..."
              className="w-full border rounded-md p-2 mb-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={2}
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleSendReply(comment.commentId)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
              >
                <Send size={14} />
                <span>Gửi</span>
              </button>
              <button
                onClick={cancelReplying}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition-colors text-sm"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {replies.length > 0 && (
          <div className="mt-3">
            {replies.map((reply) =>
              renderComment(reply, allComments, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const handleSendComment = async () => {
    if (!newComment.trim() || !id || !currentUserId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newComment,
            postId: parseInt(id as string),
            userId: currentUserId,
            userName: currentUserName,
            repliedCommentId: null,
          }),
        }
      );

      if (res.ok) {
        const saved = await res.json();
        if (hubConnection) {
          await hubConnection.invoke("SendComment", saved);
        }
        setNewComment("");
      } else {
        console.error("Lỗi khi gửi bình luận qua API");
      }
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl mb-4">{error || "Bài viết không tồn tại"}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => window.location.href = "/patient/blogs"}
        >
          Quay lại danh sách bài viết
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl pt-24 relative">
      <BackButton fallbackPath="/patient/blogs" />
      <article className="mt-8">
        <h1 className="text-3xl font-bold mb-3">{post.postTitle}</h1>
        <p className="text-gray-500 text-sm mb-4">
          {new Date(post.postCreatedDate).toLocaleDateString("vi-VN")} -{" "}
          {post.authorName ?? "Ẩn danh"}
        </p>

        {/* {post.postImageUrl && (
          <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${post.postImageUrl}`}
              alt={post.postTitle}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )} */}

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {post.postDescription}
        </p>

        {post.postSourceUrl && (
          <p className="text-sm text-blue-600 hover:text-blue-800 transition-colors mb-8">
            <a
              href={post.postSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              Nguồn bài viết
            </a>
          </p>
        )}

        {post.postSections
          ?.sort((a, b) => a.sectionIndex - b.sectionIndex)
          .map((section, idx) => (
            <div key={idx} className="mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {section.sectionTitle}
              </h2>
              {section.postImageUrl && (
                <div className="group relative w-full mb-6 rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${section.postImageUrl}`}
                      alt={section.sectionTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              )}
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {section.sectionContent}
              </p>
            </div>
          ))}

        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Bình luận</h3>

          <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-medium mb-3">Thêm bình luận mới</h4>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Nhập bình luận của bạn..."
              className="w-full border rounded-md p-3 mb-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={4}
            />
            <button
              onClick={handleSendComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
              disabled={!newComment.trim()}
            >
              <Send size={18} />
              <span>Gửi bình luận</span>
            </button>
          </div>

          <div className="space-y-2">
            {post.comments.length > 0 ? (
              post.comments
                .filter((c) => !c.repliedCommentId)
                .map((parent) => renderComment(parent, post.comments))
            ) : (
              <p className="text-gray-500 italic text-center py-4">
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PatientBlogDetailPage;
