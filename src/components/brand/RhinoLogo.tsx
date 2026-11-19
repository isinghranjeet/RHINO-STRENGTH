/** Geometric rhino head with an integrated "R" – the gym's logo. */
export function RhinoLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        {/* Polygon geometric rhino head */}
        <polygon points="50,5 75,25 90,50 80,85 50,98 20,85 10,50 25,25" className="fill-card stroke-gold" strokeWidth="4" />
        <polygon points="50,15 65,30 50,60 35,30" className="fill-ember" opacity="0.85" />
        {/* Bold integrated R */}
        <path
          d="M 40 32 L 55 32 C 62 32 66 36 66 42 C 66 48 62 52 55 52 L 48 52 L 60 70 L 50 70 L 40 54 L 40 70 L 34 70 L 34 32 Z M 40 38 L 40 47 L 53 47 C 57 47 60 45 60 42 C 60 39 57 38 53 38 Z"
          className="fill-foreground"
        />
        {/* Horn accent */}
        <polygon points="50,5 45,22 55,22" className="fill-gold" />
      </svg>
    </div>
  );
}
