import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, RotateCcw, Award, Volume2, Smile } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const MagicBubblesActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [poppedCount, setPoppedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [revealedFaces, setRevealedFaces] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 6;

  const bubbles = [
    { id: 1, x: '15%', y: '25%', size: 'w-20 h-20', label: 'صديق سعيد', greeting: 'مرحباً بك يا بطل! أنا سعيد برؤيتك!' },
    { id: 2, x: '45%', y: '15%', size: 'w-24 h-24', label: 'صديق مبتسم', greeting: 'يا له من فرقعة لطيفة! أحبك كثيراً!' },
    { id: 3, x: '75%', y: '30%', size: 'w-20 h-20', label: 'صديق مشجع', greeting: 'غمزة عين سعيدة وتشجيع كبير لك!' },
    { id: 4, x: '25%', y: '60%', size: 'w-24 h-24', label: 'صديق مبهج', greeting: 'احتفال مبهج بذكائك وسرعتك!' },
    { id: 5, x: '55%', y: '65%', size: 'w-22 h-22', label: 'صديق متألق', greeting: 'عيناي تلمعان برؤيتك يا بطل!' },
    { id: 6, x: '80%', y: '70%', size: 'w-20 h-20', label: 'صديق عبقري', greeting: 'ابتسامة دافئة من القلب لك يا عبقري!' },
  ];

  const handlePopBubble = (bubble) => {
    if (revealedFaces[bubble.id]) return;

    playCustomSound('pop');
    playCalmTone('success');
    speakArabic(bubble.greeting);
    addStar(2);

    const newRevealed = { ...revealedFaces, [bubble.id]: bubble.label };
    setRevealedFaces(newRevealed);

    const newPopped = poppedCount + 1;
    setPoppedCount(newPopped);
    setScore((prev) => prev + 20);

    if (newPopped >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'magic-bubbles-l3',
          'شاطر شاطر يا بطل!',
          'أحسنت يا بطل في فرقعة كل الفقاعات واكتشاف الوجوه المبتسمة!'
        );
      }, 2000);
    }
  };

  const handleReset = () => {
    setPoppedCount(0);
    setScore(0);
    setRevealedFaces({});
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft font-cairo">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold mb-1">
            <span>المستوى الثالث • النشاط الخامس</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            فقاعات 3D سحرية: فرقع الفقاعة واكتشف الصديق المبتسم
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
          <div className="bg-sky-100 border border-sky-300 px-3 py-2 rounded-2xl text-xs font-bold text-sky-900">
            الفقاعات: {poppedCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">فرقعة ممتازة وأصدقاء مبتسمون!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أظهرت كل الأصدقاء المبتسمين بدقة وسرعة بديهة رائعة!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="btn-dribbble-glass">
              <RotateCcw className="w-4 h-4" /> <span>إعادة النشاط</span>
            </button>
            {onFinish && (
              <button onClick={onFinish} className="btn-dribbble-primary">
                الانتقال للنشاط التالي
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          <p className="text-xs sm:text-sm text-cream-700 mb-6 text-center font-medium">
            المس كل فقاعة 3D زجاجية لتفرقع ويخرج منها صديق مبتسم يرحب بك!
          </p>

          {/* Floating 3D Sensory Bubbles Stage */}
          <div className="bg-gradient-to-b from-sky-100 via-purple-50 to-indigo-100 border-2 border-sky-200 rounded-3xl p-6 mb-6 relative h-[360px] overflow-hidden select-none shadow-inner">
            {bubbles.map((b) => {
              const isPopped = Boolean(revealedFaces[b.id]);

              return (
                <div
                  key={b.id}
                  style={{ left: b.x, top: b.y }}
                  onClick={() => handlePopBubble(b)}
                  className="absolute cursor-pointer group"
                >
                  <AnimatePresence>
                    {!isPopped ? (
                      <motion.div
                        animate={{
                          y: [0, -14, 0],
                          x: [0, 8, 0],
                          scale: [1, 1.06, 1],
                        }}
                        transition={{
                          duration: 2.8 + b.id * 0.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className={`${b.size} rounded-full bubble-3d border-2 border-white/80 shadow-2xl backdrop-blur-md flex items-center justify-center relative group-hover:scale-115 transition-transform duration-300`}
                      >
                        {/* Shimmer 3D Glare */}
                        <div className="absolute top-2 left-3 w-5 h-2.5 bg-white/90 rounded-full rotate-45 blur-[0.5px]" />
                        <Smile className="w-6 h-6 text-purple-700/60 group-hover:text-purple-900 transition-colors" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.2, rotate: -20 }}
                        animate={{ scale: 1.1, rotate: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-900 flex items-center justify-center shadow-lg font-black text-sm">
                          <Smile className="w-8 h-8 text-amber-600" />
                        </div>
                        <span className="text-[11px] font-bold bg-white/90 text-purple-950 px-2.5 py-0.5 rounded-full border border-purple-200 mt-1 shadow-xs">
                          {b.label}
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
              onClick={() => speakArabic('اضغط على الفقاعات لتفرقع ويخرج منها أصدقاء مبتسمون')}
              className="btn-dribbble-glass text-xs"
            >
              <Volume2 className="w-4 h-4 text-purple-700" />
              <span>تعليمات صوتية</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
