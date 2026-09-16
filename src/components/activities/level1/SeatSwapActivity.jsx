import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, CheckCircle2, XCircle, RefreshCw, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const SeatSwapActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [trainerSignal, setTrainerSignal] = useState('yes'); // 'yes' (head nod forward) | 'no' (head shake side to side)
  const [swapsDone, setSwapsDone] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 4;

  const handleActionChoice = (choice) => {
    if (isCompleted || isSwapping) return;

    if (choice === trainerSignal) {
      // Correct interpretation of nod gesture!
      playCalmTone('success');
      addStar(1);

      if (choice === 'yes') {
        setIsSwapping(true);
        setTimeout(() => setIsSwapping(false), 800);
      }

      const newSwaps = swapsDone + 1;
      const newScore = score + 20;
      setSwapsDone(newSwaps);
      setScore(newScore);

      if (newSwaps >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('seat-swap-l1');
        }, 900);
      } else {
        // Switch next signal randomly
        setTrainerSignal(Math.random() > 0.5 ? 'yes' : 'no');
      }
    } else {
      playCalmTone('gentle-tap');
    }
  };

  const handleReset = () => {
    setScore(0);
    setTrainerSignal('yes');
    setSwapsDone(0);
    setIsSwapping(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي</span>
            <span>تبادل الأماكن بالإيماء والكرسي </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            فهم إيماءة الرأس (الموافقة / الرفض) لتبادل الكراسي
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التبديل:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-indigo-100 border border-indigo-300 px-3 py-2 rounded-2xl text-xs font-bold text-indigo-900">
            التبادلات الناجحة: {swapsDone} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">فهم رائع لإيماءات الرأس والتبادل! 🎉🪑</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            استجاب الطفل بدقة لإشارات الإيماء بالموافقة والرفض وتبادل الأماكن وحصل على <strong>{score} نقطة</strong>!
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
             انتبه لإشارة رأس المدرب المقابل: إيماءة للأمام تعني (موافقة على التبديل )، وهز الرأس يميناً ويساراً يعني (عدم موافقة ❌)!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between">
            {/* Chairs & Sitting Characters Stage */}
            <div className="relative h-48 bg-indigo-50/80 rounded-2xl border border-indigo-200 flex items-center justify-around p-4 overflow-hidden shadow-inner">
              {/* Chair 1 (Trainer) */}
              <motion.div
                animate={{
                  x: isSwapping ? 120 : 0,
                }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center text-4xl shadow-md">
                  👨‍🏫
                </div>
                <span className="text-[11px] font-bold text-indigo-950 mt-1">المدرب (كرسي 1) 🪑</span>
              </motion.div>

              {/* Head Nod Signal Indicator */}
              <div className="bg-white/90 border border-indigo-300 px-4 py-2 rounded-2xl shadow-md text-center">
                <span className="text-[10px] font-bold text-cream-600 block">إشارة رأس المدرب الحالية:</span>
                <span className="text-xs font-black font-cairo text-indigo-950 flex items-center justify-center gap-1 mt-0.5">
                  {trainerSignal === 'yes' ? 'إيماء للأمام (موافقة ✅)' : 'هز يميناً ويساراً (عدم موافقة ❌)'}
                </span>
              </div>

              {/* Chair 2 (Child) */}
              <motion.div
                animate={{
                  x: isSwapping ? -120 : 0,
                }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-amber-300 border-2 border-amber-600 flex items-center justify-center text-4xl shadow-md">
                  👶
                </div>
                <span className="text-[11px] font-bold text-burgundy-950 mt-1">الطفل (كرسي 2) 🪑</span>
              </motion.div>
            </div>

            {/* Action Response Choice Buttons */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <button
                onClick={() => handleActionChoice('yes')}
                className="py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-95"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>إشارة موافقة: تبادل الأماكن الآن </span>
              </button>
              <button
                onClick={() => handleActionChoice('no')}
                className="py-4 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-95"
              >
                <XCircle className="w-5 h-5" />
                <span>إشارة عدم موافقة: البقاء في المكان ✋</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
