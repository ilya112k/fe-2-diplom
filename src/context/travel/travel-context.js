import { createContext } from "react";

import {initialTravelState} from "./initial-travel-state";

const TravelContext = createContext(initialTravelState);

export default TravelContext;