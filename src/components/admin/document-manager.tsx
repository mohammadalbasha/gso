"use client";

import { ExternalLink, Pencil, Plus, Save, Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createDocumentUpload,
  deleteDocument,
  deleteDocumentSection,
  saveDocument,
  saveDocumentSection,
} from "@/app/admin/(panel)/content-actions";
import type {
  DocumentOwner,
  DocumentRow,
  DocumentSectionRow,
} from "@/lib/content/types";
import { DeleteButton } from "./delete-button";
import { Card, PairInput } from "./form-parts";

// Keep in step with the bucket's file_size_limit in supabase/partners.sql.
const MAX_PDF_MB = 50;

const languageLabels = { en: "English only", ar: "Arabic only" };

function SortAndVisibility({
  sortOrder,
  published,
}: {
  sortOrder?: number;
  published?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <label className="grid gap-1">
        <span className="text-sm font-medium text-gray-900">Sort order</span>
        <Input
          name="sort_order"
          type="number"
          defaultValue={String(sortOrder ?? 0)}
          className="w-28"
        />
      </label>
      <label className="flex h-9 items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={published ?? true}
        />
        Published
      </label>
    </div>
  );
}

function LanguageSelect({ value }: { value?: string | null }) {
  return (
    <label className="grid gap-1 md:w-1/2">
      <span className="text-sm font-medium text-gray-900">Show this PDF to</span>
      <select
        name="locale"
        defaultValue={value ?? ""}
        className="h-9 rounded-md border bg-white px-3 text-sm"
      >
        <option value="">Both languages</option>
        <option value="en">English visitors only</option>
        <option value="ar">Arabic visitors only</option>
      </select>
    </label>
  );
}

function DocumentItem({ document }: { document: DocumentRow }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="border-b border-gray-200 px-4 py-3 last:border-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium">
            {document.title_en}
            {document.locale ? (
              <span className="ml-2 rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                {languageLabels[document.locale]}
              </span>
            ) : null}
            {document.published ? null : (
              <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                Hidden
              </span>
            )}
          </p>
          <p className="text-sm text-gray-700" dir="rtl">
            {document.title_ar}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <a href={document.url} target="_blank" rel="noopener noreferrer">
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
            action={deleteDocument}
            id={document.id}
            itemType="PDF"
            itemName={document.title_en}
          />
        </div>
      </div>
      {editing ? (
        <form
          action={async (formData) => {
            await saveDocument(formData);
            setEditing(false);
          }}
          className="mt-4 grid gap-4"
        >
          <input type="hidden" name="id" value={document.id} />
          <PairInput
            label="PDF title"
            name="title"
            en={document.title_en}
            ar={document.title_ar}
            required
          />
          <LanguageSelect value={document.locale} />
          <SortAndVisibility
            sortOrder={document.sort_order}
            published={document.published}
          />
          <Button type="submit" className="w-fit">
            <Save />
            Save PDF
          </Button>
        </form>
      ) : null}
    </div>
  );
}

function AddDocumentForm({ sectionId }: { sectionId: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("file");
    setError("");
    if (!(file instanceof File) || file.size === 0) {
      setError("Please choose a PDF file.");
      return;
    }
    if (file.type !== "application/pdf") {
      setError("Only PDF files can be uploaded.");
      return;
    }
    if (file.size > MAX_PDF_MB * 1024 * 1024) {
      setError(`The maximum PDF size is ${MAX_PDF_MB} MB.`);
      return;
    }
    setBusy(true);
    try {
      const { path, signedUrl } = await createDocumentUpload();
      const upload = await fetch(signedUrl, {
        method: "PUT",
        headers: { "content-type": "application/pdf" },
        body: file,
      });
      if (!upload.ok) throw new Error("upload failed");
      formData.delete("file");
      formData.set("file_path", path);
      await saveDocument(formData);
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
      <input type="hidden" name="section_id" value={sectionId} />
      <p className="text-sm font-semibold text-gray-900">Add a PDF</p>
      <PairInput label="PDF title" name="title" required />
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
      <LanguageSelect />
      <SortAndVisibility />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button type="submit" variant="outline" className="w-fit" disabled={busy}>
        <Upload />
        {busy ? "Uploading…" : "Upload PDF"}
      </Button>
    </form>
  );
}

function SectionItem({ section }: { section: DocumentSectionRow }) {
  const [editing, setEditing] = useState(false);
  return (
    <section className="overflow-hidden rounded-xl border-2 border-gray-200 bg-white">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div>
          <p className="text-base font-semibold text-gray-900">
            {section.title_en}
            {section.published ? null : (
              <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs font-normal text-gray-600">
                Hidden
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500" dir="rtl">
            {section.title_ar}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setEditing((current) => !current)}
          >
            <Pencil />
            Rename
          </Button>
          {section.documents.length === 0 ? (
            <DeleteButton
              action={deleteDocumentSection}
              id={section.id}
              itemType="PDF section"
              itemName={section.title_en}
            />
          ) : (
            <span className="text-xs text-gray-500">
              Delete its PDFs to delete this section
            </span>
          )}
        </div>
      </header>
      {editing ? (
        <form
          action={async (formData) => {
            await saveDocumentSection(formData);
            setEditing(false);
          }}
          className="grid gap-4 border-b border-gray-200 p-4"
        >
          <input type="hidden" name="id" value={section.id} />
          <input type="hidden" name="partner_id" value={section.partner_id ?? ""} />
          <input type="hidden" name="product_id" value={section.product_id ?? ""} />
          <PairInput
            label="Section title"
            name="title"
            en={section.title_en}
            ar={section.title_ar}
            required
          />
          <SortAndVisibility
            sortOrder={section.sort_order}
            published={section.published}
          />
          <Button type="submit" className="w-fit">
            <Save />
            Save section
          </Button>
        </form>
      ) : null}
      {section.documents.map((document) => (
        <DocumentItem key={document.id} document={document} />
      ))}
      <div className="p-4">
        <AddDocumentForm sectionId={section.id} />
      </div>
    </section>
  );
}

/**
 * Manages the PDF sections of one owner. Leave `owner` empty for the main
 * company. Must not be placed inside another form.
 */
export function DocumentManager({
  owner,
  sections,
}: {
  owner: DocumentOwner;
  sections: DocumentSectionRow[];
}) {
  return (
    <Card
      id="documents"
      title="PDFs"
      description="Group PDFs under section titles, such as Certificates or Catalogs. A section with no visible PDFs is hidden from visitors."
    >
      <div className="flex flex-col gap-5">
        {sections.map((section) => (
          <SectionItem key={section.id} section={section} />
        ))}
        <form
          action={saveDocumentSection}
          className="grid gap-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4"
        >
          <input type="hidden" name="partner_id" value={owner.partnerId ?? ""} />
          <input type="hidden" name="product_id" value={owner.productId ?? ""} />
          <p className="text-sm font-semibold text-gray-900">Add a PDF section</p>
          <PairInput label="Section title" name="title" required />
          <SortAndVisibility />
          <Button type="submit" variant="outline" className="w-fit">
            <Plus />
            Add section
          </Button>
        </form>
      </div>
    </Card>
  );
}
