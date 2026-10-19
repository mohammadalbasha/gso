import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-5xl font-bold tracking-tight text-primary-500">
            GSO
          </p>
          <h1 className="mt-3 text-xl font-semibold text-gray-950">
            Dashboard sign in
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Use the admin account created in Supabase.
          </p>
        </div>
        <LoginForm queryError={error} />
      </div>
    </div>
  );
}
