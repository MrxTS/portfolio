import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  staggerDelay?: number;
  asteriskClassName?: string;
}

export default function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  staggerDelay = 0.08,
  asteriskClassName = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={`${word}-${i}`}
            className="relative inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ marginRight: i < words.length - 1 ? "0.25em" : 0 }}
          >
            {word}
            {showAsterisk && isLast && (
              <span
                className={`absolute top-[0.65em] -right-[0.3em] text-[0.31em] ${asteriskClassName}`}
              >
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </span>
  );
}
