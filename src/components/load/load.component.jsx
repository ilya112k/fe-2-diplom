import React from "react";

import LineImage from "../../assets//line.png";
import TrainImage from "../../assets/train.png";

import "./load.component.css";

function LoadComponent() {
    return (
        <div className="load__wrapper">
            <div className="load__container">
                <p>идет поиск</p>
                <div className="load__image">
                    <img className="load__image-train" src={TrainImage} alt="Train" />
                    <img className="load__image-line" src={LineImage} alt="Line" />
                </div>
            </div>
        </div>
    );
}

export default LoadComponent;