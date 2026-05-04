# Scientific Calculator

A premium scientific calculator web app built with React, TypeScript, Tailwind CSS, and Vite. Features a custom recursive descent expression parser (no `eval()`), full scientific function support, calculation history, and keyboard input.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-2.1-6E9F18?style=flat&logo=vitest&logoColor=white)

## Features

- **Standard & Scientific modes** — toggle between basic arithmetic and full scientific functions
- **Custom expression parser** — recursive descent tokenizer + parser, zero use of `eval()`
- **Scientific functions** — sin, cos, tan, asin, acos, atan, log, ln, sqrt, factorial, abs, and more
- **Deg / Rad mode** — toggle angle unit for trig functions
- **Calculation history** — last 20 expressions persisted to `localStorage`, click any entry to reload it
- **Full keyboard support** — numbers, operators, `Enter` to calculate, `Escape` to clear, `Backspace` to delete
- **Dark / Light theme** — system preference detected on first load, preference saved to `localStorage`
- **Animated UI** — button press micro-animations, smooth transitions
- **Error handling** — division by zero, domain errors (sqrt of negative, log of zero), invalid expressions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript 5.6 |
| Styling | Tailwind CSS 3.4 |
| Build tool | Vite 5.4 |
| Testing | Vitest 2.1 (31 unit tests) |

## Project Structure

```
src/
├── components/
│   ├── Calculator.tsx     # Root layout, mode switcher, theme toggle
│   ├── Display.tsx        # Expression + result display panel
│   ├── ButtonGrid.tsx     # Standard and scientific button grids
│   └── HistoryPanel.tsx   # Sidebar history list
├── hooks/
│   ├── useCalculator.ts   # All calculator state + keyboard listeners
│   └── useHistory.ts      # localStorage history management
├── utils/
│   ├── parser.ts          # Recursive descent expression parser
│   ├── scientificFunctions.ts  # Math functions + angle mode
│   └── parser.test.ts     # 31 Vitest unit tests
├── App.tsx
├── main.tsx
└── index.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Production build
npm run build
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0–9`, `.` | Input digit / decimal |
| `+` `-` `*` `/` | Operators |
| `^` | Power |
| `(` `)` | Parentheses |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete last character |
| `Escape` | Clear all |

## Expression Parser

The parser implements a proper tokenizer + recursive descent parser supporting:

- Operator precedence (`2+3*4` → `14`)
- Right-associative exponentiation (`2^3^2` → `512`)
- Unary minus (`-5+3` → `-2`)
- Nested parentheses
- Named functions (`sin(90)`, `sqrt(16)`, `fact(5)`)
- Constants (`pi`, `e`)
