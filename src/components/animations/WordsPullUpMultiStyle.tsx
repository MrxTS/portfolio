import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface Segment {
  text: string;
  className?: string;
}

interface Props {
  segments: Segment[];
  containerClassName?: string;
  staggerDelay?: number;
}

export default function WordsPullUpMultiStyle({
  segments,
  containerClassName = "",
  staggerDelay = 0.08,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const flatWords: { word: string; className: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w.length > 0) {
        flatWords.push({ word: w, className: seg.className ?? "" });
      }
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${containerClassName}`}
    >
      {flatWords.map((entry, i) => (
        <motion.span
          key={`${entry.word}-${i}`}
          className={`inline-block ${entry.className}`}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ marginRight: i < flatWords.length - 1 ? "0.25em" : 0 }}
        >
          {entry.word}
        </motion.span>
      ))}
    </div>
  );
}
