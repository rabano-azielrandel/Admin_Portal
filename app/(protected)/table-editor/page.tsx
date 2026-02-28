"use client";

import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [rowIndex, setRowIndex] = useState("");
  const [colIndex, setColIndex] = useState("");
  const [span, setSpan] = useState("");
  const [variant, setVariant] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [className, setClassName] = useState("");

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      rowIndex: Number(rowIndex),
      colIndex: Number(colIndex),
      span: Number(span),
      variant,
      title,
      desc,
      className,
    };

    console.log("Submitted Project:", payload);

    // TODO: connect to your backend / Supabase / API route

    // Reset form
    setRowIndex("");
    setColIndex("");
    setSpan("");
    setVariant("");
    setTitle("");
    setDesc("");
    setClassName("");
  };

  return (
    <div className="flex justify-center items-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Project Table</CardTitle>
          <CardDescription>Fill up to add a new project</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpload} className="space-y-6">
            {/* Grid Placement Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="rowIndex">Row Index</Label>
                <Input
                  id="rowIndex"
                  type="number"
                  placeholder="1"
                  required
                  value={rowIndex}
                  onChange={(e) => setRowIndex(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="colIndex">Column Index</Label>
                <Input
                  id="colIndex"
                  type="number"
                  placeholder="1"
                  required
                  value={colIndex}
                  onChange={(e) => setColIndex(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="span">Span</Label>
                <Input
                  id="span"
                  type="number"
                  placeholder="1"
                  value={span}
                  onChange={(e) => setSpan(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="variant">Variant</Label>
                <Input
                  id="variant"
                  placeholder="split | ripple | fan | dice"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="desc">Description</Label>
                <Input
                  id="desc"
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="className">Custom Class</Label>
                <Input
                  id="className"
                  placeholder="optional tailwind classes"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div>
            </div>

            <CardFooter className="px-0 pt-4 flex justify-end">
              <Button type="submit">Add Project</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
