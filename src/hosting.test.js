const fs = require('fs');
const path = require('path');

const read = (p) => fs.readFileSync(path.resolve(__dirname, '..', p), 'utf8');

// Every page except "/" is a client-side route. The menu uses plain <a href>, so each click is a
// full page load that the host must rewrite to index.html or the visitor sees a 404.
describe('static host SPA rewrite', () => {
  test('render.yaml rewrites /* to /index.html', () => {
    const y = read('render.yaml');
    expect(y).toMatch(/type:\s*rewrite/);
    expect(y).toMatch(/source:\s*\/\*/);
    expect(y).toMatch(/destination:\s*\/index\.html/);
    expect(y).toMatch(/staticPublishPath:\s*build/);
  });
  test('public/_redirects keeps the Netlify-style fallback', () => {
    expect(read('public/_redirects')).toMatch(/\/\*\s+\/index\.html\s+200/);
  });
});

// The editorial page needs no rewrite: every section lives in the one document at "/".
describe('no host rewrite needed', () => {
  const home = read('src/views/HomePage.js');
  test('section index uses plain #anchors to ids that exist on the page', () => {
    const idx = read('src/components/SectionIndex.js');
    const ids = [...idx.matchAll(/id:\s*"([a-z]+)"/g)].map((m) => m[1]);
    expect(ids).toEqual(['summary', 'experience', 'projects', 'education', 'skills']);
    expect(idx).toMatch(/href=\{"#" \+ s\.id\}/);
    ids.forEach((id) => expect(home).toMatch(new RegExp('id="' + id + '"')));
    expect(read('src/components/Sidebar.js')).toMatch(/id="contact"/);
  });
  test('no in-page link points at a route path', () => {
    expect(home).not.toMatch(/href="\/(projects|history|contact-me|portfolio)/);
  });
  test('index.html is a plain SPA shell with a root node', () => {
    expect(read('public/index.html')).toMatch(/<div id="root"><\/div>/);
  });
});

describe('production build needs only index.html', () => {
  const idx = path.resolve(__dirname, '..', 'build/index.html');
  (fs.existsSync(idx) ? test : test.skip)('build/index.html is a shell with a root node and one main bundle', () => {
    const html = fs.readFileSync(idx, 'utf8');
    expect(html).toContain('<div id="root"></div>');
    expect(html).toMatch(/static\/js\/main\.[a-z0-9]+\.chunk\.js/);
  });
});
