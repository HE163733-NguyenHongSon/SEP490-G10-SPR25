import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { assets } from "@/public/images/assets";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const BannerList = () => {
  return (
    <div className="w-screen h-[400px] ">
      <Carousel responsive={responsive}>
        {assets.banners && assets.banners.length > 0 ? (
          assets.banners.map((banner, index) => (
            <div
              key={index}
              className="bg-cover bg-no-repeat bg-center w-screen h-[400px]
              relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
              style={{
                backgroundImage: `url('${banner}')`,
              }}
            ></div>
          ))
        ) : (
          <p className="text-center text-black">No banners available</p>
        )}
      </Carousel>
    </div>
  );
};

export default BannerList;
