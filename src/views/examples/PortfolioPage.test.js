import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import fs from "fs";
import path from "path";
import PortfolioPage from "views/examples/PortfolioPage";
import profile from "data/profile";
import metrics from "data/metrics";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
        ReactDOM.render(
            <MemoryRouter><PortfolioPage /></MemoryRouter>,
            container
        );
    });
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
});

const root = path.resolve(__dirname, "../../..");

describe("PortfolioPage", () => {
    test("renders profile name, title, location and summary", () => {
        const text = container.textContent;
        [profile.name, profile.title, profile.location, profile.summary].forEach((v) => {
            expect(text).toContain(v);
        });
    });

    test("renders one KPI tile per metric with value and label, no extras", () => {
        const tiles = container.querySelectorAll(".art-kpi-list > li");
        expect(tiles).toHaveLength(metrics.length);
        const values = Array.from(container.querySelectorAll(".art-kpi-list .art-counter")).map((n) => n.textContent);
        expect(values).toEqual(metrics.map((m) => m.value));
        metrics.forEach((m, i) => {
            expect(tiles[i].textContent).toContain(m.label);
        });
    });

    test("Download resume link points at profile.resumeUrl", () => {
        const link = Array.from(container.querySelectorAll("a")).find((a) => /download resume/i.test(a.textContent));
        expect(link).toBeTruthy();
        expect(link.getAttribute("href")).toBe(profile.resumeUrl);
    });

    test("Sidebar shows email and phone, and no LinkedIn icon when linkedin is empty", () => {
        expect(profile.linkedin).toBe("");
        expect(container.textContent).toContain(profile.email);
        expect(container.textContent).toContain(profile.phone);
        expect(container.querySelector(".fa-linkedin")).toBeNull();
    });

    test("rendered output has no 'arnav'", () => {
        expect(container.textContent.toLowerCase()).not.toContain("arnav");
    });
});

describe("resume asset", () => {
    test("public PDF exists and is identical to the src/assets copy", () => {
        const pub = path.join(root, "public/Sakshi_Data_Analyst_Resume.pdf");
        const src = path.join(root, "src/assets/Sakshi_Data_Analyst_Resume.pdf");
        expect(fs.existsSync(pub)).toBe(true);
        expect(fs.readFileSync(pub).equals(fs.readFileSync(src))).toBe(true);
    });
});

describe("no hard-coded copy in views", () => {
    test("no view file contains '58 franchise'", () => {
        const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
            e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
        const offenders = walk(path.join(root, "src/views"))
            .filter((f) => /\.(js|jsx)$/.test(f) && !/\.test\.js$/.test(f))
            .filter((f) => /58 franchise/i.test(fs.readFileSync(f, "utf8")));
        expect(offenders).toEqual([]);
    });
});
