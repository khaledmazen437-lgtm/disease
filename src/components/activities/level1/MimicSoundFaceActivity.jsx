import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Volume2, Smile, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const MimicSoundFaceActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [currentSoundIdx, setCurrentSoundIdx] = useState(0);
  const [mimicCount, setMimicCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const soundPrompts = [
    {
      id: 1,
      name: 'صوت الضحكة الصافية 😄',
      emoji: '😄',
      soundText: 'هاهاها! (ابتسامة عريضة وصوت ضحك مبهج)',
      speech: 'هاهاها! ضحكة صافية ومبهجة! قلد ضحكتي الآن! 😄',
      soundType: 'laugh',
    },
    {
      id: 2,
      name: 'صوت اندهاش التعجب 😲',
      emoji: '😲',
      soundText: 'أووه! (فتح الفم باستداره دائرية)',
      speech: 'أووه! اندهاش وتعجب! افتح فمك وقلد التعبير! 😲',
      soundType: 'gasp',
    },
    {
      id: 3,
      name: 'صوت السيارة (بيييب بيييب) 🚗',
      emoji: '🚗',
      soundText: 'بيييب بيييب! (ابتسامة المرح والريموت)',
      speech: 'بييب بييب! صوت بوق السيارة الملونة السريعة! 🚗',
      soundType: 'car-horn',
    },
    {
      id: 4,
      name: 'صوت القطة اللطيفة 🐱',
      emoji: '🐱',
      soundText: 'مييياو! (غمزة عين وابتسامة قطة)',
      speech: 'مياووو! صوت القطة اللطيفة الوديعة! 🐱',
      soundType: 'meow',
    },
  ];

  const currentPrompt = soundPrompts[currentSoundIdx];
  const targetGoal = soundPrompts.length;

  const handlePlayPromptSound = () => {
    // Play synthesized cartoon audio sound + speak Arabic speech
    playCustomSound(currentPrompt.soundType);
    speakArabic(currentPrompt.speech);
  };

  const handleMimicSound = () => {
    if (isCompleted) return;

    // Play prompt sound & speech
    handlePlayPromptSound();
    addStar(1);

    const newMimic = mimicCount + 1;
    const newScore = score + 25;
    setMimicCount(newMimic);
    setScore(newScore);

    if (newMimic >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        speakArabic('أحسنت يا بطل! تقليد أصوات وتواصل بصري رائع جداً!');
        markActivityComplete('mimic-sound-face-l1');
      }, 900);
    } else {
      setTimeout(() => {
        setCurrentSoundIdx((prev) => (prev + 1) % soundPrompts.length);
      }, 1400);
    }
  };

  const handleReset = () => {
    setScore(0);
    setCurrentSoundIdx(0);
    setMimicCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-900 border border-violet-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي الصوتي</span>
            <span>لعبة قلد أصواتي وتعبيراتي 🎤</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            الجلوس وجه لوجه واستماع وتقليد أصوات وتعبيرات المدرب
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التقليد:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-violet-100 border border-violet-300 px-3 py-2 rounded-2xl text-xs font-bold text-violet-900">
            الأصوات المقلدة: {mimicCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تقليد أصوات وتواصل بصري خارق! 🎉🎤</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أظهر الطفل تفاعلاً ممتازاً بتقليد جميع الأصوات وتعبيرات الوجه وحصل على <strong>{score} نقطة</strong>!
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
            🎤 اضغط على زر سماع الصوت أو الكارت لتسمع صوت الضحك والسيارات والحيوانات مباشرة وتطلب من الطفل تقليده!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between">
            {/* Trainer Sound Prompt Card */}
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-6 mb-4 flex flex-col items-center justify-center relative overflow-hidden">
              <button
                onClick={handlePlayPromptSound}
                className="absolute top-3 right-3 bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow hover:scale-105 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" /> <span>تشغيل الصوت </span>
              </button>

              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={handlePlayPromptSound}
                className="w-28 h-28 rounded-full bg-violet-500 border-4 border-white text-white flex items-center justify-center text-6xl shadow-xl my-2 cursor-pointer hover:scale-110 transition-transform"
              >
                {currentPrompt.emoji}
              </motion.div>

              <h4 className="text-base font-black font-cairo text-violet-950 mt-2">
                {currentPrompt.name}
              </h4>
              <p className="text-xs text-violet-800 mt-1 font-bold">
                "{currentPrompt.soundText}"
              </p>
            </div>

            {/* Mimic Action Trigger */}
            <button
              onClick={handleMimicSound}
              className="w-full py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Volume2 className="w-5 h-5 animate-pulse" />
              <span>تشغيل الصوت وتقليد هذا التعبير فوراً! </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
