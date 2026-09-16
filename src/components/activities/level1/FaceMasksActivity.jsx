import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Smile, Sparkles, Eye, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const FaceMasksActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, markActivityComplete, addStar, speakArabic } = useSensory();

  const [score, setScore] = useState(0);
  const [activeMaskIndex, setActiveMaskIndex] = useState(0);
  const [isCovered, setIsCovered] = useState(true);
  const [peekCount, setPeekCount] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const masks = [
    {
      id: 'lion',
      name: 'قناع الأسد الشجاع',
      emoji: '🦁',
      speech: 'أنا الأسد الشجاع! انظر إلى عيني وأخرج لسانك مع الابتسامة!',
      expression: 'تعبير الضاحك الشجاع',
      bg: 'bg-amber-100 border-amber-300'
    },
    {
      id: 'hero',
      name: 'قناع البطل الخارق',
      emoji: '🦸',
      speech: 'أنا البطل الخارق! عينك في عيني لننطلق سوياً!',
      expression: 'تعبير نظرة البطل الواثق',
      bg: 'bg-indigo-100 border-indigo-300'
    },
    {
      id: 'bunny',
      name: 'قناع الأرنب المضحك',
      emoji: '🐰',
      speech: 'أنا الأرنب اللطيف! بخخخ! اغمز بعينك وابتسم',
      expression: 'تعبير غمزة الأرنب الودودة',
      bg: 'bg-pink-100 border-pink-300'
    },
    {
      id: 'funny',
      name: 'وجه التعبيرات المضحكة',
      emoji: '🤪',
      speech: 'بخخخ! تعبير مضحك، اضحك واخرج لسانك معي!',
      expression: 'إخراج اللسان والابتسامة',
      bg: 'bg-yellow-100 border-yellow-300'
    },
  ];

  const currentMask = masks[activeMaskIndex];
  const targetGoal = 5;

  const triggerParticles = () => {
    const newParticles = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      scale: Math.random() * 0.8 + 0.5,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const handlePeekABoo = () => {
    if (isCompleted) return;

    if (isCovered) {
      // Reveal face ("بخ!") and speak character voice
      playCustomSound('bakh');
      addStar(1);
      triggerParticles();
      setIsCovered(false);

      speakArabic(currentMask.speech);

      const newPeek = peekCount + 1;
      const newScore = score + 20;
      setPeekCount(newPeek);
      setScore(newScore);

      if (newPeek >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          speakArabic('أحسنت يا بطل! تواصل بصري ممتاز مع جميع الأقنعة!');
          markActivityComplete('face-masks-l1');
        }, 900);
      }
    } else {
      // Cover again
      playCalmTone('gentle-tap');
      setIsCovered(true);
      const nextIdx = (activeMaskIndex + 1) % masks.length;
      setActiveMaskIndex(nextIdx);
      speakArabic('أين وجه المدرب والقناع؟ اضغط لإزالة الشال واكتشاف المفاجأة!');
    }
  };

  const handleReset = () => {
    setScore(0);
    setActiveMaskIndex(0);
    setIsCovered(true);
    setPeekCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-900 border border-pink-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي المتحدث</span>
            <span>ألعاب الوجه والأقنعة المتحدثة (بخ!) </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            ارتداء الأقنعة والنطق الصوتي والتخفي المباشر
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الوجه:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-pink-100 border border-pink-300 px-3 py-2 rounded-2xl text-xs font-bold text-pink-900">
            التواصل البصري: {peekCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تواصل بصري ممتع ونطق ممتاز! 🎉</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في التواصل البصري التفاعلي مع الأقنعة المتحدثة وحصلت على <strong>{score} نقطة</strong>!
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
             اضغط على الشال المغطي للوجه لتكتشف القناع وتسمع صوته ينطق بالنطق العربي (بخ! )!
          </p>

          {/* Mask Selector Bar */}
          <div className="flex justify-center items-center gap-2 mb-6 flex-wrap">
            {masks.map((mask, idx) => (
              <button
                key={mask.id}
                onClick={() => {
                  setActiveMaskIndex(idx);
                  setIsCovered(true);
                  speakArabic(`اخترت ${mask.name}. اضغط لإزالة الغطاء!`);
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeMaskIndex === idx ? 'bg-burgundy-900 text-white border-burgundy-950 shadow-md scale-105' : 'bg-white border-cream-300 text-cream-900 hover:bg-cream-100'
                }`}
              >
                <span>{mask.emoji}</span>
                <span>{mask.name}</span>
              </button>
            ))}
          </div>

          {/* Interactive Peek-a-boo Face Screen */}
          <div className="bg-white border border-cream-300 rounded-3xl p-8 text-center shadow-soft relative min-h-[320px] flex flex-col items-center justify-center overflow-hidden">
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

            <AnimatePresence mode="wait">
              {isCovered ? (
                <motion.div
                  key="covered"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  onClick={handlePeekABoo}
                  className="cursor-pointer group flex flex-col items-center"
                >
                  <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-pink-400 via-rose-500 to-purple-600 border-4 border-white shadow-2xl flex items-center justify-center relative group-hover:scale-105 transition-transform">
                    <span className="text-6xl select-none"></span>
                    <span className="absolute bottom-3 bg-white/90 text-pink-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                      أين قناع المدرب؟ (اضغط لرؤيته)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-pink-700 mt-4 animate-bounce">
                    اضغط هنا لإزالة الغطاء واكتشاف القناع المتحدث! 
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={handlePeekABoo}
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className={`w-48 h-48 rounded-full ${currentMask.bg} border-4 border-amber-400 shadow-2xl flex flex-col items-center justify-center relative animate-pulse`}>
                    <span className="text-8xl select-none">{currentMask.emoji}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakArabic(currentMask.speech);
                      }}
                      className="absolute top-2 right-2 bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow hover:scale-105"
                    >
                      <Volume2 className="w-3 h-3" /> اسمع الصوت 
                    </button>
                  </div>
                  <h4 className="text-lg font-black font-cairo text-burgundy-950 mt-3">
                    بخخخ!  {currentMask.name}
                  </h4>
                  <p className="text-xs font-bold text-cream-800 mt-1 max-w-sm">
                    "{currentMask.speech}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
