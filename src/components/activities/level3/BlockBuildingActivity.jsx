import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Trophy, RotateCcw, Award, Volume2, Sparkles, ArrowDown } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const BlockBuildingActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [towerBlocks, setTowerBlocks] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('child'); // 'child' | 'partner'
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const blockColors = [
    { id: 1, name: 'مكعب أحمر 🟥', color: 'bg-rose-500 border-rose-700', text: 'text-white' },
    { id: 2, name: 'مكعب أزرق 🟦', color: 'bg-sky-500 border-sky-700', text: 'text-white' },
    { id: 3, name: 'مكعب أصفر 🟨', color: 'bg-amber-400 border-amber-600', text: 'text-amber-950' },
    { id: 4, name: 'مكعب أخضر 🟩', color: 'bg-emerald-500 border-emerald-700', text: 'text-white' },
    { id: 5, name: 'مكعب بنفسجي 🟪', color: 'bg-purple-500 border-purple-700', text: 'text-white' },
    { id: 6, name: 'مكعب برتقالي 🟧', color: 'bg-orange-500 border-orange-700', text: 'text-white' },
  ];

  const targetHeight = 6;

  // Child places a block
  const handleChildPlaceBlock = () => {
    if (currentTurn !== 'child' || towerBlocks.length >= targetHeight) return;

    const blockIdx = towerBlocks.length;
    const block = blockColors[blockIdx];

    playCalmTone('success');
    playCustomSound('pop');
    speakArabic(`أحسنت يا بطل! ركبت ${block.name}! والآن دور الصديق أحمد ليضع مكعبه!`);
    addStar(2);

    const updated = [...towerBlocks, { ...block, by: 'طفل' }];
    setTowerBlocks(updated);
    setScore((prev) => prev + 20);

    if (updated.length >= targetHeight) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'block-building-l3',
          'بناء برج المكعبات المشترك! 🧱🏰',
          'شاطر شاطر! أحسنت يا بطل في تبادل الأدوار وتركيب المكعبات بتعاون رائع!'
        );
      }, 1800);
    } else {
      // Partner's turn
      setCurrentTurn('partner');
      setTimeout(() => {
        handlePartnerPlaceBlock(updated);
      }, 2400);
    }
  };

  // Partner places the next block automatically
  const handlePartnerPlaceBlock = (currentTower) => {
    const blockIdx = currentTower.length;
    if (blockIdx >= targetHeight) return;

    const block = blockColors[blockIdx];
    playCustomSound('pop');
    speakArabic(`أنا وضعت ${block.name}! الآن دورك أنت يا بطل! ركب مكعبك القادم!`);

    const updated = [...currentTower, { ...block, by: 'أحمد' }];
    setTowerBlocks(updated);

    if (updated.length >= targetHeight) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'block-building-l3',
          'بناء برج المكعبات المشترك! 🧱🏰',
          'شاطر شاطر! أحسنت يا بطل في تبادل الأدوار وتركيب المكعبات بتعاون رائع!'
        );
      }, 1800);
    } else {
      setCurrentTurn('child');
    }
  };

  const handleReset = () => {
    setTowerBlocks([]);
    setCurrentTurn('child');
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold mb-1">
            <Box className="w-3.5 h-3.5 text-blue-700" />
            <span>المستوى الثالث - النشاط 7</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            تركيب المكعبات وتبادل الأدوار (أنت ثم صديقك) 🧱
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
          <div className="bg-blue-100 border border-blue-300 px-3 py-2 rounded-2xl text-xs font-bold text-blue-900">
            الارتفاع: {towerBlocks.length} / {targetHeight}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">برج مكعبات رائع بتعاون مذهل! 🏰✨</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أتقنت تبادل الأدوار وبناء برج المكعبات مع الصديق باهتمام وتفاعل ممتاز!
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
          {/* Turn Indicator Banner */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className={`flex items-center gap-2 px-5 py-2 rounded-2xl border-2 transition-all ${
                currentTurn === 'child'
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md scale-105 ring-2 ring-emerald-300'
                  : 'bg-cream-100 border-cream-300 text-cream-600 opacity-60'
              }`}
            >
              <span>👦</span>
              <span>دورك الآن (ركب مكعبك!)</span>
            </div>

            <span className="text-lg font-bold text-cream-500">↔️</span>

            <div
              className={`flex items-center gap-2 px-5 py-2 rounded-2xl border-2 transition-all ${
                currentTurn === 'partner'
                  ? 'bg-blue-100 border-blue-500 text-blue-950 font-black shadow-md scale-105 ring-2 ring-blue-300 animate-pulse'
                  : 'bg-cream-100 border-cream-300 text-cream-600 opacity-60'
              }`}
            >
              <span>🧑</span>
              <span>دور الصديق أحمد</span>
            </div>
          </div>

          {/* Building Table Area */}
          <div className="bg-white border-2 border-dashed border-blue-200 rounded-3xl p-6 mb-6 min-h-[340px] flex flex-col items-center justify-end relative shadow-inner">
            {/* Tower Display */}
            <div className="flex flex-col-reverse items-center gap-1.5 w-44 z-10">
              {towerBlocks.map((blk, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: -50, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className={`w-full py-3.5 rounded-2xl border-b-4 ${blk.color} ${blk.text} text-center font-black font-cairo shadow-md flex items-center justify-center gap-2 select-none`}
                >
                  <span className="text-xs">بواسطة: {blk.by}</span>
                  <span>{blk.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Base Table Line */}
            <div className="w-64 h-3 bg-amber-800 rounded-full mt-2 shadow-md" />
            <span className="text-[11px] font-bold text-cream-600 mt-1">طاولة تركيب المكعبات المشتركة</span>
          </div>

          {/* Action & Child Controls */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <button
              onClick={() => speakArabic('دورك لتركيب مكعب ثم دور الصديق أحمد ليركب مكعباً')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>تعليمات صوتية 🗣️</span>
            </button>

            {currentTurn === 'child' && towerBlocks.length < targetHeight && (
              <button
                onClick={handleChildPlaceBlock}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <ArrowDown className="w-4 h-4" />
                <span>ضع مكعبك في البرج الآن! 🧱</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
