import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import fs from "fs";
import path from "path";
import { MenuBar } from "components/MenuBar";
import PortfolioPage from "views/examples/PortfolioPage";
import ContactPage from "views/examples/ContactPage";

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
const mountMenu = () => mount(
    <MemoryRouter><MenuBar isActive={true} onToggle={() => {}} currentHref="/portfolio" currentLabel="Home" /></MemoryRouter>
);

describe("ThemeToggle", () => {
    afterEach(() => {
        jest.restoreAllMocks();
        document.documentElement.removeAttribute("data-theme");
        document.body.innerHTML = "";
    });

    test("renders button with aria-pressed and text label", () => {
        const c = mountMenu();
        const b = c.querySelector("button.art-theme-toggle");
        expect(b).not.toBeNull();
        expect(b.getAttribute("aria-pressed")).toBe("false");
        expect(b.textContent.trim().length).toBeGreaterThan(0);
    });

    test("click flips data-theme and persists in localStorage", () => {
        const set = jest.spyOn(Storage.prototype, "setItem");
        const c = mountMenu();
        const b = c.querySelector("button.art-theme-toggle");
        act(() => { b.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
        expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
        expect(b.getAttribute("aria-pressed")).toBe("true");
        expect(set).toHaveBeenCalledWith("theme", "dark");
        act(() => { b.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
        expect(document.documentElement.getAttribute("data-theme")).toBe("light");
        expect(b.getAttribute("aria-pressed")).toBe("false");
        expect(set).toHaveBeenCalledWith("theme", "light");
    });

    test("still works when localStorage throws", () => {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("denied"); });
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("denied"); });
        const c = mountMenu();
        const b = c.querySelector("button.art-theme-toggle");
        act(() => { b.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
        expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });
});

describe("static theme checks", () => {
    test("tokens defined for light (default) and dark", () => {
        expect(theme).toMatch(/:root,\s*:root\[data-theme="light"\]\s*\{/);
        expect(theme).toMatch(/:root\[data-theme="dark"\]\s*\{/);
    });

    test("index.html has one Google Fonts stylesheet with display=swap, Inter, IBM Plex Sans", () => {
        const html = read("public/index.html");
        const links = (html.match(/<link[^>]*>/g) || []).filter(
            (l) => /rel="stylesheet"/.test(l) && /fonts\.googleapis\.com/.test(l)
        );
        expect(links).toHaveLength(1);
        expect(links[0]).toContain("display=swap");
        expect(links[0]).toContain("Inter");
        expect(links[0]).toContain("IBM+Plex+Sans");
    });

    test("DEFAULT_THEME is light", () => {
        expect(read("public/index.html")).toMatch(/var DEFAULT_THEME = "light"/);
    });

    test("no Montserrat/Poppins/Courier references", () => {
        const files = ["public/index.html"].concat(
            fs.readdirSync(path.join(root, scssDir)).filter((f) => f.endsWith(".scss")).map((f) => scssDir + "/" + f)
        );
        files.forEach((f) => expect({ f, hit: /montserrat|poppins|courier/i.test(read(f)) }).toEqual({ f, hit: false }));
    });

    test("no inline style on KPI list or contact tiles", () => {
        const p = mount(<MemoryRouter><PortfolioPage /></MemoryRouter>);
        const c = mount(<MemoryRouter><ContactPage /></MemoryRouter>);
        const kpi = p.querySelectorAll(".art-kpi-list, .art-kpi-list *");
        const tiles = c.querySelectorAll(".contact-tile");
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
