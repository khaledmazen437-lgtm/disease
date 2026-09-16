import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Plane, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const SwingFlyActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [flightAltitude, setFlightAltitude] = useState(0); // 0 to 100 meters
  const [eyeContactSecs, setEyeContactSecs] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 6;

  const handleFlyStep = () => {
    if (isCompleted) return;

    playCustomSound('swing_creak');
    addStar(1);

    const newAltitude = Math.min(100, flightAltitude + 20);
    const newSecs = eyeContactSecs + 1;
    const newScore = score + 15;

    setFlightAltitude(newAltitude);
    setEyeContactSecs(newSecs);
    setScore(newScore);
    setIsFlying(true);

    setTimeout(() => setIsFlying(false), 600);

    if (newSecs >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('swing-fly-l1');
      }, 700);
    }
  };

  const handleReset = () => {
    setScore(0);
    setFlightAltitude(0);
    setEyeContactSecs(0);
    setIsFlying(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي</span>
            <span>التأرجح والطيران في الجو ✈️</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            حمل الطفل كوضع الطائرة مع النظر المباشر بالعين
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الطيران:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-sky-100 border border-sky-300 px-3 py-2 rounded-2xl text-xs font-bold text-sky-900">
            التواصل البصري: {eyeContactSecs} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">طيران وتواصل بصري مرتفع ممتاز! 🎉✈️</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في الحفاظ على التواصل البصري المباشر عين في عين أثناء الطيران وحصلت على <strong>{score} نقطة</strong>!
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
             اضغط على زر الطيران لرفع الطفل كوضع الطائرة أعلى، واجعل عينيك في عين الطفل مباشرة!
          </p>

          <div className="bg-gradient-to-b from-sky-900 via-sky-800 to-indigo-950 rounded-3xl p-8 text-center shadow-inner relative min-h-[320px] flex flex-col justify-between overflow-hidden">
            {/* Cloud & Stars background elements */}
            <div className="absolute top-4 left-6 text-2xl animate-pulse">☁️</div>
            <div className="absolute top-10 right-10 text-2xl animate-pulse">⭐</div>

            {/* Eye Contact Alert Indicator */}
            <div className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold mx-auto">
              <Eye className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>اجعل عينك في عين الطفل بشكل مباشر </span>
            </div>

            {/* Flying Child Airplane Avatar */}
            <div className="relative my-8">
              <motion.div
                animate={{
                  y: isFlying ? -40 : -10,
                  rotate: isFlying ? [0, -8, 8, 0] : 0,
                  scale: isFlying ? 1.2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="flex flex-col items-center cursor-pointer"
                onClick={handleFlyStep}
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-2xl flex flex-col items-center justify-center relative">
                  <span className="text-5xl">👶✈️</span>
                  <span className="absolute -top-2 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                    طيران {flightAltitude} متر
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Fly Lift Action Button */}
            <button
              onClick={handleFlyStep}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
            >
              <Plane className="w-5 h-5 text-amber-950" />
              <span>ارفع الطفل للأعلى وحافظ على التواصل البصري (ارفع ✈️)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
