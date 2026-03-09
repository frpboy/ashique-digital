"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookingEmbed() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "strategy" });
      cal("ui", {
        theme: "dark",
        styles: {
          branding: {
            brandColor: "#00C2CB",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#00C2CB",
            "cal-brand-emphasis": "#009ca3",
            "cal-bg": "#ffffff",
            "cal-bg-emphasis": "#f8f9fa",
            "cal-text": "#0d1b2a",
            "cal-text-muted": "#64748b",
            "cal-border": "#e9ecef",
          },
          dark: {
            "cal-brand": "#00C2CB",
            "cal-brand-emphasis": "#009ca3",
            "cal-bg": "#0d1b2a",
            "cal-bg-emphasis": "#162c40",
            "cal-text": "#ffffff",
            "cal-text-muted": "#cbd5e1",
            "cal-border": "rgba(255,255,255,0.1)",
          },
        },
      });
      
      // Handle success redirect
      cal("on", {
        action: "bookingSuccessful",
        callback: (e: any) => {
          console.log("Booking successful", e);
          window.location.href = "/contact/success";
        },
      });
    })();
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "650px", background: "transparent" }}>
      <Cal
        namespace="strategy"
        calLink="frpboy/strategy"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ 
          layout: "month_view",
          useSlotsViewOnSmallScreen: "true"
        }}
      />
    </div>
  );
}
