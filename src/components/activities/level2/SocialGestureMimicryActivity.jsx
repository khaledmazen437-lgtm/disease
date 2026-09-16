import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Hand, Heart, ThumbsUp, Smile, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const SocialGestureMimicryActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [currentGestureIndex, setCurrentGestureIndex] = useState(0);
  const [isMimicked, setIsMimicked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 5;

  const gestures = [
    { id: 'wave', icon: Hand, name: 'التلويح باليد', prompt: 'انظر إليّ وأنا ألوّح! لوّح بيدك مثلي!', audio: 'applause' },
    { id: 'thumbs_up', icon: ThumbsUp, name: 'إشارة الإعجاب الممتازة', prompt: 'اعمل إشارة ممتاز بيدك معي يا بطل!', audio: 'applause' },
    { id: 'heart', icon: Heart, name: 'إرسال مودة وحب', prompt: 'أرسل لي محبة جميلة!', audio: 'gasp' },
    { id: 'smile', icon: Smile, name: 'الابتسامة المباشرة', prompt: 'ابتسم واكتشف عيناي!', audio: 'laugh' },
    { id: 'hands_up', icon: Sparkles, name: 'رفع اليدين للأعلى', prompt: 'ارفع يديك للقمة واحتفل معي!', audio: 'applause' },
  ];

  const currentGesture = gestures[currentGestureIndex];
  const CurrentIcon = currentGesture.icon;

  const handleMimicGesture = (selectedGesture) => {
    if (isMimicked) return;

    if (selectedGesture.id === currentGesture.id) {
      setIsMimicked(true);
      playCalmTone('success');
      playCustomSound(currentGesture.audio);
      speakArabic(`أحسنت تقليد ${currentGesture.name}! يا لك من بطل متفاعل!`);
      addStar(1);

      const newScore = score + 20;
      setScore(newScore);

      if (round >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('social-mimicry-l2');
        }, 1600);
      } else {
        setTimeout(() => {
          setRound((prev) => prev + 1);
          setCurrentGestureIndex((prev) => (prev + 1) % gestures.length);
          setIsMimicked(false);
        }, 2000);
      }
    } else {
      playCalmTone('gentle-tap');
      speakArabic(`انظر للمدرب وانسخ حركته: ${currentGesture.name}`);
    }
  };

  const handleReset = () => {
    setScore(0);
    setRound(1);
    setCurrentGestureIndex(0);
    setIsMimicked(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 text-xs font-bold mb-1">
            <Hand className="w-3.5 h-3.5 text-indigo-700" />
            <span>تقليد حركات وإيماءات اليد</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            متابعة إيماءات الجسد وتقليدها مع التواصل البصري
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
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تقليد حركي واجتماعي مذهل!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في تقليد كافة الإيماءات والحركات بنجاح وحصلت على <strong>{score} نقطة</strong>!
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
            المدرب ينظر إليك ويفعل حركة معينة. اختر الحركة المماثلة لتقليدها والتواصل معه!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft min-h-[360px] flex flex-col justify-between items-center">
            {/* Main Stage */}
            <div className="relative w-64 h-64 bg-gradient-to-b from-indigo-50 via-rose-50 to-amber-50 rounded-full border-4 border-indigo-300 shadow-inner flex flex-col items-center justify-center my-2 overflow-hidden">
              {/* Eyes */}
              <div className="flex items-center gap-6 z-10 mb-2">
                <div className="w-14 h-14 rounded-full bg-white border-4 border-burgundy-900 flex items-center justify-center shadow-md relative">
                  <div className="w-7 h-7 rounded-full bg-burgundy-950 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white absolute top-1.5 right-1.5"></div>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-white border-4 border-burgundy-900 flex items-center justify-center shadow-md relative">
                  <div className="w-7 h-7 rounded-full bg-burgundy-950 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white absolute top-1.5 right-1.5"></div>
                  </div>
                </div>
              </div>

              {/* Animated Gesture Icon Showcase */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="my-2 p-3 bg-indigo-100 text-indigo-900 rounded-2xl border border-indigo-300 shadow-md"
              >
                <CurrentIcon className="w-12 h-12" />
              </motion.div>

              <div className="bg-indigo-900 text-cream-50 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {currentGesture.name}
              </div>
            </div>

            {/* Gesture Choices to Mimic */}
            <div className="w-full">
              <span className="text-xs font-bold text-cream-800 block mb-2">اختر الحركة لمقلد المدرب:</span>
              <div className="grid grid-cols-5 gap-2">
                {gestures.map((g) => {
                  const GIcon = g.icon;
                  return (
                    <button
                      key={g.id}
                      onClick={() => handleMimicGesture(g)}
                      disabled={isMimicked}
                      className={`p-3 rounded-2xl border transition-all flex flex-col items-center justify-center cursor-pointer ${
                        g.id === currentGesture.id && isMimicked
                          ? 'bg-emerald-600 text-white border-emerald-700 scale-105 shadow-md ring-2 ring-emerald-400'
                          : 'bg-cream-100 hover:bg-indigo-100 text-cream-900 border-cream-300 hover:border-indigo-400'
                      }`}
                    >
                      <GIcon className="w-6 h-6 mb-1 text-indigo-700" />
                      <span className="text-[10px] font-bold font-cairo leading-tight">{g.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
