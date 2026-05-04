import { describe, it, expect, beforeEach } from 'vitest'
import { evaluate } from './parser'
import { setAngleMode } from './scientificFunctions'

beforeEach(() => {
  setAngleMode('deg')
})

describe('evaluate - basic arithmetic', () => {
  it('adds two numbers', () => expect(evaluate('2+3')).toBe(5))
  it('subtracts', () => expect(evaluate('10-4')).toBe(6))
  it('multiplies', () => expect(evaluate('3*4')).toBe(12))
  it('divides', () => expect(evaluate('10/4')).toBe(2.5))
  it('handles operator precedence', () => expect(evaluate('2+3*4')).toBe(14))
  it('handles parentheses', () => expect(evaluate('(2+3)*4')).toBe(20))
  it('handles nested parentheses', () => expect(evaluate('((2+3)*(4-1))')).toBe(15))
  it('handles decimals', () => expect(evaluate('1.5+2.5')).toBe(4))
  it('handles unary minus', () => expect(evaluate('-5+3')).toBe(-2))
  it('handles double unary minus', () => expect(evaluate('--5')).toBe(5))
})

describe('evaluate - power', () => {
  it('raises to a power', () => expect(evaluate('2^10')).toBe(1024))
  it('right-associative power', () => expect(evaluate('2^3^2')).toBe(512)) // 2^(3^2) = 2^9
  it('fractional exponent', () => expect(evaluate('8^(1/3)')).toBeCloseTo(2))
})

describe('evaluate - scientific functions', () => {
  it('sin(0) = 0', () => expect(evaluate('sin(0)')).toBeCloseTo(0))
  it('sin(90) = 1 in deg mode', () => expect(evaluate('sin(90)')).toBeCloseTo(1))
  it('cos(0) = 1', () => expect(evaluate('cos(0)')).toBeCloseTo(1))
  it('cos(180) = -1', () => expect(evaluate('cos(180)')).toBeCloseTo(-1))
  it('tan(45) = 1', () => expect(evaluate('tan(45)')).toBeCloseTo(1))
  it('log(100) = 2', () => expect(evaluate('log(100)')).toBeCloseTo(2))
  it('ln(e) = 1', () => expect(evaluate('ln(e)')).toBeCloseTo(1))
  it('sqrt(16) = 4', () => expect(evaluate('sqrt(16)')).toBe(4))
  it('fact(5) = 120', () => expect(evaluate('fact(5)')).toBe(120))
  it('abs(-7) = 7', () => expect(evaluate('abs(-7)')).toBe(7))
})

describe('evaluate - constants', () => {
  it('pi is approx 3.14159', () => expect(evaluate('pi')).toBeCloseTo(Math.PI))
  it('e is approx 2.71828', () => expect(evaluate('e')).toBeCloseTo(Math.E))
})

describe('evaluate - error cases', () => {
  it('throws on division by zero', () => expect(() => evaluate('1/0')).toThrow())
  it('throws on sqrt of negative', () => expect(() => evaluate('sqrt(-1)')).toThrow())
  it('throws on log of zero', () => expect(() => evaluate('log(0)')).toThrow())
  it('throws on empty string', () => expect(() => evaluate('')).toThrow())
  it('throws on invalid expression', () => expect(() => evaluate('2+')).toThrow())
  it('throws on asin out of domain', () => expect(() => evaluate('asin(2)')).toThrow())
})
