// FeedbackCarousel.tsx
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './feedback-carousel.css'; // optional custom styles
import { Pagination } from 'swiper/modules';

interface Feedback {
  id: number;
  name: string;
  initials: string;
  timeAgo: string;
  rating: number;
  content: string;
}

const feedbacks: Feedback[] = [
  {
    id: 1,
    name: 'Sara R.',
    initials: 'SR',
    timeAgo: '4 weeks ago',
    rating: 5,
    content:
      "Angela is amazing, and so is the course. She explains concepts so clearly, making them easy to understand and follow. She has also structured the entire project in an incredibly coherent way, which makes progressing smooth and enjoyable.",
  },
  {
    id: 2,
    name: 'John D.',
    initials: 'JD',
    timeAgo: '2 weeks ago',
    rating: 4,
    content:
      "The course content is very informative. I learned a lot of new things. However, I would have preferred more real-world examples.",
  },
  {
    id: 3,
    name: 'Emily T.',
    initials: 'ET',
    timeAgo: '1 month ago',
    rating: 5,
    content:
      "This course exceeded my expectations. The instructor has a great teaching style and really takes time to explain everything thoroughly.",
  },
];

const FeedbackList: React.FC = ({isFeedbackService,}) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback.id}>
            <div className="bg-white rounded-xl shadow-md p-6 border border-cyan-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                  {feedback.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{feedback.name}</p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    {'★'.repeat(feedback.rating)}
                    <span className="text-gray-500 ml-2">{feedback.timeAgo}</span>
                  </div>
                </div>
                <div className="ml-auto text-gray-400 hover:text-gray-600 cursor-pointer">⋮</div>
              </div>
              <div className="mt-4 text-gray-700 text-sm">
                <p>
                  {expanded[feedback.id]
                    ? feedback.content
                    : feedback.content.slice(0, 120) + (feedback.content.length > 120 ? '...' : '')}
                </p>
                {feedback.content.length > 120 && (
                  <button
                    className="mt-2 text-cyan-600 font-medium hover:underline"
                    onClick={() => toggleExpand(feedback.id)}
                  >
                    {expanded[feedback.id] ? 'Show less' : 'Show more'}
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackCarousel;
