import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, RefreshCw, CircleDot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const TurnTakingBallActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [turn, setTurn] = useState('character'); // 'character' or 'child'
  const [ballPosition, setBallPosition] = useState('character'); // 'character' or 'child'
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 5;

  const handleTrainerPassBall = () => {
    setBallPosition('child');
    playCustomSound('car_horn');
    speakArabic('تمريرة رائعة! الكرة الآن في دورك أنت يا بطل! انظر إليّ ومررها لي!');
    setTurn('child');
  };

  const handleChildPassBall = () => {
    if (turn !== 'child') return;

    setBallPosition('character');
    playCalmTone('success');
    playCustomSound('pop');
    speakArabic('استلمت الكرة منك! يا له من تبادل رائع للأدوار ونظر دافئ!');
    addStar(1);

    const newScore = score + 20;
    setScore(newScore);

    if (round >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('turn-taking-l2');
      }, 1800);
    } else {
      setTimeout(() => {
        setRound((prev) => prev + 1);
        setTurn('character');
        handleTrainerPassBall();
      }, 2200);
    }
  };

  const handleReset = () => {
    setScore(0);
    setRound(1);
    setTurn('character');
    setBallPosition('character');
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold mb-1">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
            <span>تبادل الأدوار وتمرير الكرة</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            مشاركة الانتباه والتناوب التفاعلي بين الطفل والمدرب
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التناول:</span>
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
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تبادل أدوار واجتماع بصر رائع!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أتقنت مهارة تبادل الكرة والتواصل البصري والتناوب وحصلت على <strong>{score} نقطة</strong>!
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
            الكرة تتحرك بينك وبين المدرب. عندما تصلك الكرة، اضغط عليها لإعادتها للمدرب بعينين مبتسمتين!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-8 text-center shadow-soft relative min-h-[380px] flex flex-col justify-between items-center overflow-hidden">
            {/* Top Character */}
            <div className="relative w-40 h-40 bg-gradient-to-b from-rose-100 to-amber-50 rounded-full border-4 border-rose-300 shadow-md flex items-center justify-center">
              <div className="flex items-center gap-4 z-10">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-burgundy-900 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-burgundy-950"></div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border-2 border-burgundy-900 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-burgundy-950"></div>
                </div>
              </div>
              <div className="absolute bottom-4 w-12 h-5 bg-burgundy-900 rounded-b-full"></div>
            </div>

            {/* Middle Ball Passing Track */}
            <div className="w-full h-32 relative flex items-center justify-center">
              <div className="w-1 h-full bg-cream-200 border-r border-dashed border-burgundy-300"></div>

              {/* Animated Rolling Ball Container */}
              <motion.div
                animate={ballPosition === 'child' ? { y: 40, rotate: 360 } : { y: -40, rotate: -360 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                onClick={handleChildPassBall}
                className={`absolute select-none cursor-pointer drop-shadow-xl hover:scale-125 z-20 p-3 bg-amber-500 text-white rounded-full ${
                  turn === 'child' ? 'animate-bounce ring-4 ring-emerald-400' : ''
                }`}
              >
                <CircleDot className="w-8 h-8" />
              </motion.div>
            </div>

            {/* Bottom Child Zone */}
            <div className="w-full flex flex-col items-center">
              {turn === 'character' ? (
                <button
                  onClick={handleTrainerPassBall}
                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md cursor-pointer transition-all"
                >
                  اضغط ليمرر المدرب الكرة لك!
                </button>
              ) : (
                <button
                  onClick={handleChildPassBall}
                  className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg cursor-pointer animate-pulse transition-all"
                >
                  دورك! اضغط لتمرير الكرة للمدرب والنظر لعينيه!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
