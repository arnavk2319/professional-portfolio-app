// ResponsiveAutoCarousel.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - items: [{ image, text, href }, ...]
 * - interval: ms between scrolls (default 2500)
 * - pauseOnHover: boolean (default true)
 */
export function BadgeCarousel({
  items = [],
  interval = 2500,
  pauseOnHover = true,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive breakpoints -> visibleCount
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 600) setVisibleCount(1);
      else if (w < 900) setVisibleCount(2);
      else if (w < 1200) setVisibleCount(3);
      else setVisibleCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Clamp index if visibleCount or items length change
  useEffect(() => {
    const maxIndex = Math.max(0, items.length - visibleCount);
    setIndex((i) => Math.min(i, maxIndex));
  }, [items.length, visibleCount]);

  // Auto-scroll interval (only if more items than visibleCount)
  useEffect(() => {
    if (items.length <= visibleCount) return; // nothing to scroll
    if (isPaused) return;
    const id = setInterval(() => {
      setIndex((prev) => {
        const maxIndex = Math.max(0, items.length - visibleCount);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, interval);
    return () => clearInterval(id);
  }, [items.length, visibleCount, interval, isPaused]);

  // Apply transform when index or visibleCount changes
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const cardWidth = container.clientWidth / visibleCount;
    track.style.transition = "transform 600ms ease";
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }, [index, visibleCount, items.length]);

  // Re-apply transform after each image loads (images can change layout)
  const handleImageLoad = () => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const cardWidth = container.clientWidth / visibleCount;
    track.style.transition = ""; // avoid jumpy animation on immediate reflow, then re-enable next tick
    track.style.transform = `translateX(-${index * cardWidth}px)`;
    // re-enable transition on next tick
    requestAnimationFrame(() => {
      track.style.transition = "transform 600ms ease";
    });
  };

  // card style (flex basis = percentage)
  const cardStyle = {
    flex: `0 0 ${100 / visibleCount}%`,
    boxSizing: "border-box",
    padding: "40px",
  };

  return (
    <div
      ref={containerRef}
      style={{ overflow: "hidden", width: "100%" }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div ref={trackRef} style={{ display: "flex", alignItems: "stretch" }}>
        {items.map((it, idx) => (
          <a
            key={idx}
            href={it.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...cardStyle, textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                width: "100%",
                height: 0,
                paddingBottom: "100%", // 16:9-ish ratio; adjust as needed
                position: "relative",
                borderRadius: 8,
                overflow: "hidden",
                background: "var(--bg-placeholder)",
              }}
            >
              <img
                src={it.image}
                alt={it.title || `item-${idx}`}
                onLoad={handleImageLoad}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div style={{ marginTop: 8, textAlign: "center", fontSize: 14 }}>
              {it.title}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default BadgeCarousel;
