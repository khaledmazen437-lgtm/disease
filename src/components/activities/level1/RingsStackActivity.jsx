import React, { useState, useRef } from 'react';
import { Award, RotateCcw, Trophy, Move, CheckCircle2, Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

// 3D Ring Definition Data with realistic gradients & dimensions
const RINGS_DATA = [
  {
    id: 1,
    sizeOrder: 1,
    colorName: 'الحلقة الحمراء (الأكبر)',
    shortName: 'الأكبر',
    widthPx: 210,
    heightPx: 44,
    holePx: 40,
    gradient: 'from-rose-500 via-red-600 to-rose-900',
    topHighlight: 'bg-rose-300',
    borderColor: 'border-rose-900',
    shadowColor: 'rgba(225, 29, 72, 0.4)',
    accentBg: 'bg-rose-500'
  },
  {
    id: 2,
    sizeOrder: 2,
    colorName: 'الحلقة البرتقالية (كبيرة)',
    shortName: 'كبيرة',
    widthPx: 175,
    heightPx: 40,
    holePx: 36,
    gradient: 'from-amber-400 via-orange-500 to-amber-800',
    topHighlight: 'bg-amber-200',
    borderColor: 'border-orange-900',
    shadowColor: 'rgba(249, 115, 22, 0.4)',
    accentBg: 'bg-orange-500'
  },
  {
    id: 3,
    sizeOrder: 3,
    colorName: 'الحلقة الصفراء (متوسطة)',
    shortName: 'متوسطة',
    widthPx: 140,
    heightPx: 36,
    holePx: 32,
    gradient: 'from-yellow-300 via-amber-400 to-yellow-700',
    topHighlight: 'bg-yellow-100',
    borderColor: 'border-yellow-800',
    shadowColor: 'rgba(234, 179, 8, 0.4)',
    accentBg: 'bg-yellow-400'
  },
  {
    id: 4,
    sizeOrder: 4,
    colorName: 'الحلقة الخضراء (صغيرة)',
    shortName: 'صغيرة',
    widthPx: 110,
    heightPx: 32,
    holePx: 28,
    gradient: 'from-emerald-400 via-emerald-600 to-teal-900',
    topHighlight: 'bg-emerald-200',
    borderColor: 'border-emerald-950',
    shadowColor: 'rgba(16, 185, 129, 0.4)',
    accentBg: 'bg-emerald-500'
  },
  {
    id: 5,
    sizeOrder: 5,
    colorName: 'الحلقة الزرقاء (الأصغر)',
    shortName: 'الأصغر',
    widthPx: 80,
    heightPx: 28,
    holePx: 24,
    gradient: 'from-sky-400 via-blue-600 to-indigo-900',
    topHighlight: 'bg-sky-200',
    borderColor: 'border-blue-950',
    shadowColor: 'rgba(59, 130, 246, 0.4)',
    accentBg: 'bg-blue-500'
  },
];

// Helper Component to render a 3D Torus Ring with center hole and specular reflections
const Torus3DRing = ({ ring, isDragging = false, isNextHint = false, isStacked = false }) => {
  return (
    <div
      style={{
        width: `${ring.widthPx}px`,
        height: `${ring.heightPx}px`,
        boxShadow: isDragging
          ? `0 20px 25px -5px ${ring.shadowColor}, 0 8px 10px -6px ${ring.shadowColor}`
          : `0 8px 16px -2px ${ring.shadowColor}`,
      }}
      className={`relative rounded-full bg-gradient-to-b ${ring.gradient} border-b-4 ${ring.borderColor} flex items-center justify-center transition-shadow select-none ${
        isNextHint && !isDragging && !isStacked ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-white animate-pulse' : ''
      }`}
    >
      {/* 3D Curved Top Specular Highlight */}
      <div
        className={`absolute top-1 left-4 right-4 h-2.5 ${ring.topHighlight} opacity-60 rounded-full blur-[1px] pointer-events-none`}
      />

      {/* 3D Curved Bottom Edge Shadow */}
      <div className="absolute bottom-0 left-2 right-2 h-2 bg-black opacity-30 rounded-full pointer-events-none" />

      {/* Center Hollow Donut Hole (Shows background peg behind it) */}
      <div
        style={{
          width: `${ring.holePx}px`,
          height: `${ring.heightPx * 0.55}px`,
        }}
        className="rounded-full bg-amber-950/20 border border-black/30 shadow-inner flex items-center justify-center relative overflow-hidden backdrop-blur-[1px]"
      >
        {/* Inner rim highlight */}
        <div className="absolute inset-0 rounded-full border-t border-white/40 pointer-events-none" />
      </div>

      {/* Size label tag overlay */}
      <span className="absolute right-3 text-[10px] font-black text-white drop-shadow pointer-events-none">
        {ring.shortName}
      </span>
    </div>
  );
};

export const RingsStackActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar, playWrongFeedback } = useSensory();

  const [ringsScore, setRingsScore] = useState(0);
  const [stackedRings, setStackedRings] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isHoveringPeg, setIsHoveringPeg] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const pegRef = useRef(null);
  const targetGoal = RINGS_DATA.length;
  const nextRequiredId = stackedRings.length + 1;

  // Process Ring Stacking (either via Drag-and-Drop release or Tap)
  const attemptStackRing = (ring) => {
    if (isCompleted || stackedRings.some((r) => r.id === ring.id)) return false;

    // Enforce Ascending Stacking Order: Must be next correct size
    if (ring.id !== nextRequiredId) {
      playWrongFeedback(`خطأ! يجب رص الحلقات بالترتيب، اختر ${RINGS_DATA.find((r) => r.id === nextRequiredId)?.colorName || 'الحلقة المناسبة'} يا بطل!`);
      setFeedbackMsg(`يجب رص الحلقات بالترتيب! اختر ${RINGS_DATA.find((r) => r.id === nextRequiredId)?.colorName}`);
      setTimeout(() => setFeedbackMsg(null), 2500);
      return false;
    }

    playCustomSound('rings_drop');
    addStar(1);

    const newScore = ringsScore + 20;
    const newStacked = [...stackedRings, ring];
    setRingsScore(newScore);
    setStackedRings(newStacked);
    setFeedbackMsg(null);

    if (newStacked.length === targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete('rings-stack-l1');
      }, 400);
    }
    return true;
  };

  // Drag End handler with generous bounding-box drop zone collision checking
  const handleDragEnd = (ring, info) => {
    setIsHoveringPeg(false);

    if (!pegRef.current) return;

    const pegRect = pegRef.current.getBoundingClientRect();
    const pointX = info.point.x;
    const pointY = info.point.y;

    // Generous drop target padding (100px) around peg tower for easy dragging on touch screens
    const isOverPeg =
      pointX >= pegRect.left - 100 &&
      pointX <= pegRect.right + 100 &&
      pointY >= pegRect.top - 100 &&
      pointY <= pegRect.bottom + 120;

    if (isOverPeg) {
      attemptStackRing(ring);
    }
  };

  // Drag Motion over Peg detection
  const handleDrag = (_, info) => {
    if (!pegRef.current) return;
    const pegRect = pegRef.current.getBoundingClientRect();
    const pointX = info.point.x;
    const pointY = info.point.y;

    const isOverPeg =
      pointX >= pegRect.left - 100 &&
      pointX <= pegRect.right + 100 &&
      pointY >= pegRect.top - 100 &&
      pointY <= pegRect.bottom + 120;

    setIsHoveringPeg(isOverPeg);
  };

  const handleResetGame = () => {
    setRingsScore(0);
    setStackedRings([]);
    setIsCompleted(false);
    setFeedbackMsg(null);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-4xl mx-auto shadow-soft font-cairo">
      {/* Header & Dedicated Score Counter */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold mb-1">
            <span>النشاط الثاني • التراكم البصري بالسحب والتركيب</span>
          </div>
          <h3 className="text-xl font-bold text-burgundy-950">
            رص الحلقات بالسحب والإسقاط تصاعدياً من الأكبر للأصغر
          </h3>
        </div>

        {/* Dedicated Game Score Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الحلقات:</span>
              <span className="text-lg font-black text-amber-700">{ringsScore} نقطة</span>
            </div>
          </div>
          <div className="bg-rose-100 border border-rose-300 px-3 py-2 rounded-2xl text-xs font-bold text-rose-900">
            الحلقات المجمعة: {stackedRings.length} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-10 bg-white border border-cream-300 rounded-3xl p-8 shadow-soft"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-burgundy-950 mb-2">ترتيب تصاعدي بالسحب ناجح وممتاز!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في سحب ورص جميع الحلقات الـ 5 بالترتيب التصاعدي وحصلت على <strong>{ringsScore} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleResetGame}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة اللعب</span>
            </button>
            {onFinish && (
              <button
                onClick={onFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-burgundy-900 text-cream-50 font-bold text-sm shadow-md cursor-pointer"
              >
                <span>الانتقال للنشاط التالي</span>
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          {/* Top Instruction Banner */}
          <div className="bg-white border border-cream-300 rounded-2xl p-4 mb-5 flex items-center justify-between text-xs sm:text-sm font-medium text-cream-800 shadow-sm">
            <div className="flex items-center gap-2">
              <Hand className="w-5 h-5 text-amber-600 animate-bounce shrink-0" />
              <span>
                <strong>طريقة اللعب بالسحب:</strong> اسحب الحلقة بالماوس أو باللمس وأسقطها فوق العمود الخشبي!
              </span>
            </div>
            {stackedRings.length < targetGoal && (
              <span className="bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-amber-300 shrink-0">
                المطلوب الآن: {RINGS_DATA.find((r) => r.id === nextRequiredId)?.shortName}
              </span>
            )}
          </div>

          {/* Toast / Warning feedback if wrong order */}
          {feedbackMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 border border-rose-300 text-rose-900 px-4 py-2 rounded-xl text-xs font-bold mb-4 text-center shadow-sm"
            >
              {feedbackMsg}
            </motion.div>
          )}

          {/* Interactive Play Arena */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Wooden Stacking Peg Stand Area (Drop Target Zone) */}
            <div
              ref={pegRef}
              className={`md:col-span-6 bg-gradient-to-b from-amber-50/80 to-amber-100/60 border-2 rounded-3xl min-h-[340px] flex flex-col justify-end items-center pb-6 relative shadow-inner transition-all overflow-hidden ${
                isHoveringPeg ? 'border-amber-500 ring-4 ring-amber-300/50 bg-amber-100/80 scale-[1.01]' : 'border-amber-200'
              }`}
            >
              {/* Floating target glow indicator when dragging over peg */}
              {isHoveringPeg && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-5 py-1.5 rounded-full text-xs font-bold animate-pulse shadow-md z-30">
                  أسقط الحلقة هنا لتركيبها
                </div>
              )}

              {/* Wooden Base Stand */}
              <div className="w-60 h-7 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 rounded-full border-b-4 border-amber-950 shadow-2xl relative z-10 flex items-center justify-center">
                <div className="w-48 h-1.5 bg-amber-700/50 rounded-full blur-[1px]" />
              </div>

              {/* Wooden Vertical Peg Pole */}
              <div className="w-7 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-900 h-[240px] rounded-t-full absolute bottom-9 z-0 shadow-md border-x border-amber-800/40">
                <div className="w-1.5 h-full bg-amber-400/30 rounded-full ml-1" />
              </div>

              {/* Stacked Rings Container (Bottom to Top) */}
              <div className="flex flex-col-reverse items-center absolute bottom-[30px] z-20 w-full">
                <AnimatePresence>
                  {stackedRings.map((ring, index) => (
                    <motion.div
                      key={ring.id}
                      initial={{ y: -180, opacity: 0, scale: 1.15 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 22,
                        delay: index * 0.05,
                      }}
                      className="-mb-2 relative"
                    >
                      <Torus3DRing ring={ring} isStacked={true} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Selectable & Draggable Ring Tray */}
            <div className="md:col-span-6 bg-white border border-cream-300 rounded-3xl p-5 shadow-soft flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cream-900 block mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Move className="w-4 h-4 text-burgundy-700" />
                    اسحب الحلقة باللمس أو الماوس وأسقطها على العمود:
                  </span>
                </span>

                {/* Tray items list */}
                <div className="space-y-3.5 flex flex-col items-center py-2">
                  {RINGS_DATA.map((ring) => {
                    const isStacked = stackedRings.some((r) => r.id === ring.id);
                    const isNextHint = ring.id === nextRequiredId;

                    return (
                      <div key={ring.id} className="w-full flex items-center justify-between gap-2">
                        {/* Draggable 3D Ring */}
                        {isStacked ? (
                          <div className="w-full h-11 bg-cream-100 border border-cream-200 rounded-2xl flex items-center justify-between px-4 opacity-50">
                            <span className="text-xs font-bold text-cream-500 line-through">
                              {ring.colorName}
                            </span>
                            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> تم التركيب
                            </span>
                          </div>
                        ) : (
                          <motion.div
                            drag
                            dragSnapToOrigin={true}
                            dragElastic={0.2}
                            onDrag={handleDrag}
                            onDragEnd={(_, info) => handleDragEnd(ring, info)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileDrag={{
                              scale: 1.15,
                              rotate: -4,
                              zIndex: 100,
                              cursor: 'grabbing',
                            }}
                            onClick={() => attemptStackRing(ring)}
                            className="cursor-grab active:cursor-grabbing touch-none flex items-center justify-center p-1 rounded-2xl"
                          >
                            <Torus3DRing
                              ring={ring}
                              isNextHint={isNextHint}
                              isStacked={false}
                            />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-cream-200 text-center">
                <span className="text-[11px] text-cream-700 font-medium">
                  الحلقة ذات الوميض الأصفر هي الخطوة التالية المطلوبة!
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
