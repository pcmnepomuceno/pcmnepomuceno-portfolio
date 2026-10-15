import { statusLabels, type Project } from "@/content";

// Hanko-style status label: static, not focusable, no hover, so it never reads as a button.
// Only shipped work gets the red seal; in-progress stays muted.
export default function Stamp({ status }: { status: NonNullable<Project["status"]> }) {
  const color = status === "live" ? "border-accent text-accent" : "border-muted text-muted";
  return (
    <span
      className={`inline-flex shrink-0 -rotate-2 rounded-sm border-2 px-1.5 py-0.5 font-mono text-xs uppercase tracking-wide ${color}`}
    >
      {statusLabels[status]}
    </span>
  );
}
