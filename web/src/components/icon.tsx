export function Icon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <i
      className={`ti ti-${name}${className ? " " + className : ""}`}
      style={style}
      aria-hidden
    />
  );
}
