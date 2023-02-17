import { ReactNode } from "react";
import useThunkReducer from "react-hook-thunk-reducer";
import logger from "../../utils/reduxLogger";
import AppContext from "./appContext";
import AppDispatchContext from "./appDispatchContext";
import initialState from "./initialState";
import reducer from "./reducer";

export default function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useThunkReducer(logger(reducer), initialState);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}
