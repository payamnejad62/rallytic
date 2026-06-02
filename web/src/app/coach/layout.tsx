import { ReactNode } from "react";
import { Shell } from "@/components/shell";

export default function CoachLayout({ children }: { children: ReactNode }) {
  return <Shell navSet="coach">{children}</Shell>;
}
