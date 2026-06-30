import { useState, useMemo } from 'react';
import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import { knowledgeArticles, knowledgeCategories, type KnowledgeArticle } from '@/mocks/knowledge-base';

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);

  const filteredArticles = useMemo(() => {
    let articles = knowledgeArticles;

    if (activeCategory !== 'all') {
      articles = articles.filter((a) => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    return articles;
  }, [activeCategory, searchQuery]);

  const featuredArticles = useMemo(
    () => filteredArticles.filter((a) => a.featured),
    [filteredArticles],
  );
  const regularArticles = useMemo(
    () => filteredArticles.filter((a) => !a.featured),
    [filteredArticles],
  );

  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  const categoryColorMap: Record<string, string> = {
    'Getting Started': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Risk Scoring': 'bg-rose-100 text-rose-700 border-rose-200',
    'Entity Resolution': 'bg-amber-100 text-amber-700 border-amber-200',
    'Knowledge Graph': 'bg-secondary-100 text-secondary-700 border-secondary-200',
    'Audit Reports': 'bg-primary-100 text-primary-700 border-primary-200',
    'Data Sources': 'bg-accent-100 text-accent-700 border-accent-200',
    'Analytics': 'bg-sky-100 text-sky-700 border-sky-200',
    'Security & Compliance': 'bg-violet-100 text-violet-700 border-violet-200',
  };

  return (
    <DashboardLayout activeMenu="Knowledge Base">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground-900">Knowledge Base</h1>
        <p className="text-sm text-foreground-500 mt-1">
          Documentation, guides, and best practices for the TaxGraph AI intelligence platform.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 w-full max-w-md">
          <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
          <input
            type="text"
            placeholder="Search articles by title, description, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-background-200/70 bg-white text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-300 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-300 hover:text-foreground-500 cursor-pointer"
            >
              <i className="ri-close-circle-fill text-sm"></i>
            </button>
          )}
        </div>
        <span className="text-xs text-foreground-400 whitespace-nowrap">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap mb-6">
        {knowledgeCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeCategory === cat.key
                ? 'bg-primary-500 text-white shadow-sm'
                : 'bg-white text-foreground-600 hover:text-foreground-800 hover:bg-background-100 border border-background-200/70'
            }`}
          >
            <i className={`${cat.icon} text-sm`}></i>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mb-4">
            <i className="ri-search-line text-foreground-300 text-2xl"></i>
          </div>
          <h3 className="text-base font-heading font-bold text-foreground-900 mb-2">No articles found</h3>
          <p className="text-sm text-foreground-500 max-w-sm">
            No articles match your current search or filter criteria. Try adjusting your query or selecting a different category.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-refresh-line text-sm"></i>
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <>
          {featuredArticles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="ri-star-fill text-amber-400 text-xs"></i>
                Featured Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {featuredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    categoryColorMap={categoryColorMap}
                    onClick={() => setSelectedArticle(article)}
                  />
                ))}
              </div>
            </div>
          )}

          {regularArticles.length > 0 && (
            <div>
              {featuredArticles.length > 0 && (
                <h3 className="text-xs font-semibold text-foreground-400 uppercase tracking-wider mb-3">
                  All Articles
                </h3>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    categoryColorMap={categoryColorMap}
                    onClick={() => setSelectedArticle(article)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          categoryColorMap={categoryColorMap}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </DashboardLayout>
  );
}

function ArticleCard({
  article,
  categoryColorMap,
  onClick,
}: {
  article: KnowledgeArticle;
  categoryColorMap: Record<string, string>;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full bg-white rounded-xl border border-background-200/70 p-5 hover:border-primary-200/70 hover:bg-background-50/50 transition-all duration-200 group cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-background-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
          <i className={`${article.icon} text-foreground-600 group-hover:text-primary-600 text-lg transition-colors`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                categoryColorMap[article.category] || 'bg-background-100 text-foreground-600 border-background-200'
              }`}
            >
              {article.category}
            </span>
            <span className="text-[10px] text-foreground-400">{article.readTime} min read</span>
          </div>
          <h4 className="text-sm font-heading font-bold text-foreground-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {article.title}
          </h4>
          <p className="text-xs text-foreground-500 mt-1.5 line-clamp-2">{article.description}</p>
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex px-2 py-0.5 rounded-full bg-background-100 text-[10px] text-foreground-500"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-[10px] text-foreground-400">+{article.tags.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

function ArticleModal({
  article,
  categoryColorMap,
  onClose,
}: {
  article: KnowledgeArticle;
  categoryColorMap: Record<string, string>;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in-up">
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-5 border-b border-background-200/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-background-100 flex items-center justify-center">
              <i className={`${article.icon} text-foreground-600 text-lg`}></i>
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-foreground-900">{article.title}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                    categoryColorMap[article.category] || 'bg-background-100 text-foreground-600 border-background-200'
                  }`}
                >
                  {article.category}
                </span>
                <span className="text-[10px] text-foreground-400">{article.readTime} min read</span>
                <span className="text-[10px] text-foreground-400">· Updated {new Date(article.lastUpdated).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-background-200/70 flex items-center justify-center text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-close-line text-sm"></i>
          </button>
        </div>

        <div className="p-5 md:p-6">
          <p className="text-sm text-foreground-700 leading-relaxed mb-6">{article.description}</p>

          <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 mb-6">
            <h4 className="text-xs font-semibold text-foreground-500 uppercase tracking-wider mb-3">Article Content</h4>
            <div className="space-y-4 text-sm text-foreground-700 leading-relaxed">
              <section>
                <h5 className="text-sm font-heading font-bold text-foreground-900 mb-2">Overview</h5>
                <p>
                  This comprehensive guide covers everything you need to know about using the {article.title
                    .toLowerCase()
                    .includes('risk scoring')
                    ? 'risk scoring engine'
                    : article.title.toLowerCase().includes('entity resolution')
                      ? 'entity resolution system'
                      : article.title.toLowerCase().includes('knowledge graph')
                        ? 'knowledge graph visualisation'
                        : article.title.toLowerCase().includes('audit')
                          ? 'audit reporting module'
                          : article.title.toLowerCase().includes('data source')
                            ? 'data source integration framework'
                            : article.title.toLowerCase().includes('analytics')
                              ? 'analytics dashboard'
                              : article.title.toLowerCase().includes('security')
                                ? 'security and compliance framework'
                                : 'TaxGraph AI platform'}
                  {' '}effectively. Whether you are a new FBR officer or an experienced analyst, this article provides step-by-step guidance to help you make the most of the platform's capabilities.
                </p>
              </section>

              <section>
                <h5 className="text-sm font-heading font-bold text-foreground-900 mb-2">Key Learning Objectives</h5>
                <ul className="list-disc list-inside space-y-1.5 text-foreground-700">
                  <li>Understand the core concepts and terminology related to this module</li>
                  <li>Learn the step-by-step workflow for typical operations</li>
                  <li>Identify common pitfalls and best practices for optimal results</li>
                  <li>Configure settings to match your department's operational requirements</li>
                  <li>Troubleshoot common issues and understand error messages</li>
                </ul>
              </section>

              <section>
                <h5 className="text-sm font-heading font-bold text-foreground-900 mb-2">Prerequisites</h5>
                <div className="bg-white rounded-lg border border-background-200/70 p-4">
                  <ul className="space-y-2 text-xs text-foreground-600">
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-accent-500 mt-0.5 flex-shrink-0"></i>
                      <span>Active FBR officer credentials with appropriate clearance level</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-accent-500 mt-0.5 flex-shrink-0"></i>
                      <span>Access to the TaxGraph AI dashboard (contact your system administrator if access is not granted)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-checkbox-circle-fill text-accent-500 mt-0.5 flex-shrink-0"></i>
                      <span>Familiarity with basic tax investigation workflows and FBR procedural guidelines</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h5 className="text-sm font-heading font-bold text-foreground-900 mb-2">Step-by-Step Instructions</h5>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground-900">
                          {step === 1
                            ? 'Navigate to the relevant module'
                            : step === 2
                              ? 'Configure your parameters'
                              : step === 3
                                ? 'Execute and review results'
                                : 'Export or take action'}
                        </p>
                        <p className="text-xs text-foreground-600 mt-0.5">
                          {step === 1
                            ? 'Access the module from the left sidebar navigation. Ensure you have the correct permissions to view and interact with the data presented.'
                            : step === 2
                              ? 'Adjust filters, thresholds, and data source selections based on your investigative requirements. Refer to the Settings page for global configuration options.'
                              : step === 3
                                ? 'Run the analysis, entity resolution, or report generation. Review the output carefully — TaxGraph AI provides confidence scores and contributing factors for every result.'
                                : 'Download audit-ready reports, share findings with your team via the platform, or escalate flagged cases to the investigation queue for further action.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h5 className="text-sm font-heading font-bold text-foreground-900 mb-2">Best Practices & Tips</h5>
                <div className="bg-accent-50 rounded-lg border border-accent-200/70 p-4">
                  <ul className="space-y-2 text-xs text-foreground-700">
                    <li className="flex items-start gap-2">
                      <i className="ri-lightbulb-flash-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                      <span><strong>Start with broad searches</strong> and progressively narrow down — this reduces the risk of missing relevant connections or entities.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-lightbulb-flash-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                      <span><strong>Regularly sync your data sources</strong> to ensure analyses are based on the most recent government data feeds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-lightbulb-flash-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                      <span><strong>Document your findings</strong> using the built-in annotation tools — this creates an auditable trail for each investigation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="ri-lightbulb-flash-line text-accent-500 mt-0.5 flex-shrink-0"></i>
                      <span><strong>Review AI-generated confidence scores</strong> critically. The system is a decision-support tool, not a replacement for officer judgement.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h5 className="text-sm font-heading font-bold text-foreground-900 mb-2">Related Articles</h5>
                <div className="flex items-center gap-2 flex-wrap">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-background-100 border border-background-200/70 text-xs text-foreground-600 hover:text-primary-600 hover:border-primary-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-background-200/70">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-background-100 flex items-center justify-center">
                <i className="ri-check-double-line text-accent-500 text-xs"></i>
              </div>
              <span className="text-xs text-foreground-500">Reviewed by TaxGraph AI Documentation Team</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg border border-background-200/70 flex items-center justify-center text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer">
                <i className="ri-thumb-up-line text-sm"></i>
              </button>
              <button className="w-8 h-8 rounded-lg border border-background-200/70 flex items-center justify-center text-foreground-400 hover:text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer">
                <i className="ri-share-forward-line text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}