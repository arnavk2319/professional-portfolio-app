const React = require('react');
const ReactDOM = require('react-dom');
const { act } = require('react-dom/test-utils');
const { MemoryRouter } = require('react-router-dom');
const ContactPage = require('./ContactPage').default;
const ContactGrid = require('./ContactGrid').default;
const profile = require('data/profile').default;

const mount = (el) => {
    const c = document.createElement('div');
    document.body.appendChild(c);
    act(() => { ReactDOM.render(el, c); });
    return c;
};

test('contact page shows mailto, tel, location and resume', () => {
    const c = mount(React.createElement(MemoryRouter, { initialEntries: ['/contact-me'] }, React.createElement(ContactPage)));
    expect(c.querySelector('a[href="mailto:' + profile.email + '"]')).not.toBeNull();
    expect(c.querySelector('a[href^="tel:"]')).not.toBeNull();
    expect(c.textContent).toContain('Toronto, ON');
    expect(c.querySelector('a[download]').getAttribute('href')).toBe(profile.resumeUrl);
    expect(c.querySelector('form')).toBeNull();
});

test('LinkedIn tile hidden when empty, shown with rel when set', () => {
    let c = mount(React.createElement(ContactGrid, { profile: { ...profile, linkedin: '' } }));
    expect(c.querySelector('a[href*="linkedin"]')).toBeNull();
    c = mount(React.createElement(ContactGrid, { profile: { ...profile, linkedin: 'https://www.linkedin.com/in/x' } }));
    const a = c.querySelector('a[href*="linkedin"]');
    expect(a.getAttribute('rel')).toBe('noopener noreferrer');
    expect(a.getAttribute('target')).toBe('_blank');
});
