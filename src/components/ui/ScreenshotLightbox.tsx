"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { lightbox, type Project } from "@/content";

type Props = { title: string; image: NonNullable<Project["image"]> };

// Both files render and CSS hides the inactive one: display:none skips the lazy load and drops it from the accessibility tree.
function ThemedImages({ image, sizes, className }: { image: Props["image"]; sizes: string; className: string }) {
  return (["light", "dark"] as const).map((theme) => (
    <Image
      key={theme}
      src={image[theme].src}
      width={image[theme].width}
      height={image[theme].height}
      alt={image.alt}
      sizes={sizes}
      className={`${className} ${theme === "light" ? "dark:hidden" : "hidden dark:block"}`}
    />
  ));
}

export default function ScreenshotLightbox({ title, image }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headingId = useId();
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      {/* aria-label replaces the content, so the thumbnail's alt is not read; the alt is read once, in the dialog. */}
      <button
        ref={triggerRef}
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-label={lightbox.open(title)}
        className="group block w-full min-w-0 space-y-1 text-left"
      >
        <span className="block aspect-[1104/500] overflow-hidden rounded-md border border-border group-hover:border-foreground group-focus-visible:border-foreground">
          <ThemedImages
            image={image}
            sizes="(min-width: 768px) 320px, calc(100vw - 32px)"
            className="h-auto w-full max-w-full"
          />
        </span>
        <span className="block text-sm text-muted">{lightbox.enlarge}</span>
      </button>
      {/* Scrim is a literal rgb for the same reason as the command palette. The dialog has no padding, so only a click on the backdrop has the dialog itself as its target. */}
      <dialog
        ref={dialogRef}
        data-lightbox=""
        aria-labelledby={headingId}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[calc(1104px+2rem+2px)] flex-col rounded-md border border-border bg-background p-0 text-foreground open:flex backdrop:bg-[rgb(0_0_0/0.5)]"
      >
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          <div className="flex items-center justify-between gap-4">
            <h3 id={headingId} className="font-serif text-lg font-semibold">
              {lightbox.heading(title)}
            </h3>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="inline-flex min-h-11 items-center px-2 text-sm underline underline-offset-4"
            >
              {lightbox.close}
            </button>
          </div>
          {/* Natural size: on a phone the text is read by scrolling in here. tabIndex lets the keyboard scroll it. */}
          <div tabIndex={0} className="max-h-[85dvh] min-h-0 overflow-auto overscroll-contain">
            {open && (
              <ThemedImages
                image={image}
                sizes="1104px"
                className="h-auto w-[1104px] max-w-none rounded-md border border-border md:w-full md:max-w-full"
              />
            )}
          </div>
          <p className="text-sm text-muted">{image.caption}</p>
        </div>
      </dialog>
    </>
  );
}
