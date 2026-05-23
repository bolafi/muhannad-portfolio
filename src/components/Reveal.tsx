"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (custom: { delay: number; y: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: custom.delay,
    },
  }),
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      custom={{ delay, y }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
