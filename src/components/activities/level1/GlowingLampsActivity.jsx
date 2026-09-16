import React, { useState, useEffect } from 'react';
import { Award, RotateCcw, Trophy, Lightbulb, Sparkles } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const GlowingLampsActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  // Dedicated score counter for Glowing Lamps Activity
  const [lampsScore, setLampsScore] = useState(0);
  const [targetGoal] = useState(8);
  const [litCount, setLitCount] = useState(0);
  const [activeLampIndex, setActiveLampIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // 6 Glowing colorful lamps data
  const lampsData = [
    { id: 0, name: 'لمبة صفراء دافئة', color: 'yellow', bgOff: 'bg-yellow-950/20 border-yellow-800/40 text-yellow-900', bgOn: 'bg-gradient-to-r from-yellow-300 to-amber-400 border-yellow-200 text-yellow-950 shadow-yellow-400/80' },
    { id: 1, name: 'لمبة زرقاء سماوية', color: 'sky', bgOff: 'bg-sky-950/20 border-sky-800/40 text-sky-900', bgOn: 'bg-gradient-to-r from-sky-300 to-cyan-400 border-sky-200 text-sky-950 shadow-sky-400/80' },
    { id: 2, name: 'لمبة خضراء مهدئة', color: 'emerald', bgOff: 'bg-emerald-950/20 border-emerald-800/40 text-emerald-900', bgOn: 'bg-gradient-to-r from-emerald-300 to-teal-400 border-emerald-200 text-emerald-950 shadow-emerald-400/80' },
    { id: 3, name: 'لمبة وردية لطيفة', color: 'pink', bgOff: 'bg-pink-950/20 border-pink-800/40 text-pink-900', bgOn: 'bg-gradient-to-r from-pink-300 to-rose-400 border-pink-200 text-pink-950 shadow-pink-400/80' },
    { id: 4, name: 'لمبة بنفسجية هادئة', color: 'purple', bgOff: 'bg-purple-950/20 border-purple-800/40 text-purple-900', bgOn: 'bg-gradient-to-r from-purple-300 to-indigo-400 border-purple-200 text-purple-950 shadow-purple-400/80' },
    { id: 5, name: 'لمبة برتقالية بهيجة', color: 'orange', bgOff: 'bg-orange-950/20 border-orange-800/40 text-orange-900', bgOn: 'bg-gradient-to-r from-orange-300 to-amber-500 border-orange-200 text-orange-950 shadow-orange-400/80' },
  ];

  // Rotate active lamp index randomly every few seconds if child hasn't clicked
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setActiveLampIndex(prev => {
        let next = Math.floor(Math.random() * lampsData.length);
        return next === prev ? (next + 1) % lampsData.length : next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isCompleted]);

  const handleTapLamp = (idx) => {
    if (isCompleted || idx !== activeLampIndex) return;

    playCustomSound('button_click');
    addStar(1);

    // Update dedicated score for Glowing Lamps activity
    const newScore = lampsScore + 12;
    const newLit = litCount + 1;
    setLampsScore(newScore);
    setLitCount(newLit);

    if (newLit >= targetGoal) {
      setIsCompleted(true);
      markActivityComplete('glowing-lamps-l1');
    } else {
      // Pick next random glowing lamp
      setActiveLampIndex((idx + 1 + Math.floor(Math.random() * 4)) % lampsData.length);
    }
  };

  const handleResetGame = () => {
    setLampsScore(0);
    setLitCount(0);
    setActiveLampIndex(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Game Header & Dedicated Score Counter */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
            <span>النشاط الثالث </span>
            <span>اللمض والكرات الملونة المضيئة</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">تتبع واستكشاف اللمض المضيئة</h3>
        </div>

        {/* Dedicated Game Score Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط لعبة اللمض:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{lampsScore} نقطة</span>
            </div>
          </div>
          <div className="bg-purple-100 border border-purple-300 px-3 py-2 rounded-2xl text-xs font-bold text-purple-900">
            اللمض المضاءة: {litCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-10 bg-white border border-cream-300 rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">استجابة وتتبع بصري مبهر!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في تتبع واكتشاف اللمض المضيئة الملونة وحصلت على <strong>{lampsScore} نقطة</strong> خاصة بهذه اللعبة!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleResetGame}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة اللعب</span>
            </button>
            {onFinish && (
              <button
                onClick={onFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-burgundy-900 text-cream-50 font-bold text-sm shadow-md"
              >
                <span>إنهاء تدريبات المستوى الأول</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xs text-cream-700 mb-4 text-center font-medium">
             انظر إلى اللوحة، تتبع اللمبة التي تضيء بلون جديد واضغط عليها لإحراز النقاط!
          </p>

          {/* Lamps Grid Panel */}
          <div className="bg-slate-900 border-4 border-slate-800 rounded-3xl p-8 min-h-[300px] flex items-center justify-center shadow-inner">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-lg">
              {lampsData.map((lamp) => {
                const isLit = lamp.id === activeLampIndex;
                return (
                  <button
                    key={lamp.id}
                    onClick={() => handleTapLamp(lamp.id)}
                    className={`p-6 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                      isLit
                        ? `${lamp.bgOn} shadow-2xl scale-110 ring-4 ring-white/50 animate-pulse`
                        : `${lamp.bgOff} opacity-40 hover:opacity-60 scale-95`
                    }`}
                  >
                    <Lightbulb className={`w-12 h-12 transition-transform ${isLit ? 'animate-bounce text-yellow-950 scale-125' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold font-cairo text-center">
                      {isLit ? 'إضاءة نشطة! اضغط ' : lamp.name}
                    </span>
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
