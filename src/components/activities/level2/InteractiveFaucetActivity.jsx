import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Droplets, Droplet, Play, Square, Waves, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const InteractiveFaucetActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [waterFlow, setWaterFlow] = useState(0); // 0 (closed) | 1 (drip) | 2 (stream) | 3 (waterfall)
  const [tappedCount, setTappedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 6;

  const handleToggleFaucet = (flowLevel) => {
    setWaterFlow(flowLevel);
    playCustomSound('water_flow');
    addStar(1);

    if (flowLevel === 0) {
      speakArabic('تم إغلاق الحنفية! ممتاز في التحكم بنظرة العين!');
    } else if (flowLevel === 1) {
      speakArabic('قطرات ماء هادئة وجميلة!');
    } else if (flowLevel === 2) {
      speakArabic('تدفق ماء ممتع وبارد!');
    } else {
      speakArabic('تدفق مائي مبهج وسريع!');
    }

    const newCount = tappedCount + 1;
    const newScore = score + 20;
    setTappedCount(newCount);
    setScore(newScore);

    if (newCount >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('interactive-faucet-l2');
      }, 1500);
    }
  };

  const handleReset = () => {
    setScore(0);
    setWaterFlow(0);
    setTappedCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold mb-1">
            <Droplets className="w-3.5 h-3.5 text-blue-700" />
            <span>الحنفية والتحكم في المياه</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            فهم نظرة وإشارات فتح وإغلاق صنبور المياه والتفاعل المائي
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التحكم بالمياه:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-blue-100 border border-blue-300 px-3 py-2 rounded-2xl text-xs font-bold text-blue-900">
            التحكم: {tappedCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تحكم مائي واستجابة ممتازة!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في الاستجابة لإشارات التحكم في المياه وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> <span>إعادة التجربة</span>
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
            انتبه لنظرة عين المدرب وإشارة موافقته، واضغط لفتح الحنفية أو زيادة تدفق المياه أو إغلاقها!
          </p>

          <div className="bg-gradient-to-b from-slate-900 to-blue-950 rounded-3xl p-8 text-center shadow-inner relative min-h-[360px] flex flex-col justify-between items-center overflow-hidden border border-slate-800">
            {/* Interactive Faucet Vector Stage */}
            <div className="relative flex flex-col items-center my-4 z-10">
              {/* Sleek Faucet Pipe Graphic */}
              <div className="w-24 h-16 bg-slate-400 rounded-t-3xl border-4 border-slate-300 relative shadow-2xl flex justify-center">
                <div className="w-8 h-10 bg-slate-500 rounded-b-xl border-2 border-slate-200 absolute -bottom-8"></div>
              </div>

              {/* Water Stream Animation based on flow level */}
              <div className="h-32 flex justify-center items-start pt-8">
                <AnimatePresence>
                  {waterFlow > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: waterFlow === 1 ? 40 : waterFlow === 2 ? 80 : 110,
                        width: waterFlow === 1 ? 8 : waterFlow === 2 ? 18 : 32,
                        opacity: 1,
                      }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gradient-to-b from-sky-300 via-blue-400 to-cyan-300 rounded-full shadow-lg border border-white/60 animate-pulse"
                    />
                  )}
                </AnimatePresence>
              </div>

              <div className="text-xs font-bold text-sky-200 mt-2 bg-slate-900/80 px-4 py-1.5 rounded-full border border-sky-400/40 backdrop-blur-md">
                {waterFlow === 0 ? 'الحنفية مغلقة' : waterFlow === 1 ? 'تنقيط ماء هادئ' : waterFlow === 2 ? 'تدفق ماء ممتع' : 'تدفق مائي قوي ومبهج!'}
              </div>
            </div>

            {/* Faucet Control Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mt-4 z-10">
              <button
                onClick={() => handleToggleFaucet(0)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                  waterFlow === 0 ? 'bg-rose-600 text-white border-rose-800 ring-2 ring-rose-400 scale-102 font-black' : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                }`}
              >
                <Square className="w-4 h-4 text-rose-300" />
                <span>إغلاق الحنفية</span>
              </button>

              <button
                onClick={() => handleToggleFaucet(1)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                  waterFlow === 1 ? 'bg-sky-500 text-white border-sky-700 ring-2 ring-sky-300 scale-102 font-black' : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                }`}
              >
                <Droplet className="w-4 h-4 text-sky-300" />
                <span>تنقيط هادئ</span>
              </button>

              <button
                onClick={() => handleToggleFaucet(2)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                  waterFlow === 2 ? 'bg-blue-600 text-white border-blue-800 ring-2 ring-blue-400 scale-102 font-black' : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                }`}
              >
                <Droplets className="w-4 h-4 text-blue-300" />
                <span>تدفق متوسط</span>
              </button>

              <button
                onClick={() => handleToggleFaucet(3)}
                className={`py-3 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
                  waterFlow === 3 ? 'bg-cyan-500 text-white border-cyan-700 ring-2 ring-cyan-300 scale-102 font-black' : 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                }`}
              >
                <Waves className="w-4 h-4 text-cyan-300" />
                <span>تدفق أقوى</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
