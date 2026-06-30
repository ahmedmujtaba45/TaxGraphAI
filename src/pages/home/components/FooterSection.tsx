import { useState } from 'react';

type ModalType =
  | 'documentation'
  | 'api-reference'
  | 'case-studies'
  | 'whitepaper'
  | 'privacy-policy'
  | 'terms-of-use'
  | 'contact'
  | null;

const modalTitles: Record<NonNullable<ModalType>, string> = {
  documentation: 'Documentation',
  'api-reference': 'API Reference',
  'case-studies': 'Case Studies',
  whitepaper: 'Whitepaper',
  'privacy-policy': 'Privacy Policy',
  'terms-of-use': 'Terms of Use',
  contact: 'Contact Us',
};

const modalContent: Record<string, { body: string }> = {
  documentation: {
    body: 'TaxGraph AI provides comprehensive documentation covering system architecture, knowledge graph integration, entity resolution algorithms, risk scoring models, and audit workflows. Our developer portal includes step-by-step guides, SDK references, and interactive API playgrounds to accelerate integration with FBR systems. Browse code samples in Python, Java, and Node.js, or explore our GraphQL schema to connect directly with the civic intelligence engine.',
  },
  'api-reference': {
    body: 'The TaxGraph AI REST and GraphQL APIs enable secure programmatic access to entity resolution, risk scoring, and audit intelligence endpoints. All requests are authenticated via FBR-issued API keys with role-based access control. Rate limits scale by subscription tier, and webhook callbacks deliver real-time alerts for flagged entities. Explore our OpenAPI 3.1 specification for full endpoint documentation, request/response schemas, and sandbox testing environments.',
  },
  'case-studies': {
    body: 'Discover how provincial tax authorities and federal investigation units leverage TaxGraph AI to close the tax gap. Our published case studies cover the Lahore Commercial Property Drive (2025), the Karachi Wholesale Market Investigation, the Islamabad Non-Filer Sweep, and cross-province benami asset tracing operations. Each study details methodology, data sources integrated, risk signals uncovered, and revenue recovery outcomes achieved through the platform.',
  },
  whitepaper: {
    body: 'The TaxGraph AI Technical Whitepaper outlines the knowledge graph architecture, graph neural network models for risk prediction, and privacy-preserving entity resolution techniques developed in collaboration with FBR Pakistan and leading academic institutions. Topics include multi-source data fusion, temporal anomaly detection, hierarchical risk propagation, and the ethical framework governing automated audit recommendations. Download the full PDF from our resources portal.',
  },
  'privacy-policy': {
    body: 'TaxGraph AI processes citizen data under the legal authority of the Federal Board of Revenue Act 2007 and the Protection of Economic Reform Act 1992. All data is encrypted at rest and in transit using AES-256 and TLS 1.3. Personally identifiable information is compartmentalized with strict role-based access. Data retention follows FBR statutory schedules. No data is shared with third parties outside the scope of lawful tax investigation. Citizens may request a data disclosure report through the FBR grievance portal.',
  },
  'terms-of-use': {
    body: 'Access to TaxGraph AI is restricted to authorized FBR personnel and designated provincial tax authority officers. Users must authenticate via the FBR Single Sign-On system with hardware token verification. Unauthorized access, data exfiltration, or misuse of the platform constitutes an offense under the Prevention of Electronic Crimes Act 2016 (PECA) and the Official Secrets Act 1923. All queries and actions are logged with immutable audit trails. By logging in, users acknowledge these terms and accept full accountability for their session activity.',
  },
};

export default function FooterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [contactForm, setContactForm] = useState({
    name: '',
    contactEmail: '',
    organization: '',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = '';
    setContactSubmitted(false);
    setContactError('');
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.message.length > 500) {
      setContactError('Message must be under 500 characters.');
      return;
    }
    setContactSubmitting(true);
    setContactError('');

    try {
      const body = new URLSearchParams();
      body.append('name', contactForm.name);
      body.append('email', contactForm.contactEmail);
      body.append('organization', contactForm.organization);
      body.append('message', contactForm.message);

      await fetch('https://readdy.ai/api/form/d8lf4urakrl89656lmk0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setContactSubmitted(true);
    } catch {
      setContactError('Something went wrong. Please try again.');
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <>
      <footer className="relative bg-primary-950 pt-20 md:pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="lg:w-[40%]">
              <a href="#hero" className="inline-flex items-center gap-2 mb-6">
                <div className="w-9 h-9 flex items-center justify-center bg-primary-800 rounded-lg">
                  <i className="ri-government-line text-accent-400 text-lg"></i>
                </div>
                <span className="font-heading text-2xl font-bold text-white">
                  TaxGraph<span className="text-accent-400">AI</span>
                </span>
              </a>

              <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-sm">
                An AI-powered government fintech platform by the Pakistan Federal Board of Revenue,
                built to broaden the national tax net through connected civic intelligence and knowledge graph technology.
              </p>

              <div className="mb-8">
                <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">Stay Updated</p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3" data-readdy-form="">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 bg-primary-900/50 border border-primary-700/40 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-accent-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-accent-500 hover:bg-accent-600 text-background-50 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap active:scale-[0.98]"
                  >
                    {submitted ? 'Subscribed!' : 'Subscribe'}
                  </button>
                </form>
                {submitted && (
                  <p className="text-accent-400 text-xs mt-2">Thank you for subscribing to TaxGraph AI updates.</p>
                )}
              </div>
            </div>

            <div className="lg:w-[60%] grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <p className="text-white/80 text-sm font-semibold mb-4">Platform</p>
                <div className="flex flex-col gap-3">
                  <a href="#features" className="text-white/45 hover:text-accent-400 text-sm transition-colors">Features</a>
                  <a href="#how-it-works" className="text-white/45 hover:text-accent-400 text-sm transition-colors">How It Works</a>
                  <a href="#stats" className="text-white/45 hover:text-accent-400 text-sm transition-colors">Statistics</a>
                  <a href="/admin-login" className="text-white/45 hover:text-accent-400 text-sm transition-colors">Dashboard</a>
                </div>
              </div>

              <div>
                <p className="text-white/80 text-sm font-semibold mb-4">Resources</p>
                <div className="flex flex-col gap-3">
                  <button onClick={() => openModal('documentation')} className="text-white/45 hover:text-accent-400 text-sm transition-colors text-left">Documentation</button>
                  <button onClick={() => openModal('api-reference')} className="text-white/45 hover:text-accent-400 text-sm transition-colors text-left">API Reference</button>
                  <button onClick={() => openModal('case-studies')} className="text-white/45 hover:text-accent-400 text-sm transition-colors text-left">Case Studies</button>
                  <button onClick={() => openModal('whitepaper')} className="text-white/45 hover:text-accent-400 text-sm transition-colors text-left">Whitepaper</button>
                </div>
              </div>

              <div>
                <p className="text-white/80 text-sm font-semibold mb-4">About</p>
                <div className="flex flex-col gap-3">
                  <a href="https://fbr.gov.pk" target="_blank" rel="nofollow noopener noreferrer" className="text-white/45 hover:text-accent-400 text-sm transition-colors">FBR Pakistan</a>
                  <button onClick={() => openModal('privacy-policy')} className="text-white/45 hover:text-accent-400 text-sm transition-colors text-left">Privacy Policy</button>
                  <button onClick={() => openModal('terms-of-use')} className="text-white/45 hover:text-accent-400 text-sm transition-colors text-left">Terms of Use</button>
                  <button onClick={() => openModal('contact')} className="text-white/45 hover:text-accent-400 text-sm transition-colors text-left">Contact</button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-primary-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-white/30 text-xs">
                Pakistan FinTech Innovation Hackathon 2026 &mdash; TaxGraph AI
              </p>
              <p className="text-white/20 text-xs">
                Developed by TriTech Masters | BS SE
              </p>
            </div>
            <div className="flex items-center gap-5">
              <a href="#" className="text-white/30 hover:text-accent-400 transition-colors">
                <i className="ri-twitter-x-line text-base"></i>
              </a>
              <a href="#" className="text-white/30 hover:text-accent-400 transition-colors">
                <i className="ri-linkedin-line text-base"></i>
              </a>
              <a href="#" className="text-white/30 hover:text-accent-400 transition-colors">
                <i className="ri-github-line text-base"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {activeModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-modalOverlayIn" />
          <div
            className="relative bg-background-50 rounded-xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl animate-modalSlideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-lg font-heading font-bold text-foreground-950">
                {modalTitles[activeModal]}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-100 text-foreground-500 hover:text-foreground-800 transition-colors"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            {activeModal === 'contact' ? (
              <div className="p-6">
                {contactSubmitted ? (
                  <div className="text-center py-8 animate-modalSlideUp">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent-100">
                      <i className="ri-check-line text-2xl text-accent-600"></i>
                    </div>
                    <h4 className="text-lg font-heading font-bold text-foreground-950 mb-2">Message Sent!</h4>
                    <p className="text-foreground-600 text-sm">We will get back to you within 2 business days.</p>
                    <button
                      onClick={closeModal}
                      className="mt-6 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-background-50 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap active:scale-[0.98]"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4" data-readdy-form="">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-foreground-700 mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 bg-background-50 border border-background-300/60 rounded-lg text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-foreground-700 mb-1.5">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="contactEmail"
                        value={contactForm.contactEmail}
                        onChange={handleContactChange}
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 bg-background-50 border border-background-300/60 rounded-lg text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-org" className="block text-sm font-medium text-foreground-700 mb-1.5">
                        Organization
                      </label>
                      <input
                        id="contact-org"
                        type="text"
                        name="organization"
                        value={contactForm.organization}
                        onChange={handleContactChange}
                        placeholder="Your department or agency"
                        className="w-full px-4 py-2.5 bg-background-50 border border-background-300/60 rounded-lg text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-msg" className="block text-sm font-medium text-foreground-700 mb-1.5">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="contact-msg"
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactChange}
                        required
                        rows={4}
                        maxLength={500}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-2.5 bg-background-50 border border-background-300/60 rounded-lg text-foreground-900 text-sm placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                      />
                      <p className="text-foreground-400 text-xs mt-1 text-right">{contactForm.message.length}/500</p>
                    </div>
                    {contactError && (
                      <p className="text-red-500 text-xs">{contactError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-background-50 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {contactSubmitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin"></i>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="p-6">
                <p className="text-foreground-700 text-sm leading-relaxed">
                  {modalContent[activeModal]?.body}
                </p>
                <div className="mt-6 pt-4 border-t border-background-200/70">
                  <p className="text-foreground-400 text-xs">
                    For detailed inquiries, please{' '}
                    <button onClick={() => { setActiveModal('contact'); }} className="text-primary-600 hover:text-primary-700 underline">
                      contact our team
                    </button>
                    .
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}