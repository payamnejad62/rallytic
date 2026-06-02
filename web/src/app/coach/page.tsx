import Link from "next/link";

export default function CoachPlaceholder() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#0A0D0A",
        color: "#EAF0E6",
        fontFamily: "Barlow, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <div
          style={{
            fontSize: 10,
            letterSpacing: ".22em",
            color: "#A8D847",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Coach mode
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-.02em", margin: "10px 0 14px" }}>
          You&apos;re in. Dashboard ships next.
        </h1>
        <p style={{ color: "#9BA89B", fontSize: 14, lineHeight: 1.6 }}>
          Step 1 of the build is complete (mode select, sign up, sign in, forgot password).
          The coach dashboard, player roster and the rest of the coach screens are queued in
          step 2.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center" }}>
          <Link href="/" className="btn btn-ghost">
            ← Back to mode select
          </Link>
          <Link href="/signin" className="btn btn-soft">
            Sign in again
          </Link>
        </div>
      </div>
    </div>
  );
}
