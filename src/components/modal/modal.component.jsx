import React from "react";
import PropTypes from "prop-types";

import "./modal.component.css";

function ModalComponent({ status, display, onChange, text }) {
    const bgStyle = status === "error" ? { backgroundColor: "#ff3d0061" } : { backgroundColor: "#fff5005c" };

    const handleClose = () => {
        onChange(false);
    };

    return (
        <div className="modal__wrapper" style={{ display: display ? 'flex' : 'none' }}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className={`modal__header modal__header-${status}`} style={bgStyle}></div>
                <div className="modal__content">
                    <p className="modal__title">{status === "error" ? "Сообщение об ошибке" : "Информационное сообщение"}</p>
                    <p className="modal__text">{text}</p>
                </div>
                <div className="modal__footer">
                    <button className="modal__btn" type="button" onClick={handleClose}>Понятно</button>
                </div>
            </div>
        </div>
    );
}

ModalComponent.propTypes = {
    status: PropTypes.string.isRequired,
    display: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
};

export default ModalComponent;