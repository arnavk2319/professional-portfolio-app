import React from "react";

// Purely decorative data-style graphics (no real numbers, no labels), hidden from assistive tech.
// Animated with CSS transform/opacity/stroke only; they never take pointer events or change layout.
const BARS = [38, 54, 46, 70, 62, 88, 76, 104, 92, 118, 108, 132];
const LINE = "M10 150 C60 140 90 120 130 126 S200 96 240 100 S320 70 360 76 S440 44 480 52 S560 22 590 16";

export const HeroChart = () => (
    <figure className="ed-viz" aria-hidden="true">
        <svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            {[45, 90, 135].map((y) => <line key={y} className="viz-grid" x1="0" x2="600" y1={y} y2={y} />)}
            {BARS.map((h, i) => (
                <rect key={i} className="viz-bar" style={{ "--i": i }} x={14 + i * 49} y={170 - h} width="28" height={h} rx="4" />
            ))}
            <path className="viz-line" d={LINE} pathLength="1" />
            <circle className="viz-dot" cx="590" cy="16" r="5" />
        </svg>
    </figure>
);

export const Sparkline = () => (
    <svg className="ed-spark" viewBox="0 0 120 28" aria-hidden="true" focusable="false">
        <path className="spark-line" d="M2 22 L16 16 L30 19 L46 9 L60 13 L76 6 L92 11 L118 3" pathLength="1" />
        <circle className="spark-dot" cx="118" cy="3" r="2.5" />
    </svg>
);
