import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analyticsEnabled, initAnalytics, trackPageView } from "./analytics";

export default function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!analyticsEnabled()) return;
    initAnalytics();
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
