import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Users, Smile, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const TwoTrainersActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [trainerStep, setTrainerStep] = useState(0); // 0: Trainer 1, 1: Trainer 2, 2: Both Tickle
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isTickling, setIsTickling] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 4;

  const handleApproachTrainer = () => {
    if (isCompleted) return;

    if (trainerStep === 0) {
      // Trainer 1 approaches with exaggerated movement
      playCustomSound('footsteps');
      setTrainerStep(1);
    } else if (trainerStep === 1) {
      // Trainer 2 approaches with funny movement
      playCustomSound('footsteps');
      setTrainerStep(2);
    } else {
      // Both trainers tickle child to make them laugh and swap gaze!
      playCustomSound('tickle_gasp');
      addStar(1);

      setIsTickling(true);
      const newRounds = roundsCompleted + 1;
      const newScore = score + 25;
      setRoundsCompleted(newRounds);
      setScore(newScore);

      setTimeout(() => {
        setIsTickling(false);
        setTrainerStep(0);

        if (newRounds >= targetGoal) {
          setIsCompleted(true);
          markActivityComplete('two-trainers-l1');
        }
      }, 1000);
    }
  };

  const handleReset = () => {
    setScore(0);
    setTrainerStep(0);
    setRoundsCompleted(0);
    setIsTickling(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي</span>
            <span>التواصل المشترك مع شخصين مدربين </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            حركات مبالغ فيها وزغزغة ممتعة لمرونة النظر البصري
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التفاعل:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-purple-100 border border-purple-300 px-3 py-2 rounded-2xl text-xs font-bold text-purple-900">
            الجولات: {roundsCompleted} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">مرونة تواصل بصري مذهلة! 🎉💖</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            تبادل الطفل النظرات والابتسامات مع المدربين بنجاح رائع وحصل على <strong>{score} نقطة</strong>!
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
             يتقدم المدرب الأول بحركة مبالغ فيها، ثم المدرب الثاني، ثم يقومان بزغزغة الطفل لإسعاده وتبادل النظرات!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[320px] flex flex-col justify-between overflow-hidden">
            {/* Arena View with 2 Trainers & Child */}
            <div className="relative h-56 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-around p-4 overflow-hidden shadow-inner">
              {/* Trainer 1 */}
              <motion.div
                animate={{
                  scale: trainerStep === 0 || trainerStep === 2 ? 1.25 : 1,
                  x: trainerStep === 2 ? 40 : 0,
                }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-indigo-500 border-2 border-white text-white flex items-center justify-center text-4xl shadow-md">
                  👨‍🏫
                </div>
                <span className="text-[10px] font-bold text-indigo-950 mt-1">المدرب 1 (حركة مضحكة)</span>
              </motion.div>

              {/* Child in the middle */}
              <motion.div
                animate={{
                  scale: isTickling ? [1, 1.3, 1] : 1,
                  rotate: isTickling ? [-5, 5, -5, 0] : 0,
                }}
                className="flex flex-col items-center z-10"
              >
                <div className="w-24 h-24 rounded-full bg-amber-300 border-4 border-amber-500 flex items-center justify-center text-5xl shadow-xl relative">
                  {isTickling ? '😆' : '👶'}
                  {isTickling && (
                    <span className="absolute -top-3 bg-pink-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow animate-bounce">
                      ضحك وزغزغة! 🎉
                    </span>
                  )}
                </div>
                <span className="text-xs font-black text-burgundy-950 mt-1">الطفل 💖</span>
              </motion.div>

              {/* Trainer 2 */}
              <motion.div
                animate={{
                  scale: trainerStep === 1 || trainerStep === 2 ? 1.25 : 1,
                  x: trainerStep === 2 ? -40 : 0,
                }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-pink-500 border-2 border-white text-white flex items-center justify-center text-4xl shadow-md">
                  👩‍🏫
                </div>
                <span className="text-[10px] font-bold text-pink-950 mt-1">المدرب 2 (اقتراب مرح)</span>
              </motion.div>
            </div>

            {/* Action Trigger Button */}
            <button
              onClick={handleApproachTrainer}
              className="mt-4 w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Smile className="w-5 h-5" />
              <span>
                {trainerStep === 0
                  ? 'اقتراب المدرب 1 بالحركة المبالغ فيها 🏃‍♂️'
                  : trainerStep === 1
                  ? 'اقتراب المدرب 2 والحركة المضحكة 🏃‍♀️'
                  : 'بدء الزغزغة وتبادل النظرات مع المدربين! 😆✨'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
