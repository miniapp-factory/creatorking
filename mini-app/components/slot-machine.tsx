"use client";

import { useState, useEffect } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const fruits = ["Apple", "Banana", "Cherry", "Lemon"];
const fruitImages: Record<string, string> = {
  Apple: "/apple.png",
  Banana: "/banana.png",
  Cherry: "/cherry.png",
  Lemon: "/lemon.png",
};

export function SlotMachine() {
  const [grid, setGrid] = useState<string[][]>([
    [randomFruit(), randomFruit(), randomFruit()],
    [randomFruit(), randomFruit(), randomFruit()],
    [randomFruit(), randomFruit(), randomFruit()],
  ]);
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(false);

  function randomFruit() {
    return fruits[Math.floor(Math.random() * fruits.length)];
  }

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWin(false);
    const interval = setInterval(() => {
      setGrid((prev) => {
        const newCol1 = [randomFruit(), ...prev[0].slice(0, 2)];
        const newCol2 = [randomFruit(), ...prev[1].slice(0, 2)];
        const newCol3 = [randomFruit(), ...prev[2].slice(0, 2)];
        return [newCol1, newCol2, newCol3];
      });
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      // Check win condition directly in render
    }, 2000);
  };

  // Inline win check in JSX
  const hasWin =
    !spinning &&
    (grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2] ||
      grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2] ||
      grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2] ||
      grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0] ||
      grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1] ||
      grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.flat().map((fruit, idx) => (
          <img
            key={idx}
            src={fruitImages[fruit]}
            alt={fruit}
            className="w-16 h-16 object-contain"
          />
        ))}
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {hasWin && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p className="text-green-800 font-semibold">You win!</p>
          <Share text={`I just won with the Fruit Slot Machine App! ${url}`} />
        </div>
      )}
    </div>
  );
}
