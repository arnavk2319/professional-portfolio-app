import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import fs from "fs";
import path from "path";
import HomePage from "views/HomePage";
import AppRoutes from "AppRoutes";

const pages = [
    ["HomePage /", "/"],
    ["HomePage /portfolio alias", "/portfolio"],
];

const render = (url) => {
    const c = document.createElement("div");
    document.body.appendChild(c);
    act(() => {
        ReactDOM.render(<MemoryRouter initialEntries={[url]}><AppRoutes /></MemoryRouter>, c);
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

describe.each(pages)("%s accessibility", (name, url) => {
    let c;
    beforeEach(() => { c = render(url); });

    test("exactly one h1", () => {
        expect(c.querySelectorAll("h1").length).toBe(1);
    });

    test("heading levels never skip downward and none are empty", () => {
        const hs = [...c.querySelectorAll("h1,h2,h3,h4,h5,h6")];
        hs.forEach((h) => expect(h.textContent.trim().length).toBeGreaterThan(0));
        const levels = hs.map((h) => Number(h.tagName[1]));
        expect(levels[0]).toBe(1);
        expect(hs.filter((h) => h.tagName === "H2").map((h) => h.textContent)).toEqual(
            ["Experience", "Projects", "Education", "Skills", "Contact"]);
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

describe("home page structure", () => {
    test("KPI labels are not headings", () => {
        const c = render("/");
        const kpi = c.querySelectorAll('[class*="kpi"]');
        expect(kpi.length).toBeGreaterThan(0);
        kpi.forEach((k) => {
            expect(k.matches("h1,h2,h3,h4,h5,h6")).toBe(false);
            expect(k.querySelector("h1,h2,h3,h4,h5,h6")).toBeNull();
        });
    });
    test("six sections with stable ids, each labelled by its heading, in order", () => {
        const c = render("/");
        const secs = [...c.querySelectorAll("main > section")];
        expect(secs.map((s) => s.id)).toEqual(["summary", "experience", "projects", "education", "skills", "contact"]);
        secs.forEach((s) => {
            const h = c.querySelector("#" + s.getAttribute("aria-labelledby"));
            expect(h).not.toBeNull();
            expect(h.textContent.trim()).not.toBe("");
        });
    });
    test("no sidebar or sliding panel remains", () => {
        const c = render("/");
        expect(c.querySelector(".art-info-bar, .art-menu-bar, button[aria-expanded]")).toBeNull();
    });
});

describe("static stylesheet checks", () => {
    const dir = path.resolve(__dirname, "assets/scss");
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
    const all = walk(dir).filter((f) => f.endsWith(".scss")).map((f) => fs.readFileSync(f, "utf8")).join("\n");

    test(":focus-visible rule exists", () => {
        expect(all).toMatch(/:focus-visible/);
    });
    test(".art-sr-only is defined", () => {
        expect(all).toMatch(/\.art-sr-only\s*\{/);
    });
    test("smooth scrolling only when reduced motion is not requested", () => {
        expect(all).toMatch(/@media \(prefers-reduced-motion: no-preference\)\s*\{\s*html\s*\{\s*scroll-behavior:\s*smooth/);
    });
});
