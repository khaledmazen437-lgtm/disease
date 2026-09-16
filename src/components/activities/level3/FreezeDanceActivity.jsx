import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Trophy, RotateCcw, Award, Volume2, Sparkles, Play, Pause, AlertCircle } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const FreezeDanceActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [danceAction, setDanceAction] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetRounds = 4;
  const danceIntervalRef = useRef(null);

  // Dance moves animation cycle when music plays
  useEffect(() => {
    if (isPlayingMusic && !isFrozen) {
      danceIntervalRef.current = setInterval(() => {
        setDanceAction((prev) => (prev + 1) % 4);
      }, 400);
    } else {
      if (danceIntervalRef.current) clearInterval(danceIntervalRef.current);
    }
    return () => {
      if (danceIntervalRef.current) clearInterval(danceIntervalRef.current);
    };
  }, [isPlayingMusic, isFrozen]);

  // Start Music & Dancing
  const handleStartMusic = () => {
    setIsPlayingMusic(true);
    setIsFrozen(false);
    playCustomSound('drum_beat');
    speakArabic('الموسيقى تعمل! يلا نتحرك ونرقص مع الإيقاع بنشاط!');

    // Random freeze timing between 3.5 to 5.5 seconds
    const freezeDelay = 3500 + Math.random() * 1500;
    setTimeout(() => {
      triggerFreeze();
    }, freezeDelay);
  };

  // Trigger Freeze Mode
  const triggerFreeze = () => {
    setIsPlayingMusic(false);
    setIsFrozen(true);
    playCalmTone('gentle-tap');
    speakArabic('تجمّدددد! توقفت الموسيقى! تجمد مكانك كالتمثال ولا تتحرك!');
  };

  // Child confirms freeze observation
  const handleConfirmFreeze = () => {
    if (!isFrozen) return;

    playCalmTone('success');
    speakArabic('ممتاز يا بطل! وقفت وتجمدت كالتمثال الرائع في الوقت المناسب بالضبط!');
    addStar(2);

    const newScore = score + 25;
    setScore(newScore);

    if (round >= targetRounds) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'freeze-dance-l3',
          'لعبة التجمد والتماثيل الإيقاعية! 🛑💃',
          'شاطر شاطر! أحسنت في الاستماع للموسيقى والتجمد كتمثال ذكي عند التوقف!'
        );
      }, 1600);
    } else {
      setTimeout(() => {
        setRound((prev) => prev + 1);
        setIsFrozen(false);
      }, 2000);
    }
  };

  const handleReset = () => {
    setIsPlayingMusic(false);
    setIsFrozen(false);
    setRound(1);
    setScore(0);
    setIsCompleted(false);
  };

  const danceEmojis = ['🕺', '💃', '🙆‍♂️', '🤸‍♂️'];

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-900 border border-violet-300 text-xs font-bold mb-1">
            <Music className="w-3.5 h-3.5 text-violet-700" />
            <span>المستوى الثالث - النشاط 9</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            لعبة التجمد (التماثيل): موسيقى = رقص | توقف = تجمد! 🛑🎵
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
          <div className="bg-violet-100 border border-violet-300 px-3 py-2 rounded-2xl text-xs font-bold text-violet-900">
            الجولة: {round} / {targetRounds}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">انتباه سمعي وحركي خارق! 🌟🕺</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أتقنت التفاعل مع الموسيقى والتجمد الفوري بدقة وانتباه ممتاز!
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
            شغل الموسيقى ليتحرك الشخص ويرقص، وعندما تقف الموسيقى فجأة تجمد مثله واضغط زر التجمد! 👇
          </p>

          {/* Dance Floor Stage */}
          <div
            className={`border-2 rounded-3xl p-8 sm:p-12 mb-6 min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 select-none ${
              isPlayingMusic
                ? 'bg-gradient-to-b from-purple-100 via-pink-50 to-amber-100 border-purple-400 shadow-lg'
                : isFrozen
                ? 'bg-gradient-to-b from-cyan-100 via-sky-50 to-slate-100 border-cyan-400 ring-4 ring-cyan-300'
                : 'bg-white border-cream-300'
            }`}
          >
            {/* Status Banner */}
            <div className="mb-4">
              {isPlayingMusic ? (
                <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-purple-700 text-white font-black text-sm font-cairo shadow-md animate-pulse">
                  <Music className="w-4 h-4" />
                  <span>الموسيقى تعمل.. يلا ارقص وتحرك! 🎵💃</span>
                </div>
              ) : isFrozen ? (
                <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-700 text-white font-black text-base font-cairo shadow-lg animate-bounce">
                  <span>🛑 تجمّدددد كالتمثال! لا تتحرك! ❄️</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200 text-burgundy-900 font-bold text-xs">
                  <span>اضغط بدء الموسيقى للانطلاق!</span>
                </div>
              )}
            </div>

            {/* Dancer Character */}
            <div className="relative my-4">
              {isPlayingMusic ? (
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, -10, 10, 0],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-8xl sm:text-9xl drop-shadow-xl"
                >
                  {danceEmojis[danceAction]}
                </motion.div>
              ) : isFrozen ? (
                <div className="relative">
                  <div className="text-8xl sm:text-9xl filter saturate-50 contrast-125 opacity-90 drop-shadow-md">
                    🧍‍♂️
                  </div>
                  {/* Ice Crystal Overlay */}
                  <span className="absolute -top-3 -right-2 text-4xl animate-spin" style={{ animationDuration: '6s' }}>
                    ❄️
                  </span>
                  <span className="absolute bottom-0 -left-2 text-3xl">🧊</span>
                </div>
              ) : (
                <div className="text-8xl sm:text-9xl">🧍‍♂️</div>
              )}
            </div>

            {/* Frozen Confirmation Prompt */}
            {isFrozen && (
              <motion.button
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                onClick={handleConfirmFreeze}
                className="mt-4 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-black text-base font-cairo shadow-xl cursor-pointer"
              >
                ❄️ أنا تجمدت مكاني يا بطل! (اضغط هنا) ❄️
              </motion.button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <button
              onClick={() => speakArabic('عندما تعمل الموسيقى تحرك وارقص وعندما تتوقف تجمد كالتمثال')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>تعليمات صوتية 🗣️</span>
            </button>

            {!isPlayingMusic && !isFrozen && (
              <button
                onClick={handleStartMusic}
                className="px-7 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>شغّل الموسيقى وابدأ الرقص! 🎵</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
