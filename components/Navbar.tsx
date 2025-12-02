import React from 'react';
import { Atom, Activity, TrendingUp, HelpCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'intro', label: '基础原理', icon: <Atom size={18} /> },
    { id: 'time-graph', label: 'H₂-时间图像', icon: <Activity size={18} /> },
    { id: 'equal-mass', label: '等量金属等量酸', icon: <TrendingUp size={18} /> },
    { id: 'quiz', label: '挑战测试', icon: <HelpCircle size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="flex items-center gap-2 text-xl font-bold text-indigo-600">
              <Atom className="animate-spin-slow" />
              ChemGraph Master
            </span>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile menu (simplified for brevity, normally would use state for toggle) */}
        <div className="md:hidden flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
             {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 border border-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
        </div>
      </div>
    </nav>
  );
};