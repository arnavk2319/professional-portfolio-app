import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import fs from "fs";
import path from "path";
import PortfolioPage from "views/examples/PortfolioPage";
import ProjectsPage from "views/examples/ProjectsPage";
import HistoryPage from "views/examples/HistoryPage";
import ContactPage from "views/examples/ContactPage";

const pages = [
    ["PortfolioPage", PortfolioPage, "/portfolio"],
    ["ProjectsPage", ProjectsPage, "/projects"],
    ["HistoryPage", HistoryPage, "/history"],
    ["ContactPage", ContactPage, "/contact-me"],
];

const render = (Page, url) => {
    const c = document.createElement("div");
    document.body.appendChild(c);
    act(() => {
        ReactDOM.render(<MemoryRouter initialEntries={[url]}><Page /></MemoryRouter>, c);
    });
    return c;
};

const accName = (el, root) => {
    if ((el.textContent || "").trim()) return true;
    if ((el.getAttribute("aria-label") || "").trim()) return true;
    const by = el.getAttribute("aria-labelledby");
    if (by) return by.split(/\s+/).some((id) => {
        const t = root.querySelector("#" + id);
        return t && t.textContent.trim();
    });
    return false;
};

afterEach(() => { document.body.innerHTML = ""; });

describe.each(pages)("%s accessibility", (name, Page, url) => {
    let c;
    beforeEach(() => { c = render(Page, url); });

    test("exactly one h1", () => {
        expect(c.querySelectorAll("h1").length).toBe(1);
    });

    test("heading levels never skip downward and none are empty", () => {
        const hs = [...c.querySelectorAll("h1,h2,h3,h4,h5,h6")];
        hs.forEach((h) => expect(h.textContent.trim().length).toBeGreaterThan(0));
        const levels = hs.map((h) => Number(h.tagName[1]));
        expect(levels[0]).toBe(1);
        for (let i = 1; i < levels.length; i++) {
            expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
        }
    });

    test("skip link targets an existing <main>", () => {
        const skip = c.querySelector("a.art-skip-link");
        expect(skip).not.toBeNull();
        expect(skip.getAttribute("href")).toBe("#main-content");
        const target = c.querySelector("#main-content");
        expect(target).not.toBeNull();
        expect(target.tagName).toBe("MAIN");
    });

    test("landmarks present", () => {
        expect(c.querySelectorAll("main").length).toBe(1);
        const nav = c.querySelector("nav[aria-label]");
        expect(nav).not.toBeNull();
        expect(nav.getAttribute("aria-label").trim()).not.toBe("");
        expect(c.querySelector("header")).not.toBeNull();
        expect(c.querySelector("footer")).not.toBeNull();
    });

    test("every link and button has an accessible name", () => {
        const els = [...c.querySelectorAll("a, button")];
        expect(els.length).toBeGreaterThan(0);
        els.forEach((el) => {
            expect(accName(el, c)).toBe(true);
        });
    });

    test("fa- icons are aria-hidden", () => {
        const icons = [...c.querySelectorAll("i, span, svg")].filter((e) =>
            [...e.classList].some((k) => /^fa[a-z]?$|^fa-/.test(k)));
        expect(icons.length).toBeGreaterThan(0);
        icons.forEach((i) => expect(i.getAttribute("aria-hidden")).toBe("true"));
    });

    test("mailto links do not open a new tab", () => {
        c.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
            expect(a.getAttribute("target")).not.toBe("_blank");
        });
    });

    test("no img without alt", () => {
        c.querySelectorAll("img").forEach((i) => expect(i.hasAttribute("alt")).toBe(true));
    });
});

describe("home page KPI labels", () => {
    test("are not headings", () => {
        const c = render(PortfolioPage, "/portfolio");
        const kpi = c.querySelectorAll('[class*="kpi"]');
        expect(kpi.length).toBeGreaterThan(0);
        kpi.forEach((k) => {
            expect(k.matches("h1,h2,h3,h4,h5,h6")).toBe(false);
            expect(k.querySelector("h1,h2,h3,h4,h5,h6")).toBeNull();
        });
    });
});

describe("static stylesheet checks", () => {
    const dir = path.resolve(__dirname, "assets/scss");
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
    const files = walk(dir).filter((f) => f.endsWith(".scss"));
    const all = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");

    test(":focus-visible rule exists", () => {
        expect(all).toMatch(/:focus-visible/);
    });
    test("collapsed menu uses visibility: hidden", () => {
        const menu = fs.readFileSync(path.join(dir, "now-ui-kit/_art-menu-bar.scss"), "utf8");
        expect(menu).toMatch(/visibility:\s*hidden/);
    });
    test(".art-sr-only is defined", () => {
        expect(all).toMatch(/\.art-sr-only\s*\{/);
    });
});
