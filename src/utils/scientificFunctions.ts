export type AngleMode = 'deg' | 'rad'

let angleMode: AngleMode = 'deg'

export function setAngleMode(mode: AngleMode) {
  angleMode = mode
}

export function getAngleMode(): AngleMode {
  return angleMode
}

function toRad(x: number): number {
  return angleMode === 'deg' ? (x * Math.PI) / 180 : x
}

function fromRad(x: number): number {
  return angleMode === 'deg' ? (x * 180) / Math.PI : x
}

export function applyFunction(name: string, arg: number): number {
  switch (name) {
    case 'sin':   return Math.sin(toRad(arg))
    case 'cos':   return Math.cos(toRad(arg))
    case 'tan': {
      const r = toRad(arg)
      // cos(r) ≈ 0 → undefined
      if (Math.abs(Math.cos(r)) < 1e-10) throw new Error('tan is undefined at this angle')
      return Math.tan(r)
    }
    case 'asin': {
      if (arg < -1 || arg > 1) throw new Error('asin domain error: input must be in [-1, 1]')
      return fromRad(Math.asin(arg))
    }
    case 'acos': {
      if (arg < -1 || arg > 1) throw new Error('acos domain error: input must be in [-1, 1]')
      return fromRad(Math.acos(arg))
    }
    case 'atan': return fromRad(Math.atan(arg))
    case 'sinh': return Math.sinh(arg)
    case 'cosh': return Math.cosh(arg)
    case 'tanh': return Math.tanh(arg)
    case 'log':
    case 'log10': {
      if (arg <= 0) throw new Error('log domain error: input must be > 0')
      return Math.log10(arg)
    }
    case 'ln': {
      if (arg <= 0) throw new Error('ln domain error: input must be > 0')
      return Math.log(arg)
    }
    case 'sqrt': {
      if (arg < 0) throw new Error('sqrt domain error: input must be ≥ 0')
      return Math.sqrt(arg)
    }
    case 'cbrt': return Math.cbrt(arg)
    case 'abs':  return Math.abs(arg)
    case 'ceil': return Math.ceil(arg)
    case 'floor': return Math.floor(arg)
    case 'round': return Math.round(arg)
    case 'fact':
    case 'factorial': {
      if (arg < 0 || !Number.isInteger(arg)) throw new Error('Factorial requires non-negative integer')
      if (arg > 170) throw new Error('Factorial overflow')
      let result = 1
      for (let i = 2; i <= arg; i++) result *= i
      return result
    }
    case 'exp': return Math.exp(arg)
    case 'sign': return Math.sign(arg)
    default:
      throw new Error(`Unknown function: ${name}`)
  }
}

export function formatResult(value: number, maxDecimals = 10): string {
  if (!isFinite(value)) return 'Error'
  if (isNaN(value)) return 'Error'

  // Use exponential notation for very large or very small numbers
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6)
  }

  // Remove trailing zeros after decimal point
  const str = value.toFixed(maxDecimals)
  if (str.includes('.')) {
    return str.replace(/\.?0+$/, '')
  }
  return str
}
