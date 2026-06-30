import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Statistics', href: '#stats' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background-50 border-b border-background-200/70 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-18">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center bg-primary-800 rounded-lg">
              <i className="ri-government-line text-accent-400 text-lg"></i>
            </div>
            <span className={`font-heading text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-primary-800' : 'text-white'
            }`}>
              TaxGraph<span className="text-accent-400">AI</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 whitespace-nowrap ${
                  scrolled
                    ? 'text-foreground-700 hover:text-primary-700'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/admin-login"
              className="px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-background-50 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap"
            >
              Launch Dashboard
            </a>
          </div>

          <button
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              scrolled ? 'text-primary-800 hover:bg-background-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`text-xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background-50 border-b border-background-200/70 shadow-sm">
          <div className="px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground-700 hover:text-primary-700 text-sm font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-background-200">
              <a
                href="/admin-login"
                className="px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-background-50 text-sm font-semibold rounded-lg text-center transition-all duration-300 whitespace-nowrap"
                onClick={() => setMobileMenuOpen(false)}
              >
                Launch Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}