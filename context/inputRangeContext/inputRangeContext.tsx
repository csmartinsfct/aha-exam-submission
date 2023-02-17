import { createContext, Dispatch, SetStateAction } from "react";

const InputRangeContext = createContext<{
  width: number;
  setWidth: Dispatch<SetStateAction<number>>;
} | null>(null);

export default InputRangeContext;
