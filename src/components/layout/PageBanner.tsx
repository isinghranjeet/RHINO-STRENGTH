// Title banner shown at the top of inner pages.


export function PageBanner({ title, subtitle, breadcrumb }: { title: string; subtitle?: string; breadcrumb: string }) {
  return (
    <div className="bg-card border-b border-zinc-800 py-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-dot-grid" />
      <div className="relative z-10 max-w-4xl mx-auto space-y-3">
        <div className="text-xs font-bold tracking-widest text-gold uppercase mb-2">
          RHINO STRENGTH GYM • {breadcrumb}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          {title}
        </h1>
        {subtitle && (
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
