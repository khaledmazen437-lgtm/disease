import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Play, Heart, Rocket, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const SynchronizedCountdownActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [count, setCount] = useState(5);
  const [isCounting, setIsCounting] = useState(false);
  const [rewardMode, setRewardMode] = useState('jump'); // 'jump' | 'kiss'
  const [isCompleted, setIsCompleted] = useState(false);
  const [triggerReward, setTriggerReward] = useState(false);

  const handleNextCountdownStep = () => {
    if (count > 1) {
      const nextCount = count - 1;
      setCount(nextCount);
      playCalmTone('gentle-tap');
      speakArabic(`عد تنازلي: ${nextCount}! انظر لعيناي!`);
    } else {
      // Reached 0! Trigger Jump / Kiss reward
      setCount(0);
      setTriggerReward(true);
      addStar(2);

      if (rewardMode === 'jump') {
        playCustomSound('gasp');
        speakArabic('١.. ٠.. قفزة بطل في الجو! طرااااان! 🚀✨');
      } else {
        playCustomSound('laugh');
        speakArabic('١.. ٠.. قبلة مبهجة ودافئة لك يا بطل! 💋💖');
      }

      const newScore = score + 30;
      setScore(newScore);

      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('countdown-jump-kiss-l2');
      }, 1600);
    }
  };

  const handleReset = () => {
    setScore(0);
    setCount(5);
    setIsCounting(false);
    setTriggerReward(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300 text-xs font-bold mb-1">
            <span>النشاط الرابع</span>
            <span>العد التنازلي (القفز والقبلات) ⏱️💋</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            العد التنازلي التزامني من 5 إلى 1 المشفوع بالقفز أو القبلات
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط العد:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">عد تنازلي مبهج وتفاعل ممتاز! 🚀💖</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في متابعة العد التنازلي واستلام المكافأة المبهجة وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> <span>إعادة العد</span>
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
          {/* Mode Selector */}
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => setRewardMode('jump')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
                rewardMode === 'jump' ? 'bg-cyan-600 text-white border-cyan-700 shadow-md' : 'bg-cream-100 text-cream-800 border-cream-300'
              }`}
            >
              <Rocket className="w-4 h-4" /> <span>وضع القفز في الجو 🚀</span>
            </button>
            <button
              onClick={() => setRewardMode('kiss')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all ${
                rewardMode === 'kiss' ? 'bg-rose-500 text-white border-rose-600 shadow-md' : 'bg-cream-100 text-cream-800 border-cream-300'
              }`}
            >
              <Heart className="w-4 h-4" /> <span>وضع القبلة المبهجة 💋</span>
            </button>
          </div>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between items-center overflow-hidden">
            {/* Big Countdown Number display */}
            <div className="my-4 flex flex-col items-center">
              <motion.div
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: 1 }}
                className="w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 border-4 border-white shadow-2xl flex items-center justify-center text-6xl font-black text-white font-cairo my-2"
              >
                {count > 0 ? count : rewardMode === 'jump' ? '🚀' : '💋'}
              </motion.div>

              <h4 className="text-base font-black font-cairo text-cyan-950 mt-2">
                {count > 0 ? `العد التنازلي: ${count}` : rewardMode === 'jump' ? 'قفزة البطل طائرة في الجو! 🎉' : 'قبلة دافئة ومبهجة لك! 💖'}
              </h4>
            </div>

            {/* Step Action Button */}
            <button
              onClick={handleNextCountdownStep}
              className="w-full py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Play className="w-5 h-5" />
              <span>{count > 1 ? `عد الخطوة التالية (${count - 1}) ⏱️` : 'نفذ القفزة / القبلة الآن! 🎉'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
