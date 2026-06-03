import { ReactNode } from "react";
import { Shell } from "@/components/shell";

export default function AcademyLayout({ children }: { children: ReactNode }) {
  return <Shell navSet="academy">{children}</Shell>;
}
