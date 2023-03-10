import { useCallback } from "react";
import { Actions } from "../types/reducer";
import IState from "../types/state.interface";

export default function logger(
  reducer: (state: IState, action: Actions) => IState
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const reducerWithLogger = useCallback(
    (state: IState, action: Actions) => {
      const next = reducer(state, action);
      console.log(
        "%cPrevious State:",
        "color: #9E9E9E; font-weight: 700;",
        state
      );
      console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
      console.log("%cNext State:", "color: #47B04B; font-weight: 700;", next);
      return next;
    },
    [reducer]
  );

  return reducerWithLogger;
}
