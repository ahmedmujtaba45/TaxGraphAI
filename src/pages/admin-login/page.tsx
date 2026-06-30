import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Credentials {
  email: string;
  password: string;
}

const VALID_CREDENTIALS: Credentials[] = [
  { email: 'ahmed.mujtaba@fbr.com', password: 'FBR2025!' },
  { email: 'fatima.sheikh@fbr.com', password: 'FBR2025!' },
  { email: 'ali.raza@fbr.com', password: 'FBR2025!' },
];

const USER_PROFILES: Record<string, { name: string; initials: string; role: string }> = {
  'ahmed.mujtaba@fbr.com': { name: 'Ahmed Mujtaba', initials: 'AM', role: 'Senior Tax Officer' },
  'fatima.sheikh@fbr.com': { name: 'Fatima Sheikh', initials: 'FS', role: 'Director Analytics' },
  'ali.raza@fbr.com': { name: 'Ali Raza', initials: 'AR', role: 'Investigation Lead' },
};

export default function AdminLogin() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      triggerShake();
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      triggerShake();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const match = VALID_CREDENTIALS.find(
        (c) => c.email === email.trim().toLowerCase() && c.password === password
      );

      if (match) {
        const profile = USER_PROFILES[match.email];
        localStorage.setItem('taxgraph_user', JSON.stringify({
          email: match.email,
          name: profile.name,
          initials: profile.initials,
          role: profile.role,
        }));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
        triggerShake();
        setLoading(false);
      }
    }, 1200);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const fillDemoCredentials = () => {
    setEmail('ahmed.mujtaba@fbr.com');
    setPassword('FBR2025!');
    setError('');
  };

  return (
    <main className="relative min-h-screen bg-primary-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.03) 0%, transparent 50%)',
        }}></div>
      </div>

      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>

      <div className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2">
        <div className="w-9 h-9 flex items-center justify-center bg-primary-800 rounded-lg">
          <i className="ri-government-line text-accent-400 text-lg"></i>
        </div>
        <span className="font-heading text-xl font-bold text-white tracking-tight">
          TaxGraph<span className="text-accent-400">AI</span>
        </span>
      </div>

      <a
        href="/"
        className="absolute top-6 right-6 md:top-8 md:right-10 flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-sm"
      >
        <i className="ri-arrow-left-line"></i>
        <span className="hidden sm:inline">Back to Home</span>
      </a>

      <div className={`relative z-10 w-full max-w-md mx-4 ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        <div className="bg-primary-900/60 border border-primary-700/30 rounded-2xl p-8 md:p-10 backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-accent-500/15 border border-accent-500/20">
              <i className="ri-shield-user-line text-accent-400 text-2xl"></i>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">Admin Login</h2>
            <p className="text-white/40 text-sm">
              Secure access to the TaxGraph AI dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <i className="ri-mail-line absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 text-base"></i>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="admin@fbr.gov.pk"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-primary-800/60 border border-primary-600/40 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/15 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <i className="ri-lock-line absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25 text-base"></i>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 bg-primary-800/60 border border-primary-600/40 rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  <i className={`text-base ${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 bg-red-500/10 border border-red-500/25 rounded-xl">
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500/20 flex-shrink-0">
                  <i className="ri-error-warning-line text-red-400 text-xs"></i>
                </div>
                <p className="text-red-300 text-xs leading-snug">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent-500 hover:bg-accent-600 disabled:bg-accent-500/50 text-background-50 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-background-50/30 border-t-background-50 rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <i className="ri-login-box-line text-base"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-primary-700/30">
            <p className="text-white/25 text-xs text-center mb-3">
              Demo credentials for evaluation
            </p>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full px-4 py-2.5 bg-primary-800/40 hover:bg-primary-800/70 border border-primary-600/30 hover:border-primary-500/40 rounded-lg transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-accent-500/15">
                    <i className="ri-user-line text-accent-400 text-xs"></i>
                  </div>
                  <span className="text-white/60 group-hover:text-white/90 text-xs transition-colors">
                    ahmed.mujtaba@fbr.com
                  </span>
                </div>
                <span className="text-white/20 group-hover:text-accent-400 text-xs transition-colors flex items-center gap-1">
                  Fill <i className="ri-arrow-down-line text-[10px]"></i>
                </span>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-white/20 text-xs">
          <span className="flex items-center gap-1.5">
            <i className="ri-lock-line text-[10px]"></i>
            Encrypted
          </span>
          <span className="w-1 h-1 rounded-full bg-white/15"></span>
          <span>FBR Pakistan</span>
          <span className="w-1 h-1 rounded-full bg-white/15"></span>
          <span className="flex items-center gap-1.5">
            <i className="ri-check-double-line text-[10px]"></i>
            Secured
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-6px); }
          30%, 70% { transform: translateX(6px); }
        }
      `}</style>
    </main>
  );
}