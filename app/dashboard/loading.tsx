export default function DashboardLoading() {
  return (
    <div className="flex flex-1 flex-col gap-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-white/10" />
          <div className="h-4 w-72 rounded bg-white/5" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-purple-600/30 shrink-0" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-white/10" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-20 rounded bg-white/5" />
              <div className="h-6 w-12 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>

      {/* Events Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl bg-[#14141f]/90 border border-white/10 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="h-6 w-40 rounded bg-white/10" />
              <div className="h-8 w-16 rounded-lg bg-white/10" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-white/5" />
              <div className="h-4 w-48 rounded bg-white/5" />
            </div>
            <div className="pt-4 border-t border-white/10 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-white/10" />
              <div className="h-6 w-16 rounded-full bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
