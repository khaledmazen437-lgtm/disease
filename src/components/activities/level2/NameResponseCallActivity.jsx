import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Eye, Volume2, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const NameResponseCallActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isLooking, setIsLooking] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 5;

  const phrases = [
    'أهلاً يا بطل! أنا هنا وأسمعك! انظر لعيناي!',
    'ممتاز! عندما تناديني ألتفت فوراً وأبتسم لك!',
    'يا لك من رائع! عيناي تنظران إليك بكل حب!',
    'أنا أسمعك بوضوح! التواصل البصري يجمعنا!',
    'أحسنت يا بطل! استجابة رائعة ونظر مباشر!',
  ];

  const handleCallName = () => {
    if (isLooking) return;

    // 1. Speak the call phrase first: "يا صديقي! انظر إليّ!"
    speakArabic('يا صديقي! انظر إليّ!');

    // 2. Trainer turns around with warm eye contact & responds
    setTimeout(() => {
      setIsLooking(true);
      playCustomSound('gasp');

      const phraseIndex = (round - 1) % phrases.length;
      speakArabic(phrases[phraseIndex]);
      addStar(1);

      const newScore = score + 20;
      setScore(newScore);

      if (round >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('name-response-l2');
        }, 2200);
      } else {
        setTimeout(() => {
          setRound((prev) => prev + 1);
          setIsLooking(false);
        }, 2800);
      }
    }, 1200);
  };

  const handleReset = () => {
    setScore(0);
    setRound(1);
    setIsLooking(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold mb-1">
            <UserCheck className="w-3.5 h-3.5 text-rose-700" />
            <span>الاستجابة للمناداة والتواصل البصري</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            التفات المدرب فور المناداة والنظر المباشر في العينين
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط المناداة:</span>
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
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">استجابة ممتازة للمناداة!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أتقنت مهارة الالتفات والنظر المباشر فور المناداة وحصلت على <strong>{score} نقطة</strong>!
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
            المدرب يلتفت بعيداً. اضغط على زر المناداة لنطق عبارة "يا صديقي! انظر إليّ!" لتسمع صوته وهو يلتفت وينظر بعينيك مباشرة!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-8 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between items-center overflow-hidden">
            {/* Character Stage */}
            <div className="relative w-64 h-64 bg-gradient-to-b from-rose-100 via-amber-50 to-cream-100 rounded-full border-4 border-rose-300 shadow-inner flex items-center justify-center my-4 overflow-hidden">
              <motion.div
                animate={isLooking ? { rotateY: 0, scale: 1.05 } : { rotateY: 140, scale: 0.95 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="w-full h-full flex flex-col items-center justify-center relative"
              >
                {/* Eyes */}
                <div className="flex items-center gap-6 z-10 mb-2">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-burgundy-900 flex items-center justify-center shadow-lg relative">
                    <motion.div
                      animate={isLooking ? { scale: [1, 1.2, 1] } : { scale: 0.8 }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="w-8 h-8 rounded-full bg-burgundy-950 flex items-center justify-center"
                    >
                      <div className="w-3 h-3 rounded-full bg-white absolute top-2 right-2"></div>
                    </motion.div>
                  </div>

                  <div className="w-16 h-16 rounded-full bg-white border-4 border-burgundy-900 flex items-center justify-center shadow-lg relative">
                    <motion.div
                      animate={isLooking ? { scale: [1, 1.2, 1] } : { scale: 0.8 }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="w-8 h-8 rounded-full bg-burgundy-950 flex items-center justify-center"
                    >
                      <div className="w-3 h-3 rounded-full bg-white absolute top-2 right-2"></div>
                    </motion.div>
                  </div>
                </div>

                {/* Mouth */}
                <div className={`w-20 h-10 bg-burgundy-900 rounded-b-full border-2 border-burgundy-950 flex justify-center items-end pb-1 overflow-hidden z-10 transition-all ${isLooking ? 'h-10' : 'h-3 border-t-2 rounded-full'}`}>
                  {isLooking && <div className="w-10 h-4 bg-rose-400 rounded-t-full"></div>}
                </div>
              </motion.div>

              {!isLooking && (
                <div className="absolute top-4 bg-amber-200 text-amber-900 border border-amber-400 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                  المدرب غير ملتفت.. نادي عليه!
                </div>
              )}
            </div>

            {/* Action Call Button */}
            <button
              onClick={handleCallName}
              disabled={isLooking}
              className={`w-full py-4 rounded-2xl text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 ${
                isLooking
                  ? 'bg-emerald-600 opacity-90 cursor-default'
                  : 'bg-rose-700 hover:bg-rose-800 cursor-pointer animate-pulse'
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span>{isLooking ? 'ممتاز! المدرب ينظر إليك بعينيه الآن!' : 'اضغط للمناداة: "يا صديقي! انظر إليّ!"'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
