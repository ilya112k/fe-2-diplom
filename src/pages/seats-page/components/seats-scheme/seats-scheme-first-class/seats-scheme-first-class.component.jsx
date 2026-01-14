import React from "react";
import PropTypes from "prop-types";

function SeatsSchemeFirstClassComponent({ seats, onChange }) {
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
            type: "first",
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
            inputLabel.style.outline = "10px solid #ff3d0061";
            setTimeout(() => inputLabel.style.outline = "none", 1000);
        } else {
            handleSeatSelection(item, way[currentWayIndex], wagonName, e);
        }
    };

    return (
        <div className="scheme__seats-container scheme__seats-first-class">
            <ul className="scheme__seats-list scheme__seats-first-class scheme__seats-right-side">
                {[...Array(8)].map((_, i) => (
                    <li className="scheme__seats-placement" key={i}>
                        <div className="scheme__seats-row scheme__seats-row_first-class">
                            <div className="scheme__seats-item-container">
                                <button
                                    className="scheme__seats-item scheme__seats-item_first-class"
                                    type="button"
                                    disabled={!getStatus(i * 2 + 1)}
                                    onClick={handleSeat}
                                >
                                    {i * 2 + 1}
                                </button>
                            </div>
                        </div>
                        <div className="scheme__seats-row scheme__seats-row_first-class">
                            <div className="scheme__seats-item-container">
                                <button
                                    className="scheme__seats-item scheme__seats-item_first-class"
                                    type="button"
                                    disabled={!getStatus(i * 2 + 2)}
                                    onClick={handleSeat}
                                >
                                    {i * 2 + 2}
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <ul className="scheme__seats-list scheme__seats-first-class scheme__seats-left-side">
                {[...Array(8)].map((_, i) => (
                    <div className="scheme__seats-row_left-train-side scheme__seats-row_empty" key={i}></div>
                ))}
            </ul>
        </div>
    );
}

SeatsSchemeFirstClassComponent.propTypes = {
    seats: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SeatsSchemeFirstClassComponent;