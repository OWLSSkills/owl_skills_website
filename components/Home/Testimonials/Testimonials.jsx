"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  { name: "Aly",   text: `I learned a lot from you, and your positive spirit made me feel comfortable... I love your plan for OWLS, and please pre-sign me up for your email list once that’s up and running.`, initial: "A" },
  { name: "James", text: `Night-time navigation was really interesting… The extended map and compass work was really great, and I’m happy to have that knowledge now.`, initial: "J" },
  { name: "Pat",   text: `The field exercises were spot-on. I left feeling confident and excited to practice more.`, initial: "P" },
  { name: "Rae",   text: `Super organized and welcoming. I appreciated the safety-first approach without losing the fun.`, initial: "R" },
];

export default function Testimonials() {
  const viewportRef = useRef(null);
  const setRef = useRef(null);

  const [loopWidth, setLoopWidth] = useState(1000);
  const [copies, setCopies] = useState(2);
  const [expanded, setExpanded] = useState(() => new Set());
  const [hasOverflow, setHasOverflow] = useState([]);   // per-card overflow flags
  const [isPaused, setIsPaused] = useState(false);

  // refs to the BASE SET figure elements (.card), not the <p>
  const cardRefs = useRef([]);

  const SPEED_PX_PER_SEC = 80;  // tune marquee speed
  const CARD_MAX_H = 360;       // must match --card-max-h in CSS

  const baseSet = useMemo(() => TESTIMONIALS, []);

  // Measure one set width and how many copies are needed for a seamless loop
  useEffect(() => {
    if (!viewportRef.current || !setRef.current) return;

    const measureTrack = () => {
      const setRect = setRef.current.getBoundingClientRect();
      const vpRect  = viewportRef.current.getBoundingClientRect();
      const widthOneSet = Math.ceil(setRect.width || 0);
      const neededCopies = Math.max(2, Math.ceil((vpRect.width * 2) / Math.max(widthOneSet, 1)));
      setLoopWidth(widthOneSet || 1000);
      setCopies(neededCopies);
    };

    measureTrack();
    const ro = new ResizeObserver(measureTrack);
    ro.observe(setRef.current);
    ro.observe(viewportRef.current);
    window.addEventListener("resize", measureTrack);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureTrack);
    };
  }, []);

  // Detect overflow on the CARD (figure), not the <p>
  useEffect(() => {
    const computeOverflow = () => {
      const flags = baseSet.map((_, i) => {
        const card = cardRefs.current[i];
        return card ? card.scrollHeight > CARD_MAX_H + 1 : false;
      });
      setHasOverflow(flags);
    };

    // initial + after layout/resize/font load
    computeOverflow();

    const ro = new ResizeObserver(computeOverflow);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    viewportRef.current && ro.observe(viewportRef.current);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(computeOverflow).catch(() => {});
    }
    window.addEventListener("load", computeOverflow);
    window.addEventListener("resize", computeOverflow);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", computeOverflow);
      window.removeEventListener("resize", computeOverflow);
    };
  }, [baseSet]);

  // Animation duration from distance/speed
  const durationSec = Math.max(1, loopWidth / SPEED_PX_PER_SEC);

  // Pause on press/hold (mobile) and resume on release
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const down = () => setIsPaused(true);
    const up = () => setIsPaused(false);

    vp.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });

    return () => {
      vp.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  const toggleExpanded = (i) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.container}>
        <h2 id="testimonials-title" className={`${styles.title} alfarn`}>What folks say</h2>

        <div
          className={`${styles.viewport} ${isPaused ? styles.paused : ""}`}
          ref={viewportRef}
        >
          <div
            className={styles.track}
            style={{ ["--duration"]: `${durationSec}s`, ["--loop"]: `${loopWidth}px` }}
          >
            {/* Base, interactive set */}
            <div className={styles.set} ref={setRef}>
              {baseSet.map((t, i) => {
                const isOpen = expanded.has(i);
                const showMore = !!hasOverflow[i];
                return (
                  <figure
                    key={`base-${i}`}
                    ref={(el) => (cardRefs.current[i] = el)}
                    className={`${styles.card} ${isOpen ? styles.cardExpanded : ""}`}
                    aria-expanded={isOpen}
                  >
                    <figcaption className={styles.header}>
                      <div className={styles.avatar} aria-hidden="true">
                        {t.initial ?? t.name[0]}
                      </div>
                      <span className={styles.name}>{t.name}</span>
                    </figcaption>

                    <blockquote className={styles.quote}>
                      <p>“{t.text}”</p>
                    </blockquote>

                    {/* Fade only when truncated */}
                    <div className={showMore && !isOpen ? styles.fade : styles.fadeHidden} />

                    {/* Show More / Less button only if the card overflows */}
                    {showMore && (
                      <button
                        type="button"
                        className={styles.moreBtn}
                        onClick={() => toggleExpanded(i)}
                        aria-label={`${isOpen ? "Collapse" : "Expand"} testimonial from ${t.name}`}
                      >
                        {isOpen ? "Show less" : "...more"}
                      </button>
                    )}
                  </figure>
                );
              })}
            </div>

            {/* Cloned, non-interactive sets to make the loop seamless */}
            {Array.from({ length: Math.max(copies - 1, 0) }).map((_, copyIdx) => (
              <div className={styles.set} key={`copy-${copyIdx}`} aria-hidden="true">
                {baseSet.map((t, i) => (
                  <figure key={`copy-${copyIdx}-${i}`} className={styles.card}>
                    <figcaption className={styles.header}>
                      <div className={styles.avatar} aria-hidden="true">
                        {t.initial ?? t.name[0]}
                      </div>
                      <span className={styles.name}>{t.name}</span>
                    </figcaption>
                    <blockquote className={styles.quote}>
                      <p>“{t.text}”</p>
                    </blockquote>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
