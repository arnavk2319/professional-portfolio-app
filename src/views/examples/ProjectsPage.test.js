const React = require('react');
const fs = require('fs');
const path = require('path');
const ReactDOM = require('react-dom');
const { act } = require('react-dom/test-utils');
const { MemoryRouter } = require('react-router-dom');
const ProjectsPage = require('./ProjectsPage').default;
const projects = require('../../data/projects').default;

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDOM.render(
            React.createElement(MemoryRouter, { initialEntries: ['/projects'] },
                React.createElement(ProjectsPage)),
            container
        );
    });
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
});

describe('ProjectsPage render', () => {
    test('renders exactly 2 cards with names and roles from data', () => {
        const cards = container.querySelectorAll('article');
        expect(cards.length).toBe(2);
        expect(Array.from(cards).map((c) => c.querySelector('h3').textContent))
            .toEqual(projects.map((p) => p.name));
        expect(Array.from(cards).map((c) => c.textContent)).toEqual([
            expect.stringContaining('Analyst'),
            expect.stringContaining('Team Lead'),
        ]);
    });

    test('bullets are verbatim from data', () => {
        const cards = container.querySelectorAll('article');
        projects.forEach((p, i) => {
            const lis = Array.from(cards[i].querySelectorAll('li')).map((l) => l.textContent);
            expect(lis).toEqual(p.bullets);
        });
    });

    test('no filter tabs, buttons, images or external links in body', () => {
        const body = container.querySelector('article').closest('.container-fluid');
        expect(body.querySelectorAll('button, [role="tab"], [role="tablist"]').length).toBe(0);
        expect(container.querySelectorAll('img').length).toBe(0);
        const external = Array.from(body.querySelectorAll('a[href]'))
            .filter((a) => /^https?:/i.test(a.getAttribute('href')));
        expect(external.length).toBe(0);
    });

    test('rendered text has no arnav or github', () => {
        expect(container.textContent).not.toMatch(/arnav/i);
        expect(container.textContent).not.toMatch(/github/i);
    });
});

describe('ProjectsPage source', () => {
    const src = fs.readFileSync(path.join(__dirname, 'ProjectsPage.js'), 'utf8');
    test('no fetch or github', () => {
        expect(src).not.toContain('fetch(');
        expect(src.toLowerCase()).not.toContain('github');
    });
    test('no hard-coded project names', () => {
        expect(src).not.toContain('VIP Tires');
        expect(src).not.toContain('Yonge Street');
    });
});
