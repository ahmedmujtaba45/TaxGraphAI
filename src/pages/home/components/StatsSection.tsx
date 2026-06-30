const stats = [
  {
    icon: 'ri-user-line',
    value: '12.5 Million',
    label: 'Registered Taxpayers',
    description: 'Active profiles in the national tax registry with real-time status monitoring',
    accent: false,
  },
  {
    icon: 'ri-user-search-line',
    value: '3.2 Million',
    label: 'Non-Filers Identified',
    description: 'High-net-worth individuals flagged through cross-referenced civic data',
    accent: true,
  },
  {
    icon: 'ri-link-m',
    value: '87%',
    label: 'Entity Matching Accuracy',
    description: 'Precision rate in resolving identities across disparate government databases',
    accent: false,
  },
  {
    icon: 'ri-alert-line',
    value: '24,000',
    label: 'Risk Cases Flagged',
    description: 'Under-reporting cases identified with detailed AI-generated audit trails',
    accent: false,
  },
];

export default function StatsSection() {
  return (
    <section id="stats" className="relative py-24 md:py-32 bg-background-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100/70 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-500"></span>
            <span className="text-accent-800 text-xs font-semibold tracking-wider uppercase">Real-Time Metrics</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 leading-tight max-w-2xl">
            Pakistan&apos;s Tax Intelligence<br />
            <span className="text-accent-600">at a Glance</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative p-6 md:p-8 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                stat.accent
                  ? 'bg-accent-500 text-background-50'
                  : 'bg-background-100 border border-background-200/60'
              }`}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg mb-5 transition-colors ${
                stat.accent
                  ? 'bg-background-50/20'
                  : 'bg-accent-100 text-accent-700'
              }`}>
                <i className={`${stat.icon} text-xl md:text-2xl ${stat.accent ? 'text-background-50' : ''}`}></i>
              </div>
              <div className={`text-3xl md:text-4xl font-bold mb-2 tracking-tight ${
                stat.accent ? 'text-background-50' : 'text-primary-900'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm md:text-base font-semibold mb-2 ${
                stat.accent ? 'text-background-50/90' : 'text-foreground-800'
              }`}>
                {stat.label}
              </div>
              <p className={`text-xs md:text-sm leading-relaxed ${
                stat.accent ? 'text-background-50/70' : 'text-foreground-600'
              }`}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}