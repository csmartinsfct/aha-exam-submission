import { useContext } from "react";
import InputRangeContext from "../context/inputRangeContext/inputRangeContext";

export default function useInputRangeContext() {
  const state = useContext(InputRangeContext);

  if (!state) {
    throw new Error(
      "useInputRangeContext must be used within an InputRangeProvider"
    );
  }
  return state;
}
