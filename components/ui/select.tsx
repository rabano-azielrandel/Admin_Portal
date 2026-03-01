"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SelectContextType = {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SelectContext = React.createContext<SelectContextType | null>(null);

function useSelect() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used inside <Select />");
  }
  return context;
}

/* =========================
   Root
========================= */

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
};

/* =========================
   Trigger
========================= */

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = useSelect();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        className,
      )}
      {...props}
    >
      {children}
      <span
        className={cn(
          "ml-2 transition-transform duration-200",
          open && "rotate-180",
        )}
      >
        ▼
      </span>
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

/* =========================
   Value
========================= */

const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const { value } = useSelect();

  return (
    <span className="truncate">
      {value ?? (
        <span className="text-muted-foreground">
          {placeholder ?? "Select option"}
        </span>
      )}
    </span>
  );
};

/* =========================
   Content
========================= */

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = useSelect();

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        className,
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
});
SelectContent.displayName = "SelectContent";

/* =========================
   Item
========================= */

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { onValueChange, setOpen } = useSelect();

    return (
      <div
        ref={ref}
        onClick={() => {
          onValueChange?.(value);
          setOpen(false);
        }}
        className={cn(
          "cursor-pointer rounded-sm px-3 py-2 text-sm",
          "hover:bg-accent hover:text-accent-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
SelectItem.displayName = "SelectItem";

/* =========================
   Export
========================= */

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
