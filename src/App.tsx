import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, BarChart2, Calendar, DollarSign, Info, Shield, Zap, Globe, Award, Activity, AlertTriangle, Cpu, Users, Briefcase, X, PieChart } from 'lucide-react';

// --- TYPES ---

interface Portfolio {
  name: string;
  color: string;
  icon: React.ElementType;
  desc: string;
  details: string;
  holdings: Array<{
    ticker: string;
    name: string;
    alloc: string;
  }>;
}

interface DataPoint {
  date: string;
  original: number;
  boglehead: number;
  aristocrat: number;
  speculator: number;
  quant: number;
  esg: number;
  benchmark: number;
}

interface Lesson {
  id: number;
  title: string;
  date: string;
  icon: React.ElementType;
  content: string;
}

// --- DATA ---

const PORTFOLIOS: Record<string, Portfolio> = {
  original: { 
    name: "The Original", 
    color: "#3B82F6", 
    icon: Zap, 
    desc: "Aggressive Growth (Tech)",
    details: "A thesis-driven investor who believes in the long-term dominance of US Tech. Willing to endure high volatility for higher returns. Focuses on AI, Cloud, and broad market growth.",
    holdings: [
      { ticker: "VTI", name: "Vanguard Total Stock", alloc: "40%" },
      { ticker: "NVDA", name: "NVIDIA Corp", alloc: "20%" },
      { ticker: "GOOGL", name: "Alphabet Inc", alloc: "20%" },
      { ticker: "AMZN", name: "Amazon.com", alloc: "20%" }
    ]
  },
  boglehead: { 
    name: "The Boglehead", 
    color: "#10B981", 
    icon: Shield, 
    desc: "Passive Indexing",
    details: "The 'set it and forget it' strategist. Follows the philosophy of Jack Bogle: minimize fees, maximize diversification, and never try to time the market. Holds the entire global market.",
    holdings: [
      { ticker: "VTI", name: "Vanguard Total Stock", alloc: "60%" },
      { ticker: "VXUS", name: "Total Int'l Stock", alloc: "20%" },
      { ticker: "BND", name: "Total Bond Market", alloc: "20%" }
    ]
  },
  aristocrat: { 
    name: "Dividend Aristocrat", 
    color: "#F59E0B", 
    icon: DollarSign, 
    desc: "Income & Safety",
    details: "Prioritizes cash flow and stability over aggressive growth. Invests in companies with a long history of paying and raising dividends. Often outperforms during bear markets.",
    holdings: [
      { ticker: "SCHD", name: "Schwab US Dividend ETF", alloc: "40%" },
      { ticker: "KO", name: "Coca-Cola Co", alloc: "30%" },
      { ticker: "O", name: "Realty Income (REIT)", alloc: "30%" }
    ]
  },
  speculator: { 
    name: "The Speculator", 
    color: "#EF4444", 
    icon: Activity, 
    desc: "High Beta / Crypto",
    details: "The 'YOLO' trader. Chases momentum, narratives, and high-volatility assets like Crypto and EVs. Vulnerable to emotion (FOMO/Panic) but capable of massive short-term gains.",
    holdings: [
      { ticker: "TSLA", name: "Tesla Inc", alloc: "50%" },
      { ticker: "COIN", name: "Coinbase Global", alloc: "50%" }
    ]
  },
  quant: { 
    name: "The Quant", 
    color: "#8B5CF6", 
    icon: Cpu, 
    desc: "Disciplined / Algorithmic",
    details: "The control group. Starts with the same high-risk assets as The Speculator but manages them with strict rules, momentum signals (RSI), and risk management. No emotion, just math.",
    holdings: [
      { ticker: "TSLA", name: "Tesla Inc", alloc: "50%" },
      { ticker: "COIN", name: "Coinbase Global", alloc: "25%" },
      { ticker: "CASH", name: "High Yield Savings (4%)", alloc: "25%" }
    ]
  },
  esg: { 
    name: "ESG Conscious", 
    color: "#14B8A6", 
    icon: Globe, 
    desc: "Ethical / Clean Energy",
    details: "Invests purely in companies with high Environmental, Social, and Governance ratings. Heavily weighted towards Clean Energy and away from fossil fuels or 'sin stocks'.",
    holdings: [
      { ticker: "ESGU", name: "iShares ESG Aware MSCI", alloc: "70%" },
      { ticker: "ICLN", name: "Global Clean Energy", alloc: "30%" }
    ]
  },
  benchmark: { 
    name: "S&P 500 (SPY)", 
    color: "#9CA3AF", 
    icon: BarChart2, 
    desc: "Market Benchmark",
    details: "The Standard & Poor's 500 Index. Tracks the 500 largest publicly traded companies in the US. Used as the baseline to determine if active strategies are actually working.",
    holdings: [
      { ticker: "SPY", name: "SPDR S&P 500 ETF", alloc: "100%" }
    ]
  }
};

// Updated Data through Feb 06, 2026 (Close)
const RAW_DATA: DataPoint[] = [
  { date: "Dec 26 '25", original: 1000.00, boglehead: 1000.00, aristocrat: 1000.00, speculator: 1000.00, quant: 1000.00, esg: 1000.00, benchmark: 690.31 },
  { date: "Dec 29 '25", original: 996.17, boglehead: 997.46, aristocrat: 1000.24, speculator: 974.87, quant: 974.87, esg: 996.27, benchmark: 687.90 },
  { date: "Dec 30 '25", original: 995.31, boglehead: 996.72, aristocrat: 1002.54, speculator: 966.96, quant: 966.96, esg: 992.90, benchmark: 687.01 },
  { date: "Dec 31 '25", original: 986.30, boglehead: 990.07, aristocrat: 998.46, speculator: 955.25, quant: 955.25, esg: 985.50, benchmark: 681.95 },
  { date: "Jan 02 '26", original: 1011.99, boglehead: 1007.22, aristocrat: 1003.32, speculator: 1002.02, quant: 1002.02, esg: 1009.01, benchmark: 696.18 },
  { date: "Jan 05 '26", original: 1018.83, boglehead: 1010.58, aristocrat: 1007.86, speculator: 1020.07, quant: 1020.07, esg: 1013.59, benchmark: 699.00 },
  { date: "Jan 06 '26", original: 1012.40, boglehead: 1009.10, aristocrat: 1009.50, speculator: 1005.30, quant: 1020.18, esg: 1010.20, benchmark: 695.50 },
  { date: "Jan 07 '26", original: 1014.10, boglehead: 1010.05, aristocrat: 1010.80, speculator: 1015.60, quant: 1020.29, esg: 1011.50, benchmark: 696.80 },
  { date: "Jan 08 '26", original: 1005.20, boglehead: 1005.40, aristocrat: 1006.10, speculator: 988.40, quant: 1020.40, esg: 1001.30, benchmark: 691.20 },
  { date: "Jan 09 '26", original: 1009.50, boglehead: 1007.80, aristocrat: 1008.40, speculator: 998.70, quant: 1035.50, esg: 1006.10, benchmark: 694.40 },
  { date: "Jan 12 '26", original: 1021.60, boglehead: 1012.20, aristocrat: 1011.50, speculator: 1014.20, quant: 1051.80, esg: 1018.40, benchmark: 700.10 },
  { date: "Jan 13 '26", original: 1013.20, boglehead: 1009.80, aristocrat: 1010.50, speculator: 995.40, quant: 1048.90, esg: 1011.20, benchmark: 696.50 },
  { date: "Jan 14 '26", original: 1026.37, boglehead: 1016.87, aristocrat: 1014.54, speculator: 1020.29, quant: 1059.39, esg: 1022.32, benchmark: 702.77 },
  { date: "Jan 15 '26", original: 1009.95, boglehead: 1009.75, aristocrat: 1011.50, speculator: 989.68, quant: 1055.15, esg: 1010.05, benchmark: 695.74 },
  { date: "Jan 16 '26", original: 1016.01, boglehead: 1012.78, aristocrat: 1013.52, speculator: 1001.56, quant: 1058.32, esg: 1015.10, benchmark: 698.52 },
  { date: "Jan 20 '26", original: 1034.30, boglehead: 1022.91, aristocrat: 1019.60, speculator: 1026.60, quant: 1066.79, esg: 1028.30, benchmark: 706.20 },
  { date: "Jan 21 '26", original: 1052.92, boglehead: 1035.18, aristocrat: 1028.78, speculator: 1052.26, quant: 1081.73, esg: 1041.67, benchmark: 714.39 },
  { date: "Jan 22 '26", original: 1040.28, boglehead: 1028.97, aristocrat: 1026.72, speculator: 1031.21, quant: 1073.08, esg: 1032.29, benchmark: 710.82 },
  { date: "Jan 23 '26", original: 1054.84, boglehead: 1037.20, aristocrat: 1030.83, speculator: 1053.90, quant: 1083.81, esg: 1043.65, benchmark: 716.51 },
  { date: "Jan 26 '26", original: 1062.22, boglehead: 1042.39, aristocrat: 1033.92, speculator: 1069.71, quant: 1092.48, esg: 1049.91, benchmark: 720.09 },
  { date: "Jan 27 '26", original: 1056.91, boglehead: 1040.31, aristocrat: 1034.95, speculator: 1050.46, quant: 1089.20, esg: 1045.71, benchmark: 718.65 },
  { date: "Jan 28 '26", original: 1064.31, boglehead: 1044.47, aristocrat: 1038.05, speculator: 1063.07, quant: 1095.74, esg: 1050.94, benchmark: 722.96 },
  { date: "Jan 29 '26", original: 1057.92, boglehead: 1041.34, aristocrat: 1037.01, speculator: 1047.12, quant: 1091.36, esg: 1045.69, benchmark: 720.07 },
  { date: "Jan 30 '26", original: 1066.38, boglehead: 1046.55, aristocrat: 1041.16, speculator: 1060.73, quant: 1099.00, esg: 1051.96, benchmark: 725.11 },
  { date: "Feb 02 '26", original: 1070.65, boglehead: 1049.69, aristocrat: 1043.24, speculator: 1069.22, quant: 1103.40, esg: 1055.12, benchmark: 727.29 },
  { date: "Feb 03 '26", original: 1065.30, boglehead: 1045.49, aristocrat: 1042.20, speculator: 1056.39, quant: 1097.88, esg: 1048.79, benchmark: 723.65 },
  { date: "Feb 04 '26", original: 1074.89, boglehead: 1050.72, aristocrat: 1045.33, speculator: 1073.29, quant: 1106.66, esg: 1056.13, benchmark: 727.99 },
  { date: "Feb 05 '26", original: 1070.59, boglehead: 1048.62, aristocrat: 1045.33, speculator: 1063.63, quant: 1103.34, esg: 1051.91, benchmark: 725.81 },
  { date: "Feb 06 '26", original: 1077.01, boglehead: 1052.81, aristocrat: 1048.47, speculator: 1074.27, quant: 1108.86, esg: 1057.17, benchmark: 729.44 },
];

const LESSONS: Lesson[] = [
  { id: 1, title: "Beta (Volatility)", date: "Dec 29", icon: Activity, content: "High Beta stocks (like Tesla) move more than the market. When the market dipped -0.5%, Speculator crashed -2.0%." },
  { id: 2, title: "Flight to Safety", date: "Dec 29", icon: Shield, content: "When tech sold off, defensive assets like Bonds and REITs went up. Negative correlation protects portfolios." },
  { id: 3, title: "Monday Slump", date: "Dec 29", icon: Calendar, content: "Markets historically perform worse on Mondays due to 'The Weekend Effect' and accumulated bad news." },
  { id: 4, title: "Sector Rotation", date: "Dec 30", icon: TrendingUp, content: "Money rotated from 'Growth' to 'Value'. Tech fell while boring Consumer Staples (Coke) rose." },
  { id: 5, title: "Window Dressing", date: "Dec 30", icon: Award, content: "Fund managers buy 'winning' stocks at year-end to make their annual reports look smarter." },
  { id: 6, title: "Tax-Loss Harvesting", date: "Dec 31", icon: DollarSign, content: "Selling losers before Dec 31 to offset gains creates artificial selling pressure on beaten-down stocks." },
  { id: 7, title: "The January Barometer", date: "Jan 02", icon: BarChart2, content: "'As goes January, so goes the year.' Early inflows signal institutional confidence for 2026." },
  { id: 8, title: "Market Catalysts", date: "Jan 05", icon: Zap, content: "Prices move on narratives (CES, Bitcoin breaking $92k), not just math. News events trigger breakouts." },
  { id: 9, title: "Buy the Rumor, Sell the News", date: "Jan 06", icon: AlertTriangle, content: "Traders bought Nvidia anticipating the CES keynote (Rumor), but sold immediately after the event happened (News) to lock in profits." },
  { id: 10, title: "CPI & Discount Rates", date: "Jan 08", icon: TrendingDown, content: "Hot inflation (CPI) forces the Fed to keep rates high. Higher rates make future Tech earnings worth less today, hurting Growth stocks most." },
  { id: 11, title: "Merger Monday", date: "Jan 12", icon: Users, content: "Mondays often see rallying stock prices driven by M&A (Merger & Acquisition) deals announced over the weekend. Corporate optimism spreads to the broader market." },
  { id: 12, title: "Earnings Season Jitters", date: "Jan 13", icon: Briefcase, content: "Before big banks report earnings (start of season), volatility spikes. Smart money often trims 'High Beta' positions to protect capital in case the reports are bad." },
  { id: 13, title: "AI Bid Returns", date: "Jan 14", icon: Zap, content: "AI optimism sparked a rebound. The Original leaned into growth, Boglehead stayed fully invested, Aristocrat held steady, Speculator chased momentum, Quant kept risk rules, ESG rode clean-energy strength, and SPY climbed." },
  { id: 14, title: "Rate-Scare Pullback", date: "Jan 15", icon: AlertTriangle, content: "A rate scare pressured duration-sensitive assets. The Original trimmed risk, Boglehead held course, Aristocrat cushioned the dip, Speculator sold off hardest, Quant cut beta, ESG slipped, and the benchmark eased." },
  { id: 15, title: "Options Expiration Pin", date: "Jan 16", icon: Calendar, content: "Options expiry muted volatility before a late rebound. The Original recovered modestly, Boglehead stayed diversified, Aristocrat inched up, Speculator bounced, Quant kept a cash buffer, ESG improved, and SPY finished higher." },
  { id: 16, title: "Post-Holiday Risk-On", date: "Jan 20", icon: TrendingUp, content: "After the MLK break, earnings optimism reignited risk appetite. The Original added exposure, Boglehead captured the broad lift, Aristocrat advanced, Speculator chased upside, Quant re-risked, ESG strengthened, and SPY pushed higher." },
  { id: 17, title: "Tariff Relief Rally", date: "Jan 21", icon: TrendingUp, content: "Markets rebounded sharply after tariff fears eased. The Original led on tech strength, Boglehead tracked the broad lift, Aristocrat gained modestly, Speculator surged on risk-on sentiment, Quant captured gains with discipline, ESG advanced, and SPY recovered." },
  { id: 18, title: "Profit-Taking Fade", date: "Jan 22", icon: TrendingDown, content: "The relief rally cooled as traders locked in gains. The Original trimmed some AI beta, Boglehead stayed fully invested, Aristocrat leaned on dividends, Speculator felt the pullback, Quant cut exposure per risk rules, ESG softened, and SPY slipped." },
  { id: 19, title: "Dip Buyers Return", date: "Jan 23", icon: TrendingUp, content: "Buyers stepped back in on better breadth. The Original re-added growth, Boglehead tracked the broad bounce, Aristocrat steadied returns, Speculator chased momentum, Quant added risk within limits, ESG rode clean-energy strength, and SPY reclaimed ground." },
  { id: 20, title: "Earnings Warm-Up", date: "Jan 26", icon: Briefcase, content: "Ahead of mega-cap reports, optimism lifted risk appetite. The Original leaned into tech, Boglehead captured the steady climb, Aristocrat ground higher, Speculator pressed the rally, Quant stayed systematic, ESG advanced, and SPY inched higher." },
  { id: 21, title: "Choppy Tape Caution", date: "Jan 27", icon: AlertTriangle, content: "Choppy trading sparked selective de-risking. The Original pared winners, Boglehead held course, Aristocrat eked out stability, Speculator saw a sharp giveback, Quant trimmed marginal signals, ESG cooled, and SPY eased slightly." },
  { id: 22, title: "Earnings Relief Bid", date: "Jan 28", icon: TrendingUp, content: "Encouraging tech earnings restored risk appetite. The Original added to growth, Boglehead rode the lift, Aristocrat improved modestly, Speculator jumped hardest, Quant re-risked methodically, ESG advanced, and SPY climbed." },
  { id: 23, title: "Rate Talk Hangover", date: "Jan 29", icon: AlertTriangle, content: "Fed commentary rekindled rate anxiety. The Original and ESG slipped, Boglehead held steady, Aristocrat cushioned the move, Speculator sold off, Quant trimmed exposure, and SPY eased." },
  { id: 24, title: "Month-End Rebalance", date: "Jan 30", icon: Calendar, content: "Month-end flows pushed equities higher. The Original leaned into the bid, Boglehead tracked the broad lift, Aristocrat ground up, Speculator chased momentum, Quant stayed systematic, ESG strengthened, and SPY finished firm." },
  { id: 25, title: "Fresh Month Inflows", date: "Feb 02", icon: BarChart2, content: "New-month allocations favored risk assets. The Original added exposure, Boglehead captured the drift, Aristocrat steadied returns, Speculator pushed higher, Quant added within limits, ESG ticked up, and SPY advanced." },
  { id: 26, title: "Data-Driven Dip", date: "Feb 03", icon: TrendingDown, content: "Soft data prints triggered a risk-off move. The Original trimmed gains, Boglehead slipped modestly, Aristocrat stayed resilient, Speculator dropped sharply, Quant reduced beta, ESG faded, and SPY pulled back." },
  { id: 27, title: "AI Earnings Pop", date: "Feb 04", icon: Zap, content: "AI leaders beat expectations and reignited the rally. The Original surged, Boglehead rose with the market, Aristocrat edged higher, Speculator spiked, Quant followed its signals, ESG rallied, and SPY rebounded." },
  { id: 28, title: "Profit-Taking Pause", date: "Feb 05", icon: AlertTriangle, content: "Traders locked in gains ahead of the next data print. The Original and ESG eased, Boglehead softened, Aristocrat held flat, Speculator cooled, Quant de-risked slightly, and SPY dipped." },
  { id: 29, title: "Jobs Resilience", date: "Feb 06", icon: Briefcase, content: "A steady jobs report reinforced the soft-landing narrative. The Original pressed higher, Boglehead climbed, Aristocrat advanced, Speculator rebounded, Quant kept risk on, ESG improved, and SPY closed higher." },
];

// --- COMPONENTS ---

// 1. CHART COMPONENT
const LineChart: React.FC<{ data: DataPoint[], activeKeys: string[] }> = ({ data, activeKeys }) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  
  // Normalize Data: Rebase SPY to 1000
  const normalizedData = useMemo(() => {
    const startSpy = data[0].benchmark;
    const factor = 1000 / startSpy;
    return data.map(d => ({
      ...d,
      benchmark: d.benchmark * factor
    }));
  }, [data]);

  // Chart Dimensions
  const width = 800;
  const height = 400;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  // Scales
  const allValues = normalizedData.flatMap(d => activeKeys.map(k => d[k as keyof DataPoint] as number));
  const minVal = Math.min(...allValues) * 0.995;
  const maxVal = Math.max(...allValues) * 1.005;
  
  const getX = (idx: number) => padding + (idx / (data.length - 1)) * graphWidth;
  const getY = (val: number) => height - padding - ((val - minVal) / (maxVal - minVal)) * graphHeight;

  // Path Generation
  const getPath = (key: string) => {
    return normalizedData.map((d, i) => 
      `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[key as keyof DataPoint] as number)}`
    ).join(' ');
  };

  return (
    <div className="relative w-full aspect-[2/1] bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-800">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(t => (
          <line 
            key={t} 
            x1={padding} 
            y1={padding + t * graphHeight} 
            x2={width - padding} 
            y2={padding + t * graphHeight} 
            stroke="#1e293b" 
            strokeWidth="1" 
          />
        ))}

        {/* Lines */}
        {activeKeys.map(key => (
          <path
            key={key}
            d={getPath(key)}
            fill="none"
            stroke={PORTFOLIOS[key].color}
            strokeWidth={key === 'benchmark' ? 2 : 3}
            strokeDasharray={key === 'benchmark' ? "5,5" : "0"}
            className="transition-all duration-300"
            style={{ opacity: hoverIdx !== null ? 0.3 : 1 }}
          />
        ))}

        {/* Hover Interaction Area */}
        {normalizedData.map((_, i) => (
          <rect
            key={i}
            x={getX(i) - (graphWidth / (data.length - 1)) / 2}
            y={padding}
            width={graphWidth / (data.length - 1)}
            height={graphHeight}
            fill="transparent"
            onMouseEnter={() => setHoverIdx(i)}
            className="cursor-crosshair"
          />
        ))}

        {/* Hover Highlight */}
        {hoverIdx !== null && activeKeys.map(key => (
          <g key={key}>
            <circle 
              cx={getX(hoverIdx)} 
              cy={getY(normalizedData[hoverIdx][key as keyof DataPoint] as number)} 
              r="4" 
              fill={PORTFOLIOS[key].color} 
              stroke="white" 
              strokeWidth="2"
            />
            {/* Tooltip Line */}
            <line
              x1={getX(hoverIdx)}
              y1={padding}
              x2={getX(hoverIdx)}
              y2={height - padding}
              stroke="#475569"
              strokeDasharray="2,2"
            />
          </g>
        ))}
      </svg>

      {/* Custom Tooltip Overlay */}
      {hoverIdx !== null && (
        <div className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur border border-slate-700 p-4 rounded-lg shadow-2xl z-10 text-xs sm:text-sm pointer-events-none">
          <div className="font-bold text-slate-200 mb-2 border-b border-slate-700 pb-1">
            {normalizedData[hoverIdx].date}
          </div>
          {activeKeys
            .sort((a, b) => (normalizedData[hoverIdx][b as keyof DataPoint] as number) - (normalizedData[hoverIdx][a as keyof DataPoint] as number))
            .map(key => (
            <div key={key} className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PORTFOLIOS[key].color }}></div>
                <span className="text-slate-300">{PORTFOLIOS[key].name}</span>
              </div>
              <span className="font-mono font-medium text-white">
                ${(normalizedData[hoverIdx][key as keyof DataPoint] as number).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 2. STATS CARD
const StatCard: React.FC<{ id: string, currentVal: number, startVal: number, rank: number, onClick: (id: string) => void }> = ({ id, currentVal, startVal, rank, onClick }) => {
  const p = PORTFOLIOS[id];
  const pctChange = ((currentVal - startVal) / startVal) * 100;
  const isPositive = pctChange >= 0;
  const Icon = p.icon;

  return (
    <div 
      onClick={() => onClick(id)}
      className={`relative p-4 rounded-xl border ${isPositive ? 'bg-slate-800/50 border-slate-700' : 'bg-red-900/10 border-red-900/30'} flex flex-col gap-2 transition-all hover:scale-105 cursor-pointer group hover:ring-2 hover:ring-blue-500/50`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-slate-700 transition-colors">
            <Icon size={18} style={{ color: p.color }} />
          </div>
          <div>
            <h3 className="font-bold text-slate-200 text-sm group-hover:text-white">{p.name}</h3>
            <p className="text-xs text-slate-500">{p.desc}</p>
          </div>
        </div>
        <div className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">
          Rank #{rank}
        </div>
      </div>
      
      <div className="mt-2">
        <div className="text-2xl font-bold text-white font-mono">
          ${currentVal.toFixed(2)}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {pctChange.toFixed(2)}%
        </div>
      </div>
      
      {/* Mini Color Bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl" style={{ backgroundColor: p.color, opacity: 0.5 }}></div>
    </div>
  );
};

// 3. DETAIL MODAL
const PortfolioModal: React.FC<{ portfolioId: string | null, onClose: () => void }> = ({ portfolioId, onClose }) => {
  if (!portfolioId) return null;
  const p = PORTFOLIOS[portfolioId];
  const Icon = p.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700 flex justify-between items-start bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
              <Icon size={32} style={{ color: p.color }} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{p.name}</h2>
              <p className="text-slate-400">{p.desc}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          
          {/* Persona Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Info size={16} /> Persona Strategy
            </h3>
            <p className="text-slate-200 leading-relaxed text-lg">
              {p.details}
            </p>
          </div>

          {/* Holdings */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <PieChart size={16} /> Current Holdings
            </h3>
            <div className="grid gap-2">
              {p.holdings.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-blue-400 bg-blue-900/20 px-2 py-1 rounded text-sm w-16 text-center">{h.ticker}</span>
                    <span className="text-slate-200 font-medium">{h.name}</span>
                  </div>
                  <span className="font-mono font-bold text-white bg-slate-700 px-3 py-1 rounded-full text-sm">{h.alloc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
        
        {/* Footer Color Bar */}
        <div className="h-1.5 w-full" style={{ backgroundColor: p.color }}></div>
      </div>
    </div>
  );
};

// 4. MAIN APP
export default function App() {
  const [activeKeys, setActiveKeys] = useState<string[]>(Object.keys(PORTFOLIOS));
  const [view, setView] = useState<'dashboard' | 'lessons'>('dashboard');
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);

  const toggleKey = (key: string) => {
    if (activeKeys.includes(key)) {
      if (activeKeys.length > 1) setActiveKeys(activeKeys.filter(k => k !== key));
    } else {
      setActiveKeys([...activeKeys, key]);
    }
  };

  const currentData = RAW_DATA[RAW_DATA.length - 1];
  
  // Calculate Ranks
  const rankings = Object.keys(PORTFOLIOS)
    .map(key => {
      let val = currentData[key as keyof DataPoint] as number;
      // Normalize benchmark for ranking comparison
      if (key === 'benchmark') {
        val = (val / RAW_DATA[0].benchmark) * 1000;
      }
      return { key, val };
    })
    .sort((a, b) => b.val - a.val)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <PortfolioModal 
        portfolioId={selectedPortfolio} 
        onClose={() => setSelectedPortfolio(null)} 
      />

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Experiment 2026</h1>
              <p className="text-xs text-slate-400">Simulated Portfolio Tracker • Updated Feb 06, 2026 (Close)</p>
            </div>
          </div>
          
          <div className="flex bg-slate-800 p-1 rounded-lg">
            <button 
              onClick={() => setView('dashboard')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setView('lessons')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'lessons' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Lessons ({LESSONS.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {view === 'dashboard' && (
          <>
            {/* Chart Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <BarChart2 size={20} className="text-blue-500" />
                  Performance vs. Time
                </h2>
                <div className="text-xs text-slate-500 hidden sm:block">
                  *Benchmark (SPY) normalized to $1,000 start
                </div>
              </div>
              
              <LineChart data={RAW_DATA} activeKeys={activeKeys} />
              
              {/* Legend Toggles */}
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {Object.keys(PORTFOLIOS).map(key => {
                  const isActive = activeKeys.includes(key);
                  const p = PORTFOLIOS[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleKey(key)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                        isActive 
                          ? 'bg-slate-800 border-slate-600 text-white shadow-sm' 
                          : 'bg-transparent border-slate-800 text-slate-600 opacity-50'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                      {p.name}
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Leaderboard Cards */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-t border-slate-800 pt-8">
                <Award size={20} className="text-yellow-500" />
                Current Leaderboard
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rankings.map(r => {
                  // Normalize benchmark display value for the card
                  let displayVal = currentData[r.key as keyof DataPoint] as number;
                  if (r.key === 'benchmark') {
                     displayVal = (displayVal / RAW_DATA[0].benchmark) * 1000;
                  }
                  return (
                    <StatCard 
                      key={r.key} 
                      id={r.key} 
                      currentVal={displayVal} 
                      startVal={1000} 
                      rank={r.rank}
                      onClick={setSelectedPortfolio}
                    />
                  );
                })}
              </div>
            </section>
          </>
        )}

        {view === 'lessons' && (
          <section className="space-y-6">
            <div className="grid gap-4">
              {LESSONS.slice().reverse().map(lesson => (
                <div key={lesson.id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex gap-4 hover:border-blue-500/50 transition-colors group">
                  <div className="mt-1 p-3 bg-slate-800 rounded-lg h-fit group-hover:bg-blue-900/30 group-hover:text-blue-400 transition-colors">
                    <lesson.icon size={24} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
                      <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {lesson.date}
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {lesson.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
