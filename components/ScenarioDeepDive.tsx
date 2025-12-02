import React from 'react';
import { METALS } from '../constants';

export const ScenarioDeepDive: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">三大经典图像模型详解</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
                
                {/* Model 1: Time vs H2 */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                    <div className="h-48 bg-slate-50 relative border-b border-slate-100 p-4">
                        {/* Static SVG illustration for concept */}
                         <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="5" y1="95" x2="95" y2="95" stroke="#94a3b8" strokeWidth="1" />
                            <line x1="5" y1="95" x2="5" y2="5" stroke="#94a3b8" strokeWidth="1" />
                            <text x="80" y="90" fontSize="8" fill="#64748b">时间</text>
                            <text x="8" y="15" fontSize="8" fill="#64748b">H₂</text>
                            
                            {/* Mg */}
                            <path d="M5,95 Q20,20 90,20" fill="none" stroke={METALS.Mg.color} strokeWidth="2" />
                            <text x="25" y="30" fontSize="8" fill={METALS.Mg.color} fontWeight="bold">Mg</text>
                             {/* Fe */}
                            <path d="M5,95 Q40,60 90,60" fill="none" stroke={METALS.Fe.color} strokeWidth="2" />
                            <text x="50" y="70" fontSize="8" fill={METALS.Fe.color} fontWeight="bold">Fe</text>
                         </svg>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-indigo-700 mb-2">模型一：m(H₂)-反应时间</h3>
                        <p className="text-sm text-slate-600 mb-3">反映反应速率和产氢总量。</p>
                        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-4">
                            <li><strong>斜率：</strong>越陡 = 越活泼。Mg &gt; Al &gt; Zn &gt; Fe。</li>
                            <li><strong>拐点：</strong>拐点越早 = 反应越快结束。</li>
                            <li><strong>平台高度：</strong>足量酸时由金属决定(Al最高)，足量金属时高度相等。</li>
                        </ul>
                    </div>
                </div>

                {/* Model 2: Acid Mass vs H2 */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                    <div className="h-48 bg-slate-50 relative border-b border-slate-100 p-4">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="5" y1="95" x2="95" y2="95" stroke="#94a3b8" strokeWidth="1" />
                            <line x1="5" y1="95" x2="5" y2="5" stroke="#94a3b8" strokeWidth="1" />
                            <text x="75" y="90" fontSize="8" fill="#64748b">酸质量</text>
                            <text x="8" y="15" fontSize="8" fill="#64748b">H₂</text>
                            
                            {/* Common Start */}
                            <line x1="5" y1="95" x2="40" y2="50" stroke="#334155" strokeWidth="2" strokeDasharray="2,1"/>
                            <text x="25" y="80" fontSize="6" fill="#475569">重合(酸不足)</text>

                            {/* Al high */}
                            <path d="M40,50 L90,10" fill="none" stroke={METALS.Al.color} strokeWidth="2" />
                            {/* Mg mid */}
                            <path d="M40,50 L60,40 L90,40" fill="none" stroke={METALS.Mg.color} strokeWidth="2" />
                        </svg>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-indigo-700 mb-2">模型二：m(H₂)-酸质量</h3>
                        <p className="text-sm text-slate-600 mb-3">向等质量金属中滴加酸。</p>
                        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-4">
                            <li><strong>起始段(重合)：</strong>酸不足，氢气质量由酸决定，与金属种类无关。</li>
                            <li><strong>拐点后(分离)：</strong>金属不足，Al产氢最多，平台最高。</li>
                        </ul>
                    </div>
                </div>

                {/* Model 3: Metal Mass vs H2 */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                    <div className="h-48 bg-slate-50 relative border-b border-slate-100 p-4">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="5" y1="95" x2="95" y2="95" stroke="#94a3b8" strokeWidth="1" />
                            <line x1="5" y1="95" x2="5" y2="5" stroke="#94a3b8" strokeWidth="1" />
                            <text x="75" y="90" fontSize="8" fill="#64748b">金属质量</text>
                            <text x="8" y="15" fontSize="8" fill="#64748b">H₂</text>
                            
                            {/* Al steep */}
                            <line x1="5" y1="95" x2="30" y2="40" stroke={METALS.Al.color} strokeWidth="2" />
                            {/* Zn shallow */}
                            <line x1="5" y1="95" x2="60" y2="40" stroke={METALS.Zn.color} strokeWidth="2" />
                            
                            {/* Plateau */}
                            <line x1="30" y1="40" x2="90" y2="40" stroke="#334155" strokeWidth="2" strokeDasharray="2,1"/>
                            <text x="65" y="35" fontSize="6" fill="#475569">重合(酸不足)</text>
                        </svg>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-indigo-700 mb-2">模型三：m(H₂)-金属质量</h3>
                        <p className="text-sm text-slate-600 mb-3">向足量酸中加入金属。</p>
                        <ul className="text-sm text-slate-700 space-y-2 list-disc pl-4">
                            <li><strong>起始段(分离)：</strong>金属不足。斜率取决于化合价/相对原子质量 (Al最大)。</li>
                            <li><strong>终点(重合)：</strong>酸不足。最终产氢量相等。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};