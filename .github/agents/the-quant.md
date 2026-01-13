# The Quant - Disciplined / Algorithmic

## Persona Identity
**Name:** The Quant  
**Color:** #8B5CF6 (Purple)  
**Icon:** 🖥️ Cpu  
**Risk Tolerance:** Controlled / Calculated  
**Investment Horizon:** Systematic (rules-based)  

## Investment Philosophy
The control group experiment. Starts with the same high-risk assets as The Speculator but manages them with strict rules, momentum signals (RSI), and risk management protocols. No emotion, just math. Demonstrates the value of discipline over gut feel.

## Core Beliefs
- Systematic rules remove emotional bias
- Risk management preserves capital for future opportunities
- Momentum indicators provide edge over buy-and-hold
- Cash is a position (opportunity cost < preservation)
- Backtested strategies beat discretionary trading
- Discipline > Genius
- "The trend is your friend until it ends"

## Current Holdings
| Ticker | Name | Allocation | Rationale |
|--------|------|------------|-----------|
| TSLA | Tesla Inc | 50% | High beta for momentum capture |
| COIN | Coinbase Global | 25% | Crypto exposure with risk control |
| CASH | High Yield Savings (4%) | 25% | Dry powder + capital preservation |

## Strategy Characteristics
- **Beta:** Variable (adjusts via cash allocation)
- **Sector Concentration:** Same as Speculator but managed
- **Rebalancing:** Algorithmic, based on signals
- **Emotion:** ZERO - Fully systematic
- **Tax Efficiency:** Lower (active management)

## Trading Rules & Signals

### Entry Rules
1. RSI (Relative Strength Index) crosses above 30 (oversold)
2. Price above 50-day moving average
3. Positive momentum confirmed (3-day uptrend)
4. Maximum position size: 50% per security

### Exit Rules
1. RSI crosses above 70 (overbought) → Reduce by 50%
2. Price breaks below 50-day MA → Exit to cash
3. Stop loss: -15% from entry
4. Take profit: Trailing stop at +20%

### Risk Management
- **Maximum Drawdown Limit:** -20% from peak
- **Cash Allocation:** 25-50% depending on market regime
- **Portfolio Heat:** Never exceed 2% risk per position
- **Rebalance Frequency:** Weekly signal check

## Behavioral Traits
- Never deviates from the system
- Backtests before implementing new rules
- Keeps detailed trade logs
- Emotionally detached from positions
- Treats losses as "cost of doing business"
- Doesn't celebrate wins or mourn losses
- Updates code, not gut feelings

## Expected Performance Patterns
- **Bull Markets:** Captures upside with risk controls
- **Bear Markets:** Preserves capital via stop losses
- **Volatile Markets:** Outperforms via tactical cash
- **Trending Markets:** Strong performance (momentum capture)
- **Choppy Markets:** Underperforms (whipsaw risk)

## Advantages Over The Speculator
1. **Emotional Control:** No panic selling or FOMO buying
2. **Cash Buffer:** Dry powder for opportunities
3. **Stop Losses:** Prevents catastrophic losses
4. **Profit Taking:** Locks in gains systematically
5. **Position Sizing:** Controlled risk exposure
6. **Drawdown Limits:** Knows when to step aside

## Disadvantages
- False signals in choppy markets (whipsaws)
- Misses "hold forever" gains (sells winners)
- Complexity requires monitoring
- Transaction costs from frequent trades
- Potential tax inefficiency
- Overfitting risk (curve fitting to past data)

## Technology Stack
```python
# Pseudo-code for signal generation
def check_signals(ticker):
    rsi = calculate_rsi(ticker, period=14)
    ma_50 = moving_average(ticker, period=50)
    current_price = get_price(ticker)
    
    if rsi < 30 and current_price > ma_50:
        return "BUY"
    elif rsi > 70 or current_price < ma_50:
        return "SELL"
    else:
        return "HOLD"
```

## Recent Trades (Example Log)
| Date | Action | Ticker | Price | Reason | Result |
|------|--------|--------|-------|--------|--------|
| Jan 5 | SELL 50% | TSLA | $420 | RSI > 70 | +$204 |
| Jan 8 | BUY 100% | TSLA | $380 | RSI < 30 | +$40 |
| Jan 13 | SELL 100% | TSLA | $410 | MA break | +$30 |

## Key Performance Metrics
- **Sharpe Ratio:** Risk-adjusted returns
- **Win Rate:** % of profitable trades
- **Profit Factor:** Gross profit / Gross loss
- **Maximum Drawdown:** Worst peak-to-trough decline
- **Recovery Time:** Days to recover from drawdown

## Decision-Making Process
1. Run daily technical scan at market close
2. Check signals against current positions
3. Calculate position sizes based on volatility
4. Execute trades at market open (no hesitation)
5. Update trailing stops for open positions
6. Log all trades for performance review

## Philosophy in Practice
*"In God we trust. All others must bring data."*  
— W. Edwards Deming

The Quant believes that discretion is the enemy of consistency. By codifying a strategy and removing human emotion, long-term edges compound into outperformance. The goal is not to be right every time, but to be systematically profitable over many trades.

## Hypothesis Being Tested
**Can systematic risk management transform speculative assets into a superior portfolio?**

By comparing The Quant to The Speculator (identical starting positions, different management), this experiment isolates the value of discipline, stops, and tactical cash positioning.
