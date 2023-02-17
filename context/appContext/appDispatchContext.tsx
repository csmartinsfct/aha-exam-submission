import { createContext } from "react";
import { ThunkDispatch } from "react-hook-thunk-reducer";
import { Actions } from "../../types/reducer";
import IState from "../../types/state.interface";

export const AppDispatchContext = createContext<ThunkDispatch<
  IState,
  Actions
> | null>(null);

export default AppDispatchContext;
