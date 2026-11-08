"use client";

import { ExternalLink, Pencil, Save, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/admin/submit-button";
import {
  deleteLicense,
  saveLicense,
} from "@/app/admin/(panel)/content-actions";
import type { LicenseRow } from "@/lib/content/types";
import { DeleteButton } from "./delete-button";
import {
  MAX_PDF_MB,
  SortAndVisibility,
  pdfProblem,
  uploadPdf,
} from "./document-manager";
import { Card, PairInput } from "./form-parts";

function LicenseItem({ license }: { license: LicenseRow }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="border-b border-gray-200 py-3 last:border-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium">
            {license.title_en}
            {license.published ? null : (
              <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                Hidden
              </span>
            )}
          </p>
          <p className="text-sm text-gray-700" dir="rtl">
            {license.title_ar}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <a href={license.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink />
              View
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditing((current) => !current)}
          >
            <Pencil />
            Edit
          </Button>
          <DeleteButton
            action={deleteLicense}
            id={license.id}
            itemType="license"
            itemName={license.title_en}
          />
        </div>
      </div>
      {editing ? (
        <form
          action={async (formData) => {
            await saveLicense(formData);
            setEditing(false);
          }}
          className="mt-4 grid gap-4"
        >
          <input type="hidden" name="id" value={license.id} />
          <PairInput
            label="Title"
            name="title"
            en={license.title_en}
            ar={license.title_ar}
            required
          />
          <SortAndVisibility
            sortOrder={license.sort_order}
            published={license.published}
          />
          <SubmitButton className="w-fit" icon={<Save />}>
            Save license
          </SubmitButton>
        </form>
      ) : null}
    </div>
  );
}

function AddLicenseForm() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file");
    const problem = pdfProblem(file);
    setError(problem);
    if (problem) return;
    setBusy(true);
    try {
      const path = await uploadPdf(file as File);
      formData.delete("file");
      formData.set("file_path", path);
      await saveLicense(formData);
      form.reset();
    } catch {
      setError("The PDF could not be uploaded. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4"
    >
      <p className="text-sm font-semibold text-gray-900">Add a license</p>
      <PairInput label="Title" name="title" required />
      <label className="grid gap-1">
        <span className="text-sm font-medium text-gray-900">
          File (PDF, up to {MAX_PDF_MB} MB)
        </span>
        <input
          type="file"
          name="file"
          accept="application/pdf"
          required
          className="text-sm"
        />
      </label>
      <SortAndVisibility />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <SubmitButton variant="outline" className="w-fit" pending={busy} pendingLabel="Uploading…" icon={<Upload />}>
        Upload license
      </SubmitButton>
    </form>
  );
}

export function LicenseManager({ licenses }: { licenses: LicenseRow[] }) {
  return (
    <Card
      title="Licenses"
      description="Each license has a title and a PDF, shown on the Licenses page in this order."
    >
      <div className="flex flex-col gap-5">
        <div>
          {licenses.length === 0 ? (
            <p className="text-sm text-gray-600">No licenses yet.</p>
          ) : null}
          {licenses.map((license) => (
            <LicenseItem key={license.id} license={license} />
          ))}
        </div>
        <AddLicenseForm />
      </div>
    </Card>
  );
}
