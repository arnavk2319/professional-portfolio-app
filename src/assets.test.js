const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const SCSS = path.join(SRC, "assets", "scss");

const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? walk(p) : [p];
      })
    : [];

const read = (f) => fs.readFileSync(f, "utf8");
const srcFiles = walk(SRC);
const jsFiles = srcFiles.filter((f) => f.endsWith(".js") && !f.endsWith(".test.js"));
const scssFiles = walk(SCSS).filter((f) => f.endsWith(".scss"));
const indexHtml = read(path.join(PUBLIC, "index.html"));
const manifest = read(path.join(PUBLIC, "manifest.json"));

describe("asset hygiene", () => {
  test("every image/public asset is referenced by name", () => {
    const exempt = ["index.html", "manifest.json", "_redirects", "robots.txt"];
    const haystack = [
      ...jsFiles.map(read),
      ...srcFiles.filter((f) => f.endsWith(".scss")).map(read),
      indexHtml,
      manifest,
    ].join("\n");
    const assets = [
      ...walk(path.join(SRC, "assets", "img")),
      ...walk(PUBLIC).filter((f) => !exempt.includes(path.basename(f))),
    ];
    const unused = assets
      .filter((f) => !haystack.includes(path.basename(f)))
      .map((f) => path.relative(ROOT, f));
    expect(unused).toEqual([]);
  });

  test("robots.txt exists and allows crawling", () => {
    const f = path.join(PUBLIC, "robots.txt");
    expect(fs.existsSync(f)).toBe(true);
    expect(read(f)).toContain("Allow: /");
  });

  test("dead selectors are absent from scss", () => {
    const css = scssFiles.map(read).join("\n");
    [".art-filter", ".art-tile", ".container-fluid-projects"].forEach((s) =>
      expect(css).not.toContain(s)
    );
  });

  test("Font Awesome link is consistent with icon usage", () => {
    const hasLink = /fontawesome/i.test(indexHtml);
    const used = jsFiles.some((f) => /["'`\s]fa[- ]|fa-[a-z]/.test(read(f)));
    if (hasLink) expect(used).toBe(true);
    else expect(used).toBe(false);
  });

  test("imports in src/index.js resolve to existing files", () => {
    const code = read(path.join(SRC, "index.js"));
    const specs = [...code.matchAll(/^\s*import\s+(?:[^"']*from\s+)?["']([^"']+)["']/gm)].map(
      (m) => m[1].split("?")[0]
    );
    const local = specs.filter(
      (s) => s.startsWith(".") || s.startsWith("assets/") || fs.existsSync(path.join(SRC, s))
    );
    expect(local.length).toBeGreaterThan(0);
    const missing = local.filter(
      (s) => !fs.existsSync(path.resolve(s.startsWith(".") ? SRC : SRC, s))
    );
    expect(missing).toEqual([]);
  });
});
