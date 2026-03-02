"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/* =========================
   Types
========================= */

type Theme = "light" | "dark" | "system";

type SettingsState = {
  siteTitle: string;
  defaultTheme: Theme;
  enableAnimations: boolean;
  gridColumns: number;
};

/* =========================
   Component
========================= */

export default function Page() {
  const [settings, setSettings] = useState<SettingsState>({
    siteTitle: "My Portfolio",
    defaultTheme: "dark",
    enableAnimations: true,
    gridColumns: 4,
  });

  const handleChange = (
    field: keyof SettingsState,
    value: string | number | boolean,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved settings:", settings);

    // TODO:
    // Connect to Supabase
    // await supabase.from("Settings").upsert(settings)
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Settings</CardTitle>
        <CardDescription>
          Configure global application preferences
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* =========================
            General
        ========================= */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">General</h3>

          <div className="grid gap-2">
            <Label>Site Title</Label>
            <Input
              value={settings.siteTitle}
              onChange={(e) => handleChange("siteTitle", e.target.value)}
            />
          </div>
        </div>

        {/* =========================
            Appearance
        ========================= */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Appearance</h3>

          <div className="grid gap-2">
            <Label>Default Theme</Label>
            <Select
              value={settings.defaultTheme}
              onValueChange={(value) =>
                handleChange("defaultTheme", value as Theme)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <Label>Enable Animations</Label>
              <p className="text-sm text-muted-foreground">
                Toggle UI motion effects
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleChange("enableAnimations", !settings.enableAnimations)
              }
              className={`w-12 h-6 rounded-full relative transition ${
                settings.enableAnimations ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition ${
                  settings.enableAnimations ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* =========================
            Layout
        ========================= */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Layout</h3>

          <div className="grid gap-2">
            <Label>Grid Columns</Label>
            <Input
              type="number"
              value={settings.gridColumns}
              onChange={(e) =>
                handleChange("gridColumns", Number(e.target.value))
              }
              min={1}
              max={12}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
