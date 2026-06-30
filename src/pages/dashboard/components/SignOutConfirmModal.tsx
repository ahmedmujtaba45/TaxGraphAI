import { useState } from 'react';

interface SignOutConfirmModalProps {
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SignOutConfirmModal({ userName, onConfirm, onCancel }: SignOutConfirmModalProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      onConfirm();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel}></div>

      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-background-200 overflow-hidden shadow-2xl p-6">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-2xl bg-rose-50 border border-rose-200">
            <i className="ri-logout-box-r-line text-rose-500 text-2xl"></i>
          </div>
          <h3 className="text-lg font-heading font-bold text-foreground-900 mb-1">Sign Out?</h3>
          <p className="text-sm text-foreground-500">
            You are currently signed in as <strong className="text-foreground-700">{userName}</strong>. Are you sure you want to end your session?
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 bg-background-100 hover:bg-background-200 text-foreground-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-400 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing out...
              </>
            ) : (
              <>
                <i className="ri-logout-box-r-line text-base"></i>
                Sign Out
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}