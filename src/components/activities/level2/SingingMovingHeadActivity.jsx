import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Music, Volume2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const SingingMovingHeadActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [songCount, setSongCount] = useState(0);
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const songs = [
    { id: 1, title: 'أغنية العينين البراقتين 🎵', lyric: 'عيني في عينك يا شطور.. نضحك ونغني في النور! 🎶', sound: 'laugh' },
    { id: 2, title: 'أغنية الابتسامة المبهجة 🎶', lyric: 'ابتسم معايا وقول هاها.. يا سلام على العيون الحلوة دي! 😄', sound: 'laugh' },
    { id: 3, title: 'أغنية البطل الشجاع 🎤', lyric: 'يلا نرفرف بالأجنحة ونبص على بعض بثقة! 🚀', sound: 'gasp' },
    { id: 4, title: 'أغنية المحبة والتواصل 💖', lyric: 'تواصل بصري ممتاز وأغنية رائعة ومبهجة جداً! 🎉', sound: 'laugh' },
  ];

  const targetGoal = songs.length;

  const handleSingSong = (song) => {
    if (isPlayingSong) return;
    setIsPlayingSong(true);

    playCustomSound(song.sound);
    speakArabic(song.lyric);
    addStar(1);

    const newScore = score + 25;
    const newCount = songCount + 1;
    setScore(newScore);
    setSongCount(newCount);

    setTimeout(() => {
      setIsPlayingSong(false);
      if (newCount >= targetGoal) {
        setIsCompleted(true);
        markActivityComplete('singing-head-l2');
      }
    }, 2000);
  };

  const handleReset = () => {
    setScore(0);
    setSongCount(0);
    setIsPlayingSong(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold mb-1">
            <span>النشاط الثاني</span>
            <span>الرأس المتحركة المغنية 🗣️🎵</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            تتبع حركة الرأس المتراقصة والاستماع للغناء والمرح البصري
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الغناء:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-purple-100 border border-purple-300 px-3 py-2 rounded-2xl text-xs font-bold text-purple-900">
            الأغاني: {songCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تغني وتتواصل ببصمة رائعة! 🎤🎵</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أكملت جميع الأغاني مع تتبع حركة الرأس المغنية وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> <span>إعادة الغناء</span>
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
            🎵 اضغط على الرأس المغنية أو أي بطاقة أغنية لتتحرك الرأس بنغمة مبهجة وتغني معك مباشرة!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between items-center overflow-hidden">
            {/* Animated Singing Head Avatar */}
            <div className="relative my-4">
              <motion.div
                animate={isPlayingSong ? { rotate: [-15, 15, -15], y: [-12, 5, -12], scale: [1, 1.12, 1] } : { rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: isPlayingSong ? 0.6 : 2.5 }}
                onClick={() => handleSingSong(songs[songCount % songs.length])}
                className="w-44 h-44 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-400 border-4 border-white shadow-2xl flex flex-col items-center justify-center cursor-pointer relative group"
              >
                {/* Floating Musical Notes Animation */}
                <motion.div
                  animate={{ y: [-10, -35, -10], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute -top-6 text-3xl text-amber-300"
                >
                  🎵
                </motion.div>
                <motion.div
                  animate={{ y: [-5, -30, -5], x: [10, 25, 10], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
                  className="absolute -top-4 right-2 text-2xl text-pink-300"
                >
                  🎶
                </motion.div>

                <span className="text-7xl select-none mb-1">🗣️</span>
                <span className="text-[11px] font-black text-white bg-black/30 px-3 py-0.5 rounded-full backdrop-blur-xs">
                  {isPlayingSong ? 'تغني الآن! 🎵' : 'اضغط للغناء! 🎤'}
                </span>
              </motion.div>
            </div>

            {/* Song Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-2">
              {songs.map((song, idx) => (
                <button
                  key={song.id}
                  onClick={() => handleSingSong(song)}
                  className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                    idx === songCount
                      ? 'bg-purple-900 text-white border-purple-950 shadow-md ring-2 ring-purple-400'
                      : 'bg-purple-50 hover:bg-purple-100 text-purple-950 border-purple-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5 text-purple-400" />
                    <div>
                      <span className="text-xs font-black font-cairo block">{song.title}</span>
                      <span className="text-[10px] text-purple-200 opacity-90 block">{song.lyric}</span>
                    </div>
                  </div>
                  <Volume2 className="w-4 h-4 text-purple-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
