import { useRef } from "react";
import { motion, MotionConfig, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  Flame,
  Server,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import WordsPullUpMultiStyle from "./animations/WordsPullUpMultiStyle";

interface FeatureCard {
  number: string;
  title: string;
  Icon: LucideIcon;
  items: string[];
  href?: string;
  cta?: string;
}

const CARDS: FeatureCard[] = [
  {
    number: "01",
    title: "Forge.",
    Icon: Flame,
    items: [
      "iOS Habit Tracker (SwiftUI)",
      "Supabase Auth + Row-Level Security",
      "Edge Functions for AI Coach",
      "Streaks, reminders, weekly recap",
    ],
    href: "/projects/forge",
    cta: "View details",
  },
  {
    number: "02",
    title: "Sproutly.",
    Icon: Sprout,
    items: [
      "iOS Baby Tracker (SwiftUI)",
      "Real-time activity log",
      "Supabase backend with RLS",
    ],
    href: "/projects/sproutly",
    cta: "View details",
  },
  {
    number: "03",
    title: "Homelab.",
    Icon: Server,
    items: [
      "MS-01 Proxmox + Pi backup + DS224+",
      "Traefik · Authentik · CrowdSec",
      "Backrest snapshots, TIG monitoring",
    ],
    href: "/projects/homelab",
    cta: "View details",
  },
];

interface TerminalLine {
  cmd: string;
  output: string;
  startAt: number;
  outputAt: number;
}

const TERMINAL_LINES: TerminalLine[] = [
  { cmd: "swift build", output: "✓ Compiled in 8.4s", startAt: 0.4, outputAt: 1.6 },
  { cmd: "supabase functions deploy", output: "✓ Deployed: ai-coach", startAt: 2.0, outputAt: 3.6 },
  { cmd: "git push origin main", output: "✓ Synced", startAt: 4.0, outputAt: 5.2 },
];

export default function Features() {
  return (
    <MotionConfig reducedMotion="user">
    <section
      id="features"
      className="relative bg-black px-4 py-20 md:py-28"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-20">
          <WordsPullUpMultiStyle
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight max-w-3xl mx-auto"
            segments={[
              {
                text: "Real software, real systems.",
                className: "text-primary",
              },
              {
                text: "Built with curiosity. Powered by craft.",
                className: "text-gray-500",
              },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4">
          <TerminalCard delay={0} />
          {CARDS.map((card, i) => (
            <Card key={card.number} card={card} delay={(i + 1) * 0.15} />
          ))}
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}

function TerminalCard({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-[340px] flex-col overflow-hidden rounded-2xl bg-[#0a0a0a] lg:min-h-0"
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      </div>

      <div className="flex-1 px-4 py-4 font-mono text-xs leading-relaxed sm:text-[13px]">
        {inView &&
          TERMINAL_LINES.map((line, i) => (
            <TerminalLineRow key={i} line={line} />
          ))}
      </div>

      <div className="border-t border-white/5 px-5 py-4">
        <p className="text-lg font-medium md:text-xl" style={{ color: "#E1E0CC" }}>
          Code that ships.
        </p>
      </div>
    </motion.div>
  );
}

function TerminalLineRow({ line }: { line: TerminalLine }) {
  const chars = Array.from(line.cmd);
  return (
    <div className="mb-2.5 font-mono">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: line.startAt }}
        className="text-primary/80"
      >
        <span className="text-emerald-400">$</span>{" "}
        {chars.map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: line.startAt + 0.1 + i * 0.04, duration: 0 }}
          >
            {c}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: line.outputAt, duration: 0.3 }}
        className="text-emerald-400/70"
      >
        {line.output}
      </motion.div>
    </div>
  );
}

function Card({ card, delay }: { card: FeatureCard; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = card.Icon;
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl bg-[#212121] p-5 md:p-6"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 text-black sm:h-6 sm:w-6" strokeWidth={1.75} />
      </div>

      <h3 className="mt-5 text-lg font-medium text-primary md:text-xl">
        {card.title}{" "}
        <span className="text-gray-500">({card.number})</span>
      </h3>

      <ul className="mt-5 flex flex-col gap-3">
        {card.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs sm:text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="leading-snug text-gray-400">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {card.href ? (
          (() => {
            const isExternal = /^https?:\/\//.test(card.href);
            return (
              <a
                href={card.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-xs text-primary transition-opacity hover:opacity-80 sm:text-sm"
              >
                {card.cta ?? "Learn more"}
                <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
              </a>
            );
          })()
        ) : (
          <span className="inline-flex items-center gap-2 text-xs text-primary/60 sm:text-sm">
            Private
            <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
          </span>
        )}
      </div>
    </motion.div>
  );
}
