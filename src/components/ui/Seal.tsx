// Brand seal: a vermilion square with the letter C. Decorative; the text beside it names the site.
// Fixed #D7261E in both themes (the vermilion token is lighter in dark); white on it is 5.02:1.
export default function Seal({ className = "size-7 text-sm" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center bg-[#d7261e] font-medium text-white ${className}`}
    >
      C
    </span>
  );
}
