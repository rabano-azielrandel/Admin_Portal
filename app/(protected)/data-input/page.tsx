"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormDescription } from "@/components/ui/form";

/* =========================
   MOCK DATABASE
========================= */

const mockDB = {
  Projects: [
    { slug: "portfolio-v1", name: "Portfolio V1" },
    { slug: "admin-dashboard", name: "Admin Dashboard" },
  ],
  ProjectCard: [],
};

/* =========================
   TABLE SCHEMA MAP
========================= */

const tableSchemas = {
  Projects: [
    { name: "slug", label: "Slug", type: "text" },
    { name: "name", label: "Name", type: "text" },
  ],
  ProjectCard: [
    { name: "project_slug", label: "Project", type: "foreign_project" },
    { name: "row_index", label: "Row Index", type: "number" },
    { name: "col_index", label: "Column Index", type: "number" },
    { name: "span", label: "Span", type: "number" },
    { name: "variant", label: "Variant", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "class_name", label: "Class Name", type: "text" },
  ],
};

export default function DynamicAdmin() {
  const [selectedTable, setSelectedTable] =
    useState<keyof typeof tableSchemas>("Projects");

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [database, setDatabase] = useState(mockDB);

  useEffect(() => {
    setFormData({});
  }, [selectedTable]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setDatabase((prev) => ({
      ...prev,
      [selectedTable]: [...prev[selectedTable], formData],
    }));

    setFormData({});
  };

  const fields = tableSchemas[selectedTable];

  return (
    <div className="min-h-screen bg-background p-8 flex justify-center">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-2xl">Dynamic Admin Panel</CardTitle>
          <CardDescription>Table-driven mock CMS interface</CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* TABLE PICKER */}
          <FormItem className="max-w-sm">
            <FormLabel>Select Table</FormLabel>
            <Select
              value={selectedTable}
              onValueChange={(value) =>
                setSelectedTable(value as keyof typeof tableSchemas)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(tableSchemas).map((table) => (
                  <SelectItem key={table} value={table}>
                    {table}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Changing the table will regenerate the form.
            </FormDescription>
          </FormItem>

          {/* FLEX ADMIN LAYOUT */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT SIDE — FORM */}
            <div className="flex-1">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 border rounded-xl p-6"
              >
                {fields.map((field) => (
                  <FormItem key={field.name}>
                    <FormLabel>{field.label}</FormLabel>

                    {field.type === "text" && (
                      <Input
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.name]: e.target.value,
                          })
                        }
                      />
                    )}

                    {field.type === "number" && (
                      <Input
                        type="number"
                        value={formData[field.name] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.name]: Number(e.target.value),
                          })
                        }
                      />
                    )}

                    {field.type === "foreign_project" && (
                      <Select
                        value={formData[field.name] || ""}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            [field.name]: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Project" />
                        </SelectTrigger>
                        <SelectContent>
                          {database.Projects.map((project) => (
                            <SelectItem key={project.slug} value={project.slug}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </FormItem>
                ))}

                <CardFooter className="px-0 pt-4 flex justify-end">
                  <Button type="submit">Insert into {selectedTable}</Button>
                </CardFooter>
              </form>
            </div>

            {/* RIGHT SIDE — DATA VIEWER */}
            <div className="flex-1">
              <div className="border rounded-xl p-6 h-full">
                <h4 className="font-semibold mb-4">
                  {selectedTable} Table Preview
                </h4>

                <div className="overflow-auto max-h-[400px] text-xs bg-muted p-4 rounded-md">
                  <pre>{JSON.stringify(database[selectedTable], null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
