import React from "react";

import MainSliderComponent from "../main-slider/main-slider.component";

import "./main-feedback.component.css";

function MainFeedbackComponent() {
    return (
        <div className="main-feedback feedback" id="feedback">
            <div className="container">
                <div className="feedback__wrapper">
                    <p className="feedback__title">Отзывы</p>
                    <div className="feedback__swiper-container">
                        <MainSliderComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainFeedbackComponent;