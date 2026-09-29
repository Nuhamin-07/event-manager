import { AuthView } from "@neondatabase/auth/react";

export const dynamicParams = false;

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <div className="flex grow flex-col items-center justify-center py-8">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#14141f]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        <AuthView path={path} />
      </div>
    </div>
  );
}
