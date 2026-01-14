import { createContext } from "react";

import {initialAppState} from "./initial-app-state";

const AppContext = createContext(initialAppState);

export default AppContext;