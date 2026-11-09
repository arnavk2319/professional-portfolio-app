import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import fs from "fs";
import path from "path";
import HomePage from "views/HomePage";

const root = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const scssDir = "src/assets/scss/now-ui-kit";
const theme = read(scssDir + "/_art-theme.scss");

const mount = (el) => {
    const c = document.createElement("div");
    document.body.appendChild(c);
    act(() => { ReactDOM.render(el, c); });
    return c;
};

const html_has_preconnect = () => {
    const html = read("public/index.html");
    return /rel="preconnect" href="https:\/\/fonts\.googleapis\.com"/.test(html) && /rel="preconnect" href="https:\/\/fonts\.gstatic\.com"/.test(html);
};

describe("static theme checks", () => {
    test("font tokens: Fraunces head, DM Sans body, DM Mono data", () => {
        expect(theme).toMatch(/--font-head:\s*"Fraunces"/);
        expect(theme).toMatch(/--font-body:\s*"DM Sans"/);
        expect(theme).toMatch(/--font-data:\s*"DM Mono"/);
        expect(theme).not.toMatch(/Inter|IBM Plex/);
    });

    test("tokens defined for light (default) and dark", () => {
        expect(theme).toMatch(/:root,\s*:root\[data-theme="light"\]\s*\{/);
        expect(theme).toMatch(/:root\[data-theme="dark"\]\s*\{/);
    });

    test("index.html has one Google Fonts stylesheet with display=swap, Fraunces, DM Sans, DM Mono", () => {
        const html = read("public/index.html");
        const links = (html.match(/<link[^>]*>/g) || []).filter(
            (l) => /rel="stylesheet"/.test(l) && /fonts\.googleapis\.com/.test(l)
        );
        expect(links).toHaveLength(1);
        expect(links[0]).toContain("display=swap");
        ["Fraunces", "DM+Sans", "DM+Mono"].forEach((f) => expect(links[0]).toContain("family=" + f));
        expect(links[0]).not.toMatch(/Inter|IBM\+Plex/);
        expect(html_has_preconnect()).toBe(true);
    });

    test("DEFAULT_THEME is light", () => {
        expect(read("public/index.html")).toMatch(/setAttribute\("data-theme", "light"\)/);
    });

    test("no Montserrat/Poppins/Courier references", () => {
        const files = ["public/index.html"].concat(
            fs.readdirSync(path.join(root, scssDir)).filter((f) => f.endsWith(".scss")).map((f) => scssDir + "/" + f)
        );
        files.forEach((f) => expect({ f, hit: /montserrat|poppins|courier/i.test(read(f)) }).toEqual({ f, hit: false }));
    });

    test("no inline style on KPI list or contact tiles", () => {
        const p = mount(<MemoryRouter><HomePage /></MemoryRouter>);
        const kpi = p.querySelectorAll(".art-kpi-list, .art-kpi-list *");
        const tiles = p.querySelectorAll(".contact-tile");
        expect(p.querySelectorAll(".art-kpi-list").length).toBeGreaterThan(0);
        expect(tiles.length).toBeGreaterThan(0);
        kpi.forEach((n) => expect(n.hasAttribute("style")).toBe(false));
        tiles.forEach((n) => expect(n.hasAttribute("style")).toBe(false));
    });
});

describe("WCAG contrast", () => {
    const block = (re) => theme.match(re)[0];
    const light = block(/:root,\s*:root\[data-theme="light"\]\s*\{[\s\S]*?\n\}/);
    const dark = block(/:root\[data-theme="dark"\]\s*\{[\s\S]*?\n\}/);
    const tok = (b, name) => {
        const m = b.match(new RegExp("--" + name + ":\\s*(#[0-9a-fA-F]{6})"));
        if (!m) throw new Error("token missing " + name);
        return m[1];
    };
    const lum = (hex) => {
        const [r, g, b] = [1, 3, 5].map((i) => {
            const v = parseInt(hex.slice(i, i + 2), 16) / 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => {
        const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
        return (hi + 0.05) / (lo + 0.05);
    };
    const cases = [
        ["light", light, "ink", "bg-page"],
        ["light", light, "muted", "bg-page"],
        ["light", light, "muted", "bg-panel"],
        ["light", light, "accent-text", "bg-page"],
        ["light", light, "on-accent", "accent"],
        ["dark", dark, "ink", "bg-page"],
        ["dark", dark, "muted", "bg-page"],
        ["dark", dark, "muted", "bg-card-a"],
        ["dark", dark, "accent-text", "bg-page"],
        ["dark", dark, "on-accent", "accent"],
    ];
    test.each(cases)("%s: %s on %s >= 4.5", (_n, b, fg, bg) => {
        expect(ratio(tok(b, fg), tok(b, bg))).toBeGreaterThanOrEqual(4.5);
    });
});
