import React, { useState } from "react";
import { TOOTH_SHAPES } from "./ToothShapes";
import { AdultTeeth } from "./AdultTeeth";
import { ChildTeeth } from "./ChildTeeth";

function DentalChart({
  onSelectTooth,
  status,
  selectedTooth,
  hoveredTooth,
  setHoveredTooth
}) {

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

      {/* 🔄 Toggle */}
      <div style={{ marginBottom: "10px" }}>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="adult">Adult</option>
          <option value="child">Child</option>
        </select>
      </div>

      <svg width="880" height="360">

        {/* ✅ ADULT LAYOUT */}
        {mode === "adult" && (
          <>
            <line x1="450" y1="0" x2="450" y2="250" stroke="#444" strokeWidth="1.5" />
            <line x1="20" y1="130" x2="870" y2="130" stroke="#444" strokeWidth="1.5" />

            <text x="20" y="120" fontSize="14">Right</text>
            <text x="845" y="120" fontSize="14">Left</text>

            
          </>
        )}

        {/* ✅ CHILD LAYOUT */}
        {mode === "child" && (
          <>
            <line x1="380" y1="0" x2="380" y2="250" stroke="#444" strokeWidth="1.5" />
            <line x1="120" y1="130" x2="630" y2="130" stroke="#444" strokeWidth="1.5" />

            <text x="120" y="120" fontSize="14">Right</text>
            <text x="610" y="120" fontSize="14">Left</text>

            
          </>
        )}

        {teeth.map((tooth) => {

          const isSelected = selectedTooth === tooth.id;
          const isHovered = hoveredTooth === tooth.id;

          const isUpperTooth =
            (mode === "adult" && tooth.id >= 1 && tooth.id <= 16) ||
            (mode === "child" && upperChildTeeth.includes(tooth.id));

          let fillColor = getToothColor(tooth.id);
          let strokeColor = "#333";
          let strokeWidth = 2;

          if (isSelected) {
            fillColor = "#eaebec";
            strokeColor = "#000";
            strokeWidth = 3;
          } else if (isHovered) {
            fillColor = "#cce6ff";
            strokeColor = "#3399ff";
            strokeWidth = 2.5;
          }

          return (
            <g
              key={tooth.id}
              transform={`
                translate(${tooth.x},${tooth.y})
                ${isUpperTooth ? "scale(1,-1) translate(0,-40)" : ""}
              `}
              onClick={() => onSelectTooth(tooth.id)}
              onMouseEnter={() => setHoveredTooth(tooth.id)}
              onMouseLeave={() => setHoveredTooth(null)}
              style={{ cursor: "pointer" }}
            >

              <path
                d={TOOTH_SHAPES[tooth.type]}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />

              <text
                x="33"
                y="20"
                textAnchor="middle"
                fontSize="10"
                fill={isSelected ? "#0066cc" : "black"}
                transform={isUpperTooth ? "scale(1,-1) translate(0,-30)" : ""}
              >
                {tooth.id}
              </text>

            </g>
          );
        })}

      </svg>
    </div>
  );
}

export default DentalChart;