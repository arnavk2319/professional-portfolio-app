import React from "react";

// Counts a KPI up from 0 the first time it scrolls into view. Final text is the initial render,
// so it is correct with no JavaScript motion, no IntersectionObserver, or reduced motion.
// Only text changes; the box never resizes (monospace digits), so scrolling is unaffected.
const parse = (v) => {
    const m = /^(\d+(?:\.\d+)?)(.*)$/.exec(v);
    return m ? { n: parseFloat(m[1]), rest: m[2] } : null;
};
const reduced = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const Counter = ({ value, className }) => {
    const ref = React.useRef(null);
    const [text, setText] = React.useState(value);

    React.useEffect(() => {
        const parsed = parse(value);
        if (!parsed || reduced() || typeof window.IntersectionObserver !== "function" || !window.requestAnimationFrame) return undefined;
        let raf = 0;
        const io = new window.IntersectionObserver((entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            io.disconnect();
            const start = performance.now();
            const dur = 1100;
            const step = (now) => {
                const t = Math.min(1, (now - start) / dur);
                const eased = 1 - Math.pow(1 - t, 3);
                setText(Math.round(parsed.n * eased) + parsed.rest);
                if (t < 1) raf = window.requestAnimationFrame(step);
            };
            setText("0" + parsed.rest);
            raf = window.requestAnimationFrame(step);
        }, { threshold: 0.6 });
        io.observe(ref.current);
        return () => { io.disconnect(); window.cancelAnimationFrame(raf); };
    }, [value]);

    return <span ref={ref} className={className}>{text}</span>;
};

export default Counter;
