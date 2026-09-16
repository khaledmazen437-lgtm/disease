import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glasses, Trophy, RotateCcw, Award, Sparkles, Volume2 } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const GlassesPullActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete, triggerCelebration } = useSensory();

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [hasGlasses, setHasGlasses] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 4;

  const glassesStyles = [
    { name: 'نظارة القراءة الكلاسيكية 👓', color: 'border-slate-800 bg-slate-700/20' },
    { name: 'نظارة شمسية أنيقة 🕶️', color: 'border-amber-700 bg-amber-900/30' },
    { name: 'نظارة ملونة مرحة 🥽', color: 'border-indigo-600 bg-indigo-500/20' },
    { name: 'نظارة النجوم المبهجة ⭐', color: 'border-rose-500 bg-rose-400/20' },
  ];

  const handlePullGlasses = () => {
    if (!hasGlasses) return;

    // 1. Remove glasses animation
    setHasGlasses(false);
    playCustomSound('bakh');
    playCalmTone('success');

    // 2. Character speaks warm direct eye contact message in Arabic
    speakArabic('شكراً لك يا بطل! الآن أستطيع رؤية عينيك بوضوح! انظر في عينيّ وابتسم لي!');
    addStar(2);

    const newScore = score + 25;
    setScore(newScore);

    if (round >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'glasses-pull-l3',
          'سحب النظارات والتواصل البصري بنجاح! 👓',
          'شاطر شاطر! أحسنت يا بطل في سحب النظارات والنظر المباشر في العينين!'
        );
      }, 1400);
    } else {
      setTimeout(() => {
        setRound((prev) => prev + 1);
        setHasGlasses(true);
      }, 2400);
    }
  };

  const handleReset = () => {
    setRound(1);
    setScore(0);
    setHasGlasses(true);
    setIsCompleted(false);
  };

  const currentGlasses = glassesStyles[(round - 1) % glassesStyles.length];

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold mb-1">
            <Glasses className="w-3.5 h-3.5 text-purple-700" />
            <span>المستوى الثالث - النشاط 1</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            سحب النظارة للتواصل المباشر بالعينين 👓
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">النقاط:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-purple-100 border border-purple-300 px-3 py-2 rounded-2xl text-xs font-bold text-purple-900">
            الجولة: {round} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">رؤية واضحة وتواصل رائع! 🌟</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أتقنت إزالة النظارة والنظر مباشرة في عيني الشخص! لقد جمعت <strong>{score} نقطة</strong>.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2 cursor-pointer">
              <RotateCcw className="w-4 h-4" /> <span>إعادة النشاط</span>
            </button>
            {onFinish && (
              <button onClick={onFinish} className="px-6 py-3 rounded-2xl bg-burgundy-900 text-cream-50 font-bold text-sm shadow-md cursor-pointer">
                الانتقال للنشاط التالي
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          <p className="text-xs sm:text-sm text-cream-700 mb-6 text-center font-medium">
            الشخص يرتدي النظارة ويغطي عينيه. اضغط على النظارة لسحبها ليرى عينيك مباشرة! 👇
          </p>

          {/* Interactive Character Face with Glasses */}
          <div className="bg-white border-2 border-dashed border-purple-200 rounded-3xl p-8 sm:p-12 mb-6 flex flex-col items-center justify-center relative min-h-[300px] overflow-hidden">
            {/* Person Face Container */}
            <div className="relative w-48 h-56 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-300 shadow-md flex flex-col items-center justify-center select-none">
              {/* Hair */}
              <div className="absolute -top-3 w-40 h-14 bg-amber-950 rounded-t-full" />

              {/* Eyebrows */}
              <div className="flex justify-between w-32 mb-2 px-2 z-10">
                <div className={`w-8 h-2 bg-amber-950 rounded-full transition-transform ${!hasGlasses ? '-rotate-6' : ''}`} />
                <div className={`w-8 h-2 bg-amber-950 rounded-full transition-transform ${!hasGlasses ? 'rotate-6' : ''}`} />
              </div>

              {/* Eyes Container */}
              <div className="relative flex justify-between w-32 px-3 mb-4 z-10">
                {/* Right Eye */}
                <div className="w-9 h-9 bg-white rounded-full border-2 border-amber-800 flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ scale: !hasGlasses ? 1.2 : 1 }}
                    className="w-4 h-4 bg-emerald-800 rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                  </motion.div>
                </div>

                {/* Left Eye */}
                <div className="w-9 h-9 bg-white rounded-full border-2 border-amber-800 flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ scale: !hasGlasses ? 1.2 : 1 }}
                    className="w-4 h-4 bg-emerald-800 rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                  </motion.div>
                </div>
              </div>

              {/* Nose */}
              <div className="w-3 h-5 bg-amber-300 rounded-full mb-3" />

              {/* Mouth */}
              <div className="w-14 h-6 border-b-4 border-rose-600 rounded-b-full transition-all" />

              {/* Cheeks */}
              <div className="absolute left-4 top-28 w-6 h-4 bg-rose-300/60 rounded-full blur-xs" />
              <div className="absolute right-4 top-28 w-6 h-4 bg-rose-300/60 rounded-full blur-xs" />

              {/* Glasses Overlay - Animated Pull */}
              <AnimatePresence>
                {hasGlasses && (
                  <motion.div
                    key="glasses-overlay"
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -70, opacity: 0, scale: 0.6, rotate: -15 }}
                    transition={{ duration: 0.4 }}
                    onClick={handlePullGlasses}
                    className="absolute top-16 z-20 cursor-pointer group"
                    title="اضغط لسحب النظارة"
                  >
                    <div className="relative flex items-center">
                      {/* Left Rim */}
                      <div className="w-14 h-12 rounded-2xl border-4 border-purple-800 bg-purple-500/20 shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center backdrop-blur-xs" />
                      {/* Bridge */}
                      <div className="w-5 h-2 bg-purple-900 -mx-1" />
                      {/* Right Rim */}
                      <div className="w-14 h-12 rounded-2xl border-4 border-purple-800 bg-purple-500/20 shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center backdrop-blur-xs" />
                    </div>

                    <div className="text-[11px] font-black font-cairo bg-purple-900 text-white px-3 py-1 rounded-full text-center mt-2 shadow-md animate-pulse">
                      اضغط لسحبي! 👆
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Eye Contact Feedback */}
            {!hasGlasses && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 px-5 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-sm text-center flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>رائع جداً! ينظر في عينيك ويبتسم بحب! 👁️✨</span>
              </motion.div>
            )}
          </div>

          {/* Sound Helper & Action Button */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <button
              onClick={() => speakArabic('مرحباً يا بطل! اسحب نظارتي حتى أرى عينيك الجميلتين')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>اسمع صوت الشخص 🗣️</span>
            </button>

            {hasGlasses && (
              <button
                onClick={handlePullGlasses}
                className="px-6 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                سحب النظارة الآن 👓
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
