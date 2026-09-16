import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Award, Volume2, Sparkles } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const PoppingBalloonsActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [poppedIds, setPoppedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const balloons = [
    { id: 1, color: 'from-rose-400 to-rose-600', face: '🤩', name: 'البالونة الحمراء', greeting: 'واو! بالونة حمراء فرقعت وظهر وجه سعيد بنجوم لامعة!' },
    { id: 2, color: 'from-amber-400 to-amber-600', face: '🥳', name: 'البالونة الصفراء', greeting: 'احتفال جميل! بالونة صفراء أظهرت وجهاً محتفلاً بك!' },
    { id: 3, color: 'from-emerald-400 to-emerald-600', face: '😃', name: 'البالونة الخضراء', greeting: 'أحسنت! وجه أخضر مبتسم يحييك بكل حب!' },
    { id: 4, color: 'from-sky-400 to-sky-600', face: '🥰', name: 'البالونة الزرقاء', greeting: 'رائع جداً! ظهر لك وجه محبوب وسعيد ومبتسم!' },
    { id: 5, color: 'from-purple-400 to-purple-600', face: '😎', name: 'البالونة البنفسجية', greeting: 'رائع يا بطل! وجه أنيق بنظارة شمسية يحييك!' },
  ];

  const handlePop = (balloon) => {
    if (poppedIds.includes(balloon.id)) return;

    playCustomSound('pop');
    playCalmTone('success');
    speakArabic(balloon.greeting);
    addStar(2);

    const updated = [...poppedIds, balloon.id];
    setPoppedIds(updated);
    setScore((prev) => prev + 20);

    if (updated.length >= balloons.length) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'popping-balloons-l3',
          'فرقعة البالونات ومفاجأة الوجوه! 🎈😃',
          'شاطر شاطر! أحسنت في فرقعة جميع البالونات واكتشاف كل الوجوه السعيدة!'
        );
      }, 2000);
    }
  };

  const handleReset = () => {
    setPoppedIds([]);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold mb-1">
            <span>🎈</span>
            <span>المستوى الثالث - النشاط 6</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            بالونات مفرقعة: فرقع البالونة ليظهر الوجه 🎈😃
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
          <div className="bg-rose-100 border border-rose-300 px-3 py-2 rounded-2xl text-xs font-bold text-rose-900">
            المفرقعة: {poppedIds.length} / {balloons.length}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">فرقعة ممتعة ومرح متواصل! 🎈✨</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أتقنت فرقعة البالونات واكتشاف الوجوه المبهجة بدقة وتفاعل سريع!
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
            اضغط على أي بالونة ملونة لتفرقع ويظهر الوجه المفاجئ داخلها! 👇
          </p>

          {/* Balloons Row Grid */}
          <div className="bg-gradient-to-b from-sky-50 via-white to-amber-50 border-2 border-cream-300 rounded-3xl p-6 sm:p-8 mb-6 min-h-[320px] flex items-center justify-around flex-wrap gap-4 shadow-inner">
            {balloons.map((b, idx) => {
              const isPopped = poppedIds.includes(b.id);

              return (
                <div
                  key={b.id}
                  onClick={() => handlePop(b)}
                  className="flex flex-col items-center cursor-pointer select-none group"
                >
                  <AnimatePresence>
                    {!isPopped ? (
                      <motion.div
                        animate={{ y: [0, -14, 0] }}
                        transition={{
                          duration: 2.2 + idx * 0.3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="flex flex-col items-center"
                      >
                        {/* Balloon Oval */}
                        <div
                          className={`w-20 h-24 sm:w-24 sm:h-28 rounded-full bg-gradient-to-t ${b.color} shadow-lg relative flex items-center justify-center group-hover:scale-105 transition-transform`}
                        >
                          <div className="absolute top-3 left-4 w-4 h-2 bg-white/60 rounded-full rotate-45" />
                          <span className="text-[11px] font-black text-white bg-black/20 px-2 py-0.5 rounded-full">
                            المسني 👆
                          </span>
                        </div>
                        {/* Knot & String */}
                        <div className="w-2 h-2 bg-amber-900 rounded-full -mt-0.5" />
                        <div className="w-0.5 h-10 bg-cream-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.1, rotate: -30 }}
                        animate={{ scale: 1.15, rotate: 0 }}
                        className="flex flex-col items-center py-4"
                      >
                        <div className="text-5xl drop-shadow-md animate-bounce mb-1">
                          {b.face}
                        </div>
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                          مفاجأة! ✨
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Sound Helper */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => speakArabic('فرقع البالونات الملونة واكتشف وجوه الأصدقاء المبتسمين')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>تعليمات صوتية 🗣️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
