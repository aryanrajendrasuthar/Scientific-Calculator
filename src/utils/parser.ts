/**
 * Recursive descent parser for mathematical expressions.
 * Grammar:
 *   expr   := term (('+' | '-') term)*
 *   term   := factor (('*' | '/') factor)*
 *   factor := unary ('^' factor)?         (right-associative)
 *   unary  := '-' unary | primary
 *   primary := number | '(' expr ')' | func '(' expr ')'
 */

import { applyFunction } from './scientificFunctions'

type Token =
  | { type: 'NUMBER'; value: number }
  | { type: 'PLUS' | 'MINUS' | 'STAR' | 'SLASH' | 'CARET' | 'LPAREN' | 'RPAREN' | 'COMMA' }
  | { type: 'FUNC'; name: string }
  | { type: 'EOF' }

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < input.length) {
    const ch = input[i]

    if (/\s/.test(ch)) { i++; continue }

    if (/[0-9]/.test(ch) || (ch === '.' && i + 1 < input.length && /[0-9]/.test(input[i + 1]))) {
      let num = ''
      while (i < input.length && /[0-9.]/.test(input[i])) num += input[i++]
      tokens.push({ type: 'NUMBER', value: parseFloat(num) })
      continue
    }

    if (/[a-zA-Z_]/.test(ch)) {
      let name = ''
      while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) name += input[i++]
      tokens.push({ type: 'FUNC', name: name.toLowerCase() })
      continue
    }

    switch (ch) {
      case '+': tokens.push({ type: 'PLUS' }); break
      case '-': tokens.push({ type: 'MINUS' }); break
      case '*': tokens.push({ type: 'STAR' }); break
      case '/': tokens.push({ type: 'SLASH' }); break
      case '^': tokens.push({ type: 'CARET' }); break
      case '(': tokens.push({ type: 'LPAREN' }); break
      case ')': tokens.push({ type: 'RPAREN' }); break
      case ',': tokens.push({ type: 'COMMA' }); break
      default: throw new Error(`Unexpected character: ${ch}`)
    }
    i++
  }

  tokens.push({ type: 'EOF' })
  return tokens
}

class Parser {
  private tokens: Token[]
  private pos = 0

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  private peek(): Token {
    return this.tokens[this.pos]
  }

  private consume(): Token {
    return this.tokens[this.pos++]
  }

  private expect(type: Token['type']): Token {
    const tok = this.consume()
    if (tok.type !== type) throw new Error(`Expected ${type}, got ${tok.type}`)
    return tok
  }

  parse(): number {
    const val = this.expr()
    if (this.peek().type !== 'EOF') throw new Error('Unexpected token after expression')
    return val
  }

  private expr(): number {
    let left = this.term()
    while (this.peek().type === 'PLUS' || this.peek().type === 'MINUS') {
      const op = this.consume()
      const right = this.term()
      left = op.type === 'PLUS' ? left + right : left - right
    }
    return left
  }

  private term(): number {
    let left = this.factor()
    while (this.peek().type === 'STAR' || this.peek().type === 'SLASH') {
      const op = this.consume()
      const right = this.factor()
      if (op.type === 'SLASH') {
        if (right === 0) throw new Error('Division by zero')
        left = left / right
      } else {
        left = left * right
      }
    }
    return left
  }

  private factor(): number {
    const base = this.unary()
    if (this.peek().type === 'CARET') {
      this.consume()
      const exp = this.factor() // right-associative
      return Math.pow(base, exp)
    }
    return base
  }

  private unary(): number {
    if (this.peek().type === 'MINUS') {
      this.consume()
      return -this.unary()
    }
    if (this.peek().type === 'PLUS') {
      this.consume()
      return this.unary()
    }
    return this.primary()
  }

  private primary(): number {
    const tok = this.peek()

    if (tok.type === 'NUMBER') {
      this.consume()
      return tok.value
    }

    if (tok.type === 'FUNC') {
      this.consume()
      const name = tok.name

      // Constants
      if (name === 'pi' || name === 'π') return Math.PI
      if (name === 'e') return Math.E
      if (name === 'inf') return Infinity

      this.expect('LPAREN')
      const arg = this.expr()

      // pow(x, y) takes two args
      if (name === 'pow') {
        this.expect('COMMA')
        const exp = this.expr()
        this.expect('RPAREN')
        return Math.pow(arg, exp)
      }

      this.expect('RPAREN')
      return applyFunction(name, arg)
    }

    if (tok.type === 'LPAREN') {
      this.consume()
      const val = this.expr()
      this.expect('RPAREN')
      return val
    }

    throw new Error(`Unexpected token: ${tok.type}`)
  }
}

export function evaluate(expression: string): number {
  const cleaned = expression
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/π/g, 'pi')
    .replace(/√/g, 'sqrt')
    .trim()

  if (!cleaned) throw new Error('Empty expression')

  const tokens = tokenize(cleaned)
  const parser = new Parser(tokens)
  const result = parser.parse()

  if (!isFinite(result) && !isNaN(result)) throw new Error('Result is infinite')
  if (isNaN(result)) throw new Error('Invalid expression')

  return result
}
