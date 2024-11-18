"use client";
import { Button } from "@/components/ui/button";
import { AlignJustify, Grid2X2 } from "lucide-react";
import React, { useState } from "react";

const LayoutSwitch = () => {
  const [activeView, setActiveView] = useState<"list" | "card">("list");

  return (
    <div>
      <Button
        variant={activeView === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => setActiveView("list")}
      >
        <AlignJustify className="h-4 w-4" />
      </Button>
      <Button
        variant={activeView === "card" ? "default" : "outline"}
        size="icon"
        onClick={() => setActiveView("card")}
      >
        <Grid2X2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default LayoutSwitch;
