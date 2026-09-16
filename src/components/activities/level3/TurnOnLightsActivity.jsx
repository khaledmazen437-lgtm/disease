import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Trophy, RotateCcw, Award, Volume2, Sparkles, Sun } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const TurnOnLightsActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [isLightOn, setIsLightOn] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 4;

  const characters = [
    { name: 'أحمد المبتسم', voice: 'نورت المكان يا بطل! أنا فرحان جداً بوجودك! انظر كم المكان مشرق الآن!' },
    { name: 'سارة السعيدة', voice: 'يا هلا بالنور! عندما شغلت النور رأيت ابتسامتك الجميلة!' },
    { name: 'المدرب اللطيف', voice: 'ما شاء الله عليك! النور أضاء الغرفة وكشف وجهي المبتسم لك!' },
    { name: 'صديق النجوم', voice: 'رائع ومبهج جداً! المكان أصبح دافئاً ومضيئاً بالحب والتواصل!' },
  ];

  const handleToggleLight = () => {
    if (isLightOn) return;

    setIsLightOn(true);
    playCustomSound('pop');
    playCalmTone('success');

    const char = characters[(round - 1) % characters.length];
    speakArabic(char.voice);
    addStar(2);

    const newScore = score + 25;
    setScore(newScore);

    if (round >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'lights-on-l3',
          'تشغيل النور والوجه السعيد! 💡😊',
          'شاطر شاطر! أحسنت في إضاءة المكان واكتشاف الوجه السعيد والتواصل البصري!'
        );
      }, 2000);
    } else {
      setTimeout(() => {
        setRound((prev) => prev + 1);
        setIsLightOn(false);
      }, 3200);
    }
  };

  const handleReset = () => {
    setRound(1);
    setScore(0);
    setIsLightOn(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
            <span>المستوى الثالث - النشاط 3</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            شَغّل النور واكتشف الوجه السعيد 💡😊
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
          <div className="bg-amber-100 border border-amber-300 px-3 py-2 rounded-2xl text-xs font-bold text-amber-900">
            الجولة: {round} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">أنرت كل الجولات بذكاء! 🌟</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            لقد أتقنت إضاءة الشاشة وملاحظة الوجوه السعيدة بدقة ومرح!
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
            الشاشة مظلمة وهادئة. اضغط على مفتاح المصباح لتشغيل النور ورؤية الوجه السعيد! 👇
          </p>

          {/* Interactive Darkness/Light Room Container */}
          <div
            onClick={handleToggleLight}
            className={`transition-all duration-700 rounded-3xl p-8 sm:p-12 mb-6 flex flex-col items-center justify-center relative min-h-[340px] overflow-hidden cursor-pointer select-none border-4 ${
              isLightOn
                ? 'bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 border-amber-300 shadow-xl'
                : 'bg-slate-900 border-slate-700 shadow-inner'
            }`}
          >
            {/* Hanging Light Cord & Switch */}
            <div className="absolute top-0 flex flex-col items-center z-20">
              <div className="w-1 h-12 bg-cream-400" />
              <motion.div
                animate={{ scale: isLightOn ? [1, 1.2, 1] : 1 }}
                className={`p-3 rounded-full border-2 transition-colors ${
                  isLightOn ? 'bg-amber-400 border-amber-200 shadow-lg shadow-amber-300/80' : 'bg-slate-700 border-slate-500'
                }`}
              >
                <Lightbulb className={`w-8 h-8 ${isLightOn ? 'text-amber-950 fill-amber-300' : 'text-slate-400'}`} />
              </motion.div>
            </div>

            {/* If Dark: Prompt to click */}
            {!isLightOn && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-20 text-center z-10"
              >
                <div className="text-5xl mb-3 animate-pulse">🌙</div>
                <div className="text-white font-black text-base font-cairo bg-slate-800/80 px-6 py-2 rounded-full border border-slate-600 shadow-lg">
                  اضغط هنا لتشغيل النور 💡👆
                </div>
              </motion.div>
            )}

            {/* If Light On: Happy Smiling Face with Sun Rays */}
            <AnimatePresence>
              {isLightOn && (
                <motion.div
                  initial={{ scale: 0.3, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="mt-14 flex flex-col items-center z-10 text-center"
                >
                  {/* Glowing Character Face */}
                  <div className="relative w-44 h-44 rounded-full bg-gradient-to-b from-amber-200 to-amber-300 border-4 border-amber-400 shadow-2xl flex flex-col items-center justify-center">
                    {/* Big Joyful Eyes */}
                    <div className="flex justify-between w-28 px-2 mb-3">
                      <div className="w-9 h-9 bg-white rounded-full border-2 border-amber-800 flex items-center justify-center">
                        <div className="w-4 h-4 bg-amber-950 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                        </div>
                      </div>
                      <div className="w-9 h-9 bg-white rounded-full border-2 border-amber-800 flex items-center justify-center">
                        <div className="w-4 h-4 bg-amber-950 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                        </div>
                      </div>
                    </div>

                    {/* Rosy Cheeks */}
                    <div className="flex justify-between w-32 px-1 mb-1">
                      <div className="w-5 h-3 bg-rose-400 rounded-full blur-xs" />
                      <div className="w-5 h-3 bg-rose-400 rounded-full blur-xs" />
                    </div>

                    {/* Big Happy Smile */}
                    <div className="w-16 h-8 border-b-4 border-rose-700 rounded-b-full bg-rose-100 flex items-center justify-center overflow-hidden">
                      <div className="w-8 h-3 bg-rose-400 rounded-t-full mt-3" />
                    </div>
                  </div>

                  <div className="mt-4 px-5 py-2 rounded-full bg-white/90 border border-amber-300 text-amber-950 font-black text-sm font-cairo shadow-md flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>أهلاً بالنور والوجه السعيد! 😊✨</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sound & Action */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <button
              onClick={() => speakArabic('اضغط على المصباح لتشغيل النور واكتشاف الوجه المبتسم')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>تعليمات صوتية 🗣️</span>
            </button>

            {!isLightOn && (
              <button
                onClick={handleToggleLight}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                <span>تشغيل النور الآن 💡</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
