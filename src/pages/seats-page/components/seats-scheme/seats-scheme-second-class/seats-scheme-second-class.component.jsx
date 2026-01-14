import React from "react";
import PropTypes from "prop-types";

function SeatsSchemeSecondClassComponent({ seats, onChange }) {
    const getStatus = (i) => {
        const seat = seats.find(item => item.index === i);
        return seat ? seat.available : false;
    };

    const handleSeatSelection = (way, inputValue, item, wagonName, e) => {
        item.classList.toggle("selected");
        const coachId = [...way.querySelectorAll(".wagon-details__item")]
            .find(item => item.textContent === wagonName).id;

        onChange({
            way: e.target.closest(".seats__container").dataset.name,
            type: "second",
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
            handleSeatSelection(way[currentWayIndex], inputValue, item, wagonName, e);
        }
    };

    return (
        <div className="scheme__seats-container scheme__seats-second-class">
            <ul className="scheme__seats-list scheme__seats-second-class scheme__seats-right-side">
                {[...Array(8)].map((_, i) =>
                    <li className="scheme__seats-placement" key={i}>
                        <div className="scheme__seats-row scheme__seats-row_second-class">
                            {[1, 2].map(offset => (
                                <div className="scheme__seats-item-container" key={offset}>
                                    <button
                                        className="scheme__seats-item scheme__seats-item_second-class"
                                        type="button"
                                        disabled={!getStatus(i * 4 + offset)}
                                        onClick={handleSeat}
                                    >
                                        {i * 4 + offset}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="scheme__seats-row scheme__seats-row_second-class">
                            {[3, 4].map(offset => (
                                <div className="scheme__seats-item-container" key={offset}>
                                    <button
                                        className="scheme__seats-item scheme__seats-item_second-class"
                                        type="button"
                                        disabled={!getStatus(i * 4 + offset)}
                                        onClick={handleSeat}
                                    >
                                        {i * 4 + offset}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </li>
                )}
            </ul>

            <ul className="scheme__seats-list scheme__seats-second-class scheme__seats-left-side">
                {[...Array(8)].map((_, i) => (
                    <div className="scheme__seats-row_left-train-side scheme__seats-row_empty" key={i}></div>
                ))}
            </ul>
        </div>
    );
}

SeatsSchemeSecondClassComponent.propTypes = {
    seats: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SeatsSchemeSecondClassComponent;