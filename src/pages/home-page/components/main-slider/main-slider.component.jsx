import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {feedbacks} from "../../../../data/feedbacks";
import FeedbackComponent from "../../../../components/feedback/feedback.component";

import "swiper/css";
import "swiper/css/pagination";
import "./main-slider.component.css";

function MainSliderComponent() {
    return (
        <Swiper
            slidesPerView={2}
            spaceBetween={90}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="swiper"
        >
            {feedbacks && feedbacks.map((item) => (
                <SwiperSlide key={item.id}>
                    <FeedbackComponent {...item} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default MainSliderComponent;