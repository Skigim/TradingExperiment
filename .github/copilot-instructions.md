# GitHub Copilot Instructions for Trading Experiment 2026

## Project Overview
This is a simulated portfolio tracking experiment comparing different investment strategies and personas throughout 2026. The project uses React, TypeScript, Vite, and Tailwind CSS.

## Code Style Guidelines
- Use TypeScript with strict typing
- Follow React functional component patterns with hooks
- Use Tailwind CSS for styling (no custom CSS files except for Tailwind directives)
- Maintain immutable data patterns
- Use descriptive variable names that match financial terminology

## Project Structure
- `/src/App.tsx` - Main dashboard component with all portfolio logic
- `/src/main.tsx` - React entry point
- `/src/index.css` - Global styles with Tailwind directives
- `/.github/agents/` - Persona definitions and strategies

## Investment Personas
The experiment tracks 7 different investment approaches:
1. **The Original** - Aggressive tech-focused growth investor
2. **The Boglehead** - Passive index fund investor following Jack Bogle's philosophy
3. **Dividend Aristocrat** - Income-focused dividend investor
4. **The Speculator** - High-risk, high-reward momentum trader
5. **The Quant** - Algorithm-driven systematic trader
6. **ESG Conscious** - Environmental, Social, and Governance focused investor
7. **S&P 500 (SPY)** - Market benchmark for comparison

## Data Management
- All portfolio data is stored in the `RAW_DATA` array
- Each data point includes date and values for all portfolios
- Benchmark (SPY) is normalized to $1,000 starting value for comparison
- New data entries should maintain the same structure

## UI Components
- **LineChart** - SVG-based interactive chart with hover tooltips
- **StatCard** - Portfolio performance card with rank and returns
- **PortfolioModal** - Detailed view of portfolio holdings and strategy
- **Lessons** - Educational finance concepts tied to market events

## When Adding Features
- Maintain consistency with existing design patterns
- Ensure TypeScript types are properly defined
- Keep components modular and reusable
- Test interactions like hover states and modal displays
- Follow the existing color scheme (slate backgrounds, colored accents per portfolio)

## Financial Terminology
Use proper financial terms:
- Portfolio allocation (not "split" or "distribution")
- Returns/Performance (not "profit" or "gain" unless specifically referring to realized gains)
- Volatility/Beta (for risk measures)
- Holdings (for positions in portfolio)
- Ticker symbols in uppercase
