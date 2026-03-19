import React, { useState } from "react";
import { TOOTH_SHAPES } from "./ToothShapes";
import { AdultTeeth } from "./AdultTeeth";
import { ChildTeeth } from "./ChildTeeth";
import { Switch } from "./components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import {
  Dialog,
  DialogContent
} from "./components/ui/dialog";

function DentalChart({
  onSelectTooth,
  status,
  hoveredTooth,
  setHoveredTooth,
  setCondition
}) {

  const [openDialog, setOpenDialog] = useState(false);
  const [activeTooth, setActiveTooth] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [mode, setMode] = useState("adult");

  const teeth = mode === "adult" ? AdultTeeth : ChildTeeth;

  const getToothColor = (tooth) => {
    const cond = status?.[tooth];

    if (cond === "caries") return "yellow";
    if (cond === "infection") return "red";
    if (cond === "extracted") return "gray";
    if (cond === "filling") return "skyblue";

    return "#d3bebe";
  };

  const upperChildTeeth = "ABCDEFGHIJ".split("");

  return (
    <div>

      
      {/* 🔥 SWITCH (replaces dropdown) */}
      <div className="mb-4 flex items-center gap-3 bg-gray-100 p-3 rounded">

        <span className={mode === "adult" ? "font-semibold" : "text-gray-500"}>
          Adult
        </span>

        <Switch
          checked={mode === "child"}
          onCheckedChange={(checked) =>
            setMode(checked ? "child" : "adult")
          }
        />

        <span className={mode === "child" ? "font-semibold" : "text-gray-500"}>
          Child
        </span>

      </div>


      <svg width="880" height="360">

        {/* ADULT */}
        {mode === "adult" && (
          <>
            <line x1="450" y1="0" x2="450" y2="250" stroke="#444" />
            <line x1="20" y1="130" x2="870" y2="130" stroke="#444" />
            <text x="20" y="120">Right</text>
            <text x="845" y="120">Left</text>
          </>
        )}

        {/* CHILD */}
        {mode === "child" && (
          <>
            <line x1="380" y1="0" x2="380" y2="250" stroke="#444" />
            <line x1="120" y1="130" x2="630" y2="130" stroke="#444" />
            <text x="120" y="120">Right</text>
            <text x="610" y="120">Left</text>
          </>
        )}

        {teeth.map((tooth) => {

          const isHovered = hoveredTooth === tooth.id;

          const isUpper =
            (mode === "adult" && tooth.id >= 1 && tooth.id <= 16) ||
            (mode === "child" && upperChildTeeth.includes(tooth.id));

          let fillColor = getToothColor(tooth.id);
          if (isHovered) fillColor = "#cce6ff";

          return (
            <g
              key={tooth.id}
              transform={`translate(${tooth.x},${tooth.y}) ${
                isUpper ? "scale(1,-1) translate(0,-40)" : ""
              }`}
              onClick={() => {
                setActiveTooth(tooth.id);
                setSelectedCondition(status?.[tooth.id] || "");
                setOpenDialog(true);
              }}
              onMouseEnter={() => setHoveredTooth(tooth.id)}
              onMouseLeave={() => setHoveredTooth(null)}
              style={{ cursor: "pointer" }}
            >

              <path d={TOOTH_SHAPES[tooth.type]} fill={fillColor} stroke="#333" />

              <text
                x="33"
                y="20"
                textAnchor="middle"
                fontSize="10"
                transform={isUpper ? "scale(1,-1) translate(0,-30)" : ""}
              >
                {tooth.id}
              </text>

            </g>
          );
        })}

      </svg>

      {/* DIALOG */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>

          <h2 className="mb-4 font-semibold">
            Tooth {activeTooth}
          </h2>

          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="">Select Condition</option>
            <option value="caries">Caries</option>
            <option value="infection">Infection</option>
            <option value="filling">Filling</option>
            <option value="extracted">Extracted</option>
          </select>

          <button
            onClick={() => {
              onSelectTooth(activeTooth);
              setCondition(selectedCondition);
              setOpenDialog(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Continue
          </button>

        </DialogContent>
      </Dialog>

    </div>
  );
}

export default DentalChart;