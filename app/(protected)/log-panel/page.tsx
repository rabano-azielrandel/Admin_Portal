"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { formatDate } from "@/lib/utils";

type LoginLog = {
  id: string;
  email: string;
  ip_address?: string;
  status: "success" | "failed";
  created_at: string;
};

export default function Page() {
  const PAGE_SIZE = 5;

  // 🔹 Hardcoded logs (15 entries for testing pagination)
  const logs: LoginLog[] = Array.from({ length: 15 }).map((_, i) => ({
    id: `${i + 1}`,
    email: `user${i + 1}@email.com`,
    ip_address: `192.168.1.${i + 10}`,
    status: i % 2 === 0 ? "success" : "failed",
    created_at: new Date(2026, 2, (i % 7) + 1, 9, i * 3).toISOString(),
  }));

  const [range, setRange] = useState<DateRange | undefined>();
  const [pageIndex, setPageIndex] = useState(0);

  // 🔹 Filter by date range
  const filteredLogs = useMemo(() => {
    if (!range?.from) return logs;

    return logs.filter((log) => {
      const logDate = new Date(log.created_at);

      // If range has an end date
      if (range.to) {
        return logDate >= range.from! && logDate <= range.to;
      }

      // If only start date is selected
      return (
        logDate.getFullYear() === range.from!.getFullYear() &&
        logDate.getMonth() === range.from!.getMonth() &&
        logDate.getDate() === range.from!.getDate()
      );
    });
  }, [logs, range]);

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredLogs.length / PAGE_SIZE);

  const paginatedLogs = filteredLogs.slice(
    pageIndex * PAGE_SIZE,
    pageIndex * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Login Logs</CardTitle>

          {/* 📅 Date Range Picker */}
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">
                {range?.from
                  ? range.to
                    ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                    : range.from.toLocaleDateString()
                  : "Filter by date range"}
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar
                mode="range"
                selected={range}
                onSelect={(value) => {
                  setRange(value);
                  setPageIndex(0); // reset pagination
                }}
              />

              <div className="pt-3 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setRange(undefined);
                    setPageIndex(0);
                  }}
                >
                  Clear
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </CardHeader>

        <CardContent className="space-y-3">
          {paginatedLogs.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No login activity found.
            </p>
          )}

          {paginatedLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between border rounded-lg p-3 hover:bg-muted/40 transition"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{log.email}</span>
                <span className="text-xs text-muted-foreground">
                  {log.ip_address || "Unknown IP"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(new Date(log.created_at))}
                </span>
              </div>

              <Badge
                variant={log.status === "success" ? "default" : "destructive"}
              >
                {log.status}
              </Badge>
            </div>
          ))}

          {/* ⬅️ ➡️ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={pageIndex === 0}
                onClick={() => setPageIndex((prev) => prev - 1)}
              >
                ← Previous
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {pageIndex + 1} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={pageIndex >= totalPages - 1}
                onClick={() => setPageIndex((prev) => prev + 1)}
              >
                Next →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
