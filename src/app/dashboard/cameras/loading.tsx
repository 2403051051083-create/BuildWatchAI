export default function CamerasLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-48 bg-white/5 rounded-lg" />
        <div className="h-4 w-64 bg-white/5 rounded-lg mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card-sm h-16 bg-white/[0.03]" />
        ))}
      </div>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 w-20 bg-white/5 rounded-lg" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-white/[0.02] border border-white/5 aspect-video" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="glass-card-sm h-20 bg-white/[0.02]" />
          ))}
        </div>
      </div>
    </div>
  );
}
