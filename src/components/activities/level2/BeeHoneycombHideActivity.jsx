import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, DoorClosed, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const BeeHoneycombHideActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete, playWrongFeedback } = useSensory();

  const [score, setScore] = useState(0);
  const [activeCellIdx, setActiveCellIdx] = useState(1);
  const [revealedCell, setRevealedCell] = useState(null);
  const [foundCount, setFoundCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const cells = [
    { id: 0, label: 'باب الخلية الأول' },
    { id: 1, label: 'باب الخلية الثاني' },
    { id: 2, label: 'باب الخلية الثالث' },
    { id: 3, label: 'باب الخلية الرابع' },
  ];

  const targetGoal = 5;

  const handleSelectCell = (idx) => {
    if (isCompleted) return;

    if (idx === activeCellIdx) {
      playCustomSound('bee_buzz');
      speakArabic('بخخخ! أحسنت! النحلة اللطيفة والدبدوب ظهروا وجمعوا رحيق الأزهار!');
      addStar(1);

      const newFound = foundCount + 1;
      const newScore = score + 25;
      setFoundCount(newFound);
      setScore(newScore);

      setRevealedCell(idx);

      if (newFound >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('bee-honeycomb-l2');
        }, 1500);
      } else {
        setTimeout(() => {
          let nextIdx = Math.floor(Math.random() * cells.length);
          while (nextIdx === activeCellIdx) {
            nextIdx = Math.floor(Math.random() * cells.length);
          }
          setActiveCellIdx(nextIdx);
          setRevealedCell(null);
        }, 1800);
      }
    } else {
      setRevealedCell(idx);
      playWrongFeedback('خطأ! هذه الخلية فارغة، حاول فتح باب آخر يا بطل!');
      setTimeout(() => {
        setRevealedCell(null);
      }, 1400);
    }
  };

  const handleReset = () => {
    setScore(0);
    setFoundCount(0);
    setActiveCellIdx(1);
    setRevealedCell(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
            <span>الخلية المتقطعة والنحلة والدبدوب</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            البحث عن اختباء الشخصية خلف الخلايا السداسية الملونة
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الخلية:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-amber-100 border border-amber-300 px-3 py-2 rounded-2xl text-xs font-bold text-amber-900">
            الاكتشاف: {foundCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">اكتشاف وتركيز بصري رائع!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            عثرت على اختباء الشخصيات خلف الخلايا بنجاح وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> <span>إعادة اللعبة</span>
            </button>
            {onFinish && (
              <button onClick={onFinish} className="px-6 py-3 rounded-2xl bg-burgundy-900 text-cream-50 font-bold text-sm shadow-md">
                الانتقال للنشاط التالي
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          <p className="text-xs text-cream-700 mb-4 text-center font-medium">
            النحلة والدبدوب مختبئان خلف أحد الأبواب السداسية! اضغط على الباب المناسب لرؤيتهما والنظر لعينيهما!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft min-h-[360px] flex flex-col justify-between items-center">
            {/* Hexagon Honeycomb Cell Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full my-auto">
              {cells.map((cell) => {
                const isOpen = revealedCell === cell.id;
                const isTarget = cell.id === activeCellIdx;
                return (
                  <button
                    key={cell.id}
                    onClick={() => handleSelectCell(cell.id)}
                    className={`h-40 rounded-3xl border-2 transition-all flex flex-col items-center justify-between p-4 cursor-pointer relative overflow-hidden ${
                      isOpen && isTarget
                        ? 'bg-amber-100 border-amber-500 shadow-lg scale-105'
                        : isOpen && !isTarget
                        ? 'bg-rose-50 border-rose-300 opacity-60'
                        : 'bg-gradient-to-b from-amber-50 to-cream-100 hover:bg-amber-100 border-cream-300 hover:border-amber-400 shadow-soft'
                    }`}
                  >
                    <span className="text-xs font-bold font-cairo text-amber-950 z-10">{cell.label}</span>

                    <div className="my-auto z-10">
                      {isOpen && isTarget ? (
                        <div className="text-center font-bold text-amber-900">
                          <Sparkles className="w-10 h-10 mx-auto text-amber-600 mb-1" />
                          <span className="text-xs block">النحلة والدبدوب</span>
                        </div>
                      ) : isOpen && !isTarget ? (
                        <span className="text-xs font-bold text-rose-800">خلية فارغة</span>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center mx-auto shadow-sm">
                          <DoorClosed className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
