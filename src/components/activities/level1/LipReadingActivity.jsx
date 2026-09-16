import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, VolumeX, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const LipReadingActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [guessedCount, setGuessedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const wordCards = [
    { id: 1, word: 'تفاحة 🍎', lipsMotion: 'تـ - فـا - حـة (حركة شفاه دائرية وتعبير مبتسم)', options: ['تفاحة 🍎', 'سيارة 🚗', 'كرة ⚽'], correctIdx: 0 },
    { id: 2, word: 'ماما 👩', lipsMotion: 'ما - ما (إغلاق وفتح الشفتين بلطف)', options: ['دبدوب 🧸', 'ماما 👩', 'عصفور 🐦'], correctIdx: 1 },
    { id: 3, word: 'كرة ⚽', lipsMotion: 'كـُ - رة (استدارة الشفاه للكرة)', options: ['قلم ✏️', 'شمس ☀️', 'كرة ⚽'], correctIdx: 2 },
    { id: 4, word: 'بطل 🏆', lipsMotion: 'بَـ - طَـ - لْ (ابتسامة الشفاه الواثقة)', options: ['بطل 🏆', 'بيت 🏠', 'زهرة 🌸'], correctIdx: 0 },
  ];

  const currentCard = wordCards[currentWordIdx];
  const targetGoal = wordCards.length;

  const handleSelectAnswer = (optionIdx) => {
    if (isCompleted) return;

    if (optionIdx === currentCard.correctIdx) {
      playCustomSound('vocal_humming');
      addStar(1);

      const newCount = guessedCount + 1;
      const newScore = score + 25;
      setGuessedCount(newCount);
      setScore(newScore);

      if (newCount >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('lip-reading-l1');
        }, 800);
      } else {
        setTimeout(() => {
          setCurrentWordIdx((prev) => prev + 1);
        }, 800);
      }
    } else {
      playCalmTone('gentle-tap');
    }
  };

  const handleReset = () => {
    setScore(0);
    setCurrentWordIdx(0);
    setGuessedCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي</span>
            <span>فقدت صوتي (قراءة الشفاه وتعبيرات الوجه) </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            الانتباه لحركة شفاه المدرب بدون صوت للتعرف على الكلمة
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الشفاه:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-teal-100 border border-teal-300 px-3 py-2 rounded-2xl text-xs font-bold text-teal-900">
            الكلمات: {guessedCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">قراءة شفاه وانتباه بصري خارق! 🎉🤫</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في التعرف على جميع الكلمات من حركة الشفاه وتعبيرات الوجه الصامتة وحصلت على <strong>{score} نقطة</strong>!
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
             ينطق المدرب الكلمة بحركة الشفاه فقط وبدون صوت. انتبه لوجه المدرب واختر الكلمة المطابقة!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[320px] flex flex-col justify-between">
            {/* Trainer Face with Muted Sound Indicator */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 mb-4 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow">
                <VolumeX className="w-3.5 h-3.5" /> الصوت مكتوم (الانتباه للشفاه)
              </div>

              {/* Animated Lips Face Avatar */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-24 h-24 rounded-full bg-teal-100 border-4 border-teal-400 flex items-center justify-center text-5xl shadow-md my-2"
              >
                👄
              </motion.div>

              <h4 className="text-sm font-bold font-cairo text-teal-950 mt-1">
                حركة الشفاه: "{currentCard.lipsMotion}"
              </h4>
            </div>

            {/* Multiple Choice Word Options */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {currentCard.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className="py-3.5 px-3 rounded-2xl border-2 border-cream-300 bg-cream-50 hover:bg-cream-100 hover:border-teal-500 font-black text-xs text-cream-950 shadow-sm transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
