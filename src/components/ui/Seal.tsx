// Brand seal: a vermilion square with the letter C. Decorative; the text beside it names the site.
// White on vermilion (not canvas) so the letter passes AA in both themes.
export default function Seal({ className = "size-7 text-sm" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center bg-vermilion font-medium text-white ${className}`}
    >
      C
    </span>
  );
}
