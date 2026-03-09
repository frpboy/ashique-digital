"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import dynamic from "next/dynamic";

const DataTrail = dynamic(() => import("@/components/visuals/DataNodeTrail"), { ssr: false });

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      {children}
      <DataTrail />
    </PHProvider>
  );
}
