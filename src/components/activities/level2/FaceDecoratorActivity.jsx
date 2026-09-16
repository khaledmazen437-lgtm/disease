import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Glasses, Crown, Sparkles, Star, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const FaceDecoratorActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [equippedItem, setEquippedItem] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetGoal = 5;

  const accessories = [
    { id: 'cool_glasses', icon: Glasses, name: 'نظارات أنيقة', speech: 'أوه! نظارات سوداء أنيقة! انظر كيف تزين عيناي!' },
    { id: 'crown', icon: Crown, name: 'تاج الملك الذهبي', speech: 'وااو! صرت ملكاً بسبب ذوقك الجميل!' },
    { id: 'sparkles', icon: Sparkles, name: 'لمسات مضيئة', speech: 'يا سلام! لمسات براقة وجميلة جداً!' },
    { id: 'star', icon: Star, name: 'نجمة الموهبة', speech: 'ممتاز! النجمة تزين الوجه بشكل رائع!' },
    { id: 'smile', icon: Smile, name: 'ابتسامة مشرقة', speech: 'ممتاز! الابتسامة تجعل عيناي واضحتين جداً!' },
  ];

  const handleApplyAccessory = (acc) => {
    setEquippedItem(acc);
    playCalmTone('success');
    playCustomSound('applause');
    speakArabic(acc.speech);
    addStar(1);

    const newScore = score + 20;
    setScore(newScore);

    if (round >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('face-decorator-l2');
      }, 1600);
    } else {
      setTimeout(() => {
        setRound((prev) => prev + 1);
      }, 1800);
    }
  };

  const handleReset = () => {
    setScore(0);
    setRound(1);
    setEquippedItem(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold mb-1">
            <Glasses className="w-3.5 h-3.5 text-purple-700" />
            <span>تزيين الوجه وملاحظة التعبيرات</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            تركيز الانتباه على ملامح وجه الإنسان وتعبيراته المرحة
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التزيين:</span>
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
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تفاعل وتزيين وجه مبدع!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            زينت وجه المدرب بأجمل الإكسسوارات وحصلت على <strong>{score} نقطة</strong>!
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
            اختر إكسسواراً مرحاً لترديه لشخصيتك المبتسمة وتكتشف تفاعل عينيه وملامحه!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft min-h-[360px] flex flex-col justify-between items-center">
            {/* Character Stage with Equipped Accessory */}
            <div className="relative w-64 h-64 bg-gradient-to-b from-purple-100 via-rose-50 to-amber-50 rounded-full border-4 border-purple-300 shadow-inner flex flex-col items-center justify-center my-2 overflow-hidden">
              {/* Equipped Item above or over eyes */}
              {equippedItem && (
                <motion.div
                  initial={{ y: -30, scale: 0 }}
                  animate={{ y: 0, scale: 1 }}
                  className="absolute top-4 text-purple-900 z-20"
                >
                  {React.createElement(equippedItem.icon, { className: 'w-12 h-12' })}
                </motion.div>
              )}

              {/* Eyes Zone */}
              <div className="flex items-center gap-6 z-10 mb-2 relative">
                <div className="w-14 h-14 rounded-full bg-white border-4 border-burgundy-950 flex items-center justify-center shadow-md">
                  <div className="w-7 h-7 rounded-full bg-burgundy-950"></div>
                </div>
                <div className="w-14 h-14 rounded-full bg-white border-4 border-burgundy-950 flex items-center justify-center shadow-md">
                  <div className="w-7 h-7 rounded-full bg-burgundy-950"></div>
                </div>
              </div>

              {/* Mouth */}
              <div className="w-16 h-8 bg-burgundy-900 rounded-b-full border-2 border-burgundy-950 flex justify-center items-end pb-1 overflow-hidden z-10">
                <div className="w-8 h-3 bg-rose-400 rounded-t-full"></div>
              </div>
            </div>

            {/* Accessory Selector Grid */}
            <div className="w-full">
              <span className="text-xs font-bold text-cream-800 block mb-2">اختر إكسسوار تزيين الوجه:</span>
              <div className="grid grid-cols-5 gap-2">
                {accessories.map((acc) => {
                  const AccIcon = acc.icon;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => handleApplyAccessory(acc)}
                      className="p-3 rounded-2xl border bg-cream-100 hover:bg-purple-100 text-cream-900 border-cream-300 hover:border-purple-400 transition-all flex flex-col items-center justify-center cursor-pointer hover:scale-105"
                    >
                      <AccIcon className="w-6 h-6 mb-1 text-purple-700" />
                      <span className="text-[10px] font-bold font-cairo leading-tight">{acc.name.split(' ')[0]}</span>
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
