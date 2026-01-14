import React from "react";
import PropTypes from "prop-types";

function SeatsSchemeFourthClassComponent({ seats, onChange }) {
    const getStatus = (i) => {
        const seat = seats.find(item => item.index === i);
        return seat ? seat.available : false;
    };

    const handleSeatSelection = (item, way, wagonName, e) => {
        item.classList.toggle("selected");
        const coachId = [...way.querySelectorAll(".wagon-details__item")]
            .find(item => item.textContent === wagonName).id;

        onChange({
            way: e.target.closest(".seats__container").dataset.name,
            type: "fourth",
            coach_id: coachId,
            seatIndex: item.textContent,
            seatSide: "",
            selected: item.classList.contains("selected"),
        });
    };

    const handleSeat = (e) => {
        e.preventDefault();
        const way = [...e.target.ownerDocument.querySelectorAll(".seats__container")];
        const item = e.target.closest(".scheme__seats-item");
        const wagonName = e.target.closest(".seats__wagon-details").firstElementChild.querySelector(".wagon-number").textContent;
        const currentWayIndex = e.target.closest(".seats__container").dataset.name === "departure" ? 0 : 1;

        const inputValue = way[currentWayIndex].querySelector('input[name="adult"]').value;

        if (!inputValue || +inputValue === 0) {
            const inputLabel = way[currentWayIndex].querySelector('input[name="adult"]').parentElement;
            inputLabel.classList.add("error-outline");
            setTimeout(() => inputLabel.classList.remove("error-outline"), 1000);
        } else {
            handleSeatSelection(item, way[currentWayIndex], wagonName, e);
        }
    };

    return (
        <div className="scheme__seats-container scheme__seats-fourth-class">
            <ul className="scheme__seats-fourth-class_right-side">
                {[...Array(16)].map((_, i) => (
                    <div className="scheme__seats-row scheme__seats-row_fourth-class" key={i}>
                        <div className="scheme__seats-item-container">
                            <button
                                className="scheme__seats-item scheme__seats-item_fourth-class"
                                type="button"
                                disabled={!getStatus(i * 2 + 1)}
                                onClick={handleSeat}
                            >
                                {i * 2 + 1}
                            </button>
                        </div>
                        <div className="scheme__seats-item-container">
                            <button
                                className="scheme__seats-item scheme__seats-item_fourth-class"
                                type="button"
                                disabled={!getStatus(i * 2 + 2)}
                                onClick={handleSeat}
                            >
                                {i * 2 + 2}
                            </button>
                        </div>
                    </div>
                ))}
            </ul>

            <ul className="scheme__seats-fourth-class_left-side">
                {[...Array(16)].map((_, i) => (
                    <div className="scheme__seats-row scheme__seats-row_fourth-class" key={i}>
                        <div className="scheme__seats-item-container">
                            <button
                                className="scheme__seats-item scheme__seats-item_fourth-class"
                                type="button"
                                disabled={!getStatus(i * 2 + 33)}
                                onClick={handleSeat}
                            >
                                {i * 2 + 33}
                            </button>
                        </div>
                        <div className="scheme__seats-item-container">
                            <button
                                className="scheme__seats-item scheme__seats-item_fourth-class"
                                type="button"
                                disabled={!getStatus(i * 2 + 34)}
                                onClick={handleSeat}
                            >
                                {i * 2 + 34}
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

SeatsSchemeFourthClassComponent.propTypes = {
    seats: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SeatsSchemeFourthClassComponent;