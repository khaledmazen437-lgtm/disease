import React, { useState } from 'react';
import { Volume2, Award, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { useSensory } from '../../context/SensoryContext';

const VOCAB_DATA = [
  { id: 'cat', word: 'قِطَّة', emoji: '🐱', category: 'حيوانات', soundDesc: 'مواء هادئ', bg: 'bg-amber-100 border-amber-300' },
  { id: 'water', word: 'مَـاء', emoji: '💧', category: 'طبيعة وحياة', soundDesc: 'خرير ماء منعش', bg: 'bg-sky-100 border-sky-300' },
  { id: 'apple', word: 'تُفَّاحَة', emoji: '🍎', category: 'أطعمة صحية', soundDesc: 'قرمشة صحية', bg: 'bg-rose-100 border-rose-300' },
  { id: 'bird', word: 'عُصْفُور', emoji: '🐦', category: 'طبيعة', soundDesc: 'تغريد لطيف', bg: 'bg-emerald-100 border-emerald-300' },
];

export const SoundWordExplorerActivity = ({ onFinish }) => {
  const { playCalmTone, addStar, markActivityComplete } = useSensory();
  const [activeWord, setActiveWord] = useState(VOCAB_DATA[0]);
  const [exploredIds, setExploredIds] = useState(['cat']);

  const handleSelectWord = (item) => {
    setActiveWord(item);
    playCalmTone('gentle-tap');

    // Speech synthesis if available for Arabic
    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(item.word);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85; // Calming gentle pace
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // audio fallback
      }
    }

    if (!exploredIds.includes(item.id)) {
      const next = [...exploredIds, item.id];
      setExploredIds(next);
      addStar(1);
      if (next.length === VOCAB_DATA.length) {
        markActivityComplete('sound-explorer');
      }
    }
  };

  const speakActiveWord = () => {
    playCalmTone('success');
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(activeWord.word);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-cream-300">
        <div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold">
            مُسْتَكْشِفُ الْأَصْوَاتِ وَالْكَلِمَات
          </span>
          <p className="text-xs text-cream-700 mt-1">ربط بصري وصوتي باللغة العربية الفصحى الواضحة</p>
        </div>
        <div className="text-xs font-bold text-burgundy-900 bg-burgundy-50 border border-burgundy-200 px-3 py-1 rounded-full">
          تم استكشاف: {exploredIds.length} / {VOCAB_DATA.length}
        </div>
      </div>

      {/* Main Focus Card */}
      <div className="bg-white border-2 border-cream-300 rounded-3xl p-8 text-center mb-6 shadow-sm">
        <div className="text-7xl mb-4 select-none animate-gentle-float">
          {activeWord.emoji}
        </div>
        <h3 className="text-4xl font-black font-cairo text-burgundy-950 mb-3 tracking-wide">
          {activeWord.word}
        </h3>
        <p className="text-xs text-cream-700 font-medium mb-6">
          تصنيف: {activeWord.category}
        </p>

        <button
          onClick={speakActiveWord}
          className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-burgundy-800 hover:bg-burgundy-900 text-cream-50 font-bold text-base shadow-soft hover:shadow-soft-lg transition-all active:scale-95"
        >
          <Volume2 className="w-6 h-6" />
          <span>اسْتَمِعْ لِنُطْقِ الْكَلِمَة</span>
        </button>
      </div>

      {/* Word Grid Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {VOCAB_DATA.map((item) => {
          const isSelected = activeWord.id === item.id;
          const isExplored = exploredIds.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => handleSelectWord(item)}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1.5 ${
                isSelected
                  ? 'border-burgundy-800 bg-burgundy-50 ring-2 ring-burgundy-400 scale-105'
                  : isExplored
                  ? 'border-emerald-300 bg-emerald-50/60 text-emerald-950'
                  : 'border-cream-300 bg-white hover:border-burgundy-300'
              }`}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="font-bold text-sm font-cairo text-cream-950">{item.word}</span>
              {isExplored && (
                <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> تم الاستكشاف
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
