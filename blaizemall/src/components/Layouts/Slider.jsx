import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import image1 from "../../imagesandicons/setup.jpg";
import image2 from "../../imagesandicons/setup2.jpg";
import image3 from "../../imagesandicons/shoes.jpg";
import image4 from "../../imagesandicons/utensils.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = () => {
  return (
    <div className="swiper-component">
      <Swiper
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          {" "}
          <img src={image1} alt="shoes for teens" className="img-fluid" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={image2} alt="shoes for teens" className="img-fluid" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={image3} alt="shoes for teens" className="img-fluid" />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img src={image4} alt="shoes for teens" className="img-fluid" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
