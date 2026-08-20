export default function WorkersLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-56 bg-white/5 rounded-lg" />
        <div className="h-4 w-72 bg-white/5 rounded-lg mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card-sm h-20 bg-white/[0.03]" />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-28 bg-white/5 rounded-lg" />
        <div className="h-9 w-28 bg-white/5 rounded-lg" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card h-80 bg-white/[0.02]" />
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card-sm h-14 bg-white/[0.02]" />
          ))}
        </div>
      </div>
    </div>
  );
}
