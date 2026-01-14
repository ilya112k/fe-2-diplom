import React, { useContext, useState, useEffect } from "react";

import AppContext from "../../../../context/app/app-context";
import LoadComponent from "../../../../components/load/load.component";
import ModalComponent from "../../../../components/modal/modal.component";
import useGetRoutesService from "../../../../services/use-get-routes.service";
import OrderFiltersComponent from "../order-filters/order-filters.component";
import OrderPaginationComponent from "../order-pagination/order-pagination.component";
import OrderLastTicketsComponent from "../order-last-tickets/order-last-tickets.component";
import OrderResultsControlComponent from "../order-results-control/order-results-control.component";

import "./order-container.component.css";

function OrderContainerComponent() {
    const { appState, setAppState } = useContext(AppContext);
    const { result, isLoading } = useGetRoutesService(appState);
    const [modal, setModal] = useState(false);
    const [loadApp, setLoadApp] = useState(false);
    const [newOffset, setNewOffset] = useState(null);

    const handleSort = (value) => {
        if (value === "price") {
            setModal(true);
        }
    };

    const handleModal = (value) => {
        if (value === "none") {
            setModal(value);
        } else {
            setModal(value);
        }
    };

    const handlePage = (value) => {
        setNewOffset(value);
        setLoadApp(true);
    };

    useEffect(() => {
        if (!loadApp || newOffset === null) return;

        setAppState(prevState => ({
            ...prevState,
            offset: newOffset,
        }));

        setLoadApp(false);
    }, [loadApp, newOffset, setAppState]);

    return (
        <div className="order-container">
            <div className="container">
                <div className="order-content">
                    <div className="order-sidebar">
                        <OrderFiltersComponent />
                        <OrderLastTicketsComponent />
                    </div>
                    <div className="order-results">
                        {isLoading ?
                            <LoadComponent /> :
                            <>
                                <OrderResultsControlComponent
                                    count={result?.total_count || 0}
                                    onChange={handleSort}
                                />
                                <div className="order-results__wrapper">
                                    <OrderPaginationComponent
                                        routes={result || []}
                                        onChange={handlePage}
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
            <ModalComponent
                status={result?.error ? "error" : "info"}
                display={modal}
                text={result?.error || ""}
                onChange={handleModal}
            />
        </div>
    );
}

export default OrderContainerComponent;