import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Check, X, Eye, Sparkles, Layers, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

// Helper component for rendering realistic 3D Extruded Isometric Blocks
const Isometric3DCube = ({ colorName, baseColor, isStacked = false }) => {
  return (
    <div className={`relative w-40 h-11 rounded-2xl ${baseColor} border-t-2 border-white/60 border-b-[5px] border-black/40 shadow-lg flex items-center justify-between px-4 text-white font-extrabold text-xs select-none ${isStacked ? 'opacity-90' : 'hover:scale-[1.03] transition-transform'}`}>
      {/* 3D Top Highlight Glare */}
      <div className="absolute top-1 left-3 right-3 h-2 bg-white/40 rounded-full blur-[1px] pointer-events-none" />
      
      <span>{colorName}</span>
      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
        {isStacked ? 'تم التركيب' : 'مكعب 3D'}
      </span>
    </div>
  );
};

export const NonVerbalCubesActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  const [score, setScore] = useState(0);
  const [stackedCubes, setStackedCubes] = useState([]);
  const [trainerTargetIdx, setTrainerTargetIdx] = useState(0); // Index of intended block
  const [isCompleted, setIsCompleted] = useState(false);

  const cubesPool = [
    { id: 1, colorName: 'المكعب الأحمر', baseColor: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-800' },
    { id: 2, colorName: 'المكعب الأزرق', baseColor: 'bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-800' },
    { id: 3, colorName: 'المكعب الأصفر', baseColor: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-700' },
    { id: 4, colorName: 'المكعب الأخضر', baseColor: 'bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-800' },
  ];

  const targetGoal = cubesPool.length;

  const handleSelectCube = (cubeIdx) => {
    if (isCompleted || stackedCubes.some((c) => c.id === cubesPool[cubeIdx].id)) return;

    // Check if child selected the cube indicated by trainer non-verbal nod/eye gaze
    if (cubeIdx === trainerTargetIdx) {
      playCalmTone('success');
      addStar(1);

      const newStacked = [...stackedCubes, cubesPool[cubeIdx]];
      const newScore = score + 20;
      setStackedCubes(newStacked);
      setScore(newScore);

      if (newStacked.length >= targetGoal) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete('non-verbal-cubes-l1');
        }, 700);
      } else {
        // Find next unstacked cube as target
        const unstackedIndices = cubesPool
          .map((c, i) => i)
          .filter((i) => !newStacked.some((sc) => sc.id === cubesPool[i].id));
        if (unstackedIndices.length > 0) {
          setTrainerTargetIdx(unstackedIndices[0]);
        }
      }
    } else {
      // Trainer shakes head side-to-side (NO signal)
      playCalmTone('gentle-tap');
    }
  };

  const handleReset = () => {
    setScore(0);
    setStackedCubes([]);
    setTrainerTargetIdx(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft font-cairo">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold mb-1">
            <span>النشاط التفاعلي • تعليمات المكعبات غير اللفظية</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            توجيه اختيار المكعبات بهز الرأس ونظرة العينين دون كلام
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط المكعبات:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-blue-100 border border-blue-300 px-3 py-2 rounded-2xl text-xs font-bold text-blue-900">
            المكعبات: {stackedCubes.length} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">فهم رائع للإشارات غير اللفظية!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في رص جميع المكعبات باتباع هزة الرأس ونظرة عين المدرب وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="btn-dribbble-glass">
              <RotateCcw className="w-4 h-4" /> <span>إعادة النشاط</span>
            </button>
            {onFinish && (
              <button onClick={onFinish} className="btn-dribbble-primary">
                الانتقال للنشاط التالي
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          <p className="text-xs text-cream-700 mb-4 text-center font-medium">
             ينظر المدرب إلى المكعب المطلوب ويهز رأسه برفق للموافقة. انظر إلى إشارة المدرب واختر المكعب!
          </p>

          <div className="bg-white border border-cream-300 rounded-3xl p-6 text-center shadow-soft relative min-h-[340px] flex flex-col justify-between">
            {/* Non-Verbal Trainer Gaze & Nod Guidance Card */}
            <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3 text-right">
                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-950 block">إشارة المدرب غير اللفظية:</span>
                  <span className="text-xs text-blue-900 font-bold">
                    "يهز رأسه بالموافقة وينظر بتركيز شديد نحو {cubesPool[trainerTargetIdx]?.colorName}"
                  </span>
                </div>
              </div>
              <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-900 rounded-full text-xs font-bold border border-emerald-300 flex items-center gap-1.5 shadow-xs">
                <Check className="w-4 h-4 text-emerald-700" /> موافقة (هزة رأس)
              </span>
            </div>

            {/* Stack & Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* 3D Cube Tower Area */}
              <div className="bg-gradient-to-b from-cream-100 to-cream-200 border border-cream-300 rounded-2xl h-56 flex flex-col-reverse items-center justify-start p-4 gap-2 shadow-inner">
                <AnimatePresence>
                  {stackedCubes.map((cube) => (
                    <motion.div
                      key={cube.id}
                      initial={{ y: -60, opacity: 0, scale: 1.1 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Isometric3DCube colorName={cube.colorName} baseColor={cube.baseColor} isStacked={true} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {stackedCubes.length === 0 && (
                  <div className="m-auto text-center space-y-1">
                    <Layers className="w-8 h-8 text-cream-400 mx-auto animate-pulse" />
                    <span className="text-xs font-bold text-cream-500 block">مكان بناء برج المكعبات المجسّمة</span>
                  </div>
                )}
              </div>

              {/* Cube Selection 3D Buttons */}
              <div className="space-y-3">
                {cubesPool.map((cube, idx) => {
                  const isStacked = stackedCubes.some((c) => c.id === cube.id);

                  return (
                    <motion.div
                      key={cube.id}
                      whileHover={!isStacked ? { scale: 1.02 } : {}}
                      whileTap={!isStacked ? { scale: 0.96 } : {}}
                      onClick={() => handleSelectCube(idx)}
                      className={`w-full cursor-pointer select-none ${isStacked ? 'opacity-40 pointer-events-none' : ''}`}
                    >
                      <Isometric3DCube colorName={cube.colorName} baseColor={cube.baseColor} isStacked={isStacked} />
                    </motion.div>
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
