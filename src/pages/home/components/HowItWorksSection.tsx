const steps = [
  {
    number: '01',
    icon: 'ri-database-2-line',
    title: 'Collect Civic Data',
    description: 'Ingest records from NADRA, property registries, vehicle authorities, utility companies, and banking transactions into a unified data lake.',
  },
  {
    number: '02',
    icon: 'ri-user-settings-line',
    title: 'Resolve Identities',
    description: 'AI-powered entity resolution matches individuals across disparate databases using fuzzy name matching, address correlation, and biometric references.',
  },
  {
    number: '03',
    icon: 'ri-git-branch-line',
    title: 'Build Knowledge Graph',
    description: 'Construct a connected graph mapping relationships between taxpayers, assets, transactions, and associated entities for holistic visibility.',
  },
  {
    number: '04',
    icon: 'ri-bar-chart-grouped-line',
    title: 'Calculate Compliance Score',
    description: 'Machine learning models assess declared income against lifestyle indicators, generating a dynamic compliance risk score for every taxpayer.',
  },
  {
    number: '05',
    icon: 'ri-file-search-line',
    title: 'Generate Audit Trail',
    description: 'Explainable AI produces detailed, court-admissible audit reports documenting every data point, inference step, and compliance discrepancy.',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 bg-primary-950">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent-400"></span>
            <span className="text-accent-300 text-xs font-semibold tracking-wider uppercase">Process</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            How TaxGraph AI Works
          </h2>
          <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            A five-stage intelligent pipeline that transforms fragmented civic data into actionable tax compliance intelligence.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-accent-500/20"></div>

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-start gap-6 md:gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className={`inline-block p-5 md:p-6 rounded-xl bg-primary-900/60 border border-primary-700/30 hover:border-accent-500/30 transition-all duration-300 ${
                    index % 2 === 0 ? 'lg:ml-auto' : ''
                  } max-w-md`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-500/15">
                        <i className={`${step.icon} text-accent-400 text-lg`}></i>
                      </div>
                      <span className="text-accent-400/60 text-xs font-mono tracking-wider">{step.number}</span>
                    </div>
                    <h3 className="text-white font-semibold text-base md:text-lg mb-2">{step.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-accent-500 ring-4 ring-accent-500/20 z-10"></div>
                </div>

                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}