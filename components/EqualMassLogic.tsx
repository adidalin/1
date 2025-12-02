import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { METALS } from '../constants';

export const EqualMassLogic: React.FC = () => {
  const [acidLevel, setAcidLevel] = useState<number>(1); 
  // 1: Very Low (All equal)
  // 2: Low (Zn caps)
  // 3: Medium (Zn, Fe cap)
  // 4: High (Zn, Fe, Mg cap)
  // 5: Excess (All cap by metal capacity)

  const getScenarioData = () => {
    // Relative capacities per gram of metal (Valency/Ar) scaled up
    const capacities = {
        Al: 3/27 * 1000, // ~111
        Mg: 2/24 * 1000, // ~83
        Fe: 2/56 * 1000, // ~35
        Zn: 2/65 * 1000, // ~30
    };

    let acidLimit = 0;
    let description = "";
    let subDesc = "";

    switch(acidLevel) {
        case 1:
            acidLimit = 20; // Very low
            description = "阶段一：酸量极少";
            subDesc = "酸完全反应，金属都有剩余。产氢量由酸决定 → 相等。";
            break;
        case 2:
            acidLimit = 32; // Just enough for Zn
            description = "阶段二：酸量较少 (Zn先停)";
            subDesc = "Zn反应完了，其他金属还有剩余。Zn产氢最少，其他三种由酸决定(相等)。";
            break;
        case 3:
            acidLimit = 60; // Enough for Fe
            description = "阶段三：酸量中等 (Fe也停了)";
            subDesc = "Zn和Fe都反应完了。产氢量 Zn < Fe。Mg和Al还有剩余，它俩相等。";
            break;
        case 4:
            acidLimit = 100; // Enough for Mg
            description = "阶段四：酸量较多 (Mg也停了)";
            subDesc = "Zn, Fe, Mg都反应完了。顺序 Zn < Fe < Mg。Al还有剩，Al = 酸限量。";
            break;
        case 5:
            acidLimit = 150; // Excess
            description = "阶段五：酸完全过量";
            subDesc = "所有金属都完全反应。产氢量完全由金属性质决定：Al > Mg > Fe > Zn。";
            break;
        default:
            acidLimit = 20;
    }

    const data = [
        { name: 'Zn', h2: Math.min(capacities.Zn, acidLimit), fill: METALS.Zn.color },
        { name: 'Fe', h2: Math.min(capacities.Fe, acidLimit), fill: METALS.Fe.color },
        { name: 'Mg', h2: Math.min(capacities.Mg, acidLimit), fill: METALS.Mg.color },
        { name: 'Al', h2: Math.min(capacities.Al, acidLimit), fill: METALS.Al.color },
    ];

    return { data, description, subDesc };
  };

  const { data, description, subDesc } = getScenarioData();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">难点突破：等量金属等量酸</h2>
            <p className="text-slate-600 mt-2">拖动滑块，模拟酸的量逐渐增加的过程。</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                    加入酸的量 (由少到多)
                </label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={acidLevel}
                    onChange={(e) => setAcidLevel(Number(e.target.value))}
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
                    <span>极少</span>
                    <span>较少</span>
                    <span>中等</span>
                    <span>较多</span>
                    <span>过量</span>
                </div>
            </div>

            <div className="text-center mb-6 h-20">
                <h3 className="text-xl font-bold text-indigo-700 transition-all">{description}</h3>
                <p className="text-slate-600 text-sm mt-1 transition-all">{subDesc}</p>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 14, fontWeight: 'bold'}} />
                        <YAxis label={{ value: '最终产生 H₂ 质量', angle: -90, position: 'insideLeft' }} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="h2" radius={[8, 8, 0, 0]} barSize={60}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm">
                <h4 className="font-bold text-slate-800 mb-2">解题思路总结：</h4>
                <ol className="list-decimal pl-5 space-y-1 text-slate-600">
                    <li>先判断谁是<strong>限量试剂</strong>（谁先反应完）。</li>
                    <li>如果是酸不足，大家产氢一样多（都等于酸能产的量）。</li>
                    <li>如果是酸逐渐增加，产氢能力最弱的金属（Zn）最先"吃饱"（达到最大值），随后是 Fe、Mg，最后是 Al。</li>
                </ol>
            </div>
        </div>
    </div>
  );
};
