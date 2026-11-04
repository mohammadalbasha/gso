"use client";

import { Eye, FileText, X } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Phones and tablets cannot reliably show a PDF inside a page, so they keep the
// normal link and open the file in their own viewer.
function canEmbedPdf() {
  return (
    navigator.pdfViewerEnabled &&
    window.matchMedia("(min-width: 768px) and (pointer: fine)").matches
  );
}

export function DocumentLink({
  url,
  title,
  viewLabel,
  closeLabel,
}: {
  url: string;
  title: string;
  viewLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Ctrl/Cmd/Shift-click still opens a new tab or window.
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!canEmbedPdf()) return;
    event.preventDefault();
    setOpen(true);
  }

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group flex items-center gap-3 rounded-lg border border-primary-500/20 bg-white p-3 shadow-sm transition-all hover:border-primary-500 hover:shadow-md"
      >
        <span className="flex h-14 w-12 shrink-0 flex-col items-center justify-center gap-0.5 rounded-md bg-primary-500 text-white">
          <FileText className="h-5 w-5 text-secondary-500" aria-hidden />
          <span className="text-[11px] font-bold leading-none tracking-wide" dir="ltr">
            PDF
          </span>
        </span>
        <span className="min-w-0 flex-1 font-semibold text-primary-500">{title}</span>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary-500 group-hover:underline">
          <Eye className="h-4 w-4" aria-hidden />
          {viewLabel}
        </span>
      </a>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="flex h-[94vh] w-[96vw] max-w-[96vw] flex-col gap-0 overflow-hidden border-0 bg-neutral-900 p-0 sm:max-w-[96vw]"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-2">
            <DialogTitle className="truncate text-sm font-medium text-white">
              {title}
            </DialogTitle>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
          <iframe src={url} title={title} className="w-full flex-1 border-0" />
        </DialogContent>
      </Dialog>
    </>
  );
}
