import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Eye, Hand, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const PeekabooHandsActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 5;

  const handleToggleHands = () => {
    if (isRevealed) {
      setIsRevealed(false);
      return;
    }

    setIsRevealed(true);
    playCustomSound('bakh');
    speakArabic('بخخخ! أنا أراك يا بطل! انظر لعيناي!');
    addStar(1);

    const newScore = score + 20;
    setScore(newScore);

    if (round >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('peekaboo-hands-l2');
      }, 1200);
    } else {
      setTimeout(() => {
        setRound((prev) => prev + 1);
        setIsRevealed(false);
      }, 1600);
    }
  };

  const handleReset = () => {
    setScore(0);
    setRound(1);
    setIsRevealed(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold mb-1">
            <span>النشاط الأول</span>
            <span>لعبة الغميضة واليدين (بخ)</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            إزالة اليدين للتواصل البصري المباشر عند المفاجأة
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الغميضة:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-rose-100 border border-rose-300 px-3 py-2 rounded-2xl text-xs font-bold text-rose-900">
            الجولة: {round} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تواصل بصري ومرح رائع!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في التواصل مع العينين عند إزالة اليدين وحصلت على <strong>{score} نقطة</strong>!
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
            اليدان تغطيان عيني المدرب. اضغط على اليدين لإبعادهما والنظر بعينيك مباشرة واستماع صوت (بخ)!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-8 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between items-center overflow-hidden">
            {/* Character Face Stage */}
            <div className="relative w-64 h-64 bg-gradient-to-b from-rose-100 to-amber-50 rounded-full border-4 border-rose-300 shadow-inner flex items-center justify-center my-4 overflow-hidden">
              {/* Eyes Behind Hands */}
              <div className="flex items-center gap-6 z-10">
                <motion.div
                  animate={isRevealed ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-16 h-16 rounded-full bg-white border-4 border-burgundy-900 flex items-center justify-center shadow-lg relative"
                >
                  <div className="w-8 h-8 rounded-full bg-burgundy-950 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white absolute top-2 right-2"></div>
                  </div>
                </motion.div>

                <motion.div
                  animate={isRevealed ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-16 h-16 rounded-full bg-white border-4 border-burgundy-900 flex items-center justify-center shadow-lg relative"
                >
                  <div className="w-8 h-8 rounded-full bg-burgundy-950 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white absolute top-2 right-2"></div>
                  </div>
                </motion.div>
              </div>

              {/* Cheerful Mouth */}
              <div className="absolute bottom-10 w-20 h-10 bg-burgundy-900 rounded-b-full border-2 border-burgundy-950 flex justify-center items-end pb-1 overflow-hidden z-10">
                <div className="w-10 h-4 bg-rose-400 rounded-t-full"></div>
              </div>

              {/* Cover Hands (Lucide Hand Icon styled elegantly) */}
              <motion.div
                onClick={handleToggleHands}
                animate={isRevealed ? { x: -140, rotate: -25, opacity: 0.2 } : { x: 0, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 select-none cursor-pointer z-20 p-3 bg-amber-200 text-amber-900 rounded-2xl shadow-lg hover:scale-110"
              >
                <Hand className="w-14 h-14" />
              </motion.div>

              <motion.div
                onClick={handleToggleHands}
                animate={isRevealed ? { x: 140, rotate: 25, opacity: 0.2 } : { x: 0, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="absolute right-6 top-1/2 -translate-y-1/2 select-none cursor-pointer z-20 p-3 bg-amber-200 text-amber-900 rounded-2xl shadow-lg hover:scale-110"
              >
                <Hand className="w-14 h-14 scale-x-[-1]" />
              </motion.div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleToggleHands}
              className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Eye className="w-5 h-5 animate-pulse" />
              <span>{isRevealed ? 'بخخخ! أنا أراك! (اضغط لتغطية العينين مرة أخرى)' : 'اضغط لإبعاد اليدين والنظر بعينيك!'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
