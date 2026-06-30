export default function HeroSection() {
  return (
    <section id="hero" className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Dark%20abstract%20geometric%20network%20with%20interconnected%20nodes%20and%20lines%20forming%20a%20knowledge%20graph%20pattern%2C%20deep%20navy%20blue%20background%20with%20subtle%20green%20glowing%20connection%20points%2C%20modern%20fintech%20data%20visualization%20aesthetic%2C%20clean%20minimal%20technology%20atmosphere%2C%20professional%20government%20dashboard%20style%20with%20dark%20moody%20lighting%2C%203D%20depth%20effect%20with%20floating%20data%20nodes&width=1920&height=1080&seq=taxgraph-hero-bg&orientation=landscape"
          alt="TaxGraph AI Knowledge Graph Network"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/85 via-primary-950/70 to-primary-950/90"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/15 border border-accent-500/25 mb-8">
          <div className="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></div>
          <span className="text-accent-300 text-xs md:text-sm font-medium tracking-wider uppercase">Pakistan Federal Board of Revenue</span>
        </div>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
          Broadening Pakistan&apos;s<br />
          <span className="text-accent-400">Tax Net</span> Through<br />
          Knowledge Graph AI
        </h1>

        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Identify high-net-worth non-filers and under-reporting taxpayers using connected civic intelligence. 
          Powered by advanced entity resolution and explainable AI audit trails.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/admin-login"
            className="w-full sm:w-auto px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-background-50 text-sm md:text-base font-semibold rounded-lg transition-all duration-300 whitespace-nowrap"
          >
            <i className="ri-dashboard-line mr-2"></i>
            Launch Dashboard
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm md:text-base font-semibold rounded-lg border border-white/20 transition-all duration-300 whitespace-nowrap backdrop-blur-sm"
          >
            <i className="ri-play-circle-line mr-2"></i>
            View Demo
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">12.5M</div>
            <div className="text-xs md:text-sm text-white/50 mt-1">Taxpayers</div>
          </div>
          <div className="w-px h-10 bg-white/15"></div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent-400">87%</div>
            <div className="text-xs md:text-sm text-white/50 mt-1">Accuracy</div>
          </div>
          <div className="w-px h-10 bg-white/15"></div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">24K</div>
            <div className="text-xs md:text-sm text-white/50 mt-1">Risk Cases</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#stats" className="flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <i className="ri-arrow-down-line text-lg animate-bounce"></i>
        </a>
      </div>
    </section>
  );
}