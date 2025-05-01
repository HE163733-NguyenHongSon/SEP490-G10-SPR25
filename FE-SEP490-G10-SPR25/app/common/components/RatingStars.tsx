import React from 'react';

interface RatingStarsProps {
  rating: number;
  max?: number;
}

export default function RatingStars({ rating, max = 5 }: RatingStarsProps) {
  // Ensure rating is between 0 and max
  const normalizedRating = Math.min(Math.max(0, rating), max);
  
  // Create array of stars
  const stars = [];
  
  for (let i = 1; i <= max; i++) {
    if (i <= normalizedRating) {
      // Full star
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    } else if (i - 0.5 <= normalizedRating) {
      // Half star (we can approximate with a character or use an icon library)
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    } else {
      // Empty star
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }
  }
  
  return <div className="flex">{stars}</div>;
}
