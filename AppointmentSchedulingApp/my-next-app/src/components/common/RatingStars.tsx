
function RatingStars({ rating }: {rating:number }) {
  const fullStars = Math.floor(rating); 
  const halfStars = rating % 1 >= 0.5 ? 1 : 0; 
  const emptyStars = 5 - fullStars - halfStars; 

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push("★"); 
    }

    if (halfStars) {
      stars.push("☆"); 
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push("☆"); 
    }

    return stars;
  };

  return (
    <div className="flex flex-row text-yellow-500">
      <p>{rating}</p>
      <div>
        {renderStars().map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    </div>
  );
}

export default RatingStars;
