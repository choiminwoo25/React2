"use client";

import { useState } from "react";

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState<number>(likes ?? 0);
  const [isLiking, setIsLiking] = useState(false);

  const handleClick = async () => {
    setIsLiking(true);
    setCount((c) => c + 1);

    setTimeout(() => setIsLiking(false), 300);
  };

  return (
    <button onClick={handleClick} disabled={isLiking} aria-pressed>
      b{count}
    </button>
  );
}
