import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import fs from "fs";
import path from "path";
import HomePage from "views/HomePage";
import ContactGrid from "components/ContactGrid";
import profile from "data/profile";
import metrics from "data/metrics";
import experience from "data/experience";
import projects from "data/projects";
import education from "data/education";
import skills from "data/skills";

let c;
beforeEach(() => {
    c = document.createElement("div");
    document.body.appendChild(c);
    act(() => { ReactDOM.render(<MemoryRouter><HomePage /></MemoryRouter>, c); });
});
afterEach(() => { ReactDOM.unmountComponentAtNode(c); c.remove(); });

const mount = (el) => {
    const d = document.createElement("div");
    document.body.appendChild(d);
    act(() => { ReactDOM.render(el, d); });
    return d;
};

describe("summary", () => {
    test("headline phrase, summary, name, title, location", () => {
        expect(profile.headline).toBe("turning raw data into stories that drive decisions");
        expect(profile.summary).toContain(profile.headline);
        expect(c.querySelector("h1").textContent.toLowerCase()).toBe(profile.headline);
        expect(c.querySelector("h1 em").textContent).toBe(profile.headlineAccent);
        [profile.name, profile.title, profile.location, profile.summary].forEach((v) => expect(c.textContent).toContain(v));
    });
    test("one KPI tile per metric, values and labels from metrics.js", () => {
        const tiles = c.querySelectorAll(".art-kpi-list > li");
        expect(tiles).toHaveLength(metrics.length);
        expect([...c.querySelectorAll(".art-kpi-list .art-counter")].map((n) => n.textContent)).toEqual(metrics.map((m) => m.value));
        metrics.forEach((m, i) => expect(tiles[i].textContent).toContain(m.label));
    });
    test("Download resume links equal profile.resumeUrl", () => {
        const links = [...c.querySelectorAll("a")].filter((a) => /download resume/i.test(a.textContent));
        expect(links.length).toBeGreaterThanOrEqual(2);
        links.forEach((a) => expect(a.getAttribute("href")).toBe(profile.resumeUrl));
    });
});

describe("experience ledger", () => {
    test("4 employers with 6/5/3/3 bullets verbatim and resume dates", () => {
        const arts = c.querySelectorAll("#experience article");
        expect(arts).toHaveLength(4);
        expect([...arts].map((a) => a.querySelectorAll("li").length)).toEqual([6, 5, 3, 3]);
        experience.forEach((job, i) => {
            expect([...arts[i].querySelectorAll("li")].map((l) => l.textContent)).toEqual(job.bullets);
            expect(arts[i].querySelector(".ed-date").textContent).toBe(job.start + " - " + job.end);
            expect(arts[i].querySelector("h3").textContent).toContain(job.company);
        });
    });
});

describe("projects, education, skills", () => {
    test("2 projects from data with roles", () => {
        const arts = c.querySelectorAll("#projects article");
        expect(arts).toHaveLength(2);
        expect([...arts].map((a) => a.querySelector("h3").textContent)).toEqual(projects.map((p) => p.name));
        projects.forEach((p, i) => p.bullets.forEach((b) => expect(arts[i].textContent).toContain(b)));
        expect(arts[1].textContent).toContain("Team Lead");
    });
    test("both degrees and the Northeastern coursework", () => {
        const arts = c.querySelectorAll("#education article");
        expect(arts).toHaveLength(2);
        education.forEach((ed, i) => {
            expect(arts[i].textContent).toContain(ed.school);
            expect(arts[i].textContent).toContain(ed.degree);
        });
        expect(c.querySelector("#education").textContent).toContain(
            "Data Analytics, Statistical Modelling, Business Intelligence, Operations Research");
    });
    test("5 skill groups with all items", () => {
        const groups = c.querySelectorAll("#skills .ed-skill-group");
        expect(groups).toHaveLength(5);
        skills.forEach((s, i) => expect(groups[i].querySelectorAll("li")).toHaveLength(s.items.length));
    });
});

describe("contact", () => {
    test("mailto, tel, location, resume and LinkedIn with rel", () => {
        const s = c.querySelector("#contact");
        expect(s.querySelector('a[href="mailto:' + profile.email + '"]')).not.toBeNull();
        expect(s.querySelector('a[href^="tel:"]')).not.toBeNull();
        expect(s.textContent).toContain("Toronto, ON");
        expect(s.querySelector("a[download]").getAttribute("href")).toBe(profile.resumeUrl);
        const li = s.querySelector('a[href*="linkedin.com"]');
        expect(li.getAttribute("href")).toBe("https://www.linkedin.com/in/sakshi-sakshi-32b510215/");
        expect(li.getAttribute("rel")).toBe("noopener noreferrer");
        expect(li.getAttribute("target")).toBe("_blank");
        expect(li.textContent).toContain("LinkedIn:");
        expect(li.textContent).toContain("sakshi-sakshi-32b510215");
        expect(li.textContent).not.toContain("LinkedIn profile");
        expect(s.querySelectorAll(".contact-tile")).toHaveLength(4);
        expect(s.querySelector("form")).toBeNull();
    });
    test("LinkedIn shows a muted placeholder, not a link, when no URL is set", () => {
        const d = mount(<ContactGrid profile={{ ...profile, linkedin: "" }} />);
        expect(d.querySelector('a[href*="linkedin"]')).toBeNull();
        expect(d.querySelector(".ed-placeholder").textContent).toBe("Add link");
    });
});

describe("placeholders", () => {
    test("each project without a link shows a marked 'Add link' placeholder and no invented URL", () => {
        projects.forEach((p) => expect(p.link).toBe(""));
        const ph = c.querySelectorAll("#projects .ed-placeholder");
        expect(ph).toHaveLength(projects.length);
        ph.forEach((n) => expect(n.textContent).toBe("Add link"));
        expect(c.querySelectorAll("#projects a")).toHaveLength(0);
    });
});

describe("views and global content rules", () => {
    test("no 'arnav' or 'ml engineer' in output", () => {
        const t = c.textContent.toLowerCase();
        expect(t).not.toContain("arnav");
        expect(t).not.toContain("ml engineer");
    });
    test("no resume text hard-coded in view sources", () => {
        const dirs = ["views", "components"].map((d) => path.join(__dirname, "..", d));
        const files = dirs.flatMap((d) => fs.readdirSync(d).filter((f) => f.endsWith(".js") && !f.endsWith(".test.js")).map((f) => path.join(d, f)));
        files.forEach((f) => {
            const src = fs.readFileSync(f, "utf8");
            ["WOW1DAY", "JP Morgan", "HFCL", "SpiceJet", "Northeastern", "Netaji", "58 franchise", "Tableau", "Redshift"].forEach((n) => expect(src).not.toContain(n));
        });
    });
    test("resume PDF in public equals src/assets copy", () => {
        const root = path.resolve(__dirname, "../..");
        const a = fs.readFileSync(path.join(root, "public/Sakshi_Data_Analyst_Resume.pdf"));
        const b = fs.readFileSync(path.join(root, "src/assets/Sakshi_Data_Analyst_Resume.pdf"));
        expect(a.equals(b)).toBe(true);
    });
});
