"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scrollarea";
import { Play, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  const [query, setQuery] = useState("SELECT * FROM users LIMIT 10;");
  const [output, setOutput] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runQuery = async () => {
    setIsRunning(true);

    await new Promise((res) => setTimeout(res, 800));

    setOutput([
      { id: 1, name: "Azi", role: "Developer" },
      { id: 2, name: "Eira", role: "AI Assistant" },
    ]);

    setIsRunning(false);
  };

  return (
    <div className="w-full p-6 bg-background flex justify-center">
      <Card className="w-full max-w-6xl rounded-2xl shadow-xl border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Database className="w-5 h-5" />
            SQL Editor
          </CardTitle>
          <Button onClick={runQuery} disabled={isRunning}>
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? "Running..." : "Run Query"}
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Editor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <label className="text-sm mb-2 font-medium">Query</label>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-64 p-4 font-mono text-sm bg-muted rounded-2xl border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <label className="text-sm mb-2 font-medium">Output</label>

            <ScrollArea className="h-64">
              {output.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Query results will appear here.
                </p>
              ) : (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      {Object.keys(output[0]).map((key) => (
                        <th
                          key={key}
                          className="text-left border-b pb-2 pr-4 font-semibold"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {output.map((row, idx) => (
                      <tr key={idx} className="border-b last:border-none">
                        {Object.values(row).map((val, i) => (
                          <td key={i} className="py-2 pr-4">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </ScrollArea>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
