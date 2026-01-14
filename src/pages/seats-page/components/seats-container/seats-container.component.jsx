import React, { useContext, useState, useEffect } from "react";

import AppContext from "../../../../context/app/app-context";
import useGetSeatsService from "../../../../services/use-get-seats.service";
import SeatsTrainComponent from "../seats-train/seats-train.component";
import SeatsExchangeComponent from "../seats-exchange/seats-exchange.component";
import SeatsTotalCostComponent from "../seats-total-cost/seats-total-cost.component";
import SeatsWagonTypesComponent from "../seats-wagon-types/seats-wagon-types.component";
import SeatsWagonHeaderComponent from "../seats-wagon-header/seats-wagon-header.component";
import SeatsTicketAmountComponent from "../seats-ticket-amount/seats-ticket-amount.component";
import SeatsWagonDetailsComponent from "../seats-wagon-details/seats-wagon-details.component";

import "./seats-container.component.css";

function getClassType(name) {
    const obj = {
        'Люкс': 'first',
        'second': 'Купе',
        "third": 'Плацкарт',
        "fourth": "Сидячий"
    }

   return obj[name];
}
function SeatsContainerComponent() {
    const { appState } = useContext(AppContext);
    const { resultDeparture } = useGetSeatsService(appState, "departure");
    const { resultArrival } = useGetSeatsService(appState, "arrival");
    const [targetClass, setTargetClass] = useState({});
    const [depClass, setDepClass] = useState();
    const [arrClass, setArrClass] = useState();

    const handleWagonClass = (value) => {
        setDepClass(value.departureClass || depClass);
        setArrClass(value.arrivalClass || arrClass);
    };

    debugger;

    useEffect(() => {
        setTargetClass({ depClass: getClassType(depClass), arrClass: getClassType(arrClass) });
    }, [depClass, arrClass]);

    const renderSeatsContainer = (identity, result, classType) => (
        <div className="seats__container" id={appState[`${identity}_id`]} data-name={identity}>
            <SeatsExchangeComponent data={identity === "arrival"} />
            <SeatsTrainComponent data={identity} />
            {result.length ? (
                <>
                    <SeatsTicketAmountComponent />
                    <SeatsWagonTypesComponent
                        data={Array.isArray(result) ? result : Array.from(result)}
                        identity={identity}
                        onChange={handleWagonClass}
                    />
                    {classType && (
                        <>
                            <SeatsWagonHeaderComponent
                                identity={identity}
                                wagonClass={targetClass}
                                data={result}
                            />
                            <SeatsWagonDetailsComponent data={result} identity={identity} />
                            <SeatsTotalCostComponent identity={identity} />
                        </>
                    )}
                </>
            ) : (
                <p className="seats__container-error-string">Мест по вашему запросу не обнаружено</p>
            )}
        </div>
    );

    return (
        <>
            {appState?.departure_id && renderSeatsContainer("departure", resultDeparture.result, depClass)}
            {appState?.arrival_id && renderSeatsContainer("arrival", resultArrival.result, arrClass)}
        </>
    );
}

export default SeatsContainerComponent;