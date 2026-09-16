import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Eye, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const EyeDirectionActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [targetDir, setTargetDir] = useState('right'); // 'left' | 'right' | 'up' | 'down'
  const [characterPos, setCharacterPos] = useState({ x: 50, y: 50 });
  const [successMoves, setSuccessMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const directions = [
    { key: 'right', label: 'النظر لليمين 👉', icon: ArrowRight, dx: 30, dy: 0 },
    { key: 'left', label: 'النظر لليسار 👈', icon: ArrowLeft, dx: -30, dy: 0 },
    { key: 'up', label: 'النظر للأعلى 👆', icon: ArrowUp, dx: 0, dy: -30 },
    { key: 'down', label: 'النظر لأسفل 👇', icon: ArrowDown, dx: 0, dy: 30 },
  ];

  const targetGoal = 5;

  const handleMoveEyeDirection = (dirObj) => {
    if (isCompleted) return;

    if (dirObj.key === targetDir) {
      speakArabic('انظر هنا يا بطل!');
      playCustomSound('wow_reaction');
      addStar(1);

      const newMoves = successMoves + 1;
      const newScore = score + 20;
      setSuccessMoves(newMoves);
      setScore(newScore);

      // Move character position based on eye direction
      setCharacterPos((prev) => ({
        x: Math.max(15, Math.min(85, prev.x + dirObj.dx)),
        y: Math.max(15, Math.min(85, prev.y + dirObj.dy)),
      }));

      if (newMoves >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('eye-direction-l1');
        }, 700);
      } else {
        // Pick new target direction
        const nextDirs = directions.filter((d) => d.key !== targetDir);
        const randDir = nextDirs[Math.floor(Math.random() * nextDirs.length)];
        setTargetDir(randDir.key);
      }
    } else {
      playCalmTone('gentle-tap');
    }
  };

  const handleReset = () => {
    setScore(0);
    setTargetDir('right');
    setCharacterPos({ x: 50, y: 50 });
    setSuccessMoves(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي</span>
            <span>لعبة الإشارة بالعين وتتبع النظرة </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            التحرك حسب اتجاه نظرة عين الطفل وتبادل الأدوار
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الإشارة:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-cyan-100 border border-cyan-300 px-3 py-2 rounded-2xl text-xs font-bold text-cyan-900">
            الحركات الناجحة: {successMoves} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">استجابة وتتبع بنظرة العين ممتاز! 🎉👀</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في توجيه الحركة حسب اتجاه النظر وتبادل الأدوار وحصلت على <strong>{score} نقطة</strong>!
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
             انظر إلى اتجاه العين المطلوبة واضغط على الزر المقابل ليتحرك العصفور التفاعلي في نفس اتجاه نظرتك!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between">
            {/* Field Area */}
            <div className="relative h-56 bg-gradient-to-tr from-cyan-900 to-indigo-950 rounded-2xl border-2 border-cyan-800 p-4 overflow-hidden shadow-inner">
              {/* Eye Prompt Banner */}
              <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 px-4 py-1.5 rounded-full text-xs font-black shadow animate-pulse">
                <Eye className="w-4 h-4" />
                <span>حرك عينك باتجاه: {directions.find((d) => d.key === targetDir)?.label}</span>
              </div>

              {/* Moving Bird/Character based on Eye Look */}
              <motion.div
                style={{ left: `${characterPos.x}%`, top: `${characterPos.y}%` }}
                animate={{ x: '-50%', y: '-50%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute text-5xl filter drop-shadow-lg select-none"
              >
                
              </motion.div>
            </div>

            {/* Direction Control Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {directions.map((dir) => {
                const IconComp = dir.icon;
                const isTarget = dir.key === targetDir;

                return (
                  <button
                    key={dir.key}
                    onClick={() => handleMoveEyeDirection(dir)}
                    className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      isTarget
                        ? 'bg-amber-400 border-amber-600 text-amber-950 shadow-md scale-105 ring-2 ring-amber-300 animate-bounce'
                        : 'bg-cream-100 border-cream-300 text-cream-900 hover:bg-cream-200'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{dir.label}</span>
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
