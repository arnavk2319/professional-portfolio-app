const React = require('react');
const fs = require('fs');
const path = require('path');
const ReactDOM = require('react-dom');
const { act } = require('react-dom/test-utils');
const { MemoryRouter } = require('react-router-dom');
const HistoryPage = require('./HistoryPage').default;

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
        ReactDOM.render(
            React.createElement(MemoryRouter, { initialEntries: ['/history'] },
                React.createElement(HistoryPage)),
            container
        );
    });
});

afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
});

describe('HistoryPage render', () => {
    test('renders 4 employers with 6,5,3,3 bullets', () => {
        const section = container.querySelector('section[aria-labelledby="history-experience"]');
        const articles = section.querySelectorAll('article');
        expect(articles.length).toBe(4);
        expect(Array.from(articles).map((a) => a.querySelectorAll('li').length)).toEqual([6, 5, 3, 3]);
    });

    test('renders both degrees and Northeastern coursework', () => {
        const section = container.querySelector('section[aria-labelledby="history-education"]');
        expect(section.querySelectorAll('article').length).toBe(2);
        expect(section.textContent).toContain('Northeastern University');
        expect(section.textContent).toContain('Netaji Subhas University of Technology');
        expect(section.textContent).toContain(
            'Data Analytics, Statistical Modelling, Business Intelligence, Operations Research');
    });

    test('renders 5 skill groups', () => {
        const skills = container.querySelector('#history-skills').closest('.art-section-title').parentElement;
        const groups = skills.querySelectorAll('.art-timeline-content h3');
        expect(groups.length).toBe(5);
    });

    test('shows dates as in the resume', () => {
        expect(container.textContent).toContain('Nov 2024 - Sep 2026');
    });

    test('contains no Arnav or ML Engineer text', () => {
        const text = container.textContent.toLowerCase();
        expect(text).not.toContain('arnav');
        expect(text).not.toContain('ml engineer');
    });
});

describe('HistoryPage source', () => {
    test('has no hard-coded employer names', () => {
        const src = fs.readFileSync(path.join(__dirname, 'HistoryPage.js'), 'utf8');
        ['WOW1DAY', 'JP Morgan', 'HFCL', 'SpiceJet', 'Northeastern', 'Netaji'].forEach((n) => {
            expect(src).not.toContain(n);
        });
    });
});
