"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* =========================
   Form Field Wrapper
========================= */

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
FormItem.displayName = "FormItem";

/* =========================
   Label
========================= */

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
FormLabel.displayName = "FormLabel";

/* =========================
   Description
========================= */

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
));
FormDescription.displayName = "FormDescription";

/* =========================
   Error Message
========================= */

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-destructive", className)}
    {...props}
  />
));
FormMessage.displayName = "FormMessage";

export { FormItem, FormLabel, FormDescription, FormMessage };
