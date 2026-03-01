"use client";

import * as React from "react";

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = React.createContext<PopoverContextType | null>(null);

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  const context = React.useContext(PopoverContext);
  if (!context) return null;

  return <div onClick={() => context.setOpen(!context.open)}>{children}</div>;
}

export function PopoverContent({ children }: { children: React.ReactNode }) {
  const context = React.useContext(PopoverContext);
  if (!context || !context.open) return null;

  return (
    <div className="absolute right-0 mt-2 z-50 rounded-md border bg-background shadow-md p-4">
      {children}
    </div>
  );
}
