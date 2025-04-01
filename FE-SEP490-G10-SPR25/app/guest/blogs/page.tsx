"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronRight, FaSearch } from "react-icons/fa";

// Interface cho bài viết cẩm nang
interface IBlog {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}

const GuestBlogsPage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>([]);

  // Dữ liệu mẫu cho cẩm nang
  useEffect(() => {
    // Giả lập gọi API
    setTimeout(() => {
      try {
        // Dữ liệu mẫu
        const sampleBlogs: IBlog[] = [
          {
            id: 1,
            title: "Phòng ngừa bệnh tim mạch hiệu quả",
            summary: "Các biện pháp phòng ngừa bệnh tim mạch hiệu quả cho mọi lứa tuổi",
            content: "Nội dung chi tiết...",
            author: "Bs. Nguyễn Văn A",
            date: "12/05/2023",
            imageUrl: "/images/blog/heart-health.jpg",
            category: "Tim mạch"
          },
          {
            id: 2,
            title: "Dinh dưỡng cho người cao tuổi",
            summary: "Hướng dẫn chế độ dinh dưỡng cân đối cho người cao tuổi",
            content: "Nội dung chi tiết...",
            author: "Bs. Trần Thị B",
            date: "05/06/2023",
            imageUrl: "/images/blog/elderly-nutrition.jpg",
            category: "Dinh dưỡng"
          },
          {
            id: 3,
            title: "Tập luyện thể thao đúng cách",
            summary: "Hướng dẫn tập luyện thể thao đúng cách để tránh chấn thương",
            content: "Nội dung chi tiết...",
            author: "Bs. Lê Văn C",
            date: "20/07/2023",
            imageUrl: "/images/blog/exercise.jpg",
            category: "Thể thao"
          },
          {
            id: 4,
            title: "Chăm sóc sức khỏe tinh thần",
            summary: "Các phương pháp giảm stress và chăm sóc sức khỏe tinh thần",
            content: "Nội dung chi tiết...",
            author: "Bs. Phạm Thị D",
            date: "15/08/2023",
            imageUrl: "/images/blog/mental-health.jpg",
            category: "Sức khỏe tinh thần"
          },
          {
            id: 5,
            title: "Phòng ngừa các bệnh lý về xương khớp",
            summary: "Hướng dẫn chăm sóc xương khớp để phòng ngừa các bệnh lý",
            content: "Nội dung chi tiết...",
            author: "Bs. Hoàng Văn E",
            date: "10/09/2023",
            imageUrl: "/images/blog/bone-health.jpg",
            category: "Xương khớp"
          },
          {
            id: 6,
            title: "Chăm sóc da mùa hanh khô",
            summary: "Các biện pháp chăm sóc da hiệu quả trong mùa hanh khô",
            content: "Nội dung chi tiết...",
            author: "Bs. Mai Thị F",
            date: "25/10/2023",
            imageUrl: "/images/blog/skin-care.jpg",
            category: "Da liễu"
          }
        ];
        
        setBlogs(sampleBlogs);
        setFilteredBlogs(sampleBlogs);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải cẩm nang');
        console.error('Lỗi khi tải cẩm nang:', err);
        setLoading(false);
      }
    }, 1000); // giả lập delay mạng
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, blogs]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-fixed flex flex-col items-center z-10"
      style={{ backgroundImage: 'url("/images/background_blogs.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
      
      <div className="relative z-30 w-full">
        {/* Thanh tìm kiếm */}
        <div className="flex justify-center mb-3 mt-20">
          <div className="relative flex items-center w-[400px] bg-white rounded-full shadow-md border border-gray-300 overflow-hidden">
            <button className="flex items-center bg-blue-500 text-white px-3 py-2">
              Name <FaChevronRight className="ml-2" />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm cẩm nang..."
              className="w-full px-3 py-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 text-gray-500">
              <FaSearch />
            </button>
          </div>
        </div>
        
        {/* Danh sách cẩm nang */}
        <div className="p-10 relative z-20 bg-gray-100 min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full flex flex-col">
                <div className="relative h-48">
                  <Image 
                    src={blog.imageUrl || "/images/blog-placeholder.jpg"}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-cyan-500 text-white px-2 py-1 text-xs">
                    {blog.category}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {blog.summary}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{blog.author}</span>
                      <span>{blog.date}</span>
                    </div>
                    
                    <Link 
                      href={`/guest/blogs/${blog.id}`}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md text-sm transition-colors inline-block w-full text-center"
                    >
                      Đọc thêm
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {filteredBlogs.length > 0 ? (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">←</button>
              <button className="px-4 py-2 border rounded-md bg-blue-500 text-white">1</button>
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">2</button>
              <button className="px-4 py-2 border rounded-md bg-white text-gray-700 border-gray-300">→</button>
            </div>
          ) : (
            <div className="text-center mt-8 text-gray-600">
              Không tìm thấy cẩm nang nào phù hợp với tìm kiếm của bạn
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestBlogsPage; 