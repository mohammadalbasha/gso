const sections = [
  {
    title: "Projects",
    description: "Add, edit, and hide the work shown on the projects page.",
  },
  {
    title: "Products",
    description: "Control product names, photos, and short descriptions.",
  },
  {
    title: "Branches",
    description: "Update addresses, phones, and which branches are open.",
  },
  {
    title: "Site text",
    description: "Edit the homepage and about text in English and Arabic.",
  },
];

export default function AdminHomePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-500">Overview</h1>
        <p className="mt-2 max-w-2xl text-gray-800">
          This is the dashboard for the GSO website. Content sections will be
          added here one at a time, starting with projects.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-xl border border-gray-300 bg-white p-5"
          >
            <h2 className="text-lg font-semibold text-primary-500">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-800">
              {section.description}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
