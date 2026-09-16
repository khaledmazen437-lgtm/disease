import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, CheckCircle2, ArrowUpCircle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const ClimbJumpActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0); // 0 to 5
  const [isPermissionGiven, setIsPermissionGiven] = useState(false);
  const [jumpsDone, setJumpsDone] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 4;

  const handleNextCount = () => {
    if (isCompleted || isPermissionGiven) return;

    speakArabic(nextCount.toString());
    const nextCount = count + 1;
    setCount(nextCount);

    if (nextCount === 5) {
      // Permission signal unlocked!
      setIsPermissionGiven(true);
    }
  };

  const handleExecuteJump = () => {
    if (!isPermissionGiven || isCompleted) return;

    playCustomSound('footsteps');
    addStar(1);

    setIsJumping(true);
    const newJumps = jumpsDone + 1;
    const newScore = score + 20;
    setJumpsDone(newJumps);
    setScore(newScore);

    setTimeout(() => {
      setIsJumping(false);
      setIsPermissionGiven(false);
      setCount(0);

      if (newJumps >= targetGoal) {
        setIsCompleted(true);
        markActivityComplete('climb-jump-l1');
      }
    }, 900);
  };

  const handleReset = () => {
    setScore(0);
    setCount(0);
    setIsPermissionGiven(false);
    setJumpsDone(0);
    setIsJumping(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي</span>
            <span>التسلق والقفز والإشارة البصرية </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            العد من 1 إلى 5 والقفز بعد إشارة الموافقة البصرية
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط القفز:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-emerald-100 border border-emerald-300 px-3 py-2 rounded-2xl text-xs font-bold text-emerald-900">
            القفزات الناجحة: {jumpsDone} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">استجابة وتواصل بصري رائع! 🎉</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أظهر الطفل انتباهاً ممتازاً بانتظار العد من 1 إلى 5 وإشارة الموافقة وحصل على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> <span>إعادة النشاط</span>
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
             ضع الطفل على المنضدة القصيرة واضغط للعد (1 حتى 5). عندما تظهر إشارة الموافقة البصرية الخضراء، اضغط للقفز!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[320px] flex flex-col justify-between">
            {/* Table & Jump Platform Area */}
            <div className="relative h-48 bg-amber-50 rounded-2xl border border-amber-200 flex items-end justify-center pb-4 overflow-hidden shadow-inner">
              {/* Short Table Platform */}
              <div className="w-48 h-16 bg-amber-800 rounded-t-2xl border-t-4 border-amber-900 relative flex items-center justify-center shadow-md">
                <span className="text-[11px] font-bold text-amber-100">منضدة الطفل القصيرة 🪑</span>
              </div>

              {/* Soft Landing Cushion Pad */}
              <div className="w-64 h-6 bg-emerald-600 rounded-xl absolute bottom-1 border-t-2 border-emerald-700 shadow flex items-center justify-center text-[10px] text-white font-bold">
                وسادة القفز الآمنة 🟢
              </div>

              {/* Child Jumping Character */}
              <motion.div
                animate={{
                  y: isJumping ? [0, -70, 0] : count > 0 ? -10 : 0,
                  scale: isJumping ? [1, 1.25, 1] : 1,
                }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-16 z-20 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-amber-300 border-2 border-amber-600 flex items-center justify-center text-4xl shadow-md">
                  {isJumping ? '🦘' : '🧍'}
                </div>
              </motion.div>

              {/* Visual Permission Signal Badge */}
              <AnimatePresence>
                {isPermissionGiven && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-4 bg-emerald-500 text-white font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5 text-xs animate-bounce"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>إشارة الموافقة: اقفز الآن! 🟢</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Countdown and Action Buttons */}
            <div className="mt-4 space-y-3">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm border ${
                      num <= count
                        ? 'bg-emerald-500 text-white border-emerald-700 shadow-md scale-105'
                        : 'bg-cream-100 text-cream-400 border-cream-200'
                    }`}
                  >
                    {num}
                  </div>
                ))}
              </div>

              {!isPermissionGiven ? (
                <button
                  onClick={handleNextCount}
                  disabled={count >= 5}
                  className="w-full py-3.5 rounded-2xl bg-burgundy-900 hover:bg-burgundy-950 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>عد الخطوة التالية ({count} من 5) </span>
                </button>
              ) : (
                <button
                  onClick={handleExecuteJump}
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg animate-pulse flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowUpCircle className="w-5 h-5" />
                  <span>أداء القفزة بموافقة الإشارة البصرية! 🦘</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
