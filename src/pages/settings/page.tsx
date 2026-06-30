import { useState } from 'react';
import DashboardLayout from '@/pages/dashboard/components/DashboardLayout';
import {
  riskConfig,
  alertPreferences as initialAlerts,
  syncConfig as initialSync,
} from '@/mocks/settings';

type TabKey = 'risk' | 'alerts' | 'sync';

const tabs: { key: TabKey; icon: string; label: string }[] = [
  { key: 'risk', icon: 'ri-speed-up-line', label: 'Risk Configuration' },
  { key: 'alerts', icon: 'ri-notification-3-line', label: 'Alert Preferences' },
  { key: 'sync', icon: 'ri-refresh-line', label: 'Data Sync' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabKey>('risk');
  const [factorWeights, setFactorWeights] = useState(riskConfig.factorWeights);
  const [aiThreshold, setAiThreshold] = useState(riskConfig.aiConfidenceThreshold);
  const [autoFlagThreshold, setAutoFlagThreshold] = useState(riskConfig.autoFlagThreshold);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [syncItems, setSyncItems] = useState(initialSync);
  const [savedBanner, setSavedBanner] = useState<string | null>(null);

  const showBanner = (message: string) => {
    setSavedBanner(message);
    setTimeout(() => setSavedBanner(null), 3000);
  };

  const toggleAlertChannel = (alertId: string, channel: string) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id !== alertId) return a;
        const hasChannel = a.channels.includes(channel);
        return {
          ...a,
          channels: hasChannel
            ? a.channels.filter((c) => c !== channel)
            : [...a.channels, channel],
        };
      }),
    );
  };

  const handleWeightChange = (id: string, delta: number) => {
    setFactorWeights((prev) =>
      prev.map((fw) =>
        fw.id === id ? { ...fw, weight: Math.max(0, Math.min(50, fw.weight + delta)) } : fw,
      ),
    );
  };

  const handleSyncFreqChange = (id: string, delta: number) => {
    setSyncItems((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, frequency: Math.max(1, Math.min(1440, s.frequency + delta)) } : s,
      ),
    );
  };

  const colorMap: Record<string, string> = {
    primary: 'bg-primary-100 text-primary-700 border-primary-200',
    accent: 'bg-accent-100 text-accent-700 border-accent-200',
    secondary: 'bg-secondary-100 text-secondary-700 border-secondary-200',
  };

  return (
    <DashboardLayout activeMenu="Settings">
      {savedBanner && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-up flex items-center gap-2 bg-accent-500 text-white px-5 py-3 rounded-xl shadow-lg">
          <i className="ri-check-double-line text-lg"></i>
          <span className="text-sm font-semibold">{savedBanner}</span>
        </div>
      )}

      <div className="animate-page-enter">
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-heading font-bold text-foreground-900">Settings</h1>
        <p className="text-sm text-foreground-500 mt-1">
          Configure risk engine parameters, notification preferences, and data synchronisation schedules.
        </p>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-background-200/70 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeTab === tab.key
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-foreground-500 hover:text-foreground-700 hover:bg-background-100'
            }`}
          >
            <i className={`${tab.icon} text-base`}></i>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'risk' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                <i className="ri-speed-up-line text-primary-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-foreground-900">Risk Level Thresholds</h3>
                <p className="text-xs text-foreground-500">Define the score boundaries for each risk category</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(riskConfig.thresholds).map(([key, t]) => {
                const gradients: Record<string, string> = {
                  low: 'from-emerald-500 to-emerald-400',
                  medium: 'from-secondary-500 to-secondary-400',
                  high: 'from-amber-500 to-amber-400',
                  critical: 'from-rose-500 to-rose-400',
                };
                const bgGradients: Record<string, string> = {
                  low: 'bg-emerald-50 border-emerald-200/60',
                  medium: 'bg-secondary-50 border-secondary-200/60',
                  high: 'bg-amber-50 border-amber-200/60',
                  critical: 'bg-rose-50 border-rose-200/60',
                };
                return (
                  <div key={key} className={`rounded-xl border p-4 ${bgGradients[key]}`}>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${gradients[key]} text-white text-xs font-bold mb-3`}>
                      {t.label}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-heading font-bold text-foreground-900">{t.min}</span>
                      <span className="text-foreground-400 text-sm">to</span>
                      <span className="text-3xl font-heading font-bold text-foreground-900">{t.max}</span>
                    </div>
                    <p className="text-xs text-foreground-500 mt-1">Score range</p>
                    <div className="mt-3 h-1.5 rounded-full bg-white/60 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${gradients[key]}`}
                        style={{ width: `${((t.max - t.min) / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-scales-3-line text-accent-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-foreground-900">Factor Weight Adjustment</h3>
                <p className="text-xs text-foreground-500">Fine-tune how each contributing factor influences the overall risk score</p>
              </div>
            </div>

            <div className="space-y-3">
              {factorWeights.map((fw) => (
                <div
                  key={fw.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-background-200/70 hover:border-background-300/60 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground-900">{fw.label}</p>
                    <p className="text-xs text-foreground-500 mt-0.5 line-clamp-2">{fw.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleWeightChange(fw.id, -1)}
                      className="w-7 h-7 rounded-lg border border-background-200/70 bg-white flex items-center justify-center text-foreground-500 hover:bg-background-100 hover:text-foreground-700 transition-colors cursor-pointer"
                    >
                      <i className="ri-subtract-line text-sm"></i>
                    </button>
                    <span className="w-10 text-center text-lg font-heading font-bold text-foreground-900">{fw.weight}</span>
                    <button
                      onClick={() => handleWeightChange(fw.id, 1)}
                      className="w-7 h-7 rounded-lg border border-background-200/70 bg-white flex items-center justify-center text-foreground-500 hover:bg-background-100 hover:text-foreground-700 transition-colors cursor-pointer"
                    >
                      <i className="ri-add-line text-sm"></i>
                    </button>
                  </div>
                  <div className="w-full sm:w-[120px] h-2 rounded-full bg-background-200 overflow-hidden flex-shrink-0">
                    <div
                      className="h-full rounded-full bg-primary-500 transition-all duration-300"
                      style={{ width: `${(fw.weight / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                  <i className="ri-brain-line text-secondary-600 text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-foreground-900">AI Confidence Threshold</h3>
                  <p className="text-xs text-foreground-500">Minimum confidence for auto-flagging</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={aiThreshold}
                  onChange={(e) => setAiThreshold(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-background-200 accent-primary-500 cursor-pointer"
                />
                <span className="text-xl font-heading font-bold text-foreground-900 w-12 text-right">{aiThreshold}%</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center">
                  <i className="ri-flag-line text-rose-600 text-lg"></i>
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-foreground-900">Auto-Flag Threshold</h3>
                  <p className="text-xs text-foreground-500">Score at which cases are automatically flagged for audit</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={50}
                  max={100}
                  value={autoFlagThreshold}
                  onChange={(e) => setAutoFlagThreshold(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-background-200 accent-rose-500 cursor-pointer"
                />
                <span className="text-xl font-heading font-bold text-foreground-900 w-12 text-right">{autoFlagThreshold}%</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => showBanner('Risk configuration saved successfully')}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-save-line text-base"></i>
              <span>Save Risk Settings</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                <i className="ri-notification-3-line text-accent-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-foreground-900">Notification Preferences</h3>
                <p className="text-xs text-foreground-500">Choose which alerts to receive and through which channels</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-background-200/70">
                    <th className="text-left py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider w-[40%]">Alert Type</th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Email</th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">Dashboard</th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider">SMS</th>
                    <th className="text-center py-3 px-3 text-xs font-semibold text-foreground-500 uppercase tracking-wider w-[80px]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="border-b border-background-100/70 hover:bg-background-50/50 transition-colors">
                      <td className="py-3.5 px-3">
                        <p className="text-sm font-semibold text-foreground-900">{alert.label}</p>
                        <p className="text-xs text-foreground-500 mt-0.5 line-clamp-1">{alert.description}</p>
                      </td>
                      {['email', 'dashboard', 'sms'].map((ch) => (
                        <td key={ch} className="py-3.5 px-3 text-center">
                          <button
                            onClick={() => toggleAlertChannel(alert.id, ch)}
                            className={`w-8 h-8 rounded-lg border transition-all duration-200 flex items-center justify-center mx-auto cursor-pointer ${
                              alert.channels.includes(ch)
                                ? 'bg-primary-500 border-primary-500 text-white'
                                : 'border-background-200/70 bg-white text-foreground-300 hover:border-foreground-300'
                            }`}
                          >
                            <i
                              className={`text-sm ${
                                alert.channels.includes(ch) ? 'ri-check-line' : 'ri-close-line'
                              }`}
                            ></i>
                          </button>
                        </td>
                      ))}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() =>
                            setAlerts((prev) =>
                              prev.map((a) => (a.id === alert.id ? { ...a, enabled: !a.enabled } : a)),
                            )
                          }
                          className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                            alert.enabled ? 'bg-accent-500' : 'bg-background-300'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                              alert.enabled ? 'translate-x-5.5' : 'translate-x-0.5'
                            }`}
                          ></span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => showBanner('Alert preferences saved successfully')}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-save-line text-base"></i>
              <span>Save Alert Preferences</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'sync' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-background-200/70 p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                <i className="ri-refresh-line text-secondary-600 text-lg"></i>
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-foreground-900">Data Source Sync Intervals</h3>
                <p className="text-xs text-foreground-500">Configure how frequently each government data source is synchronised</p>
              </div>
            </div>

            <div className="space-y-3">
              {syncItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-background-200/70 hover:border-background-300/60 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${colorMap[item.color].split(' ')[0]} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${item.icon} ${colorMap[item.color].split(' ')[1]} text-base`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground-900">{item.label}</p>
                    <p className="text-xs text-foreground-500 mt-0.5">
                      {item.recordCount} records · Last synced {new Date(item.lastSynced).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleSyncFreqChange(item.id, -5)}
                      className="w-7 h-7 rounded-lg border border-background-200/70 bg-white flex items-center justify-center text-foreground-500 hover:bg-background-100 hover:text-foreground-700 transition-colors cursor-pointer"
                    >
                      <i className="ri-subtract-line text-sm"></i>
                    </button>
                    <div className="text-center min-w-[70px]">
                      <span className="text-lg font-heading font-bold text-foreground-900">{item.frequency}</span>
                      <span className="text-xs text-foreground-500 ml-0.5">{item.unit}</span>
                    </div>
                    <button
                      onClick={() => handleSyncFreqChange(item.id, 5)}
                      className="w-7 h-7 rounded-lg border border-background-200/70 bg-white flex items-center justify-center text-foreground-500 hover:bg-background-100 hover:text-foreground-700 transition-colors cursor-pointer"
                    >
                      <i className="ri-add-line text-sm"></i>
                    </button>
                  </div>
                  <button
                    onClick={() => showBanner(`${item.label} sync triggered manually`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent-200/70 bg-accent-50 text-accent-700 text-xs font-semibold hover:bg-accent-100 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-play-circle-line text-sm"></i>
                    <span>Sync Now</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => showBanner('Sync configuration saved successfully')}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-save-line text-base"></i>
              <span>Save Sync Settings</span>
            </button>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}