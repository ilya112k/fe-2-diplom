import { createContext } from "react";

import {initialOrderState} from "./initial-order-state";

const OrderContext = createContext(initialOrderState);

export default OrderContext;