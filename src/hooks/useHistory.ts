import { useState, useEffect } from 'react'

export interface HistoryEntry {
  expression: string
  result: string
  timestamp: number
}

const STORAGE_KEY = 'calc_history'
const MAX_ENTRIES = 20

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as HistoryEntry[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch {
      // ignore storage errors
    }
  }, [history])

  function addEntry(expression: string, result: string) {
    setHistory(prev => {
      const entry: HistoryEntry = { expression, result, timestamp: Date.now() }
      const updated = [entry, ...prev].slice(0, MAX_ENTRIES)
      return updated
    })
  }

  function clearHistory() {
    setHistory([])
  }

  return { history, addEntry, clearHistory }
}
