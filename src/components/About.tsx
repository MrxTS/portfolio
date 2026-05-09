import { MotionConfig } from "framer-motion";
import WordsPullUpMultiStyle from "./animations/WordsPullUpMultiStyle";
import AnimatedLetter from "./animations/AnimatedLetter";

export default function About() {
  return (
    <MotionConfig reducedMotion="user">
    <section id="about" className="bg-black px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[#101010] px-6 py-16 text-center md:px-12 md:py-24">
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary sm:text-xs">
          QA & iOS
        </span>

        <div className="mt-8">
          <WordsPullUpMultiStyle
            containerClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-primary"
            segments={[
              { text: "I am Stefan Nguyen,", className: "font-normal" },
              {
                text: "a self-taught engineer.",
                className: "italic font-serif",
              },
              {
                text: "I have skills in test automation, Swift, SwiftUI, and homelab infrastructure.",
                className: "font-normal",
              },
            ]}
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <AnimatedLetter
            className="text-xs leading-relaxed sm:text-sm md:text-base"
            text="Over the last several years, I have worked at the intersection of quality engineering and independent iOS development. By day I design test suites and observability stacks; by night I ship apps and self-host the systems that power them — from a Proxmox cluster to a Synology NAS, all behind Traefik and Authentik."
          />
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
