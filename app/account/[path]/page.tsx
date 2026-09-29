import { AccountView, accountViewPaths } from "@neondatabase/auth/react";

export function generateStaticParams() {
  return Object.values(accountViewPaths).map((path) => ({ path }));
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  return (
    <div className="mx-auto w-full max-w-3xl py-6">
      <div className="rounded-2xl border border-white/10 bg-[#14141f]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <AccountView path={path} />
      </div>
    </div>
  );
}
