import Link from "next/link";

export function Brand({
  size = "md",
  href = "/",
}: {
  size?: "md" | "lg";
  href?: string | null;
}) {
  const cls = size === "lg" ? "r-brand r-brand-lg" : "r-brand";
  const inner = (
    <>
      <span className="rtile">R</span>
      <span className="txt">
        allyt<span className="i">i</span>c
      </span>
    </>
  );
  if (href === null) {
    return <div className={cls}>{inner}</div>;
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
