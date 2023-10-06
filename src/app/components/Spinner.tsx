"use client";
import { useState } from "react";
import WheelComponent from "@/app/lib/WheelComponent ";

export default function Spinner() {
  const [winner1, setWinner1] = useState<string>("");

  const segments = [
    "better luck next time",
    "won 70",
    "won 10",
    "better luck next time",
    "won 2",
    "won uber pass",
    "won 70",
    "won 10",
    "better luck next time",
    "won 2",
    "won uber pass",
  ];

  const segColors = [
    "#F06C65",
    "#F4E561",
    "#8E5FD7",
    "#48B7E8",
    "#3FBF69",
    "#FF6B6B",
    "#F1E45A",
    "#956FD4",
    "#36B0E6",
    "#3FCF5D",
    "#FF6771",
    "#F3E768",
    "#8C5CD1",
    "#36B5E0",
    "#40D05F",
    "#FF6A6A",
    "#F2E568",
    "#8D5DD2",
    "#35AEE1",
    "#3ECF60",
    "#F86A6A",
    "#F2E568",
    "#8D5DD2",
    "#36AEE1",
    "#3FCF5F",
  ];
  const onFinished = (winner: any) => {
    console.log(winner);
    setWinner1(winner);
  };
  return (
    <div className="w-[70%] flex justify-center items-center">
      <WheelComponent
        segments={segments}
        segColors={segColors}
        onFinished={(winner: any) => onFinished(winner)}
        primaryColor="black"
        contrastColor="white"
        buttonText="Spin"
        isOnlyOnce={false}
        size={200}
        upDuration={100}
        downDuration={100}
        fontFamily="Arial"
        winningSegment={undefined}
      />
    </div>
  );
}
