export default function AlertsLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-52 bg-white/5 rounded-lg" />
          <div className="h-4 w-64 bg-white/5 rounded-lg mt-2" />
        </div>
        <div className="h-9 w-32 bg-white/5 rounded-xl" />
      </div>
      <div className="grid md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card-sm h-14 bg-white/[0.03]" />
        ))}
      </div>
      <div className="glass-card space-y-3">
        <div className="h-5 w-24 bg-white/5 rounded" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/[0.02]">
            <div className="w-10 h-10 rounded-lg bg-white/5 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-white/5 rounded" />
              <div className="h-3 w-72 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
