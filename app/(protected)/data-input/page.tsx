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

type Field = {
  column_name: string;
  data_type: string;
};

export default function DynamicAdmin() {
  const [tables, setTables] = useState<string[]>([]);
  const [schemas, setSchemas] = useState<Record<string, Field[]>>({});
  const [selectedTable, setSelectedTable] = useState<string>("");

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [tablePreview, setTablePreview] = useState<Record<string, any[]>>({});

  /* =====================================================
     1️⃣ FETCH TABLE LIST (RUN ONCE)
  ====================================================== */
  useEffect(() => {
    async function fetchTables() {
      try {
        const res = await fetch("/api/table-list");
        const data: { tables: string[] } = await res.json();

        setTables(data.tables);

        if (data.tables.length > 0) {
          setSelectedTable(data.tables[0]);
        }
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    }

    fetchTables();
  }, []);

  /* =====================================================
     2️⃣ FETCH SCHEMA + PREVIEW WHEN TABLE CHANGES
  ====================================================== */
  useEffect(() => {
    if (!selectedTable) return;

    async function fetchTableMetadata() {
      try {
        /* -------- FETCH SCHEMA IF NOT CACHED -------- */
        if (!schemas[selectedTable]) {
          const schemaRes = await fetch(
            `/api/table-schema?table=${selectedTable}`,
          );
          const schemaData: Field[] = await schemaRes.json();

          console.log(schemaData);

          setSchemas((prev) => ({
            ...prev,
            [selectedTable]: schemaData,
          }));
        }

        /* -------- FETCH PREVIEW -------- */
        const previewRes = await fetch(
          `/api/table-preview?tableName=${selectedTable}`,
        );
        const previewData = await previewRes.json();

        setTablePreview((prev) => ({
          ...prev,
          [selectedTable]: previewData,
        }));
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      }
    }

    fetchTableMetadata();
  }, [selectedTable]);

  /* =====================================================
     FORM LOGIC
  ====================================================== */
  useEffect(() => {
    setFormData({});
  }, [selectedTable]);

  const updateField = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/insert-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: selectedTable,
          data: formData,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Insert failed");
      }

      /* update preview */
      setTablePreview((prev) => ({
        ...prev,
        [selectedTable]: [...(prev[selectedTable] || []), result.data],
      }));

      setFormData({});
    } catch (err) {
      console.error("Insert failed:", err);
    }
  };

  const fields = schemas[selectedTable] || [];

  /* =====================================================
     HELPER TYPE DETECTION
  ====================================================== */
  const getInputType = (data_type: string) => {
    const type = data_type.toLowerCase();

    if (
      ["smallint", "bigint", "numeric", "integer", "int4", "int8"].includes(
        type,
      )
    )
      return "number";

    if (
      ["timestamp", "timestamptz", "timestamp with time zone"].some((t) =>
        type.includes(t),
      )
    )
      return "datetime-local";

    return "text";
  };

  /* =====================================================
     UI
  ====================================================== */
  return (
    <div className="flex justify-center p-8 bg-background">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>Data Input</CardTitle>
          <CardDescription>
            Database-driven schema form generator
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* ================= TABLE SELECT ================= */}
          <FormItem className="max-w-sm">
            <FormLabel>Select Table</FormLabel>

            <Select value={selectedTable} onValueChange={setSelectedTable}>
              <SelectTrigger>
                <SelectValue placeholder="Select table" />
              </SelectTrigger>

              <SelectContent>
                {tables.map((table) => (
                  <SelectItem key={table} value={table}>
                    {table}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormDescription>
              Switch table to dynamically regenerate schema + form.
            </FormDescription>
          </FormItem>

          {/* ================= FLEX LAYOUT ================= */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* -------- FORM -------- */}
            <div className="flex-1">
              <form
                onSubmit={handleSubmit}
                className="space-y-6 border rounded-xl p-6"
              >
                {fields.map((field) => {
                  const inputType = getInputType(field.data_type);

                  return (
                    <FormItem key={field.column_name}>
                      <FormLabel>{field.column_name}</FormLabel>

                      {/* text array */}
                      {["ARRAY"].includes(field.data_type) && (
                        <Input
                          type="text"
                          placeholder="Enter values separated by commas"
                          value={formData[field.column_name]?.join(", ") ?? ""}
                          onChange={(e) =>
                            updateField(
                              field.column_name,
                              e.target.value
                                .split(",")
                                .map((item) => item.trim()) // remove extra spaces
                                .filter((item) => item.length > 0), // ignore empty strings
                            )
                          }
                        />
                      )}

                      {/* text */}
                      {["char", "varchar", "text", "citext"].includes(
                        field.data_type,
                      ) && (
                        <Input
                          type="text"
                          value={formData[field.column_name] ?? ""}
                          onChange={(e) =>
                            updateField(field.column_name, e.target.value)
                          }
                        />
                      )}

                      {/* numeric */}
                      {[
                        "smallint",
                        "integer",
                        "int",
                        "bigint",
                        "numeric",
                        "decimal",
                        "real",
                        "double precision",
                      ].includes(field.data_type) && (
                        <Input
                          type="number"
                          value={formData[field.column_name] ?? ""}
                          onChange={(e) =>
                            updateField(
                              field.column_name,
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value),
                            )
                          }
                        />
                      )}

                      {/* Boolean */}
                      {["boolean"].includes(field.data_type) && (
                        <div className="flex items-center mt-1">
                          <input
                            type="checkbox"
                            checked={!!formData[field.column_name]}
                            onChange={(e) =>
                              updateField(field.column_name, e.target.checked)
                            }
                            className="w-10 h-6 rounded-full appearance-none bg-gray-300 checked:bg-blue-500 relative cursor-pointer transition-all duration-200
                                        before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:shadow-md
                                        before:top-1 before:left-1 checked:before:translate-x-4 before:transition-all"
                          />
                        </div>
                      )}

                      {/* date */}
                      {[
                        "timestamp",
                        "timestamp without time zone",
                        "timestamp with time zone",
                        "timestamptz",
                        "date",
                        "time",
                      ].includes(field.data_type) && (
                        <Input
                          type="datetime-local" // or "date" if you only want date
                          value={formData[field.column_name] ?? ""}
                          onChange={(e) =>
                            updateField(field.column_name, e.target.value)
                          }
                        />
                      )}
                    </FormItem>
                  );
                })}

                <CardFooter className="px-0 pt-4 flex justify-end">
                  <Button type="submit">Insert into {selectedTable}</Button>
                </CardFooter>
              </form>
            </div>

            {/* -------- PREVIEW -------- */}
            <div className="flex-1">
              <div className="border rounded-xl p-6 h-full">
                <h4 className="font-semibold mb-4">{selectedTable} Preview</h4>

                <div className="overflow-auto max-h-[860px] text-xs bg-muted p-4 rounded-md">
                  <pre className="whitespace-pre-wrap break-words">
                    {JSON.stringify(tablePreview[selectedTable] || [], null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
