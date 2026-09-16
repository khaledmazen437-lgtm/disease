import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Smile, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const SocialSmileMirrorActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isSmiling, setIsSmiling] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 5;

  const handleTriggerSmile = () => {
    if (isSmiling) return;

    setIsSmiling(true);
    playCalmTone('success');
    playCustomSound('laugh');

    speakArabic('ابتسامتك تضيء المكان! النظر بعينيك يبث السعادة والبهجة!');
    addStar(1);

    const newScore = score + 20;
    setScore(newScore);

    if (round >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('social-smile-l2');
      }, 1600);
    } else {
      setTimeout(() => {
        setRound((prev) => prev + 1);
        setIsSmiling(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    setScore(0);
    setRound(1);
    setIsSmiling(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-900 border border-pink-300 text-xs font-bold mb-1">
            <Smile className="w-3.5 h-3.5 text-pink-700" />
            <span>الابتسامة الاجتماعية التفاعلية</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            ربط النظر المباشر بالاستجابة العاطفية والابتسامة المتبادلة
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الابتسامة:</span>
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
          <div className="w-20 h-20 bg-pink-100 text-pink-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تواصل عاطفي وابتسامة مذهلة!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            تبادلت الابتسامات الدافئة مع عيني المدرب وحصلت على <strong>{score} نقطة</strong>!
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
            انظر لعين المدرب المباشرة واضغط لتبادل الابتسامات الدافئة والنظر التفاعلي المبهج!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-8 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between items-center overflow-hidden">
            {/* Character Face Stage */}
            <div
              onClick={handleTriggerSmile}
              className="relative w-64 h-64 bg-gradient-to-b from-pink-100 via-rose-50 to-amber-50 rounded-full border-4 border-pink-300 shadow-inner flex flex-col items-center justify-center my-4 overflow-hidden cursor-pointer hover:scale-105 transition-all"
            >
              {/* Eyes */}
              <div className="flex items-center gap-6 z-10 mb-2">
                <motion.div
                  animate={isSmiling ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="w-16 h-16 rounded-full bg-white border-4 border-burgundy-900 flex items-center justify-center shadow-md relative"
                >
                  <div className="w-8 h-8 rounded-full bg-burgundy-950 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white absolute top-2 right-2"></div>
                  </div>
                </motion.div>

                <motion.div
                  animate={isSmiling ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="w-16 h-16 rounded-full bg-white border-4 border-burgundy-900 flex items-center justify-center shadow-md relative"
                >
                  <div className="w-8 h-8 rounded-full bg-burgundy-950 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white absolute top-2 right-2"></div>
                  </div>
                </motion.div>
              </div>

              {/* Cheerful Mouth */}
              <motion.div
                animate={isSmiling ? { scale: 1.2 } : { scale: 1 }}
                className={`w-24 h-12 bg-burgundy-900 rounded-b-full border-2 border-burgundy-950 flex justify-center items-end pb-1 overflow-hidden z-10 ${
                  isSmiling ? 'bg-pink-700' : ''
                }`}
              >
                <div className="w-12 h-5 bg-rose-300 rounded-t-full"></div>
              </motion.div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleTriggerSmile}
              disabled={isSmiling}
              className={`w-full py-4 rounded-2xl text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 ${
                isSmiling
                  ? 'bg-pink-600 opacity-90 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-700 cursor-pointer animate-pulse'
              }`}
            >
              <Heart className="w-5 h-5 fill-rose-200" />
              <span>{isSmiling ? 'ابتسامة دافئة وتواصل بصري مبهج!' : 'اضغط على الوجه لتبادل الابتسامات الدافئة!'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
