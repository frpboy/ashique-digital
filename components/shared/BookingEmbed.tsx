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
      });
    })();
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "600px", background: "transparent" }}>
      <Cal
        namespace="strategy"
        calLink="frpboy/strategy"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
