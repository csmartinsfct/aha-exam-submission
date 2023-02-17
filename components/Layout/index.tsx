"use client";

import React, { ReactNode } from "react";
import AppProvider from "../../context/appContext/appProvider";
import InputRangeProvider from "../../context/inputRangeContext/inputRangeProvider";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  /* shift layout to the right due to fixed sidebar */
  return (
    <main className="relative h-full xm:pl-[var(--sidebar-width-desktop)] xm:pb-4">
      <AppProvider>
        <InputRangeProvider>{children}</InputRangeProvider>
      </AppProvider>
    </main>
  );
}
