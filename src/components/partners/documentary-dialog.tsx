"use client";

import { Play, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** The video only exists while the dialog is open, so it loads on demand and stops on close. */
export function DocumentaryDialog({
  url,
  title,
  watchLabel,
  closeLabel,
}: Readonly<{ url: string; title: string; watchLabel: string; closeLabel: string }>) {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-4 rounded-lg bg-primary-500 p-5 text-start text-white transition-opacity hover:opacity-90">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary-500">
          <Play className="h-5 w-5 fill-current" aria-hidden />
        </span>
        <span className="text-lg font-semibold">{watchLabel}</span>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="gap-0 overflow-hidden p-0 sm:max-w-4xl"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2">
          <DialogTitle className="text-primary-500">{title}</DialogTitle>
          <DialogClose aria-label={closeLabel} className="h-9 w-9 p-0">
            <X className="h-4 w-4" aria-hidden />
          </DialogClose>
        </div>
        <video src={url} autoPlay controls playsInline className="max-h-[80vh] w-full bg-black" />
      </DialogContent>
    </Dialog>
  );
}
