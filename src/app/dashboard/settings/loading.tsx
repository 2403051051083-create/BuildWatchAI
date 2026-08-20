export default function SettingsLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div>
        <div className="h-7 w-32 bg-white/5 rounded-lg" />
        <div className="h-4 w-72 bg-white/5 rounded-lg mt-2" />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-56 space-y-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-white/5 rounded-xl" />
          ))}
        </div>
        <div className="flex-1 glass-card h-[480px] bg-white/[0.02]" />
      </div>
    </div>
  );
}
