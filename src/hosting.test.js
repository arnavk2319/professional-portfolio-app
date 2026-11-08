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
