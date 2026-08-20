export default function DocumentsLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-40 bg-white/5 rounded-lg" />
          <div className="h-4 w-72 bg-white/5 rounded-lg mt-2" />
        </div>
        <div className="h-9 w-28 bg-white/5 rounded-xl" />
      </div>
      <div className="flex gap-2">
        <div className="h-10 flex-1 bg-white/5 rounded-xl" />
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="glass-card h-[400px] bg-white/[0.02]" />
        <div className="lg:col-span-3 grid md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card h-24 bg-white/[0.02]" />
          ))}
        </div>
      </div>
    </div>
  );
}
