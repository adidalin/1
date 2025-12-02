import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { IntroSection } from './components/IntroSection';
import { InteractiveGraph } from './components/InteractiveGraph';
import { EqualMassLogic } from './components/EqualMassLogic';
import { Quiz } from './components/Quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState('intro');

  const renderContent = () => {
    switch (activeTab) {
      case 'intro':
        return <IntroSection />;
      case 'time-graph':
        return <InteractiveGraph />;
      case 'equal-mass':
        return <EqualMassLogic />;
      case 'quiz':
        return <Quiz />;
      default:
        return <IntroSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto w-full">
           {renderContent()}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 ChemGraph Master. 专为初中化学学习设计。</p>
          <p className="mt-1">记住：Al &gt; Mg &gt; Fe &gt; Zn (产氢量), Mg &gt; Al &gt; Zn &gt; Fe (活动性)</p>
        </div>
      </footer>
    </div>
  );
}