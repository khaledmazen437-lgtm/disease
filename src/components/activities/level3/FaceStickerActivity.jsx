import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Trophy, RotateCcw, Award, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const FaceStickerActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [placedStickers, setPlacedStickers] = useState([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const availableStickers = [
    { id: 'mustache', name: 'شارب مضحك 🥸', icon: '🥸', pos: 'top-[130px] left-[70px]', voice: 'هههه! يا له من شارب مضحك وجميل!' },
    { id: 'glasses', name: 'نظارة نجوم 🕶️', icon: '🕶️', pos: 'top-[75px] left-[65px]', voice: 'واو! نظارة أنيقة جداً تناسب عيناي!' },
    { id: 'crown', name: 'تاج الملك 👑', icon: '👑', pos: '-top-[28px] left-[75px]', voice: 'أنا ملك الأبطال الآن بفضلك! تاج رائع!' },
    { id: 'star_cheek', name: 'نجمة الخد ⭐', icon: '⭐', pos: 'top-[110px] right-[30px]', voice: 'نجمة متلألئة على خدي تنير ابتسامتي!' },
    { id: 'flower', name: 'وردة لطيفة 🌸', icon: '🌸', pos: 'top-[20px] left-[25px]', voice: 'وردة زكية تفوح عطراً وتفرح قلبي!' },
    { id: 'party_hat', name: 'قبعة الحفلة 🥳', icon: '🥳', pos: '-top-[25px] right-[40px]', voice: 'حفلة سعيدة مع أروع بطل في العالم!' },
  ];

  const handlePlaceSticker = (sticker) => {
    if (placedStickers.some((s) => s.id === sticker.id)) return;

    playCalmTone('success');
    playCustomSound('laugh');
    speakArabic(sticker.voice);
    addStar(2);

    const updated = [...placedStickers, sticker];
    setPlacedStickers(updated);
    setScore((prev) => prev + 25);

    if (updated.length >= 4) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'face-stickers-l3',
          'تزيين الوجه بالاستيكرات المضحكة! 🥸👑',
          'شاطر شاطر! أحسنت يا فنان في تزيين الوجه بالاستيكرات ومشاركة الضحك والمرح!'
        );
      }, 2000);
    }
  };

  const handleReset = () => {
    setPlacedStickers([]);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold mb-1">
            <Smile className="w-3.5 h-3.5 text-rose-700" />
            <span>المستوى الثالث - النشاط 13</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            لعبة الاستيكرات: ضع الاستيكر على وجه الشخص 🥸👑
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
          <div className="bg-rose-100 border border-rose-300 px-3 py-2 rounded-2xl text-xs font-bold text-rose-900">
            الاستيكرات الموضوعة: {placedStickers.length} / 4
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">أجمل وجه مضحك ومحبوب! 🥸✨</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أتقنت وضع الاستيكرات على الوجه وصنعت شخصية مبهجة ملأت المكان بالضحك والسرور!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2 cursor-pointer">
              <RotateCcw className="w-4 h-4" /> <span>إعادة النشاط</span>
            </button>
            {onFinish && (
              <button onClick={onFinish} className="px-6 py-3 rounded-2xl bg-burgundy-900 text-cream-50 font-bold text-sm shadow-md cursor-pointer">
                إنهاء المستوى الثالث 🏆
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          <p className="text-xs sm:text-sm text-cream-700 mb-6 text-center font-medium">
            اختر الاستيكرات المرحة من الأسفل واضغط عليها لتلتصق على وجه الصديق ويضحك معك! 👇
          </p>

          {/* Interactive Person Face with Placed Stickers */}
          <div className="bg-white border-2 border-dashed border-rose-200 rounded-3xl p-8 mb-6 flex flex-col items-center justify-center relative min-h-[320px] shadow-inner select-none">
            {/* Face Container */}
            <div className="relative w-52 h-64 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-300 shadow-xl flex flex-col items-center justify-center">
              {/* Hair */}
              <div className="absolute -top-3 w-44 h-16 bg-amber-950 rounded-t-full" />

              {/* Eyes */}
              <div className="flex justify-between w-36 px-4 mb-4 z-0">
                <div className="w-10 h-10 bg-white rounded-full border-2 border-amber-800 flex items-center justify-center">
                  <div className="w-4 h-4 bg-amber-950 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                  </div>
                </div>
                <div className="w-10 h-10 bg-white rounded-full border-2 border-amber-800 flex items-center justify-center">
                  <div className="w-4 h-4 bg-amber-950 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full -mt-1 -mr-1" />
                  </div>
                </div>
              </div>

              {/* Nose */}
              <div className="w-4 h-6 bg-amber-300 rounded-full mb-3" />

              {/* Mouth */}
              <div className="w-14 h-7 border-b-4 border-rose-600 rounded-b-full bg-rose-200/50" />

              {/* Placed Stickers Overlaid Dynamically */}
              <AnimatePresence>
                {placedStickers.map((stk) => (
                  <motion.div
                    key={stk.id}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    exit={{ scale: 0 }}
                    className={`absolute ${stk.pos} text-5xl z-20 drop-shadow-md select-none pointer-events-none`}
                  >
                    {stk.icon}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Stickers Tray */}
          <div className="bg-rose-50/70 border-2 border-rose-200 rounded-3xl p-5 mb-6 shadow-inner">
            <h4 className="text-xs font-black font-cairo text-rose-950 mb-3">
              علبة الاستيكرات المضحكة (اضغط على أي استيكر لوضعه على الوجه):
            </h4>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {availableStickers.map((stk) => {
                const isPlaced = placedStickers.some((s) => s.id === stk.id);

                return (
                  <motion.button
                    key={stk.id}
                    whileHover={{ scale: isPlaced ? 1 : 1.08 }}
                    whileTap={{ scale: isPlaced ? 1 : 0.92 }}
                    onClick={() => handlePlaceSticker(stk)}
                    disabled={isPlaced}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all select-none cursor-pointer ${
                      isPlaced
                        ? 'bg-cream-200 border-cream-300 opacity-40 cursor-not-allowed'
                        : 'bg-white border-rose-300 hover:border-rose-500 hover:shadow-md'
                    }`}
                  >
                    <span className="text-3xl drop-shadow-xs">{stk.icon}</span>
                    <span className="text-[10px] font-bold font-cairo text-burgundy-950 text-center truncate w-full">
                      {isPlaced ? 'تم وضعه ✅' : stk.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Sound Helper */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => speakArabic('اختر استيكرات مضحكة وضعها على وجهي لنضحك ونلعب معاً')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>تعليمات صوتية 🗣️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
