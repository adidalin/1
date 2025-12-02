import React from 'react';
import { METALS } from '../constants';
import { Target, Eye, BookOpen, Microscope } from 'lucide-react';

export const IntroSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-10">
      
      {/* Header with Learning Objectives */}
      <div className="text-center space-y-6 border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">
          微专题五：金属与酸的反应图像分析
        </h1>
        <div className="bg-indigo-50 p-6 rounded-2xl text-left max-w-3xl mx-auto border border-indigo-100 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-indigo-800 font-bold text-lg">
            <Target className="w-5 h-5" />
            <span>学习目标</span>
          </div>
          <ul className="space-y-2 text-slate-700 list-disc pl-5">
            <li>能说出图像中<strong>“三点一趋势”</strong>（起点、拐点、终点、走势）的含义。</li>
            <li>掌握<strong>“反应速率”</strong>与<strong>“产氢量”</strong>的核心规律。</li>
            <li>能区分并解析<strong>时间</strong>、<strong>酸质量</strong>、<strong>金属质量</strong>为横坐标的三种不同图像。</li>
          </ul>
        </div>
      </div>

      {/* Chemical Equations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-slate-600" />
          <h3 className="font-bold text-slate-800">核心考点：化学反应原理</h3>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50">
              <tr>
                <th className="px-4 py-3">金属</th>
                <th className="px-4 py-3">现象</th>
                <th className="px-4 py-3">化学方程式 (以稀盐酸为例)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-bold text-purple-600">Mg 镁</td>
                <td className="px-4 py-3">反应剧烈，大量气泡，放热</td>
                <td className="px-4 py-3 font-mono">Mg + 2HCl === MgCl₂ + H₂↑</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-bold text-emerald-600">Zn 锌</td>
                <td className="px-4 py-3">反应比较剧烈，产生大量气泡</td>
                <td className="px-4 py-3 font-mono">Zn + 2HCl === ZnCl₂ + H₂↑</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-bold text-orange-600">Fe 铁</td>
                <td className="px-4 py-3">反应缓慢，少量气泡，<span className="text-green-600 font-bold">溶液变浅绿色</span></td>
                <td className="px-4 py-3 font-mono">Fe + 2HCl === FeCl₂ + H₂↑</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-bold text-blue-600">Al 铝</td>
                <td className="px-4 py-3">反应剧烈 (去膜后)</td>
                <td className="px-4 py-3 font-mono">2Al + 6HCl === 2AlCl₃ + 3H₂↑</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Methodology: Two Looks */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4 text-slate-800">
            <Eye className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-lg">解题秘籍：“二看”法</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-1 rounded text-sm">一看</span>
              <p className="text-slate-600"><strong>横纵坐标：</strong>明确横坐标是时间、酸的质量还是金属质量。这是解题的前提。</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-1 rounded text-sm">二看</span>
              <p className="text-slate-600"><strong>三点一趋势：</strong>
                <br/>• <span className="text-slate-900 font-medium">起点</span>：是否从原点出发？
                <br/>• <span className="text-slate-900 font-medium">拐点</span>：反应恰好结束的点（酸或金属耗尽）。
                <br/>• <span className="text-slate-900 font-medium">终点</span>：平台的高度（产氢总量）。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-4 text-slate-800">
            <Microscope className="w-6 h-6 text-indigo-600" />
            <h3 className="font-bold text-lg">核心规律口诀</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
              <span className="text-2xl">⚡</span>
              <div>
                <span className="font-bold text-slate-900">“越活越陡”</span>
                <p className="text-xs text-slate-600">金属越活泼，反应速率越快，斜率越大 (Mg &gt; Al &gt; Zn &gt; Fe)。</p>
              </div>
            </li>
            <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <span className="text-2xl">⚖️</span>
              <div>
                <span className="font-bold text-slate-900">“人小志气大”</span>
                <p className="text-xs text-slate-600">等质量金属反应，相对原子质量越小，产氢越多 (Al &gt; Mg &gt; Fe &gt; Zn)。</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};