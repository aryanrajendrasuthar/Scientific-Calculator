interface DisplayProps {
  expression: string
  display: string
  error: string | null
}

export default function Display({ expression, display, error }: DisplayProps) {
  const isError = error !== null

  // Shorten expression for display if too long
  const exprText = expression.length > 30 ? '…' + expression.slice(-28) : expression

  return (
    <div className="relative rounded-2xl bg-slate-900/80 dark:bg-slate-950/80 border border-slate-700/50 p-5 mb-4 min-h-[110px] flex flex-col justify-between overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

      {/* Expression */}
      <div className="text-right text-slate-400 text-sm font-mono min-h-[20px] truncate select-none">
        {exprText}
      </div>

      {/* Main display */}
      <div
        className={`text-right font-mono font-semibold break-all select-text transition-colors ${
          isError
            ? 'text-red-400 text-xl'
            : display.length > 14
            ? 'text-2xl text-white'
            : display.length > 9
            ? 'text-3xl text-white'
            : 'text-4xl text-white'
        }`}
      >
        {display}
      </div>
    </div>
  )
}
