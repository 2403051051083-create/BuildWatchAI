export default function WeatherLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-48 bg-white/5 rounded-lg" />
        <div className="h-4 w-80 bg-white/5 rounded-lg mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card-sm h-24 bg-white/[0.03]" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass-card h-52 bg-white/[0.02]" />
        <div className="glass-card h-52 bg-white/[0.02]" />
      </div>
      <div className="glass-card h-64 bg-white/[0.02]" />
      <div className="glass-card h-36 bg-white/[0.02]" />
    </div>
  );
}
