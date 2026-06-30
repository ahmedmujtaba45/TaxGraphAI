const features = [
  {
    icon: 'ri-git-branch-line',
    title: 'Knowledge Graph Analytics',
    description: 'Visualize complex taxpayer networks with interactive graph exploration. Uncover hidden relationships between entities, assets, transactions, and associated parties in real-time.',
    tags: ['Graph DB', 'Neo4j', 'Real-Time'],
  },
  {
    icon: 'ri-fingerprint-line',
    title: 'AI Entity Resolution',
    description: 'Match and deduplicate taxpayer records across NADRA, property registries, vehicle databases, and banking systems using advanced fuzzy logic and ML-based identity resolution.',
    tags: ['ML Matching', 'Fuzzy Logic', 'Multi-Source'],
  },
  {
    icon: 'ri-shield-flash-line',
    title: 'Fraud Detection Engine',
    description: 'Detect anomalous filing patterns, shell company structures, and suspicious transaction flows using pattern recognition and anomaly detection algorithms trained on historical fraud cases.',
    tags: ['Anomaly Detection', 'Pattern Recognition', 'Real-Time Alerts'],
  },
  {
    icon: 'ri-file-text-line',
    title: 'Explainable AI Audit Reports',
    description: 'Generate court-admissible audit documentation that traces every inference step, data source, and compliance discrepancy with full transparency for legal proceedings.',
    tags: ['XAI', 'Legal-Ready', 'Auto-Generated'],
  },
  {
    icon: 'ri-speed-up-line',
    title: 'Risk Scoring Engine',
    description: 'Dynamic compliance scoring models that weigh income declarations against lifestyle indicators, asset holdings, and transaction history to prioritize enforcement resources.',
    tags: ['Dynamic Scoring', 'Prioritization', 'Dashboard'],
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32 bg-background-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100/70 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-500"></span>
            <span className="text-accent-800 text-xs font-semibold tracking-wider uppercase">Core Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 leading-tight max-w-2xl">
            Intelligent Tools for<br />
            <span className="text-accent-600">Tax Enforcement</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-7 rounded-xl bg-background-50 border border-background-200/60 hover:border-accent-300/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 group-hover:bg-accent-500 group-hover:text-background-50 transition-all duration-300 mb-5">
                <i className={`${feature.icon} text-xl md:text-2xl`}></i>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-primary-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-5">
                {feature.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary-100 text-secondary-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}