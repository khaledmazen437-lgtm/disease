import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Eye, Gift, Sparkles, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const CupsShellEyeActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, markActivityComplete, addStar, speakArabic, playWrongFeedback } = useSensory();

  const [score, setScore] = useState(0);
  const [winningCup, setWinningCup] = useState(1); // 0, 1, or 2
  const [revealedCup, setRevealedCup] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [winsCount, setWinsCount] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 4;

  const getHintText = (cupIdx) => {
    if (cupIdx === 0) return 'انظر بعينيك، أنا أنظر للكوب الأول على اليمين!';
    if (cupIdx === 1) return 'انظر بعينيك، أنا أنظر للكوب الأوسط في المنتصف!';
    return 'انظر بعينيك، أنا أنظر للكوب الثالث على اليسار!';
  };

  const triggerParticles = () => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      scale: Math.random() * 0.8 + 0.5,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const handlePickCup = (cupIdx) => {
    if (isShuffling || revealedCup !== null || isCompleted) return;

    setRevealedCup(cupIdx);

    if (cupIdx === winningCup) {
      playCustomSound('blocks_tap');
      addStar(1);
      triggerParticles();
      speakArabic('أحسنت! هذا هو الكوب الصحيح بفضل تتبع نظرة العين!');

      const newWins = winsCount + 1;
      const newScore = score + 25;
      setWinsCount(newWins);
      setScore(newScore);

      if (newWins >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          speakArabic('رائع جداً! فزت بجميع الجولات ورصدت نظرات العين بدقة ممتاز!');
          markActivityComplete('cups-shell-eye-l1');
        }, 1000);
      } else {
        setTimeout(() => {
          handleShuffleNextRound();
        }, 1600);
      }
    } else {
      playWrongFeedback('خطأ! حاول مرة ثانية يا بطل، وانتبه لنظرة عين المدرب!');
      setTimeout(() => {
        setRevealedCup(null);
      }, 1500);
    }
  };

  const handleShuffleNextRound = () => {
    setIsShuffling(true);
    setRevealedCup(null);

    const nextWin = Math.floor(Math.random() * 3);
    setWinningCup(nextWin);

    setTimeout(() => {
      setIsShuffling(false);
      speakArabic(getHintText(nextWin));
    }, 1200);
  };

  const handleReset = () => {
    setScore(0);
    setWinningCup(1);
    setRevealedCup(null);
    setIsShuffling(false);
    setWinsCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي المتحدث</span>
            <span>راقب عيني حتى تكسبني (الأكواب 3D) </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            تتبع نظرة عين المدرب والنطق العربي لاكتشاف الكوب الفائز
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الأكواب:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-amber-100 border border-amber-300 px-3 py-2 rounded-2xl text-xs font-bold text-amber-900">
            الانتصارات: {winsCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تتبع عيون قوي واكتشاف رائع! 🎉🥤</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في التواصل البصري مع المدرب ومعرفة الكوب الفائز من نظرة العين وحصلت على <strong>{score} نقطة</strong>!
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
             راقب تلميح العين المباشر والنطق الصوتي من المدرب للتعرف على الكوب المخفي بداخله المفاجأة!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[360px] flex flex-col justify-between overflow-hidden">
            {/* Particle stars explosion */}
            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ opacity: 0, scale: p.scale * 2, y: -40 }}
                  exit={{ opacity: 0 }}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className="absolute text-xl pointer-events-none select-none z-30"
                >
                 
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Trainer Eye Gaze Hint Display */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-right">
                <motion.div
                  animate={{
                    rotate: winningCup === 0 ? -15 : winningCup === 2 ? 15 : 0,
                    scale: [1, 1.1, 1],
                  }}
                  className="w-14 h-14 rounded-full bg-amber-400 border-2 border-amber-600 flex items-center justify-center text-3xl shadow"
                >
                  👁️
                </motion.div>
                <div>
                  <span className="text-xs font-bold text-amber-950 block">تلميح عين المدرب البصري:</span>
                  <span className="text-xs text-amber-900 font-bold font-cairo">
                    "{getHintText(winningCup)}"
                  </span>
                </div>
              </div>
              <button
                onClick={() => speakArabic(getHintText(winningCup))}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-amber-950 text-xs font-extrabold flex items-center gap-1 shadow hover:scale-105 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" /> <span>إعادة الصوت </span>
              </button>
            </div>

            {/* 3 Cups Shell Game View */}
            <div className="grid grid-cols-3 gap-4 items-end py-6 px-4 bg-cream-100/50 rounded-2xl border border-cream-200 min-h-[200px]">
              {[0, 1, 2].map((cupIdx) => {
                const isSelected = revealedCup === cupIdx;
                const isWinner = cupIdx === winningCup;

                return (
                  <motion.div
                    key={cupIdx}
                    animate={{
                      x: isShuffling ? [0, 30, -30, 0] : 0,
                      y: isSelected ? -45 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => handlePickCup(cupIdx)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    {/* Cup Icon */}
                    <div
                      className={`w-24 h-28 rounded-t-3xl border-b-8 flex flex-col items-center justify-center relative transition-all shadow-lg ${
                        isSelected
                          ? isWinner
                            ? 'bg-emerald-500 border-emerald-700 text-white scale-110'
                            : 'bg-rose-500 border-rose-700 text-white'
                          : 'bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 border-amber-800 text-amber-950 group-hover:scale-105'
                      }`}
                    >
                      <span className="text-4xl select-none"></span>
                      <span className="text-[10px] font-black mt-1">كوب {cupIdx + 1}</span>

                      {/* Hidden Prize inside winning cup */}
                      <AnimatePresence>
                        {isSelected && isWinner && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1.4 }}
                            className="absolute -bottom-8 bg-amber-400 text-amber-950 p-2 rounded-full shadow-lg border border-white z-20"
                          >
                            
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 text-xs font-bold text-cream-800">
              {isShuffling ? 'جاري تحريك الأكواب ببطء... ' : 'اضغط على الكوب الذي ينظر إليه المدرب بعينيه!'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
