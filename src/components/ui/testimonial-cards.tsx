"use client";

import * as React from "react";
import { motion, type PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

export type CardPosition = "front" | "middle" | "back";

export interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: CardPosition;
  id: number | string;
  author: string;
  /** Optional avatar image. When omitted, a branded monogram is shown. */
  avatar?: string;
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  author,
  avatar,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  const initials = author
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(_event, info: PanInfo) => {
        dragRef.current = info.point.x;
      }}
      onDragEnd={(_event, info: PanInfo) => {
        if (dragRef.current - info.point.x > 150) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={cn(
        "absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-ink-line bg-ink-soft/70 p-6 shadow-lift backdrop-blur-md",
        isFront && "cursor-grab active:cursor-grabbing",
      )}
    >
      {avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatar}
          alt={`Photo of ${author}`}
          className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-ink-line bg-ink object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none mx-auto grid h-32 w-32 place-content-center rounded-full border-2 border-aqua/30 bg-aqua/10 font-display text-4xl font-extrabold text-aqua"
        >
          {initials}
        </div>
      )}
      <span className="text-center text-lg italic text-chalk-dim">
        &ldquo;{testimonial}&rdquo;
      </span>
      <span className="text-center text-sm font-semibold text-aqua">{author}</span>
    </motion.div>
  );
}
