import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import HomePage from "views/HomePage";
import { SECTIONS } from "components/SectionIndex";

let c, observers;
const mount = () => {
    c = document.createElement("div");
    document.body.appendChild(c);
    act(() => { ReactDOM.render(<MemoryRouter><HomePage /></MemoryRouter>, c); });
};
afterEach(() => { ReactDOM.unmountComponentAtNode(c); c.remove(); delete window.IntersectionObserver; });

describe("section index", () => {
    test("labelled nav with plain #anchors in order, first marked current", () => {
        mount();
        const nav = c.querySelector("nav.ed-index");
        expect(nav.getAttribute("aria-label")).toBe("Sections");
        const links = [...nav.querySelectorAll("a")];
        expect(links.map((a) => a.getAttribute("href"))).toEqual(SECTIONS.map((s) => "#" + s.id));
        expect(links.map((a) => a.textContent)).toEqual(["Summary", "Experience", "Projects", "Education", "Skills", "Contact"]);
        expect(nav.querySelectorAll("[aria-current]")).toHaveLength(1);
        expect(links[0].hasAttribute("aria-current")).toBe(true);
    });
    test("works when IntersectionObserver is missing (jsdom / old browsers)", () => {
        expect(window.IntersectionObserver).toBeUndefined();
        expect(() => mount()).not.toThrow();
    });
    test("IntersectionObserver moves aria-current to the visible section and disconnects on unmount", () => {
        observers = [];
        window.IntersectionObserver = function (cb) {
            this.cb = cb; this.observed = []; this.disconnect = jest.fn();
            this.observe = (el) => this.observed.push(el);
            observers.push(this);
        };
        mount();
        const io = observers[0];
        expect(io.observed.map((e) => e.id)).toEqual(SECTIONS.map((s) => s.id));
        act(() => { io.cb([{ target: document.getElementById("education"), isIntersecting: true }]); });
        const cur = c.querySelectorAll("nav.ed-index [aria-current]");
        expect(cur).toHaveLength(1);
        expect(cur[0].getAttribute("href")).toBe("#education");
        act(() => { ReactDOM.unmountComponentAtNode(c); });
        expect(io.disconnect).toHaveBeenCalled();
    });
    test("clicking a link marks it current (keyboard Enter triggers click natively)", () => {
        mount();
        const a = c.querySelector('nav.ed-index a[href="#skills"]');
        act(() => { a.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
        expect(a.hasAttribute("aria-current")).toBe(true);
        expect(c.querySelectorAll("nav.ed-index [aria-current]")).toHaveLength(1);
    });
});
