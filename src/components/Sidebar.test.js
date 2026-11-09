import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { Sidebar } from "components/Sidebar";
import profile from "data/profile";

const click = (el) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
const down = (el) => act(() => { el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true })); });

describe("Sidebar", () => {
    let c;
    beforeEach(() => { c = document.createElement("div"); document.body.appendChild(c); act(() => { ReactDOM.render(<Sidebar />, c); }); });
    afterEach(() => { ReactDOM.unmountComponentAtNode(c); document.body.innerHTML = ""; });

    test("shows photo with alt, name, location, contact and resume", () => {
        const a = c.querySelector("aside#contact");
        expect(a.querySelector("img.ed-photo").getAttribute("alt")).toContain(profile.name);
        expect(a.querySelector(".ed-profile-name").textContent).toBe(profile.name);
        expect(a.textContent).toContain(profile.location);
        expect(a.querySelector('a[href^="mailto:"]')).not.toBeNull();
        expect(a.querySelector("a[download]").getAttribute("href")).toBe(profile.resumeUrl);
    });

    test("toggle opens, outside click closes, Escape closes", () => {
        const b = c.querySelector(".ed-sidebar-toggle");
        const a = c.querySelector("aside");
        click(b);
        expect(a.classList.contains("is-open")).toBe(true);
        expect(b.getAttribute("aria-expanded")).toBe("true");
        down(a);
        expect(a.classList.contains("is-open")).toBe(true);
        down(document.body);
        expect(a.classList.contains("is-open")).toBe(false);
        click(b);
        act(() => { document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true })); });
        expect(a.classList.contains("is-open")).toBe(false);
    });
});
