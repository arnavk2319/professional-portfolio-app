import fs from "fs";
import path from "path";
import profile, { LINKEDIN_URL } from "./profile";
import experience from "./experience";
import skills from "./skills";
import metrics from "./metrics";
import education from "./education";
import projects from "./projects";

describe("resume data modules", () => {
    test("experience has 4 entries with bullet counts 6,5,3,3", () => {
        expect(experience).toHaveLength(4);
        expect(experience.map((e) => e.bullets.length)).toEqual([6, 5, 3, 3]);
    });

    test("first experience entry is verbatim", () => {
        expect(experience[0].company).toBe("WOW1DAY Painting Inc.");
        expect(experience[0].role).toBe("Data Analyst");
        expect(experience[0].start).toBe("Nov 2024");
        expect(experience[0].end).toBe("Sep 2026");
    });

    test("other companies and date ranges are verbatim", () => {
        expect(experience.slice(1).map((e) => [e.company, e.start, e.end])).toEqual([
            ["JP Morgan Chase & Co.", "Jul 2021", "Aug 2022"],
            ["HFCL", "Jun 2020", "Aug 2020"],
            ["SpiceJet Pvt. Ltd.", "Jun 2019", "Aug 2019"],
        ]);
    });

    test("skills has 5 groups with items", () => {
        expect(skills).toHaveLength(5);
        expect(skills.map((s) => s.group)).toEqual([
            "Databases & SQL",
            "Visualization & BI",
            "Programming & Analytics",
            "Business & Customer Data",
            "Strengths",
        ]);
        skills.forEach((s) => expect(s.items.length).toBeGreaterThan(0));
    });

    test("every metric has a non-empty source", () => {
        expect(metrics.length).toBeGreaterThan(0);
        metrics.forEach((m) => {
            expect(typeof m.source).toBe("string");
            expect(m.source.trim()).not.toBe("");
        });
    });

    test("profile contact details exact, LinkedIn is the resume link", () => {
        expect(profile.email).toBe("sakshi1999lohia@gmail.com");
        expect(profile.phone).toBe("+1 (437) 673-8835");
        expect(LINKEDIN_URL).toBe("https://www.linkedin.com/in/sakshi-sakshi-32b510215/");
        expect(profile.linkedin).toBe(LINKEDIN_URL);
    });

    test("education and projects key strings", () => {
        expect(education.map((e) => e.school)).toEqual([
            "Northeastern University",
            "Netaji Subhas University of Technology",
        ]);
        expect(education[0].degree).toBe("Master of Science in Analytics");
        expect(projects.map((p) => p.name)).toContain("Yonge Street Mission Program Analysis");
    });

    test("no 'arnav' in data modules", () => {
        const dir = __dirname;
        fs.readdirSync(dir)
            .filter((f) => f.endsWith(".js") && f !== "data.test.js")
            .forEach((f) => {
                expect(fs.readFileSync(path.join(dir, f), "utf8").toLowerCase()).not.toContain("arnav");
            });
    });
});
