import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Music, Volume2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const MusicianTrainerActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeNoteText, setActiveNoteText] = useState('');

  const instruments = [
    { id: 1, name: 'الطبول المبهجة 🥁', icon: '🥁', soundType: 'drum_beat', gazeText: 'الموسيقار ينظر بشغف نحو الطبول! 🥁', speech: 'طبول! دوم دوم تاك!' },
    { id: 2, name: 'الزيلوفون الملون 🎼', icon: '🎼', soundType: 'applause', gazeText: 'الموسيقار يلتفت بعينيه نحو الزيلوفون! 🎼', speech: 'زيلوفون! نغمات ملونة ساحرة!' },
    { id: 3, name: 'الدف والتامبورين 🪘', icon: '🪘', soundType: 'pop', gazeText: 'الموسيقار يشير بنظرة عينيه نحو الدف! 🪘', speech: 'دف وتامبورين! إيقاع ممتع!' },
    { id: 4, name: 'المثلث الموسيقي 🔔', icon: '🔔', soundType: 'gasp', gazeText: 'الموسيقار ينظر بنظرة مستقيمة نحو المثلث! 🔔', speech: 'مثلث رنان! رنين صافي جمييل!' },
  ];

  const targetGoal = 6;
  const currentTargetIdx = round % instruments.length;
  const currentTarget = instruments[currentTargetIdx];

  const handleSelectInstrument = (inst) => {
    if (isCompleted) return;

    if (inst.id === currentTarget.id) {
      // Correct match!
      playCustomSound(inst.soundType);
      speakArabic(`أحسنت! ${inst.speech}`);
      addStar(1);
      setActiveNoteText(`🎶 عُزفت ${inst.name} بنجاح!`);

      const newScore = score + 20;
      const newRound = round + 1;
      setScore(newScore);
      setRound(newRound);

      if (newRound >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('musician-trainer-l2');
        }, 1200);
      } else {
        setTimeout(() => setActiveNoteText(''), 1500);
      }
    } else {
      // Gentle guidance fallback
      playCalmTone('gentle-tap');
      speakArabic(`انظر لعين الموسيقار، هو ينظر نحو ${currentTarget.name}!`);
    }
  };

  const handleReset = () => {
    setScore(0);
    setRound(0);
    setActiveNoteText('');
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
            <span>النشاط الثالث</span>
            <span>الموسيقار وتوجيه الأدوات 🥁🎼</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            ملاحظة اتجاه نظرة الموسيقار وإعطائه الأداة الموسيقية المناسبة
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الموسيقى:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-amber-100 border border-amber-300 px-3 py-2 rounded-2xl text-xs font-bold text-amber-900">
            العزفات: {round} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">موسيقار بارع وتواصل ممتاز! 🎼🥁</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في تتبع نظرة عين الموسيقار وتوجيه الأدوات وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> <span>إعادة الموسيقى</span>
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
            🎼 انتبه لعين الموسيقار والتلميح اللفظي، واضغط على الأداة التي يريد العزف عليها!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between items-center overflow-hidden">
            {/* Musician Stage */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 w-full flex flex-col items-center justify-center relative">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-32 h-32 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 border-4 border-white shadow-xl flex items-center justify-center text-6xl relative my-2"
              >
                👨‍🎤
              </motion.div>

              <h4 className="text-base font-black font-cairo text-amber-950 mt-1">
                {currentTarget.gazeText}
              </h4>

              {activeNoteText && (
                <div className="mt-2 bg-emerald-100 text-emerald-900 font-black text-xs px-3 py-1 rounded-full animate-bounce border border-emerald-300">
                  {activeNoteText}
                </div>
              )}
            </div>

            {/* Instrument Selection Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-4">
              {instruments.map((inst) => {
                const isTarget = inst.id === currentTarget.id;
                return (
                  <button
                    key={inst.id}
                    onClick={() => handleSelectInstrument(inst)}
                    className={`p-4 rounded-3xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer transform hover:scale-105 active:scale-95 ${
                      isTarget
                        ? 'bg-amber-400 text-amber-950 border-amber-600 shadow-md ring-2 ring-amber-500 animate-pulse'
                        : 'bg-cream-100 hover:bg-cream-200 text-burgundy-950 border-cream-300'
                    }`}
                  >
                    <span className="text-4xl">{inst.icon}</span>
                    <span className="text-xs font-bold font-cairo">{inst.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
