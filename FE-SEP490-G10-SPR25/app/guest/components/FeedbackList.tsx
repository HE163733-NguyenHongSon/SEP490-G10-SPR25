"use client";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RatingStars from "@/common/components/RatingStars";
import Image from "next/image";
interface FeedbackItem {
  id: number;
  name: string;
  image: string;
  targetName: string;
  timeAgo: string;
  rating: number;
  content: string;
}

interface FeedbackListProps {
  feedbacks: FeedbackItem[];
  displayView?: string;
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  displayView = "slider",
}) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const responsive = {
    ultraWide: { breakpoint: { max: 4000, min: 1920 }, items: 1 },
    superLargeDesktop: { breakpoint: { max: 1920, min: 1536 }, items: 2 },
    desktop: { breakpoint: { max: 1536, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderCard = (feedback: FeedbackItem) => (
    <div
      key={feedback.id}
      className={`bg-white rounded-xl shadow-md p-6 border border-cyan-100 ${
        displayView === "row" ? "w-full" : "mx-2"
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-[50px] h-[50px] overflow-hidden rounded-lg">
          <Image
            className="object-cover w-full h-full"
            src={`${imgUrl}/${feedback.image}`}
            alt="avatar patient"
            width={50}
            height={50}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">{feedback.name}</p>
              <div className="flex items-center text-yellow-500 text-sm">
                <RatingStars rating={feedback.rating} />
                <span className="text-gray-500 ml-2">{feedback.timeAgo}</span>
              </div>
            </div>
            <div className="text-gray-400 hover:text-gray-600 cursor-pointer">
              ⋮
            </div>
          </div>
          <div className="mt-3 text-gray-700 text-sm">
            <p>
              {expanded[feedback.id]
                ? feedback.content
                : feedback.content.slice(0, 120) +
                  (feedback.content.length > 120 ? "..." : "")}
            </p>
            {feedback.content.length > 120 && (
              <button
                className="mt-2 text-cyan-600 font-medium hover:underline"
                onClick={() => toggleExpand(feedback.id)}
              >
                {expanded[feedback.id] ? "Show less" : "Show more"}
              </button>
            )}
            <p className="font-light text-gray-500 mt-2">
              Nhận xét về &quot;{feedback.targetName}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full px-10 py-6">
      {displayView === "slider" ? (
        <Carousel
          responsive={responsive}
          infinite
          autoPlaySpeed={3000}
          containerClass="carousel-container"
          itemClass="px-4"
        >
          {feedbacks.map(renderCard)}
        </Carousel>
      ) : displayView === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {feedbacks.map(renderCard)}
        </div>
      ) : (
        <div className="flex flex-col gap-4">{feedbacks.map(renderCard)}</div>
      )}
    </div>
  );
};

export default FeedbackList;
