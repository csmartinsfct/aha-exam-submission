import { useContext } from "react";
import AppContext from "../context/appContext/appContext";

export default function useGlobalState() {
  const state = useContext(AppContext);

  if (!state) {
    throw new Error("useGlobalState must be used within an AppProvider");
  }
  return state;
}
