export default function DigitalTwinLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-48 bg-white/5 rounded-lg" />
        <div className="h-4 w-72 bg-white/5 rounded-lg mt-2" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card-sm h-16 bg-white/[0.03]" />
        ))}
      </div>
      <div className="grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 glass-card h-[480px] bg-white/[0.02]" />
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="glass-card-sm h-12 bg-white/[0.02]" />
          ))}
        </div>
      </div>
    </div>
  );
}
