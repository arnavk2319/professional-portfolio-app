const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const pkg = JSON.parse(read('package.json'));
const html = read('public/index.html');
const manifestText = read('public/manifest.json');
const manifest = JSON.parse(manifestText);

describe('package.json', () => {
  test('name contains sakshi', () => {
    expect(pkg.name.toLowerCase()).toContain('sakshi');
  });
  test('no homepage', () => {
    expect(pkg).not.toHaveProperty('homepage');
  });
  test('no predeploy/deploy scripts', () => {
    const scripts = pkg.scripts || {};
    expect(scripts).not.toHaveProperty('predeploy');
    expect(scripts).not.toHaveProperty('deploy');
  });
  test('no gh-pages dependency', () => {
    expect((pkg.devDependencies || {})['gh-pages']).toBeUndefined();
    expect((pkg.dependencies || {})['gh-pages']).toBeUndefined();
  });
});

describe('public files are free of old branding', () => {
  test.each([
    ['index.html', html],
    ['manifest.json', manifestText],
  ])('%s has no arnav/herokuapp/gh-pages', (_n, text) => {
    expect(text).not.toMatch(/arnav|herokuapp|gh-pages/i);
  });
});

describe('index.html metadata', () => {
  const tag = (re) => {
    const m = html.match(re);
    return m ? m[1] : null;
  };
  test('title mentions Sakshi', () => {
    expect(tag(/<title>([^<]*)<\/title>/i)).toMatch(/sakshi/i);
  });
  test.each([
    ['meta description', /<meta\s+name="description"\s+content="([^"]*)"/i],
    ['og:title', /<meta\s+property="og:title"\s+content="([^"]*)"/i],
    ['twitter:card', /<meta\s+name="twitter:card"\s+content="([^"]*)"/i],
    ['twitter:title', /<meta\s+name="twitter:title"\s+content="([^"]*)"/i],
  ])('%s is present', (_n, re) => {
    expect(tag(re)).toBeTruthy();
  });
  test.each([
    ['description', /<meta\s+name="description"\s+content="([^"]*)"/i],
    ['og:title', /<meta\s+property="og:title"\s+content="([^"]*)"/i],
    ['twitter:title', /<meta\s+name="twitter:title"\s+content="([^"]*)"/i],
  ])('%s mentions Sakshi', (_n, re) => {
    expect(tag(re)).toMatch(/sakshi/i);
  });
});

describe('manifest.json', () => {
  test('names mention Sakshi', () => {
    expect(manifest.name).toMatch(/sakshi/i);
    expect(manifest.short_name).toMatch(/sakshi/i);
  });
});

describe('public assets', () => {
  test.each(['favicon.png', 'apple-icon.png', '_redirects'])('%s exists', (f) => {
    expect(fs.existsSync(path.join(root, 'public', f))).toBe(true);
  });
});
