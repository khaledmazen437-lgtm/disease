import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Trophy, RotateCcw, Award, Play, Pause, CheckCircle2, Clock, Activity } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const GazeFixationTimerActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [isTracking, setIsTracking] = useState(false);
  const [fixationTime, setFixationTime] = useState(0); // Seconds focused
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const [successfulHits, setSuccessfulHits] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const timerRef = useRef(null);
  const targetGoal = 5;

  // Smooth circular & linear pursuit motion paths
  const pathWaypoints = [
    { x: 20, y: 30 },
    { x: 80, y: 30 },
    { x: 80, y: 70 },
    { x: 20, y: 70 },
    { x: 50, y: 50 }
  ];

  const startTrackingSession = () => {
    playCalmTone('gentle-tap');
    speakArabic('اتبع الضوء البصري بعينيك واضغط عليه فور توقفه!');
    setIsTracking(true);
    setFixationTime(0);
  };

  // Timer counter for eye fixation duration
  useEffect(() => {
    if (isTracking && !isCompleted) {
      timerRef.current = setInterval(() => {
        setFixationTime((prev) => prev + 0.1);
      }, 100);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTracking, isCompleted]);

  // Target movement loop
  useEffect(() => {
    if (!isTracking || isCompleted) return;

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % pathWaypoints.length;
      setTargetPosition(pathWaypoints[step]);
    }, 2400);

    return () => clearInterval(interval);
  }, [isTracking, isCompleted]);

  const handleCatchTarget = () => {
    if (!isTracking || isCompleted) return;

    playCustomSound('chime');
    addStar(2);

    const newHits = successfulHits + 1;
    const newScore = score + 25;
    setSuccessfulHits(newHits);
    setScore(newScore);

    if (newHits >= targetGoal) {
      setIsTracking(false);
      setIsCompleted(true);
      markActivityComplete(
        'gaze-fixation-timer-l1',
        'شاطر شاطر يا بطل!',
        'إنجاز رائع! أظهرت ثباتاً بصرياً وتتبعاً ممتازاً بعينيك!'
      );
    }
  };

  const handleReset = () => {
    setIsTracking(false);
    setFixationTime(0);
    setScore(0);
    setSuccessfulHits(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft font-cairo">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 text-xs font-bold mb-1">
            <Eye className="w-3.5 h-3.5 text-indigo-700" />
            <span>المستوى الأول • اختبار تتبع النظرة والتثبيت البصري</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            تتبع النظرة وقياس زمن التثبيت البصري المتصل (Fixation Duration)
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التركيز:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-indigo-100 border border-indigo-300 px-3.5 py-2 rounded-2xl text-xs font-bold text-indigo-950 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-700" />
            <span>الثبات البصري: {fixationTime.toFixed(1)} ثانية</span>
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-burgundy-950 mb-2">تقرير التثبيت البصري ممتاااز!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            حقق الطفل ثباتاً بصرياً متصلاً لمسافة تتبع كاملة بمعدل <strong>{fixationTime.toFixed(1)} ثانية</strong> وحصل على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="btn-dribbble-glass">
              <RotateCcw className="w-4 h-4" /> <span>إعادة الاختبار</span>
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
          {/* Clinical Diagnostic Banner */}
          <div className="bg-white border border-cream-300 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm font-medium text-cream-900 shadow-sm gap-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-700 shrink-0" />
              <span>
                <strong>تعليمات الأخصائي:</strong> اطلب من الطفل تتبع الكرة الضوئية بعينيه دون تحريك رأسه، واضغط على الكرة عندما تتوقف!
              </span>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 px-3.5 py-1.5 rounded-xl font-bold text-indigo-900 shrink-0">
              الأهداف المكتملة: {successfulHits} / {targetGoal}
            </div>
          </div>

          {/* Interactive Gaze Arena */}
          <div className="bg-gradient-to-b from-burgundy-950 via-purple-950 to-burgundy-950 border-4 border-burgundy-800 rounded-3xl h-[360px] relative overflow-hidden shadow-2xl flex items-center justify-center">
            {!isTracking ? (
              <div className="text-center text-white space-y-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-indigo-500/30 border-2 border-indigo-400 flex items-center justify-center mx-auto text-amber-300">
                  <Eye className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-xl font-bold">جاهز لبدء تتبع الضوء البصري؟</h4>
                <button
                  onClick={startTrackingSession}
                  className="btn-3d-amber px-8 py-3 rounded-full text-base mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>بدء التتبع والتثبيت البصري</span>
                </button>
              </div>
            ) : (
              <motion.div
                animate={{
                  left: `${targetPosition.x}%`,
                  top: `${targetPosition.y}%`,
                }}
                transition={{
                  duration: 2.2,
                  ease: [0.25, 1, 0.5, 1]
                }}
                onClick={handleCatchTarget}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
              >
                {/* Glowing 3D Sensory Gaze Orb */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bubble-3d border-4 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.8)] flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-full bg-white shadow-inner animate-ping" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
