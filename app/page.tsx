import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">Enterprise B2B SaaS</h1>
      <p className="text-gray-600 max-w-md text-center">
        Auth, RBAC, multi-tenancy e Stripe — clone e rode em minutos.
      </p>
      <div className="flex gap-4">
        <Link href="/login" className="rounded-lg bg-black text-white px-6 py-2">
          Entrar
        </Link>
        <Link href="/dashboard" className="rounded-lg border px-6 py-2">
          Dashboard
        </Link>
      </div>
    </main>
  );
}
