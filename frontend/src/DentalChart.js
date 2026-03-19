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

  return (
    <div>

      {/* 🔄 Toggle */}
      <div style={{ marginBottom: "10px" }}>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="adult">Adult</option>
          <option value="child">Child</option>
        </select>
      </div>

      <svg width="850" height="360">

        {teeth.map((tooth) => {

          const isSelected = selectedTooth === tooth.id;
          const isHovered = hoveredTooth === tooth.id;

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
              transform={`translate(${tooth.x},${tooth.y})`}
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
                x="20"
                y="-15"
                textAnchor="middle"
                fontSize="10"
                fill={isSelected ? "#0066cc" : "black"}
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