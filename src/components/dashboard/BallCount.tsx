import React from "react";

interface BallCountProps {
  ballCount: number;
  strikeCount: number;
  outCount: number;
  baseRunners: {
    "1Base": string;
    "2Base": string;
    "3Base": string;
  };
}

export default function BallCount({
  ballCount,
  strikeCount,
  outCount,
  baseRunners,
}: BallCountProps) {
  return (
    <div className="flex flex-col w-[100px] space-y-2">
      <div className="relative w-20 h-20 ml-4">
        {/* 1st Base */}
        <div
          className={`absolute top-1 left-1 w-8 h-8 transform rotate-45 origin-bottom-right ${
            baseRunners["2Base"] !== "None" ? "bg-yellow-400" : "bg-gray-300"
          }`}
        ></div>
        {/* 2nd Base */}
        <div
          className={`absolute top-1.5 right-2.5 w-8 h-8 transform rotate-45 origin-bottom-left ${
            baseRunners["1Base"] !== "None" ? "bg-yellow-400" : "bg-gray-300"
          }`}
        ></div>
        {/* 3rd Base */}
        <div
          className={`absolute bottom-2.5 left-0.5 w-8 h-8 transform rotate-45 origin-top-right ${
            baseRunners["3Base"] !== "None" ? "bg-yellow-400" : "bg-gray-300"
          }`}
        ></div>
      </div>

      <div className="grid grid-cols-4 font-bold text-xl items-center">
        {/* Balls */}
        <h1>B</h1>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`ball-${index}`}
            className={`w-5 h-5 rounded-full ${
              index < ballCount ? "bg-green-400" : "bg-gray-300"
            }`}
          ></div>
        ))}

        {/* Strikes */}
        <h1>S</h1>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`strike-${index}`}
            className={`w-5 h-5 rounded-full ${
              index < strikeCount ? "bg-yellow-300" : "bg-gray-300"
            }`}
          ></div>
        ))}

        {/* Outs */}
        <h1>O</h1>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`out-${index}`}
            className={`w-5 h-5 rounded-full ${
              index < outCount ? "bg-red-400" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
