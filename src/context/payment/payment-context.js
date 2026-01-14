import { createContext } from "react";

import {initialPaymentState} from "./initial-payment-state";

const PaymentContext = createContext(initialPaymentState);

export default PaymentContext;