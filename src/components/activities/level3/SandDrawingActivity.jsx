import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Trophy, RotateCcw, Award, Volume2, Sparkles, CheckCircle2, Eraser } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const SandDrawingActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [activeShapeIdx, setActiveShapeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  const sandShapes = [
    { id: 1, name: 'دائرة ذهبية', icon: '⭕', prompt: 'انظر ماذا رسمت على الرمل! دائرة مستديرة جميلة! يلا ارسم دائرة مثلي بإصبعك!' },
    { id: 2, name: 'قلب دافئ', icon: '❤️', prompt: 'رسمت قلباً جميلاً باللون على الرمل! قلده وارسم قلباً رائعاً!' },
    { id: 3, name: 'نجمة ساطعة', icon: '⭐', prompt: 'نجمة متلألئة في الرمل! حاول رسم خطوط النجمة معي!' },
    { id: 4, name: 'وجه مبتسم', icon: '😊', prompt: 'وجه يبتسم لك على الرمل الذهبي! ارسم عينين وابتسامة مبهجة!' },
  ];

  const currentShape = sandShapes[activeShapeIdx];

  // Canvas drawing setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#e11d48'; // vibrant sand drawing color
  }, [activeShapeIdx]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleMouseDown = (e) => {
    isDrawingRef.current = true;
    const { x, y } = getCanvasCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasDrawn(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawingRef.current) return;
    const { x, y } = getCanvasCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleConfirmDrawing = () => {
    playCalmTone('success');
    playCustomSound('applause');
    speakArabic('رسمة رائعة جداً ومتقنة على الرمل! فنان موهوب ومبدع!');
    addStar(2);

    const newScore = score + 25;
    setScore(newScore);

    if (activeShapeIdx + 1 >= sandShapes.length) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'sand-drawing-l3',
          'الرسم باللون على الرمل الذهبي! 🏖️🎨',
          'شاطر شاطر! أحسنت يا فنان في تقليد جميع الأشكال على الرمل بتناسق حركي وبصري مذهل!'
        );
      }, 1600);
    } else {
      setTimeout(() => {
        setActiveShapeIdx((prev) => prev + 1);
        clearCanvas();
      }, 1200);
    }
  };

  const handleReset = () => {
    setActiveShapeIdx(0);
    setScore(0);
    clearCanvas();
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
            <Palette className="w-3.5 h-3.5 text-amber-700" />
            <span>المستوى الثالث - النشاط 12</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            ارسم باللون على الرمل: شاهد الشكل وقلده 🏖️🎨
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
          <div className="bg-amber-100 border border-amber-300 px-3 py-2 rounded-2xl text-xs font-bold text-amber-900">
            الشكل: {activeShapeIdx + 1} / {sandShapes.length}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">رسومات رملية إبداعية ساحرة! 🏖️✨</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            لقد قلدت جميع الأشكال على الرمل الذهبي بتناسق بصري وحركي دقيق وممتع!
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
          {/* Trainer's Template Shape */}
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-5 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-4xl shadow-inner">
                {currentShape.icon}
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-3 py-0.5 rounded-full inline-block mb-1">
                  الشكل المطلوب تقليده على الرمل:
                </span>
                <h4 className="text-lg font-black font-cairo text-burgundy-950">
                  {currentShape.name}
                </h4>
              </div>
            </div>

            <button
              onClick={() => speakArabic(currentShape.prompt)}
              className="px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>اسمع التعليمات 🗣️</span>
            </button>
          </div>

          {/* Interactive Sand Board */}
          <div className="relative rounded-3xl border-4 border-amber-400 bg-gradient-to-b from-amber-200 via-amber-100 to-amber-300 p-2 shadow-inner mb-6 flex flex-col items-center">
            {/* Board header */}
            <div className="w-full flex justify-between items-center px-4 py-2 text-amber-950 text-xs font-black">
              <span>لوح الرمل الذهبي (ارسم هنا بإصبعك أو الماوس ✍️)</span>
              <button
                onClick={clearCanvas}
                className="flex items-center gap-1 text-[11px] bg-white/80 hover:bg-white px-3 py-1 rounded-xl shadow-xs text-rose-800"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>مسح الرمل</span>
              </button>
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={540}
              height={260}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              className="bg-amber-100/80 rounded-2xl cursor-crosshair touch-none shadow-inner border border-amber-300"
            />
          </div>

          {/* Confirm Drawing Action */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <span className="text-xs text-cream-700 font-medium">
              عندما تنتهي من رسم الشكل على الرمل، اضغط على زر الاعتماد للمتابعة!
            </span>

            <button
              onClick={handleConfirmDrawing}
              disabled={!hasDrawn}
              className={`px-8 py-3.5 rounded-2xl text-white font-black text-sm font-cairo shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                hasDrawn
                  ? 'bg-amber-600 hover:bg-amber-700 ring-2 ring-amber-400 scale-102'
                  : 'bg-cream-400 cursor-not-allowed opacity-60'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 text-amber-200" />
              <span>اعتمد رسمي الرملي يا بطل! 🎨</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
