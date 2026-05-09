import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface Props {
  text: string;
  className?: string;
}

export default function AnimatedLetter({ text, className = "" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  const totalChars = words.reduce((sum, w) => sum + w.length, 0);
  let charCursor = 0;

  return (
    <p ref={ref} className={className}>
      {words.map((word, wi) => {
        const wordStart = charCursor;
        charCursor += word.length;
        return (
          <Fragment key={wi}>
            <span className="inline-block">
              {Array.from(word).map((char, ci) => (
                <Char
                  key={ci}
                  progress={scrollYProgress}
                  index={wordStart + ci}
                  total={totalChars}
                >
                  {char}
                </Char>
              ))}
            </span>
            {wi < words.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </p>
  );
}

interface CharProps {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: string;
}

function Char({ progress, index, total, children }: CharProps) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1]
  );
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}
