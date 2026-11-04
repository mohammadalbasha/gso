"use client";

import { Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { createPartnerVideoUpload } from "@/app/admin/(panel)/content-actions";

// Supabase rejects larger files on the free plan.
const MAX_VIDEO_MB = 50;
const VIDEO_TYPES = ["video/mp4", "video/webm"];

/**
 * Video picker for admin forms. The file goes straight to storage as soon as it
 * is chosen; the form only submits the resulting address as `${name}_url`.
 */
export function VideoUpload({
  currentUrl,
  label = "Video",
  name = "video",
  hint,
}: Readonly<{ currentUrl?: string | null; label?: string; name?: string; hint?: string }>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(currentUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function choose(file: File | undefined) {
    if (inputRef.current) inputRef.current.value = "";
    if (!file) return;
    setError("");
    if (!VIDEO_TYPES.includes(file.type)) {
      setError("Please choose an MP4 or WebM video.");
      return;
    }
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      setError(`The maximum video size is ${MAX_VIDEO_MB} MB.`);
      return;
    }
    setUploading(true);
    try {
      const extension = file.type === "video/webm" ? "webm" : "mp4";
      const { signedUrl, publicUrl } = await createPartnerVideoUpload(extension);
      const upload = await fetch(signedUrl, {
        method: "PUT",
        headers: { "content-type": file.type },
        body: file,
      });
      if (!upload.ok) throw new Error("upload failed");
      setUrl(publicUrl);
    } catch {
      setError("The video could not be uploaded. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <input type="hidden" name={`${name}_url`} value={url} />
      {uploading ? (
        // Blocks the form from saving before the address of the video is known.
        <input
          required
          tabIndex={-1}
          className="sr-only"
          ref={(input) => input?.setCustomValidity("Please wait for the video to finish uploading.")}
        />
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept={VIDEO_TYPES.join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => choose(event.target.files?.[0])}
      />

      <div className="flex flex-wrap items-stretch gap-4">
        <div className="flex h-40 w-60 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-gray-50">
          {url ? (
            <video src={url} muted controls className="h-full w-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No video</span>
          )}
        </div>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex min-h-40 min-w-60 flex-1 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 px-4 text-center transition-colors hover:border-primary-500 hover:bg-primary-50/50 disabled:opacity-60"
        >
          <Upload className="h-8 w-8 text-gray-400" aria-hidden />
          <span className="text-sm font-medium text-gray-800">
            {uploading ? "Uploading…" : url ? "Click to replace the video" : "Click to choose a video"}
          </span>
          <span className="text-xs text-gray-500">
            MP4 or WebM, up to {MAX_VIDEO_MB} MB. {hint}
          </span>
        </button>
      </div>

      {url && !uploading ? (
        <button
          type="button"
          onClick={() => setUrl("")}
          className="flex w-fit items-center gap-1.5 text-sm text-red-600 hover:underline"
        >
          <Trash2 className="h-4 w-4" />
          Remove video
        </button>
      ) : null}
      {url !== (currentUrl ?? "") && !uploading ? (
        <p className="text-sm text-gray-600">This change is saved when you click Save.</p>
      ) : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
