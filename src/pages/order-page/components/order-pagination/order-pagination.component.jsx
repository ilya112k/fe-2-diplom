import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import AppContext from "../../../../context/app/app-context";
import ReactPaginate from "react-paginate";
import OrderTrainComponent from "../order-train/order-train.component";

import "./order-pagination.component.css";

function Items({ currentItems, data }) {
    return (
        <>
            {data && data.items && data.items.length > 0 ? (
                data.items.map((item, i) => <OrderTrainComponent key={i} item={item} />)
            ) : (
                <p>Результаты не найдены</p>
            )}
        </>
    );
}

function PaginatedItems({ itemsPerPage, routes, onChange }) {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const count = routes?.total_count || 0;
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(routes?.items?.slice(itemOffset, endOffset) || []);
        setPageCount(Math.ceil(count / itemsPerPage));
    }, [itemOffset, itemsPerPage, routes]);

    const handlePageClick = (e) => {
        const newOffset = e.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} data={routes} />
            {routes && routes.items && (
                <ReactPaginate
                    className="pagination-wrapper"
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            )}
        </>
    );
}

function OrderPaginationComponent({ routes, onChange }) {
    const { appState } = useContext(AppContext);
    const itemsPerPage = appState.limit ? Number(appState.limit) : 5;

    return (
        <div className="order-pagination">
            <PaginatedItems itemsPerPage={itemsPerPage} routes={routes} onChange={onChange} />
        </div>
    );
}

// Prop types validation
Items.propTypes = {
    currentItems: PropTypes.array,
    data: PropTypes.object.isRequired,
};

PaginatedItems.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    routes: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

OrderPaginationComponent.propTypes = {
    routes: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

export default OrderPaginationComponent;