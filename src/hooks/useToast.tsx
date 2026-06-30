import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ToastContextType {
  toasts: Toast[];
  toast: (message: string, type?: Toast['type']) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: Toast['type'] = 'info') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map((t) => {
          const iconMap: Record<string, string> = {
            success: 'ri-check-double-line',
            error: 'ri-error-warning-line',
            info: 'ri-information-line',
            warning: 'ri-alert-line',
          };
          const colorMap: Record<string, string> = {
            success: 'bg-emerald-600',
            error: 'bg-rose-600',
            info: 'bg-primary-600',
            warning: 'bg-amber-500',
          };
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-center gap-3 ${colorMap[t.type]} text-white px-5 py-3 rounded-xl shadow-lg animate-toast-in min-w-[280px] max-w-[420px]`}
            >
              <i className={`${iconMap[t.type]} text-lg flex-shrink-0`}></i>
              <span className="text-sm font-medium flex-1">{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors flex-shrink-0 cursor-pointer"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}