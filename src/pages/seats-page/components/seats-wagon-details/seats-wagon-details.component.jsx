import React, { useContext } from "react";
import PropTypes from "prop-types";

import TravelContext from "../../../../context/travel/travel-context";
import SeatsSchemeComponent from "../seats-scheme/seats-scheme.component";
import SeatsWagonDetailsBodyComponent from "./seats-wagon-details-body/seats-wagon-details-body.component";

import "./seats-wagon-details.component.css";

function SeatsWagonDetailsComponent({ data, identity }) {
    const { routeState } = useContext(TravelContext);

    const renderWagonDetails = (item, index, type) => (
        <div
            className="seats__wagon-details wagon-details"
            id={`wagon-details-${type}_${index}`}
            key={`${type}_${index}`}
        >
            <SeatsWagonDetailsBodyComponent
                data={item}
                wagonType={type === "departure" ? routeState.departureClass : routeState.arrivalClass}
            />
            <SeatsSchemeComponent data={item} />
        </div>
    );

    return (
        <>
            {data && data.map((item, i) => renderWagonDetails(item, i, identity))}
        </>
    );
}

SeatsWagonDetailsComponent.propTypes = {
    data: PropTypes.array.isRequired,
    identity: PropTypes.string.isRequired,
};

export default SeatsWagonDetailsComponent;