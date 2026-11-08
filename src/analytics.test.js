const ENV_KEY = "REACT_APP_GA_MEASUREMENT_ID";
const ORIGINAL = process.env[ENV_KEY];

const load = (id) => {
  if (id === undefined) delete process.env[ENV_KEY];
  else process.env[ENV_KEY] = id;
  jest.resetModules();
  return require("./analytics");
};

const scripts = () => document.head.querySelectorAll('script[src*="googletagmanager"]');

beforeEach(() => {
  document.head.innerHTML = "";
  delete window.gtag;
  delete window.dataLayer;
});

afterAll(() => {
  if (ORIGINAL === undefined) delete process.env[ENV_KEY];
  else process.env[ENV_KEY] = ORIGINAL;
});

describe("analytics without a measurement id", () => {
  test("analyticsEnabled is false", () => {
    expect(load(undefined).analyticsEnabled()).toBe(false);
  });

  test("empty string is disabled", () => {
    expect(load("").analyticsEnabled()).toBe(false);
  });

  test("init/track calls are silent no-ops", () => {
    const a = load(undefined);
    expect(() => {
      a.initAnalytics();
      a.trackPageView("/x");
      a.trackEvent("click", { a: 1 });
    }).not.toThrow();
    expect(scripts()).toHaveLength(0);
    expect(document.head.querySelectorAll("script")).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer).toBeUndefined();
  });

  test("does not call a pre-existing gtag", () => {
    const a = load(undefined);
    window.gtag = jest.fn();
    a.trackPageView("/x");
    a.trackEvent("click");
    expect(window.gtag).not.toHaveBeenCalled();
  });
});

describe("analytics with a valid dummy id", () => {
  const ID = "G-TEST1234";

  test("analyticsEnabled is true", () => {
    expect(load(ID).analyticsEnabled()).toBe(true);
  });

  test("initAnalytics injects exactly one script, even if called twice", () => {
    const a = load(ID);
    a.initAnalytics();
    a.initAnalytics();
    const found = scripts();
    expect(found).toHaveLength(1);
    expect(found[0].src).toContain(`id=${ID}`);
    expect(typeof window.gtag).toBe("function");
  });

  test("track functions push events after init", () => {
    const a = load(ID);
    a.initAnalytics();
    const before = window.dataLayer.length;
    a.trackPageView("/p");
    a.trackEvent("click", { k: "v" });
    expect(window.dataLayer.length).toBe(before + 2);
  });
});

describe("invalid ids are rejected", () => {
  test.each([
    ['G-TEST"1234'],
    ["G-TEST 1234"],
    ["G-TEST');alert(1)//"],
    ["abc"],
    ["<script>"],
  ])("%s", (bad) => {
    const a = load(bad);
    expect(a.analyticsEnabled()).toBe(false);
    a.initAnalytics();
    a.trackEvent("x");
    expect(document.head.querySelectorAll("script")).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
  });
});
