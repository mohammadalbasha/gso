"use client";

import { Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/utils";

// Server actions accept up to 10 MB (next.config.ts); keep room for the other form fields.
const DEFAULT_MAX_MB = 9;

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/**
 * Image picker for admin forms. Submits the chosen file as `name` and the
 * image to keep as `${name}_url` (emptied when the admin removes the image).
 * Forms with several pickers must lower `maxMb` so they fit in one request.
 */
export function ImageUpload({
  currentUrl,
  label = "Image",
  name = "image",
  maxMb = DEFAULT_MAX_MB,
}: Readonly<{
  currentUrl?: string | null;
  label?: string;
  name?: string;
  maxMb?: number;
}>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [keepCurrent, setKeepCurrent] = useState(Boolean(currentUrl));
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function choose(next: File | null) {
    setError("");
    const input = inputRef.current;
    if (!next || !input) return;
    if (!next.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WebP…).");
      return;
    }
    if (next.size > maxMb * 1024 * 1024) {
      setError(
        `This image is ${formatSize(next.size)}. The maximum is ${maxMb} MB — please use a smaller image.`,
      );
      return;
    }
    // Put the file into the real input so it is sent with the form.
    const transfer = new DataTransfer();
    transfer.items.add(next);
    input.files = transfer.files;
    setFile(next);
  }

  function clearSelection() {
    if (inputRef.current) inputRef.current.value = "";
    setFile(null);
    setError("");
  }

  const shown = preview ?? (keepCurrent ? currentUrl : null);

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <input
        type="hidden"
        name={`${name}_url`}
        value={keepCurrent ? (currentUrl ?? "") : ""}
      />
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => choose(event.target.files?.[0] ?? null)}
      />

      <div className="flex flex-wrap items-stretch gap-4">
        <div className="relative flex h-40 w-60 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-gray-50">
          {shown ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shown} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No image</span>
          )}
          {file ? (
            <span className="absolute left-2 top-2 rounded-full bg-secondary-500 px-2 py-0.5 text-[11px] font-medium text-white">
              New — saved when you click Save
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            choose(event.dataTransfer.files?.[0] ?? null);
          }}
          className={cn(
            "flex min-h-40 min-w-60 flex-1 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed px-4 text-center transition-colors",
            dragging
              ? "border-primary-500 bg-primary-50"
              : "border-gray-300 hover:border-primary-500 hover:bg-primary-50/50",
          )}
        >
          <Upload className="h-8 w-8 text-gray-400" aria-hidden />
          <span className="text-sm font-medium text-gray-800">
            {shown
              ? "Click or drop an image to replace"
              : "Click or drop an image here"}
          </span>
          <span className="text-xs text-gray-500">
            JPG, PNG or WebP, up to {maxMb} MB
          </span>
        </button>
      </div>

      {file ? (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="truncate text-gray-700">
            {file.name} · {formatSize(file.size)}
          </span>
          <button
            type="button"
            onClick={clearSelection}
            className="text-primary-500 hover:underline"
          >
            {currentUrl && keepCurrent ? "Keep the current image" : "Cancel"}
          </button>
        </div>
      ) : null}

      {!file && currentUrl ? (
        keepCurrent ? (
          <button
            type="button"
            onClick={() => setKeepCurrent(false)}
            className="flex w-fit items-center gap-1.5 text-sm text-red-600 hover:underline"
          >
            <Trash2 className="h-4 w-4" />
            Remove image
          </button>
        ) : (
          <p className="text-sm text-gray-600">
            The image will be removed when you save.{" "}
            <button
              type="button"
              onClick={() => setKeepCurrent(true)}
              className="text-primary-500 hover:underline"
            >
              Undo
            </button>
          </p>
        )
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
