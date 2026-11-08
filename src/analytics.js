const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const GA_ID_PATTERN = /^[A-Za-z0-9-]{4,32}$/;

export const analyticsEnabled = () => Boolean(GA_ID) && GA_ID_PATTERN.test(GA_ID);

let initialized = false;

// Injects the gtag script only when REACT_APP_GA_MEASUREMENT_ID is set. No-op otherwise.
export const initAnalytics = () => {
  if (initialized || !analyticsEnabled() || typeof document === "undefined") return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
};

export const trackPageView = (url) => {
  if (analyticsEnabled() && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
    });
  }
};

export const trackEvent = (action, params) => {
  if (analyticsEnabled() && window.gtag) {
    window.gtag('event', action, params);
  }
};
