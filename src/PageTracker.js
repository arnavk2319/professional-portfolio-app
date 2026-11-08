import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./analytics"; // your analytics.js

export default function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
