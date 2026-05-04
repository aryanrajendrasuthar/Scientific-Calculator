import type { HistoryEntry } from '../hooks/useHistory'

interface HistoryPanelProps {
  history: HistoryEntry[]
  onSelect: (expression: string) => void
  onClear: () => void
}

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function HistoryPanel({ history, onSelect, onClear }: HistoryPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">History</h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-600 text-sm text-center">No calculations yet</p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
          {history.map((entry, i) => (
            <li
              key={entry.timestamp + i}
              className="group cursor-pointer rounded-xl bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 hover:border-blue-500/30 p-3 transition-all duration-150 animate-fade-in"
              onClick={() => onSelect(entry.expression)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-400 text-xs font-mono truncate">{entry.expression}</p>
                  <p className="text-blue-300 font-mono font-semibold text-sm mt-0.5 truncate">
                    = {entry.result}
                  </p>
                </div>
                <span className="text-slate-600 text-xs shrink-0 mt-0.5">{timeAgo(entry.timestamp)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
