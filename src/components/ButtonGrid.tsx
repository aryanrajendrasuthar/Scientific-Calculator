import { useState } from 'react'
import type { CalcMode } from '../hooks/useCalculator'
import type { AngleMode } from '../utils/scientificFunctions'

interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'default' | 'operator' | 'equals' | 'clear' | 'function' | 'memory' | 'modifier'
  span?: 1 | 2
}

function CalcButton({ label, onClick, variant = 'default', span = 1 }: ButtonProps) {
  const [pressed, setPressed] = useState(false)

  const base =
    'flex items-center justify-center rounded-xl font-mono font-medium text-sm sm:text-base cursor-pointer select-none h-12 transition-all duration-100 border border-transparent'

  const variants: Record<string, string> = {
    default:
      'bg-slate-700/80 hover:bg-slate-600/80 text-slate-100 border-slate-600/40 active:scale-95',
    operator:
      'bg-blue-600/80 hover:bg-blue-500/80 text-white border-blue-500/40 active:scale-95',
    equals:
      'bg-blue-500 hover:bg-blue-400 text-white font-bold border-blue-400/40 active:scale-95 shadow-lg shadow-blue-500/20',
    clear:
      'bg-red-500/80 hover:bg-red-400/80 text-white border-red-400/40 active:scale-95',
    function:
      'bg-slate-800/80 hover:bg-slate-700/80 text-blue-300 border-slate-600/40 active:scale-95 text-xs sm:text-sm',
    memory:
      'bg-violet-700/60 hover:bg-violet-600/60 text-violet-200 border-violet-500/40 active:scale-95 text-xs sm:text-sm',
    modifier:
      'bg-slate-600/60 hover:bg-slate-500/60 text-slate-200 border-slate-500/40 active:scale-95',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${span === 2 ? 'col-span-2' : ''} ${
        pressed ? 'animate-press' : ''
      }`}
      onClick={() => {
        setPressed(true)
        setTimeout(() => setPressed(false), 150)
        onClick()
      }}
    >
      {label}
    </button>
  )
}

interface ButtonGridProps {
  mode: CalcMode
  angleMode: AngleMode
  onAngleModeToggle: () => void
  onInput: (val: string) => void
  onCalculate: () => void
  onClear: () => void
  onBackspace: () => void
  onNegate: () => void
}

export default function ButtonGrid({
  mode,
  angleMode,
  onAngleModeToggle,
  onInput,
  onCalculate,
  onClear,
  onBackspace,
  onNegate,
}: ButtonGridProps) {
  const fn = (val: string) => () => onInput(val)

  const standardButtons: ButtonProps[] = [
    // Row 1
    { label: 'AC', onClick: onClear, variant: 'clear' },
    { label: '+/−', onClick: onNegate, variant: 'modifier' },
    { label: '%', onClick: fn('/100*'), variant: 'modifier' },
    { label: '÷', onClick: fn('/'), variant: 'operator' },
    // Row 2
    { label: '7', onClick: fn('7') },
    { label: '8', onClick: fn('8') },
    { label: '9', onClick: fn('9') },
    { label: '×', onClick: fn('*'), variant: 'operator' },
    // Row 3
    { label: '4', onClick: fn('4') },
    { label: '5', onClick: fn('5') },
    { label: '6', onClick: fn('6') },
    { label: '−', onClick: fn('-'), variant: 'operator' },
    // Row 4
    { label: '1', onClick: fn('1') },
    { label: '2', onClick: fn('2') },
    { label: '3', onClick: fn('3') },
    { label: '+', onClick: fn('+'), variant: 'operator' },
    // Row 5
    { label: '0', onClick: fn('0'), span: 2 },
    { label: '.', onClick: fn('.') },
    { label: '=', onClick: onCalculate, variant: 'equals' },
  ]

  const scientificButtons: ButtonProps[] = [
    // Row sci 1
    { label: angleMode.toUpperCase(), onClick: onAngleModeToggle, variant: 'memory' },
    { label: 'sin', onClick: fn('sin('), variant: 'function' },
    { label: 'cos', onClick: fn('cos('), variant: 'function' },
    { label: 'tan', onClick: fn('tan('), variant: 'function' },
    // Row sci 2
    { label: 'xⁿ', onClick: fn('^'), variant: 'function' },
    { label: 'asin', onClick: fn('asin('), variant: 'function' },
    { label: 'acos', onClick: fn('acos('), variant: 'function' },
    { label: 'atan', onClick: fn('atan('), variant: 'function' },
    // Row sci 3
    { label: 'log', onClick: fn('log('), variant: 'function' },
    { label: 'ln', onClick: fn('ln('), variant: 'function' },
    { label: '√', onClick: fn('sqrt('), variant: 'function' },
    { label: 'x²', onClick: fn('^2'), variant: 'function' },
    // Row sci 4
    { label: 'π', onClick: fn('pi'), variant: 'function' },
    { label: 'e', onClick: fn('e'), variant: 'function' },
    { label: '(', onClick: fn('('), variant: 'modifier' },
    { label: ')', onClick: fn(')'), variant: 'modifier' },
    // Row sci 5
    { label: 'n!', onClick: fn('fact('), variant: 'function' },
    { label: '1/x', onClick: fn('1/'), variant: 'function' },
    { label: '⌫', onClick: onBackspace, variant: 'modifier' },
    { label: 'abs', onClick: fn('abs('), variant: 'function' },
  ]

  return (
    <div className="space-y-3">
      {mode === 'scientific' && (
        <div className="grid grid-cols-4 gap-2">
          {scientificButtons.map((btn, i) => (
            <CalcButton key={i} {...btn} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-2">
        {standardButtons.map((btn, i) => (
          <CalcButton key={i} {...btn} />
        ))}
      </div>
    </div>
  )
}
