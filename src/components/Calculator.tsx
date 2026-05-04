import Display from './Display'
import ButtonGrid from './ButtonGrid'
import HistoryPanel from './HistoryPanel'
import { useCalculator } from '../hooks/useCalculator'

interface CalculatorProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function Calculator({ theme, onToggleTheme }: CalculatorProps) {
  const {
    expression,
    display,
    error,
    mode,
    setMode,
    angleMode,
    setAngleMode,
    history,
    clearHistory,
    appendToExpression,
    calculate,
    clear,
    backspace,
    negate,
    loadFromHistory,
  } = useCalculator()

  const toggleAngle = () => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')

  return (
    <div className="flex gap-4 w-full max-w-3xl mx-auto">
      {/* Calculator card */}
      <div className="flex-1 bg-slate-800/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('standard')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                mode === 'standard'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setMode('scientific')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                mode === 'scientific'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Scientific
            </button>
          </div>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.592-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.592z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        <Display expression={expression} display={display} error={error} />

        <ButtonGrid
          mode={mode}
          angleMode={angleMode}
          onAngleModeToggle={toggleAngle}
          onInput={appendToExpression}
          onCalculate={calculate}
          onClear={clear}
          onBackspace={backspace}
          onNegate={negate}
        />

        <p className="text-center text-slate-600 text-xs mt-4 font-mono">
          keyboard supported · ↵ calculate · ⎋ clear
        </p>
      </div>

      {/* History panel */}
      <div className="w-64 bg-slate-800/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-5 shadow-2xl hidden md:flex flex-col">
        <HistoryPanel
          history={history}
          onSelect={loadFromHistory}
          onClear={clearHistory}
        />
      </div>
    </div>
  )
}
