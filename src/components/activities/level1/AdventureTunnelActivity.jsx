import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Eye, Heart, Sparkles, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const AdventureTunnelActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [tunnelPos, setTunnelPos] = useState(0); // 0 (Entry) to 100 (Exit)
  const [isTrainerVisible, setIsTrainerVisible] = useState(true);
  const [isShaking, setIsShaking] = useState(false);
  const [tunnelsCompleted, setTunnelsCompleted] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 4;

  const handleAdvanceInTunnel = () => {
    if (isCompleted) return;

    playCustomSound('footsteps');

    const nextPos = tunnelPos + 25;

    if (nextPos >= 100) {
      // Reached exit! Warm Hug reward & Eye Contact
      playCustomSound('bakh');
      addStar(1);

      const newCompleted = tunnelsCompleted + 1;
      const newScore = score + 20;
      setTunnelsCompleted(newCompleted);
      setScore(newScore);
      setTunnelPos(100);

      if (newCompleted >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('adventure-tunnel-l1');
        }, 900);
      } else {
        setTimeout(() => {
          setTunnelPos(0);
          setIsTrainerVisible(true);
        }, 1200);
      }
    } else {
      setTunnelPos(nextPos);
      // Toggle trainer peekaboo appearance at exit
      setIsTrainerVisible((prev) => !prev);
    }
  };

  const handleShakeTunnel = () => {
    playCalmTone('gentle-tap');
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
  };

  const handleReset = () => {
    setScore(0);
    setTunnelPos(0);
    setIsTrainerVisible(true);
    setIsShaking(false);
    setTunnelsCompleted(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي</span>
            <span>نفق المغامرة الشفاف والظهور والاحتضان </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            الدخول إلى النفق وتتبع ظهور المدرب عند فتحة الخروج
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط النفق:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-orange-100 border border-orange-300 px-3 py-2 rounded-2xl text-xs font-bold text-orange-900">
            الرحلات الناجحة: {tunnelsCompleted} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">اجتياز النفق واحتضان الود بنجاح! 🎉⛺</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أنهى الطفل مسار النفق التفاعلي واستمتع بالظهور والاحتضان التشجيعي وحصل على <strong>{score} نقطة</strong>!
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
             يدخل الطفل النفق ويشجعه المدرب الأول، بينما يظهر ويختفي المدرب الثاني عند فتحة الخروج لاجتذاب نظره!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[320px] flex flex-col justify-between">
            {/* Interactive Tunnel View */}
            <motion.div
              animate={{
                x: isShaking ? [-8, 8, -8, 0] : 0,
              }}
              className="relative h-48 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-200 rounded-2xl border-2 border-orange-300 flex items-center justify-between p-4 overflow-hidden shadow-inner"
            >
              {/* Entry Trainer 1 */}
              <div className="flex flex-col items-center z-10">
                <span className="text-4xl">👨‍🏫</span>
                <span className="text-[10px] font-bold text-orange-950">مدرب المدخل</span>
              </div>

              {/* Tunnel Tube Body */}
              <div className="flex-1 mx-4 h-24 bg-gradient-to-r from-orange-400/80 via-amber-400/80 to-yellow-400/80 rounded-full border-4 border-dashed border-white shadow-md relative flex items-center overflow-hidden">
                {/* Child moving inside tunnel */}
                <motion.div
                  style={{ left: `${tunnelPos}%` }}
                  animate={{ x: '-50%' }}
                  className="absolute text-4xl select-none"
                >
                  👶
                </motion.div>
              </div>

              {/* Exit Trainer 2 Peekaboo */}
              <div className="flex flex-col items-center z-10 min-w-[70px]">
                <AnimatePresence mode="wait">
                  {isTrainerVisible ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col items-center">
                      <span className="text-5xl animate-bounce">👩‍🏫</span>
                      <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        ظهرت بابتسامة! 
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col items-center">
                      <span className="text-4xl filter brightness-50 opacity-40">🙈</span>
                      <span className="text-[10px] text-cream-600">اختفت الآن</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Tunnel Interactive Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <button
                onClick={handleAdvanceInTunnel}
                className="py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>التقدم داخل النفق نحو الخروج ({tunnelPos}%) </span>
              </button>
              <button
                onClick={handleShakeTunnel}
                className="py-3.5 px-4 rounded-2xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs border border-amber-400 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>هز النفق بلطف لإثارة الحماس </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
