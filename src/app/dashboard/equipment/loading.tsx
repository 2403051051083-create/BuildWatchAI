export default function EquipmentLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-60 bg-white/5 rounded-lg" />
        <div className="h-4 w-72 bg-white/5 rounded-lg mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card-sm h-20 bg-white/[0.03]" />
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card h-36 bg-white/[0.02]" />
        ))}
      </div>
      <div className="glass-card h-48 bg-white/[0.02]" />
    </div>
  );
}
