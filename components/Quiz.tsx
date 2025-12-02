import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "【PDF例1】相同质量的Mg、Fe、Zn分别与足量稀硫酸反应，生成氢气质量与时间关系如图。下列说法正确的是？",
    options: ["金属Zn反应速率最大", "金属Zn的活动性最强", "金属Mg生成氢气质量最多", "金属Fe消耗稀硫酸质量最多"],
    correct: 2, // Mg yields most H2
    explanation: "根据图像(或规律)：足量酸条件下，等质量金属产氢量顺序为 Al > Mg > Fe > Zn。图中Mg平台最高，所以Mg生成氢气最多。反应速率看斜率，Mg最快。"
  },
  {
    id: 2,
    question: "【PDF考点一】酸不足时，镁、铝、锌、铁产生氢气的质量关系是？",
    options: ["Mg > Al > Zn > Fe", "Al > Mg > Fe > Zn", "相等", "无法确定"],
    correct: 2,
    explanation: "酸不足意味着金属过量，氢气的质量完全由酸的质量决定。酸的质量相等，所以产生氢气质量相等。"
  },
  {
    id: 3,
    question: "【PDF例2】向等质量的铝和镁中分别滴加稀盐酸，在图像的“拐点”出现之前（酸不足阶段），曲线关系是？",
    options: ["重合", "镁在铝上方", "铝在镁上方", "无法确定"],
    correct: 0,
    explanation: "在酸不足的阶段，产生氢气的质量取决于加入酸的质量。加入相同质量的酸，产生相同质量的氢气，因此曲线重合。"
  },
  {
    id: 4,
    question: "【PDF考点三】向等质量稀硫酸中分别加入足量的镁、锌、铁，最终产生氢气质量关系？",
    options: ["Mg > Fe > Zn", "Mg = Fe = Zn", "Zn > Fe > Mg", "Al > Mg > Fe"],
    correct: 1,
    explanation: "金属足量，酸完全反应。氢气中的氢元素全部来自酸。酸的质量相等，所以最终产生氢气质量相等。"
  }
];

export const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (qId: number, optIndex: number) => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    });
    return score;
  };

  const reset = () => {
    setAnswers({});
    setShowResult(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">实战演练 (基于PDF真题)</h2>
      
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => (
          <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                {idx + 1}
              </span>
              <h3 className="text-lg font-medium text-slate-800 pt-1">{q.question}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-11">
              {q.options.map((opt, optIdx) => {
                let btnClass = "p-3 rounded-lg border text-left transition-colors ";
                
                if (showResult) {
                  if (optIdx === q.correct) btnClass += "bg-green-100 border-green-500 text-green-800";
                  else if (answers[q.id] === optIdx) btnClass += "bg-red-100 border-red-500 text-red-800";
                  else btnClass += "bg-slate-50 border-slate-200 opacity-50";
                } else {
                  if (answers[q.id] === optIdx) btnClass += "bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-200";
                  else btnClass += "bg-white border-slate-200 hover:bg-slate-50";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(q.id, optIdx)}
                    className={btnClass}
                    disabled={showResult}
                  >
                    {opt}
                    {showResult && optIdx === q.correct && <CheckCircle className="inline ml-2 w-4 h-4 text-green-600"/>}
                    {showResult && answers[q.id] === optIdx && optIdx !== q.correct && <XCircle className="inline ml-2 w-4 h-4 text-red-600"/>}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="mt-4 ml-11 p-4 bg-slate-50 rounded-lg text-sm text-slate-700 border-l-4 border-indigo-400">
                <span className="font-bold">解析：</span> {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        {!showResult ? (
          <button
            onClick={() => setShowResult(true)}
            disabled={Object.keys(answers).length !== QUESTIONS.length}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
          >
            提交答案
          </button>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">
              得分: {calculateScore()} / {QUESTIONS.length}
            </p>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded-full mx-auto hover:bg-slate-700"
            >
              <RefreshCw size={18} /> 再练一次
            </button>
          </div>
        )}
      </div>
    </div>
  );
};