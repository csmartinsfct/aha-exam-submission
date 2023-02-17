import { ReactNode, useMemo, useState } from "react";
import InputRangeContext from "./inputRangeContext";

/* This keeps track of the last calculated slider width so that it only animates on mount once per session and not on every mount */

export default function InputRangeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [width, setWidth] = useState(1);

  const value = useMemo(() => ({ width, setWidth }), [width]);

  return (
    <InputRangeContext.Provider value={value}>
      {children}
    </InputRangeContext.Provider>
  );
}
