import Link from "next/link";

const sections = [
  { title: "Services", href: "/admin/services", description: "Edit the service cards shown on the home page." },
  { title: "Projects", href: "/admin/projects", description: "Add, edit, and hide the work shown on the projects page." },
  { title: "Products", href: "/admin/products", description: "Control product names, photos, and detail sections." },
  { title: "Partners", href: "/admin/partners", description: "Manage partner companies, their products, sections, and PDFs." },
  { title: "PDFs", href: "/admin/documents", description: "Upload the main company's PDFs, grouped under section titles." },
  { title: "Branches", href: "/admin/branches", description: "Update addresses, phones, and which branches are open." },
  { title: "Site text", href: "/admin/site", description: "Edit the homepage, about text, phones, and email." },
];

export default function AdminHomePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-500">Overview</h1>
        <p className="mt-2 max-w-2xl text-gray-800">
          Edit the website content here. Published changes appear on the public pages.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-gray-300 bg-white p-5 hover:border-primary-500"
          >
            <h2 className="text-lg font-semibold text-primary-500">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-800">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
