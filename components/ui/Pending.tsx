export function Pending({ children = "To be confirmed" }: { children?: React.ReactNode }) {
  return <span className="text-ink-subtle">{children}</span>;
}
