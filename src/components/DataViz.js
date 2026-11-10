import React from "react";

// Purely decorative data graphics (no real numbers or labels), hidden from assistive tech.
// Everything here animates with transform/opacity/stroke only, never takes pointer events and
// never changes layout, so it cannot affect scrolling.

// ---- page background: a fixed layer, 10 grid cells, 7 of them carry a chart (70%) ----
const BAR_H = [30, 52, 40, 72, 58, 92, 70, 104];
const SCATTER = [[22, 98], [40, 70], [58, 84], [76, 52], [96, 64], [112, 34], [128, 58], [146, 28], [162, 44], [178, 18], [50, 112], [118, 96], [150, 78], [86, 106]];
const CANDLES = [[40, 90, 60], [60, 70, 40], [50, 80, 55], [75, 50, 30], [64, 62, 38], [86, 34, 18], [72, 52, 30]];

const Cell = ({ children }) => <div className="bg-cell"><svg viewBox="0 0 200 140" aria-hidden="true" focusable="false">{children}</svg></div>;

const Bars = () => (
    <Cell>
        <line className="bg-axis" x1="8" y1="128" x2="192" y2="128" />
        {BAR_H.map((h, i) => <rect key={i} className={"bg-bar d" + i} x={14 + i * 22} y={128 - h} width="14" height={h} rx="3" />)}
    </Cell>
);
const Line = () => (
    <Cell>
        <line className="bg-axis" x1="8" y1="128" x2="192" y2="128" />
        <path className="bg-line" pathLength="1" d="M8 110 C30 100 40 70 62 76 S96 112 118 78 S156 34 192 22" />
        <circle className="bg-pulse" cx="192" cy="22" r="4" />
    </Cell>
);
const Donut = () => (
    <Cell>
        <g className="bg-spin">
            <circle className="bg-ring" cx="100" cy="70" r="46" />
            <circle className="bg-arc" cx="100" cy="70" r="46" pathLength="100" strokeDasharray="62 38" />
            <circle className="bg-arc b" cx="100" cy="70" r="30" pathLength="100" strokeDasharray="35 65" />
        </g>
    </Cell>
);
const Scatter = () => (
    <Cell>
        <line className="bg-axis" x1="8" y1="128" x2="192" y2="128" />
        <line className="bg-axis" x1="8" y1="128" x2="8" y2="10" />
        {SCATTER.map(([x, y], i) => <circle key={i} className={"bg-dot d" + (i % 7)} cx={x} cy={y} r="4.5" />)}
    </Cell>
);
const Area = () => (
    <Cell>
        <line className="bg-axis" x1="8" y1="128" x2="192" y2="128" />
        <path className="bg-area" d="M8 128 L8 96 C36 84 50 52 80 60 S124 100 150 56 S178 40 192 34 L192 128 Z" />
        <path className="bg-line static" d="M8 96 C36 84 50 52 80 60 S124 100 150 56 S178 40 192 34" />
    </Cell>
);
const Heat = () => (
    <Cell>
        {Array.from({ length: 24 }, (_, i) => (
            <rect key={i} className={"bg-heat d" + (i * 5 % 7)} x={14 + (i % 6) * 30} y={14 + Math.floor(i / 6) * 28} width="24" height="22" rx="4" />
        ))}
    </Cell>
);
const Candles = () => (
    <Cell>
        <line className="bg-axis" x1="8" y1="128" x2="192" y2="128" />
        {CANDLES.map(([top, bot, wick], i) => (
            <g key={i} className={"bg-candle d" + i}>
                <line className="bg-wick" x1={24 + i * 24} x2={24 + i * 24} y1={128 - top - 10} y2={128 - wick + 14} />
                <rect className="bg-body" x={18 + i * 24} y={128 - top} width="12" height={Math.max(14, top - bot)} rx="2" />
            </g>
        ))}
    </Cell>
);

// Order puts the 3 empty cells (2, 5, 8) well apart on both the 5x2 and 2x5 layouts.
const CELLS = [Bars, Line, null, Donut, Scatter, null, Area, Heat, null, Candles];

export const BackgroundViz = () => (
    <div className="ed-bg" aria-hidden="true">
        {CELLS.map((C, i) => <div key={i} className="bg-slot">{C ? <C /> : null}</div>)}
    </div>
);

// ---- mini graphic inside each KPI tile, drawn from the metric's own value ----
const reduced = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const KpiViz = ({ value, kind }) => {
    const ref = React.useRef(null);
    const [phase, setPhase] = React.useState("done");
    const n = parseFloat(value);

    React.useLayoutEffect(() => {
        if (reduced() || typeof window.IntersectionObserver !== "function") return undefined;
        setPhase("pre");
        const io = new window.IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) { io.disconnect(); setPhase("go"); }
        }, { threshold: 0.6 });
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    let body = null;
    if (kind === "ring") {
        body = (
            <svg viewBox="0 0 44 44" aria-hidden="true" focusable="false" className="kv-ring">
                <circle className="kv-track" cx="22" cy="22" r="17" />
                <circle className="kv-arc" cx="22" cy="22" r="17" pathLength="100" strokeDasharray={n + " " + (100 - n)} />
            </svg>
        );
    } else if (kind === "dots") {
        body = (
            <svg viewBox="0 0 200 36" aria-hidden="true" focusable="false" className="kv-wide">
                {Array.from({ length: 30 }, (_, i) => <circle key={i} className={"kv-dot" + (i < Math.round(n / 2) ? " on" : "")} cx={8 + (i % 15) * 12.5} cy={10 + Math.floor(i / 15) * 16} r="4" />)}
            </svg>
        );
    } else if (kind === "bars") {
        body = (
            <svg viewBox="0 0 200 36" aria-hidden="true" focusable="false" className="kv-wide">
                {Array.from({ length: 25 }, (_, i) => {
                    const h = 8 + ((i * 7) % 9) * 3 + i * 0.4;
                    return <rect key={i} className="kv-bar" x={4 + i * 7.8} y={34 - h} width="5" height={h} rx="1.5" />;
                })}
            </svg>
        );
    } else {
        body = (
            <svg viewBox="0 0 200 36" aria-hidden="true" focusable="false" className="kv-wide">
                {Array.from({ length: 20 }, (_, i) => <rect key={i} className="kv-block" x={4 + (i % 10) * 19.5} y={4 + Math.floor(i / 10) * 16} width="15" height="11" rx="2" />)}
            </svg>
        );
    }
    return <span ref={ref} className={"kpi-viz " + phase} aria-hidden="true">{body}</span>;
};
