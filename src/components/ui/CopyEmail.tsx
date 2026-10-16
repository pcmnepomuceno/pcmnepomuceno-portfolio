"use client";

import { useRef, useState } from "react";
import { outlineLink } from "@/components/ui/links";
import { copyEmail, profile } from "@/content";

export default function CopyEmail() {
  const { email } = profile.links;
  const addressRef = useRef<HTMLAnchorElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [message, setMessage] = useState("");

  const show = (text: string) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 5000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      show(copyEmail.copied);
    } catch {
      // Clipboard missing or refused: select the address so the visitor can copy it.
      const range = document.createRange();
      range.selectNodeContents(addressRef.current!);
      const selection = getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      show(copyEmail.failed);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <a
          ref={addressRef}
          href={`mailto:${email}`}
          className="inline-flex min-h-11 items-center text-lg underline underline-offset-4 [overflow-wrap:anywhere] hover:text-accent motion-safe:transition-colors sm:text-xl"
        >
          {email}
        </a>
        <button type="button" onClick={copy} className={outlineLink}>
          {copyEmail.button}
        </button>
      </div>
      {/* Spoken once through the status region; the visible copy is hidden from readers so it is not read twice. */}
      <p role="status" className="sr-only">
        {message}
      </p>
      {/* Grid stack: an invisible copy of the longest message holds the height, so showing or clearing the message never moves what follows. */}
      <p aria-hidden="true" className="grid font-mono text-sm text-muted">
        <span className="invisible col-start-1 row-start-1">{copyEmail.failed}</span>
        <span className="col-start-1 row-start-1">{message}</span>
      </p>
    </div>
  );
}
