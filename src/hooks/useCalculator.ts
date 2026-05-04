import { useState, useEffect, useCallback } from 'react'
import { evaluate } from '../utils/parser'
import { formatResult, setAngleMode, getAngleMode, type AngleMode } from '../utils/scientificFunctions'
import { useHistory } from './useHistory'

export type CalcMode = 'standard' | 'scientific'

interface CalcState {
  expression: string
  display: string
  error: string | null
  justEvaluated: boolean
}

export function useCalculator() {
  const [state, setState] = useState<CalcState>({
    expression: '',
    display: '0',
    error: null,
    justEvaluated: false,
  })
  const [mode, setMode] = useState<CalcMode>('scientific')
  const [angleMode, setAngleModeState] = useState<AngleMode>('deg')
  const { history, addEntry, clearHistory } = useHistory()

  const updateAngleMode = useCallback((m: AngleMode) => {
    setAngleModeState(m)
    setAngleMode(m)
  }, [])

  const appendToExpression = useCallback((value: string) => {
    setState(prev => {
      // After evaluation, if user types a digit/function start fresh;
      // if operator, continue with result
      if (prev.justEvaluated) {
        const isOperator = /^[+\-*/^]$/.test(value)
        if (isOperator) {
          return { ...prev, expression: prev.display + value, justEvaluated: false, error: null }
        }
        return { ...prev, expression: value, display: value, justEvaluated: false, error: null }
      }
      const newExpr = prev.expression + value
      return { ...prev, expression: newExpr, display: newExpr, error: null }
    })
  }, [])

  const calculate = useCallback(() => {
    setState(prev => {
      if (!prev.expression) return prev
      try {
        const result = evaluate(prev.expression)
        const resultStr = formatResult(result)
        addEntry(prev.expression, resultStr)
        return {
          expression: prev.expression,
          display: resultStr,
          error: null,
          justEvaluated: true,
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Error'
        return { ...prev, display: msg, error: msg, justEvaluated: true }
      }
    })
  }, [addEntry])

  const clear = useCallback(() => {
    setState({ expression: '', display: '0', error: null, justEvaluated: false })
  }, [])

  const backspace = useCallback(() => {
    setState(prev => {
      if (prev.justEvaluated) return { expression: '', display: '0', error: null, justEvaluated: false }
      const newExpr = prev.expression.slice(0, -1)
      return { ...prev, expression: newExpr, display: newExpr || '0', error: null }
    })
  }, [])

  const negate = useCallback(() => {
    setState(prev => {
      if (!prev.expression && prev.display === '0') return prev
      if (prev.justEvaluated) {
        const negated = prev.display.startsWith('-') ? prev.display.slice(1) : '-' + prev.display
        return { expression: negated, display: negated, error: null, justEvaluated: false }
      }
      return prev
    })
  }, [])

  const loadFromHistory = useCallback((expression: string) => {
    setState({ expression, display: expression, error: null, justEvaluated: false })
  }, [])

  // Keyboard support
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key >= '0' && e.key <= '9') { appendToExpression(e.key); return }
      if (e.key === '.') { appendToExpression('.'); return }
      if (e.key === '+') { appendToExpression('+'); return }
      if (e.key === '-') { appendToExpression('-'); return }
      if (e.key === '*') { appendToExpression('*'); return }
      if (e.key === '/') { e.preventDefault(); appendToExpression('/'); return }
      if (e.key === '^') { appendToExpression('^'); return }
      if (e.key === '(') { appendToExpression('('); return }
      if (e.key === ')') { appendToExpression(')'); return }
      if (e.key === 'Enter' || e.key === '=') { calculate(); return }
      if (e.key === 'Backspace') { backspace(); return }
      if (e.key === 'Escape') { clear(); return }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [appendToExpression, calculate, backspace, clear])

  return {
    expression: state.expression,
    display: state.display,
    error: state.error,
    mode,
    setMode,
    angleMode,
    setAngleMode: updateAngleMode,
    history,
    clearHistory,
    appendToExpression,
    calculate,
    clear,
    backspace,
    negate,
    loadFromHistory,
    currentAngleMode: getAngleMode,
  }
}
