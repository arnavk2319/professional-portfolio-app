export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_title: document.title,
    });
  }
};

export const trackEvent = (action, params) => {
  if (window.gtag) {
    window.gtag('event', action, params);
  }
};
