export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />
        <p className="text-xs font-medium text-zinc-400">Loading EventFlow...</p>
      </div>
    </div>
  );
}
