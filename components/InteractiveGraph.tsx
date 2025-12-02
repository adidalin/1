import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { METALS } from '../constants';
import { SimulationPoint, GraphMode } from '../types';
import { Clock, Beaker, Weight, Play, Pause, RotateCcw } from 'lucide-react';

export const InteractiveGraph: React.FC = () => {
  const [mode, setMode] = useState<GraphMode>('TIME');
  
  // Scenarios for Time Mode
  const [timeScenario, setTimeScenario] = useState<'EXCESS_ACID' | 'EXCESS_METAL'>('EXCESS_ACID');
  
  // Animation State
  const [progress, setProgress] = useState<number>(100); // 0 to 100%
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animationRef = useRef<number>(0);

  // Reset animation when mode changes
  useEffect(() => {
    setProgress(100);
    setIsPlaying(false);
  }, [mode, timeScenario]);

  // Animation Loop
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5; // Animation speed
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying]);

  // --- Data Generation Logic (Linear / Straight Lines) ---
  const { points, maxDomainX, maxDomainY } = useMemo(() => {
    const pts: SimulationPoint[] = [];
    let maxX = 0;
    let maxY = 0;
    const steps = 200;

    // --- CONSTANTS FOR VISUALIZATION ---
    // Scaled values to look good on the chart without complex molar math
    const BASE_YIELD_FACTOR = 120; 
    
    // Relative H2 Yield per gram of metal (Valency / Atomic Mass)
    // Al(3/27=0.111) > Mg(2/24=0.083) > Fe(2/56=0.035) > Zn(2/65=0.030)
    const YIELDS = {
      Mg: (2/24) * BASE_YIELD_FACTOR, // ~10
      Al: (3/27) * BASE_YIELD_FACTOR, // ~13.3
      Zn: (2/65) * BASE_YIELD_FACTOR, // ~3.7
      Fe: (2/56) * BASE_YIELD_FACTOR  // ~4.2
    };

    // Reaction Rates (Activity) - Slopes for Time Graph
    // Mg > Al > Zn > Fe
    const RATES = {
      Mg: 3.0,
      Al: 2.0, 
      Zn: 1.2,
      Fe: 0.6
    };

    if (mode === 'TIME') {
      maxX = 20; // Time units
      const limit = timeScenario === 'EXCESS_ACID' ? 100 : 10; // 10 allows all to overlap easily
      
      // Calculate max possible yield for Y-axis scaling
      maxY = timeScenario === 'EXCESS_ACID' ? YIELDS.Al * 1.5 : limit * 1.2;

      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * maxX;
        
        const calcY = (metal: 'Mg' | 'Al' | 'Zn' | 'Fe') => {
          if (timeScenario === 'EXCESS_ACID') {
             // Equal Mass Metal: Yield depends on metal type
             const maxH2 = YIELDS[metal];
             return Math.min(RATES[metal] * t, maxH2);
          } else {
             // Equal Acid (Excess Metal): Yield limited by Acid (same for all)
             // All reach 'limit' eventually, but at different rates
             return Math.min(RATES[metal] * t, limit);
          }
        };

        pts.push({
          x: t,
          Mg: calcY('Mg'),
          Al: calcY('Al'),
          Zn: calcY('Zn'),
          Fe: calcY('Fe')
        });
      }
    } 
    else if (mode === 'ACID_MASS') {
      // X = Acid Mass
      // Logic: Initial slope is same (limited by acid). Plateau determined by metal mass.
      // Al needs most acid to finish, so X axis must be long enough for Al.
      
      const ACID_EFFICIENCY = 1.0; // H2 per unit acid
      
      // Calculate when each metal finishes reacting with acid
      // Mass of acid needed ~ Yield / ACID_EFFICIENCY
      const maxAcidNeeded = YIELDS.Al / ACID_EFFICIENCY;
      maxX = maxAcidNeeded * 1.2; // Add 20% buffer
      maxY = YIELDS.Al * 1.2;

      for (let i = 0; i <= steps; i++) {
        const m_acid = (i / steps) * maxX;
        
        const calcY = (metal: 'Mg' | 'Al' | 'Zn' | 'Fe') => {
          // Linear rise (acid limiting) -> Plateau (metal limiting)
          const potentialH2_from_acid = m_acid * ACID_EFFICIENCY;
          const maxH2_from_metal = YIELDS[metal];
          return Math.min(potentialH2_from_acid, maxH2_from_metal);
        };

        pts.push({
            x: m_acid,
            Mg: calcY('Mg'),
            Al: calcY('Al'),
            Zn: calcY('Zn'),
            Fe: calcY('Fe')
        });
      }
    }
    else if (mode === 'METAL_MASS') {
      // X = Metal Mass
      // Logic: Initial slope depends on metal (valency/Ar). Plateau is same (acid limiting).
      maxX = 20;
      const ACID_LIMIT = 40; // Fixed amount of acid
      maxY = ACID_LIMIT * 1.2;

      for (let i = 0; i <= steps; i++) {
        const m_metal = (i / steps) * maxX;

        const calcY = (metal: 'Mg' | 'Al' | 'Zn' | 'Fe') => {
            // Linear rise (metal limiting) -> Plateau (acid limiting)
            // Slope = Yield per gram (YIELDS const is scaled yield)
            // We need a specific slope factor relative to X
            const slope = YIELDS[metal] / 4; // Arbitrary scaling for visuals
            return Math.min(slope * m_metal, ACID_LIMIT);
        };

        pts.push({
            x: m_metal,
            Mg: calcY('Mg'),
            Al: calcY('Al'),
            Zn: calcY('Zn'),
            Fe: calcY('Fe')
        });
      }
    }

    return { points: pts, maxDomainX: maxX, maxDomainY: maxY };
  }, [mode, timeScenario]);

  // --- Animation Filter ---
  const visiblePoints = useMemo(() => {
    const cutoffIndex = Math.floor((progress / 100) * points.length);
    return points.slice(0, cutoffIndex + 1);
  }, [points, progress]);

  // --- Helper for Metal Cards ---
  const metalLabels = {
    Mg: { act: '最快 (最强)', eff: '较高' },
    Al: { act: '较快 (较强)', eff: '最高 (产氢王)' },
    Zn: { act: '中等', eff: '最低' },
    Fe: { act: '最慢 (最弱)', eff: '较低' },
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      
      {/* LEFT COLUMN: Controls */}
      <div className="w-full lg:w-1/3 space-y-4">
        
        {/* Mode Selection */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
            <Beaker className="w-4 h-4" /> 
            选择图像模式 (Mode)
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => setMode('TIME')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-left transition-all ${
                mode === 'TIME' 
                  ? 'bg-indigo-600 text-white shadow-md transform scale-[1.02]' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Clock size={18} />
              <div>
                <div className="font-bold">m(H₂) - 反应时间</div>
                <div className="text-xs opacity-80">考察速率与产氢量</div>
              </div>
            </button>
            <button
              onClick={() => setMode('ACID_MASS')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-left transition-all ${
                mode === 'ACID_MASS' 
                  ? 'bg-indigo-600 text-white shadow-md transform scale-[1.02]' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Beaker size={18} />
              <div>
                <div className="font-bold">m(H₂) - 酸质量</div>
                <div className="text-xs opacity-80">向金属中滴加酸</div>
              </div>
            </button>
            <button
              onClick={() => setMode('METAL_MASS')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-left transition-all ${
                mode === 'METAL_MASS' 
                  ? 'bg-indigo-600 text-white shadow-md transform scale-[1.02]' 
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Weight size={18} />
              <div>
                <div className="font-bold">m(H₂) - 金属质量</div>
                <div className="text-xs opacity-80">向酸中加入金属</div>
              </div>
            </button>
          </div>
        </div>

        {/* Metal Cards - Always Visible */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">
            金属特性 (Metals)
            </h3>
            <div className="grid grid-cols-2 gap-3">
            {(['Mg', 'Al', 'Zn', 'Fe'] as const).map((key) => {
                const metal = METALS[key];
                return (
                <div 
                    key={key} 
                    className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3 hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold" style={{ color: metal.color }}>{metal.symbol}</span>
                        <span className="text-xs font-mono text-slate-400">Ar:{metal.atomicMass}</span>
                    </div>
                    <div className="space-y-1">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">活动性</span>
                            <span className="text-xs font-medium text-slate-700">{metalLabels[key].act}</span>
                        </div>
                         <div className="flex flex-col border-t border-slate-200 pt-1 mt-1">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">产氢效率</span>
                            <span className="text-xs font-medium text-slate-700">{metalLabels[key].eff}</span>
                        </div>
                    </div>
                    {/* Color accent strip */}
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{backgroundColor: metal.color}}></div>
                </div>
                );
            })}
            </div>
        </div>

        {/* Specific Scenario Controls */}
        {mode === 'TIME' && (
           <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
             <h3 className="text-sm font-bold text-amber-800 mb-2">预设情景 (Scenario)</h3>
             <div className="flex gap-2">
               <button
                 onClick={() => setTimeScenario('EXCESS_ACID')}
                 className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-colors ${
                    timeScenario === 'EXCESS_ACID' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white text-amber-700 border border-amber-200'
                 }`}
               >
                 足量酸 (等金)
               </button>
               <button
                 onClick={() => setTimeScenario('EXCESS_METAL')}
                 className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-colors ${
                    timeScenario === 'EXCESS_METAL' 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-white text-amber-700 border border-amber-200'
                 }`}
               >
                 足量金属 (等酸)
               </button>
             </div>
             <p className="text-xs text-amber-700 mt-2">
               {timeScenario === 'EXCESS_ACID' 
                 ? '酸过量，金属完全反应。终点由金属质量决定 (Al最高)。'
                 : '金属过量，酸完全反应。终点由酸决定 (高度相等)。'}
             </p>
           </div>
        )}

        {/* Animation Controls */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
             <div className="flex items-center justify-between mb-2">
                 <h3 className="text-sm font-bold text-slate-500 uppercase">模拟进度</h3>
                 <span className="text-xs font-mono text-slate-400">{Math.round(progress)}%</span>
             </div>
             <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={(e) => {
                    setIsPlaying(false);
                    setProgress(parseFloat(e.target.value));
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-4"
             />
             <div className="flex gap-2">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors"
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {isPlaying ? '暂停' : '播放过程'}
                </button>
                <button
                    onClick={() => {
                        setIsPlaying(false);
                        setProgress(0);
                    }}
                    className="px-4 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                    title="重置"
                >
                    <RotateCcw size={16} />
                </button>
             </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Graph Area */}
      <div className="w-full lg:w-2/3 bg-white p-2 rounded-xl shadow-lg border border-slate-200 flex flex-col">
        <div className="flex-grow min-h-[500px] w-full relative">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                data={visiblePoints}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="x" 
                  type="number" 
                  domain={[0, maxDomainX]}
                  label={{ 
                    value: mode === 'TIME' ? '反应时间 (t)' : (mode === 'ACID_MASS' ? '加入酸的质量' : '加入金属的质量'), 
                    position: 'bottom', 
                    offset: 0 
                  }} 
                  tick={{fontSize: 12}}
                />
                <YAxis 
                  domain={[0, maxDomainY]}
                  label={{ value: '生成氢气质量 m(H₂)', angle: -90, position: 'insideLeft' }}
                  tick={{fontSize: 12}}
                />
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    labelFormatter={(val) => `${mode === 'TIME' ? '时间' : '质量'}: ${val.toFixed(1)}`}
                    formatter={(val: number) => val.toFixed(2)}
                />
                <Legend verticalAlign="top" height={36}/>
                
                {/* Lines with Animation Disabled to allow manual slider control */}
                <Line type="linear" dataKey="Mg" stroke={METALS.Mg.color} strokeWidth={3} dot={false} isAnimationActive={false} name="Mg (镁)" />
                <Line type="linear" dataKey="Al" stroke={METALS.Al.color} strokeWidth={3} dot={false} isAnimationActive={false} name="Al (铝)" />
                <Line type="linear" dataKey="Zn" stroke={METALS.Zn.color} strokeWidth={3} dot={false} isAnimationActive={false} name="Zn (锌)" />
                <Line type="linear" dataKey="Fe" stroke={METALS.Fe.color} strokeWidth={3} dot={false} isAnimationActive={false} name="Fe (铁)" />
              </LineChart>
            </ResponsiveContainer>
            
            {/* Overlay hint if progress is 0 */}
            {progress === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 pointer-events-none">
                    <div className="bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2">
                        <Play size={16} /> 点击播放或拖动滑块查看反应过程
                    </div>
                </div>
            )}
        </div>
        
        {/* Dynamic Legend / Explanation based on Mode */}
        <div className="px-6 pb-4 pt-2 border-t border-slate-100 text-sm text-slate-600">
            <span className="font-bold text-indigo-700 mr-2">图像解读:</span>
            {mode === 'TIME' && timeScenario === 'EXCESS_ACID' && "足量酸条件下，Mg反应最快(斜率大)，Al产氢最多(平台高)。"}
            {mode === 'TIME' && timeScenario === 'EXCESS_METAL' && "足量金属条件下，最终产氢量相等(由酸决定)。Mg反应最快先到达终点，Fe最慢。"}
            {mode === 'ACID_MASS' && "起始段重合(酸不足，产氢由酸定)。Al需要消耗最多的酸才能反应完，所以平台最高且最后出现。"}
            {mode === 'METAL_MASS' && "起始段分离(金属不足，Al斜率最大)。最终重合(酸不足，产氢总量相等)。"}
        </div>
      </div>
    </div>
  );
};