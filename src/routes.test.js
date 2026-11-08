import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import AppRoutes from "AppRoutes";

let c, loc;
const go = (url) => {
    c = document.createElement("div");
    document.body.appendChild(c);
    act(() => {
        ReactDOM.render(
            <MemoryRouter initialEntries={[url]}>
                <AppRoutes />
                <Route render={({ location }) => { loc = location; return null; }} />
            </MemoryRouter>, c);
    });
};
beforeEach(() => { Element.prototype.scrollIntoView = jest.fn(); });
afterEach(() => { ReactDOM.unmountComponentAtNode(c); c.remove(); delete Element.prototype.scrollIntoView; });

describe("routing", () => {
    test.each(["/", "/portfolio", "/index"])("%s renders the page", (u) => {
        go(u);
        expect(c.querySelector("h1")).not.toBeNull();
        expect(loc.pathname).toBe(u);
    });
    test.each([
        ["/projects", "#projects"],
        ["/history", "#education"],
        ["/contact-me", "#contact"],
    ])("legacy %s redirects to /%s and renders the page", (from, hash) => {
        go(from);
        expect(loc.pathname).toBe("/");
        expect(loc.hash).toBe(hash);
        expect(c.querySelector("h1")).not.toBeNull();
    });
    test.each(["/nope", "/certifications", "/a/b/c"])("unknown %s redirects to / without error", (u) => {
        go(u);
        expect(loc.pathname).toBe("/");
        expect(c.querySelectorAll("h1")).toHaveLength(1);
    });
});

describe("hash scrolling", () => {
    test("scrolls to the section named in the URL on load", () => {
        go("/#projects");
        expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
        expect(Element.prototype.scrollIntoView.mock.instances[0].id).toBe("projects");
    });
    test("scrolls after a legacy redirect", () => {
        go("/contact-me");
        expect(Element.prototype.scrollIntoView.mock.instances.some((e) => e.id === "contact")).toBe(true);
    });
    test("scrolls on hashchange and ignores unknown ids", () => {
        go("/");
        Element.prototype.scrollIntoView.mockClear();
        window.location.hash = "#skills";
        act(() => { window.dispatchEvent(new Event("hashchange")); });
        expect(Element.prototype.scrollIntoView.mock.instances.map((e) => e.id)).toContain("skills");
        Element.prototype.scrollIntoView.mockClear();
        window.location.hash = "#missing";
        act(() => { window.dispatchEvent(new Event("hashchange")); });
        expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
    });
    test("uses instant scrolling when reduced motion is requested", () => {
        window.matchMedia = jest.fn().mockReturnValue({ matches: true });
        go("/#skills");
        expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: "auto", block: "start" });
        delete window.matchMedia;
    });
});
