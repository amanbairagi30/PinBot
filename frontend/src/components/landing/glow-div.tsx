"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function GlowDiv({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="relative rotate-12 w-64 h-64 perspective-1000">
      <div className="absolute inset-0 bg-[#726aff] rounded-[3rem] transform rotate-3d(1, 1, 1, 15deg) transition-all duration-500 hover:rotate-3d(1, 1, 1, 20deg)">
        {/* Smooth gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5] via-[#625af7] to-[#332db4] rounded-[3rem] overflow-hidden">
          {/* Central spotlight effect */}
          <div className="absolute inset-0 bg-radial-gradient-spotlight opacity-70"></div>

          {/* Subtle edge highlight */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[rgb(197,196,227)] to-transparent opacity-20"></div>

          {/* Icon container */}
          <div className="relative flex items-center justify-center w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
