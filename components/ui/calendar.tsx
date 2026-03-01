"use client";

import * as React from "react";
import {
  DayPicker,
  DateRange,
  SelectRangeEventHandler,
} from "react-day-picker";
import "react-day-picker/dist/style.css";

type CalendarProps =
  | {
      mode: "single";
      selected?: Date;
      onSelect?: (date: Date | undefined) => void;
    }
  | {
      mode: "multiple";
      selected?: Date[];
      onSelect?: (dates: Date[] | undefined) => void;
    }
  | {
      mode: "range";
      selected?: DateRange | undefined;
      onSelect?: SelectRangeEventHandler;
    };

export function Calendar(props: CalendarProps) {
  return (
    <DayPicker
      {...props}
      className="p-3"
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-muted first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-muted",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
      }}
    />
  );
}
