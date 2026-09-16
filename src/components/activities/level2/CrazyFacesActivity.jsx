import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Smile, Sparkles, RefreshCw, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const CrazyFacesActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [activeFaceIdx, setActiveFaceIdx] = useState(0);
  const [mimicCount, setMimicCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const crazyFaces = [
    {
      id: 1,
      type: 'tongue',
      name: 'إخراج اللسان التفاعلي',
      desc: 'كسر الجمود البصري وحركة اللسان المريحة',
      sound: 'bakh',
      speech: 'أخرج لسانك واعمل حركة مضحكة معي لكسر الجمود البصري!',
    },
    {
      id: 2,
      type: 'wink',
      name: 'غمزة العين التفاعلية',
      desc: 'تحفيز عضلات الوجه وتركيز الانتباه البصري',
      sound: 'gasp',
      speech: 'غمزة عين ونظرة مضحكة لتركيز الانتباه!',
    },
    {
      id: 3,
      type: 'puffed',
      name: 'نفخ الخدود بالهواء',
      desc: 'مرونة ملامح الوجه والتفاعل التنفسي',
      sound: 'pop',
      speech: 'انفخ خدودك بالهواء وراقب نظرة العينين!',
    },
    {
      id: 4,
      type: 'smile',
      name: 'الابتسامة العريضة المبهجة',
      desc: 'التواصل الاجتماعي المباشر والابتسامة المتبادلة',
      sound: 'laugh',
      speech: 'ابتسامة عريضة ومشرقة تنير التواصل البصري!',
    },
  ];

  const targetGoal = crazyFaces.length;

  const handleSelectFace = (idx) => {
    setActiveFaceIdx(idx);
    const face = crazyFaces[idx];

    playCustomSound(face.sound);
    speakArabic(face.speech);
    addStar(1);

    const newCount = mimicCount + 1;
    const newScore = score + 25;
    setMimicCount(newCount);
    setScore(newScore);

    if (newCount >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('crazy-faces-l2');
      }, 1400);
    }
  };

  const handleReset = () => {
    setScore(0);
    setActiveFaceIdx(0);
    setMimicCount(0);
    setIsCompleted(false);
  };

  const currentFace = crazyFaces[activeFaceIdx];

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-900 border border-pink-300 text-xs font-bold mb-1">
            <Smile className="w-3.5 h-3.5 text-pink-700" />
            <span>الوشوش المجنونة والتعبيرات المضحكة</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            تقليد التعبيرات المضحكة وإخراج اللسان لكسر الجمود البصري
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التعبيرات:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-pink-100 border border-pink-300 px-3 py-2 rounded-2xl text-xs font-bold text-pink-900">
            التعبيرات: {mimicCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">كسر الجمود البصري بنجاح!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في استكشاف وتقليد كافة التعبيرات وإخراج اللسان وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> <span>إعادة التعبيرات</span>
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
            اختر التعبير المضحك من القائمة أدناه واضغط لكسر الجمود البصري وملاحظة حركة العين واللسان والخدين!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[360px] flex flex-col justify-between items-center overflow-hidden">
            {/* Dynamic Vector Face Display */}
            <div className="my-4 flex flex-col items-center">
              <div
                onClick={() => handleSelectFace(activeFaceIdx)}
                className={`relative w-48 h-48 rounded-full bg-gradient-to-b from-rose-100 via-amber-50 to-cream-100 border-4 border-rose-300 shadow-xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                  currentFace.type === 'puffed' ? 'scale-110' : ''
                }`}
              >
                {/* Eyes */}
                <div className="flex items-center gap-6 z-10 mb-2">
                  {/* Left Eye */}
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-burgundy-950 flex items-center justify-center shadow-md">
                    <div className="w-7 h-7 rounded-full bg-burgundy-950 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white absolute top-1.5 right-1.5"></div>
                    </div>
                  </div>

                  {/* Right Eye (Winks if type === 'wink') */}
                  {currentFace.type === 'wink' ? (
                    <motion.div
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="w-14 h-14 rounded-full bg-amber-200 border-4 border-burgundy-950 flex items-center justify-center shadow-md text-xs font-bold text-burgundy-950"
                    >
                      غمزة
                    </motion.div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-white border-4 border-burgundy-950 flex items-center justify-center shadow-md">
                      <div className="w-7 h-7 rounded-full bg-burgundy-950 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-white absolute top-1.5 right-1.5"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mouth & Tongue */}
                <div className="relative flex flex-col items-center z-10">
                  <div className="w-20 h-9 bg-burgundy-900 rounded-b-full border-2 border-burgundy-950 flex justify-center items-end pb-1 overflow-hidden">
                    <div className="w-10 h-4 bg-rose-400 rounded-t-full"></div>
                  </div>

                  {/* Sticking Out Tongue Animation */}
                  {currentFace.type === 'tongue' && (
                    <motion.div
                      initial={{ y: -10, scale: 0 }}
                      animate={{ y: 0, scale: 1, rotate: [0, -5, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-10 h-12 bg-rose-500 rounded-b-2xl border-2 border-burgundy-950 shadow-lg -mt-2 z-20 flex justify-center items-center"
                    >
                      <div className="w-0.5 h-6 bg-rose-700"></div>
                    </motion.div>
                  )}
                </div>
              </div>

              <h4 className="text-base font-black font-cairo text-pink-950 mt-3">
                {currentFace.name}
              </h4>
              <span className="text-xs text-cream-700 font-medium">{currentFace.desc}</span>
            </div>

            {/* Crazy Faces Grid Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-2">
              {crazyFaces.map((face, idx) => (
                <button
                  key={face.id}
                  onClick={() => handleSelectFace(idx)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    activeFaceIdx === idx
                      ? 'bg-pink-700 text-white border-pink-900 shadow-md ring-2 ring-pink-400 scale-102 font-black'
                      : 'bg-pink-50 hover:bg-pink-100 text-pink-950 border-pink-200 font-bold'
                  }`}
                >
                  <span className="text-xs font-cairo leading-tight">{face.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
