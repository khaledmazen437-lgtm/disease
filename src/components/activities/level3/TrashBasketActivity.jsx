import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Trophy, RotateCcw, Award, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const TrashBasketActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [trashes, setTrashes] = useState([
    { id: 1, name: 'ورقة قديمة 📄', icon: '📄', inBin: false, owner: 'طفل' },
    { id: 2, name: 'علبة عصير فارغة 🧃', icon: '🧃', inBin: false, owner: 'سارة' },
    { id: 3, name: 'غلاف بسكويت 🍫', icon: '🍫', inBin: false, owner: 'طفل' },
    { id: 4, name: 'كوب ورقي 🥤', icon: '🥤', inBin: false, owner: 'سارة' },
    { id: 5, name: 'قشرة تفاحة 🍏', icon: '🍏', inBin: false, owner: 'طفل' },
    { id: 6, name: 'منديل ورقي 🧻', icon: '🧻', inBin: false, owner: 'سارة' },
  ]);

  const [currentTurn, setCurrentTurn] = useState('child'); // 'child' | 'partner'
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Child clicks an available trash item belonging to their turn
  const handleChildThrow = (item) => {
    if (currentTurn !== 'child' || item.inBin) return;

    playCalmTone('success');
    playCustomSound('pop');
    speakArabic(`رميتَ ${item.name} في السلة! نظافة ممتازة! والآن دور الصديقة سارة!`);
    addStar(2);

    const updated = trashes.map((t) => (t.id === item.id ? { ...t, inBin: true } : t));
    setTrashes(updated);
    setScore((prev) => prev + 20);

    const remaining = updated.filter((t) => !t.inBin);
    if (remaining.length === 0) {
      triggerEndGame();
    } else {
      setCurrentTurn('partner');
      setTimeout(() => {
        handlePartnerThrow(updated);
      }, 2200);
    }
  };

  const handlePartnerThrow = (currentList) => {
    const nextPartnerItem = currentList.find((t) => !t.inBin && t.owner === 'سارة') || currentList.find((t) => !t.inBin);
    if (!nextPartnerItem) {
      triggerEndGame();
      return;
    }

    playCustomSound('pop');
    speakArabic(`سارة رمت ${nextPartnerItem.name} في السلة! الآن دورك أنت يا بطل لتنظف قطعتك!`);

    const updated = currentList.map((t) => (t.id === nextPartnerItem.id ? { ...t, inBin: true } : t));
    setTrashes(updated);

    const remaining = updated.filter((t) => !t.inBin);
    if (remaining.length === 0) {
      triggerEndGame();
    } else {
      setCurrentTurn('child');
    }
  };

  const triggerEndGame = () => {
    setTimeout(() => {
      setIsCompleted(true);
      markActivityComplete(
        'trash-basket-l3',
        'تنظيف المكان وتبادل الأدوار! 🗑️✨',
        'شاطر شاطر! أحسنت يا بطل في تنظيف المكان ورمي المهملات بالتبادل مع الصديقة سارة!'
      );
    }, 1500);
  };

  const handleReset = () => {
    setTrashes(trashes.map((t) => ({ ...t, inBin: false })));
    setCurrentTurn('child');
    setScore(0);
    setIsCompleted(false);
  };

  const remainingCount = trashes.filter((t) => !t.inBin).length;

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold mb-1">
            <Trash2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>المستوى الثالث - النشاط 8</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            سلة المهملات: أنت ترمي قطعة وصديقك يرمي قطعة 🗑️
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
          <div className="bg-emerald-100 border border-emerald-300 px-3 py-2 rounded-2xl text-xs font-bold text-emerald-900">
            المتبقي للتنظيف: {remainingCount}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">المكان نظيف وجميل 100%! 🌟🧹</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            تعاونت مع سارة وألقيتم جميع المهملات بالتناوب بتصرف حضاري رائع!
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
          {/* Turn Banner */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className={`flex items-center gap-2 px-5 py-2 rounded-2xl border-2 transition-all ${
                currentTurn === 'child'
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md scale-105 ring-2 ring-emerald-300'
                  : 'bg-cream-100 border-cream-300 text-cream-600 opacity-60'
              }`}
            >
              <span>👦 دورك (اختر قطعة وارمها)</span>
            </div>

            <span className="text-lg font-bold text-cream-500">↔️</span>

            <div
              className={`flex items-center gap-2 px-5 py-2 rounded-2xl border-2 transition-all ${
                currentTurn === 'partner'
                  ? 'bg-rose-100 border-rose-500 text-rose-950 font-black shadow-md scale-105 ring-2 ring-rose-300 animate-pulse'
                  : 'bg-cream-100 border-cream-300 text-cream-600 opacity-60'
              }`}
            >
              <span>👧 دور سارة (ترمي قطعتها)</span>
            </div>
          </div>

          {/* Clean Floor Stage with Central Trash Can */}
          <div className="bg-white border-2 border-dashed border-emerald-200 rounded-3xl p-6 sm:p-8 mb-6 min-h-[340px] flex flex-col items-center justify-between relative shadow-inner">
            {/* Trash Can in Center */}
            <div className="flex flex-col items-center my-4">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-28 h-32 rounded-3xl bg-gradient-to-b from-emerald-500 to-emerald-700 border-4 border-emerald-800 shadow-xl flex flex-col items-center justify-center text-white"
              >
                <Trash2 className="w-12 h-12 mb-1" />
                <span className="text-[11px] font-black font-cairo bg-black/20 px-2 py-0.5 rounded-full">
                  سلة النظافة ♻️
                </span>
              </motion.div>
            </div>

            {/* Scattered Items on Floor */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
              {trashes.map((item) => {
                if (item.inBin) return null;
                const isChildItem = item.owner === 'طفل';

                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => isChildItem && handleChildThrow(item)}
                    disabled={currentTurn !== 'child' || !isChildItem}
                    className={`p-3.5 rounded-2xl border-2 shadow-md flex items-center gap-2 transition-all select-none cursor-pointer ${
                      isChildItem && currentTurn === 'child'
                        ? 'bg-emerald-50 border-emerald-400 hover:bg-emerald-100 ring-2 ring-emerald-300 animate-bounce'
                        : 'bg-cream-100 border-cream-300 opacity-70 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div className="text-right">
                      <span className="text-xs font-bold font-cairo block text-burgundy-950">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-cream-700">
                        {isChildItem ? 'اضغط لرميها 👆' : 'خاصة بسارة 👧'}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Sound Helper */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => speakArabic('ارمِ قطعة مهملات في السلة ثم انتظر دور سارة لترمي قطعتها')}
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
