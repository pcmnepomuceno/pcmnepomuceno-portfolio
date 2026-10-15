import { statusLabels, type Project } from "@/content";

// Hanko-style status label: static, not focusable, no hover, so it never reads as a button.
export default function Stamp({ status }: { status: NonNullable<Project["status"]> }) {
  return (
    <span className="inline-flex shrink-0 -rotate-2 rounded-sm border-2 border-accent px-1.5 py-0.5 font-mono text-xs uppercase tracking-wide text-accent">
      {statusLabels[status]}
    </span>
  );
}
