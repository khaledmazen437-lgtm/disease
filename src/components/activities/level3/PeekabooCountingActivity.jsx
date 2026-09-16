import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trophy, RotateCcw, Award, Volume2, Smile, Frown, Sparkles } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const PeekabooCountingActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);
  const [handsCovering, setHandsCovering] = useState(true);
  const [emotion, setEmotion] = useState('happy'); // 'happy' | 'sad' | 'excited'
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 5;

  const emotionsList = [
    { type: 'happy', emoji: '😄', text: 'فرحان ومبتسم!', voice: 'واحد، اثنان، ثلاثة.. بخ! أنا فرحان جداً وسعيد بلقائك يا بطل!' },
    { type: 'surprised', emoji: '😲', text: 'مندهش ومتحمس!', voice: 'واحد، اثنان، ثلاثة.. بخ! واو! يا لها من مفاجأة جميلة برؤيتك!' },
    { type: 'pouty', emoji: '🥺', text: 'زعلان ويبحث عن ابتسامتك!', voice: 'كنت زعلان قليلاً.. لكن لما نظرت في عينيك الحلوين صرت فرحان ومبتسم!' },
    { type: 'silly', emoji: '😜', text: 'مرح ومشاغب!', voice: 'بخخخ! واحد، اثنان، ثلاثة! انظر إلى وجهي المضحك!' },
    { type: 'super_happy', emoji: '🥰', text: 'ممتن ومحب!', voice: 'ما شاء الله عليك يا بطل! أحبك كثيراً وفرحان بك!' },
  ];

  const handleRevealFace = () => {
    if (!handsCovering) return;

    const currentEmotionObj = emotionsList[(count - 1) % emotionsList.length];
    setEmotion(currentEmotionObj.type);
    setHandsCovering(false);

    playCustomSound('bakh');
    playCalmTone('success');
    speakArabic(currentEmotionObj.voice);
    addStar(2);

    const newScore = score + 20;
    setScore(newScore);

    if (count >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'peekaboo-count-l3',
          'الغميضة مع العد والتعبيرات! 🙈😄',
          'شاطر شاطر! أحسنت في عد الأرقام واكتشاف تعبيرات الوجه السعيدة!'
        );
      }, 2000);
    } else {
      setTimeout(() => {
        setCount((prev) => prev + 1);
        setHandsCovering(true);
      }, 3000);
    }
  };

  const handleReset = () => {
    setCount(1);
    setScore(0);
    setHandsCovering(true);
    setIsCompleted(false);
  };

  const currentEmotionObj = emotionsList[(count - 1) % emotionsList.length];

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 text-xs font-bold mb-1">
            <Eye className="w-3.5 h-3.5 text-indigo-700" />
            <span>المستوى الثالث - النشاط 2</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            الغميضة مع العد واكتشاف التعبيرات (فرحان / زعلان) 🙈
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
          <div className="bg-indigo-100 border border-indigo-300 px-3 py-2 rounded-2xl text-xs font-bold text-indigo-900">
            العد: {count} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">ممتاز في العد والتواصل! 🎉</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            تعلمت العد واكتشاف مشاعر الوجه بكل ثقة وتواصل بصري رائع!
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
            الشخص يضع يديه على عينيه ويعد! اضغط على عينيه ليفتح وتكتشف هل هو فرحان أم زعلان! 👇
          </p>

          {/* Interactive Face Area */}
          <div className="bg-white border-2 border-dashed border-indigo-200 rounded-3xl p-8 sm:p-12 mb-6 flex flex-col items-center justify-center relative min-h-[320px] overflow-hidden">
            {/* Round Counter Badge */}
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold text-sm">
              <span>العدد الآن:</span>
              <span className="text-xl font-black font-cairo text-indigo-700">{count}</span>
            </div>

            {/* Character Face Container */}
            <div
              onClick={handleRevealFace}
              className="relative w-52 h-60 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-300 shadow-lg flex flex-col items-center justify-center cursor-pointer select-none group"
              title="اضغط على العينين أو اليدين!"
            >
              {/* Hair */}
              <div className="absolute -top-3 w-44 h-16 bg-amber-950 rounded-t-full" />

              {/* Eyes */}
              <div className="relative flex justify-between w-36 px-4 mb-4 z-10">
                <div className="w-10 h-10 bg-white rounded-full border-2 border-amber-800 flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ scale: !handsCovering ? [1, 1.2, 1] : 1 }}
                    className="w-5 h-5 bg-amber-900 rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                  </motion.div>
                </div>
                <div className="w-10 h-10 bg-white rounded-full border-2 border-amber-800 flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ scale: !handsCovering ? [1, 1.2, 1] : 1 }}
                    className="w-5 h-5 bg-amber-900 rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                  </motion.div>
                </div>
              </div>

              {/* Nose */}
              <div className="w-3.5 h-6 bg-amber-300 rounded-full mb-3" />

              {/* Mouth & Expression */}
              <div className="relative">
                {!handsCovering ? (
                  emotion === 'pouty' ? (
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="w-12 h-6 border-t-4 border-rose-700 rounded-t-full mt-2" />
                  ) : (
                    <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="w-14 h-7 border-b-4 border-rose-600 rounded-b-full bg-rose-200/50" />
                  )
                ) : (
                  <div className="w-10 h-3 border-b-2 border-amber-700 rounded-full" />
                )}
              </div>

              {/* Hands Covering Eyes (Overlay) */}
              <AnimatePresence>
                {handsCovering && (
                  <motion.div
                    key="hands"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.2, opacity: 0, y: 30 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 flex items-center justify-center bg-amber-100/90 rounded-full backdrop-blur-xs"
                  >
                    <div className="text-center">
                      <div className="flex justify-center gap-4 text-6xl drop-shadow-md animate-pulse">
                        <span>✋</span>
                        <span>🤚</span>
                      </div>
                      <span className="inline-block mt-3 px-4 py-1.5 rounded-full bg-indigo-700 text-white font-black text-xs font-cairo shadow-md group-hover:scale-105 transition-transform">
                        اضغط على يديّ لأفتح! 👆
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Revealed Emotion Banner */}
            {!handsCovering && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 px-6 py-3 rounded-2xl bg-indigo-50 border-2 border-indigo-300 text-indigo-950 font-black text-base text-center shadow-sm flex items-center gap-3"
              >
                <span className="text-3xl">{currentEmotionObj.emoji}</span>
                <span>{currentEmotionObj.text}</span>
              </motion.div>
            )}
          </div>

          {/* Sound & Manual Action */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <button
              onClick={() => speakArabic('واحد اثنان ثلاثة بخ! أين أنا؟ انظر في عيني')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>اسمع صوت الغميضة 🗣️</span>
            </button>

            {handsCovering && (
              <button
                onClick={handleRevealFace}
                className="px-6 py-3 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                افتح العينين واكشف التعبير! 🙈✨
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
