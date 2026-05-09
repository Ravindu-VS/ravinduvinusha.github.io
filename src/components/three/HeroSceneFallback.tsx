// Static SVG fallback shown while HeroScene loads
export default function HeroSceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-60" fill="none" aria-hidden="true">
        <circle cx="100" cy="100" r="60" stroke="#00ff88" strokeWidth="1.5" strokeDasharray="6 3" />
        <circle cx="100" cy="100" r="40" stroke="#0099ff" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="100" cy="100" r="20" stroke="#00ff88" strokeWidth="1.5" />
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 100 + 60 * Math.cos(rad);
          const y = 100 + 60 * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r="4" fill="#00ff88" opacity="0.7" />;
        })}
      </svg>
    </div>
  );
}
