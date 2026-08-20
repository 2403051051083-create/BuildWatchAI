export default function ReportsLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-32 bg-white/5 rounded-lg" />
        <div className="h-4 w-64 bg-white/5 rounded-lg mt-2" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card h-32 bg-white/[0.02]" />
        ))}
      </div>
      <div className="glass-card h-48 bg-white/[0.02]" />
    </div>
  );
}
