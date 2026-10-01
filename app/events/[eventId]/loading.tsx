export default function EventDetailLoading() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      {/* Back button and Header */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 space-y-3">
        <div className="h-8 w-36 rounded-lg bg-white/10" />
        <div className="h-9 w-64 sm:w-96 rounded-lg bg-white/10" />
        <div className="flex gap-4">
          <div className="h-4 w-32 rounded bg-white/5" />
          <div className="h-4 w-40 rounded bg-white/5" />
        </div>
      </div>

      {/* Stat Pills */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-white/[0.03] border border-white/10 p-3.5 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-white/10" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-16 rounded bg-white/5" />
              <div className="h-5 w-24 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Invite Card Skeleton */}
      <div className="h-32 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 p-6 space-y-3">
        <div className="h-5 w-36 rounded bg-purple-500/20" />
        <div className="h-10 w-full rounded-xl bg-white/10" />
      </div>

      {/* Table Card Skeleton */}
      <div className="rounded-2xl bg-[#14141f]/90 border border-white/10 p-6 space-y-4">
        <div className="h-6 w-44 rounded bg-white/10" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-full rounded-lg bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}
