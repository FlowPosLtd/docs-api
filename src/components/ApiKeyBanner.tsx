import { useState } from 'react';
import { PRESET_URLS } from '../utils/api-client';

interface ApiKeyBannerProps {
  apiKey: string;
  baseUrl: string;
  onSave: (key: string, url: string) => void;
}

export function ApiKeyBanner({ apiKey, baseUrl, onSave }: ApiKeyBannerProps) {
  const [open, setOpen]       = useState(false);
  const [draftKey, setDraftKey] = useState(apiKey);
  const [draftUrl, setDraftUrl] = useState(baseUrl);

  const save = () => {
    onSave(draftKey.trim(), draftUrl.trim());
    setOpen(false);
  };

  const inputCls = 'w-full px-3 py-2 text-sm rounded-lg border border-line bg-canvas text-ink-primary focus:outline-none focus:border-accent transition-colors';

  return (
    <>
      <button
        onClick={() => { setDraftKey(apiKey); setDraftUrl(baseUrl); setOpen(true); }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-pitch-800 border border-pitch-600 text-pitch-200 text-xs font-medium shadow-xl hover:bg-pitch-700 transition-colors"
        title="Configure API key"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
        {apiKey ? (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-get"></span>
            API Key set
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-put animate-pulse"></span>
            Set API Key
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative bg-canvas w-full sm:max-w-md sm:rounded-xl border border-line shadow-2xl p-6">
            <h3 className="t-subheading mb-1">Configure API Explorer</h3>
            <p className="t-body-sm mb-5">Stored in your browser. Used for live "Try it" requests only.</p>

            <div className="space-y-4">
              <div>
                <label className="block t-caption mb-1.5">Environment</label>
                <div className="relative">
                  <select
                    value={draftUrl}
                    onChange={e => setDraftUrl(e.target.value)}
                    className={inputCls + ' appearance-none pr-8 font-mono'}
                  >
                    {PRESET_URLS.map(url => (
                      <option key={url} value={url}>{url}</option>
                    ))}
                  </select>
                  <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <p className="mt-1.5 t-body-sm">
                  {draftUrl === PRESET_URLS[0] ? 'Staging / development environment' : 'Production environment'}
                </p>
              </div>

              <div>
                <label className="block t-caption mb-1.5">API Key</label>
                <input
                  type="password"
                  value={draftKey}
                  onChange={e => setDraftKey(e.target.value)}
                  placeholder="your_api_key_here"
                  className={inputCls + ' font-mono placeholder-ink-tertiary'}
                />
                <p className="mt-1.5 t-body-sm">Never share your API key. Stored only in your browser.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button onClick={save} className="flex-1 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-colors">
                Save
              </button>
              <button onClick={() => setOpen(false)} className="flex-1 py-2 rounded-lg border border-line text-ink-secondary text-sm font-medium hover:bg-canvas-subtle transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
