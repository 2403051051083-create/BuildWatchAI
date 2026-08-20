export default function MaterialsLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-48 bg-white/5 rounded-lg" />
        <div className="h-4 w-80 bg-white/5 rounded-lg mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card-sm h-20 bg-white/[0.03]" />
        ))}
      </div>
      <div className="glass-card h-64 bg-white/[0.02]" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="glass-card h-44 bg-white/[0.02]" />
        ))}
      </div>
    </div>
  );
}
