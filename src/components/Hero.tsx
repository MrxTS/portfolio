import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WordsPullUp from "./animations/WordsPullUp";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#features" },
  { label: "Stack", href: "#skills" },
  { label: "GitHub", href: "https://github.com/MrxTS", external: true },
  { label: "Contact", href: "#contact" },
];

const HERO_VIDEO = "/videos/hero.mp4";

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
    <section className="h-screen p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          autoPlay={!reduce}
          loop
          muted
          playsInline
          poster="/og-image.jpg"
          preload={reduce ? "none" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO}
        />

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-[10px] transition-colors sm:text-xs md:text-sm"
                style={{ color: "rgba(225, 224, 204, 0.8)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#E1E0CC")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-12 items-end gap-4 px-4 pb-4 md:px-8 md:pb-8">
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="font-medium leading-[0.9] tracking-[-0.04em] text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
              style={{ color: "#E1E0CC" }}
            >
              <WordsPullUp text="Curious" showAsterisk />
            </h1>
          </div>

          <div className="col-span-12 flex flex-col gap-4 lg:col-span-4 lg:pb-6">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-sm leading-[1.35] text-primary/80 sm:text-base md:text-lg"
            >
              Stefan is a Software Test Engineer and iOS Developer building
              tools, tests, and self-hosted systems — bound not by titles or
              labels but by curiosity to understand how things work from the
              inside out.
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
            >
              <span>Get in touch</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                <ArrowRight
                  className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                  style={{ color: "#E1E0CC" }}
                />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
