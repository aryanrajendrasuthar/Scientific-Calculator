import { useState, useEffect } from 'react'
import Calculator from './components/Calculator'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('calc_theme') as Theme | null
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // ignore
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('calc_theme', theme)
    } catch {
      // ignore
    }
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 light:from-slate-100 light:via-white light:to-slate-100 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full">
        <Calculator theme={theme} onToggleTheme={toggleTheme} />
      </div>
    </div>
  )
}
