import { useContext } from "react";
import AppDispatchContext from "../context/appContext/appDispatchContext";

export default function useGlobalDispatcher() {
  const dispatch = useContext(AppDispatchContext);

  if (!dispatch) {
    throw new Error("useGlobalDispatcher must be used within an AppProvider");
  }
  return dispatch;
}
