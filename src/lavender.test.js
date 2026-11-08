import fs from "fs";
import path from "path";

const root = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const theme = read("src/assets/scss/now-ui-kit/_art-theme.scss");

const block = (re) => {
    const m = theme.match(re);
    if (!m) throw new Error("token block not found: " + re);
    return m[1];
};
const lightBlock = block(/:root\[data-theme="light"\]\s*\{([^}]*)\}/);
const darkBlock = block(/:root\[data-theme="dark"\]\s*\{([^}]*)\}/);
const tok = (b, name) => {
    const m = b.match(new RegExp("--" + name + ":\\s*(#[0-9a-fA-F]{6})"));
    if (!m) throw new Error("missing token " + name);
    return m[1].toLowerCase();
};
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lum = (h) => {
    const [r, g, b] = rgb(h).map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
};
const hsl = (h) => {
    const [r, g, b] = rgb(h).map((v) => v / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    const l = (max + min) / 2;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
    let hue = 0;
    if (d !== 0) {
        if (max === r) hue = ((g - b) / d) % 6;
        else if (max === g) hue = (b - r) / d + 2;
        else hue = (r - g) / d + 4;
        hue = (hue * 60 + 360) % 360;
    }
    return { h: hue, s, l };
};

const walk = (dir, out = []) => {
    for (const e of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
        const p = dir + "/" + e.name;
        if (e.isDirectory()) walk(p, out);
        else out.push(p);
    }
    return out;
};

const OLD = ["0f766e", "115e59", "0f172a", "f8fafc", "e2e8f0", "475569", "334155", "1e293b",
    "0b1220", "f1f5f9", "cbd5e1", "99f6e4", "5eead4", "2dd4bf", "14b8a6", "f0fdfa", "94a3b8", "131c31", "1a2438"];

describe("lavender palette", () => {
    const light = { page: tok(lightBlock, "bg-page"), accent: tok(lightBlock, "accent"), ink: tok(lightBlock, "ink") };
    const dark = { page: tok(darkBlock, "bg-page"), accent: tok(darkBlock, "accent"), ink: tok(darkBlock, "ink") };

    test("no old slate/teal hex values remain in sources", () => {
        const files = walk("src").filter((f) =>
            (/\.scss$/.test(f) || (/\.js$/.test(f) && !/\.test\.js$/.test(f))))
            .concat(["public/index.html", "public/manifest.json"]);
        const hits = [];
        for (const f of files) {
            const txt = read(f).toLowerCase();
            for (const h of OLD) if (txt.includes(h)) hits.push(f + " " + h);
        }
        expect(hits).toEqual([]);
    });

    test("index.html BAR_COLORS match page tokens", () => {
        const m = read("public/index.html").match(/BAR_COLORS\s*=\s*\{\s*light:\s*"(#[0-9a-fA-F]{6})",\s*dark:\s*"(#[0-9a-fA-F]{6})"/);
        expect(m).not.toBeNull();
        expect(m[1].toLowerCase()).toBe(light.page);
        expect(m[2].toLowerCase()).toBe(dark.page);
    });

    test("ThemeToggle theme-color values match page tokens", () => {
        const src = read("src/components/ThemeToggle.js");
        const m = src.match(/"dark"\s*\?\s*"(#[0-9a-fA-F]{6})"\s*:\s*"(#[0-9a-fA-F]{6})"/);
        expect(m).not.toBeNull();
        expect(m[1].toLowerCase()).toBe(dark.page);
        expect(m[2].toLowerCase()).toBe(light.page);
    });

    test("manifest colours equal light page token", () => {
        const mf = JSON.parse(read("public/manifest.json"));
        expect(mf.theme_color.toLowerCase()).toBe(light.page);
        expect(mf.background_color.toLowerCase()).toBe(light.page);
    });

    test.each([["light", light], ["dark", dark]])("%s page, accent, ink are lavender hued", (_n, t) => {
        for (const k of ["page", "accent", "ink"]) {
            const c = hsl(t[k]);
            expect(c.h).toBeGreaterThanOrEqual(240);
            expect(c.h).toBeLessThanOrEqual(290);
            if (k !== "ink") expect(c.s).toBeGreaterThan(0);
        }
    });

    test("light and dark themes strongly contrast", () => {
        expect(lum(light.page)).toBeGreaterThan(lum(dark.page));
        expect(ratio(light.page, dark.page)).toBeGreaterThanOrEqual(10);
        expect(lum(dark.ink)).toBeGreaterThan(lum(light.ink));
        expect(ratio(light.ink, dark.ink)).toBeGreaterThanOrEqual(10);
    });

    test("icon PNG sizes match manifest", () => {
        const mf = JSON.parse(read("public/manifest.json"));
        const dims = (f) => {
            const b = fs.readFileSync(path.join(root, "public", f));
            expect(b.slice(1, 4).toString()).toBe("PNG");
            return b.readUInt32BE(16) + "x" + b.readUInt32BE(20);
        };
        expect(dims("favicon.png")).toBe("96x96");
        expect(dims("apple-icon.png")).toBe("180x180");
        for (const i of mf.icons) expect(dims(i.src)).toBe(i.sizes);
    });
});
