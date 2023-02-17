import { createContext } from "react";
import IState from "../../types/state.interface";
import initialState from "./initialState";

const AppContext = createContext<IState>(initialState);

export default AppContext;
