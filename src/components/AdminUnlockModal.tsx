import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AdminUnlockModal: React.FC = () => {
  const { unlockModalOpen, closeUnlockModal, verifyPinAndLogin } = usePortfolio();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!unlockModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyPinAndLogin(pin);
    if (!success) {
      setError(true);
      setPin('');
    } else {
      setError(false);
      setPin('');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="absolute inset-0" onClick={closeUnlockModal} />

      <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Lock className="w-4 h-4" />
            <h3 className="text-sm font-bold text-white font-display">
              Creator Studio Access
            </h3>
          </div>
          <button
            type="button"
            onClick={closeUnlockModal}
            className="p-1 text-neutral-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
          Enter your Creator PIN to access the video and graphic uploader. Public visitors cannot see any management buttons.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-medium text-neutral-300 uppercase tracking-wider mb-1.5">
              Passcode (Default: 1234)
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="password"
                maxLength={8}
                autoFocus
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Enter 4-digit PIN..."
                className="w-full pl-9 pr-3 py-2 text-sm font-mono tracking-widest bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect PIN. Try default "1234".</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeUnlockModal}
              className="px-3 py-2 text-xs text-neutral-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
            >
              Unlock Studio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
