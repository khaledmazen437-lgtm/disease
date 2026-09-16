import React, { useState, useRef } from 'react';
import { Award, RotateCcw, Trophy, Moon, Sun, Sparkles, Eye, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSensory } from '../../../context/SensoryContext';

export const ShadowTheaterActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, markActivityComplete, addStar, speakArabic } = useSensory();

  const [score, setScore] = useState(0);
  const [activeShadowIdx, setActiveShadowIdx] = useState(0);
  const [tracedCount, setTracedCount] = useState(0);
  const [isFlashlightOn, setIsFlashlightOn] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const shadowPuppets = [
    {
      id: 'koala',
      name: 'حيوان الكوالا 🐨',
      icon: '🐨',
      speech: 'أنا حيوان الكوالا اللطيف! تتبع ظلي المضيء بعينيك 🐨',
      hint: 'كوالا مرح يتسلق أغصان الظل على الحائط'
    },
    {
      id: 'lion',
      name: 'الأسد الشجاع',
      icon: '🦁',
      speech: 'أنا الأسد الشجاع! انظر إلى ظلي الدافئ وعيناي',
      hint: 'أسد شجاع يحرك لبدته المضيئة'
    },
    {
      id: 'flamingo',
      name: 'طائر الفلامنجو',
      icon: '🦩',
      speech: 'أنا طائر الفلامنجو الوردي! اتبع أجنحتي الورقية',
      hint: 'طائر وردي يرفرف بأجنحته أمام الضوء'
    },
    {
      id: 'rabbit',
      name: 'الأرنب الصغير',
      icon: '🐇',
      speech: 'أنا الأرنب الصغير السريع! ركز عينك على آذاني',
      hint: 'أرنب يقفز خفيفاً على حائط الظل'
    },
  ];

  const currentPuppet = shadowPuppets[activeShadowIdx];
  const targetGoal = shadowPuppets.length;

  const triggerParticles = () => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      scale: Math.random() * 0.8 + 0.5,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
  };

  const handleInteractPuppet = () => {
    if (isCompleted) return;

    // Speak character voice aloud!
    speakArabic(currentPuppet.speech);
    playCustomSound('flashlight_switch');
    addStar(1);
    triggerParticles();

    const newTraced = tracedCount + 1;
    const newScore = score + 25;
    setTracedCount(newTraced);
    setScore(newScore);

    if (newTraced >= targetGoal) {
      setTimeout(() => {
        setIsCompleted(true);
        speakArabic('أحسنت يا بطل! نجحت في تتبع جميع ظلال الحيوانات المتحدثة!');
        markActivityComplete('shadow-theater-l1');
      }, 900);
    } else {
      setTimeout(() => {
        const nextIdx = (activeShadowIdx + 1) % shadowPuppets.length;
        setActiveShadowIdx(nextIdx);
        speakArabic(shadowPuppets[nextIdx].speech);
      }, 1200);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleReset = () => {
    setScore(0);
    setActiveShadowIdx(0);
    setTracedCount(0);
    setIsFlashlightOn(true);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-amber-300 border border-slate-700 text-xs font-bold mb-1">
            <span>النشاط التفاعلي المتحدث</span>
            <span>مسرح ظل الحيوانات والكشاف </span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            كشاف الضوء وظلال الحيوانات المتحدثة بالنطق الصوتي
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط مسرح الظل:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-slate-900 text-amber-300 border border-slate-700 px-3 py-2 rounded-2xl text-xs font-bold">
            الظلال المتتبعة: {tracedCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تتبع بصري ونطق صوتي ممتاز! 🎉🔦</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في التواصل البصري مع ظلال الحيوانات المتحدثة وحصلت على <strong>{score} نقطة</strong>!
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
             وجه بقعة ضوء الكشاف نحو ظل الحيوان واضغط عليه ليصدر صوته ويتحدث بالنطق العربي ("أنا حيوان الكوالا!")!
          </p>

          {/* Flashlight Spotlight Theater Screen */}
          <div
            onMouseMove={handleMouseMove}
            className="bg-slate-950 border-4 border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative min-h-[350px] flex flex-col justify-between overflow-hidden cursor-crosshair"
          >
            {/* Interactive Spotlight Beam following cursor/touch */}
            {isFlashlightOn && (
              <div
                style={{
                  background: `radial-gradient(circle 140px at ${mousePos.x}% ${mousePos.y}%, rgba(254, 240, 138, 0.35) 0%, rgba(251, 191, 36, 0.15) 50%, transparent 100%)`,
                }}
                className="absolute inset-0 pointer-events-none transition-all duration-75"
              />
            )}

            {/* Particle stars explosion */}
            <AnimatePresence>
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 1, scale: 0 }}
                  animate={{ opacity: 0, scale: p.scale * 2, y: -40 }}
                  exit={{ opacity: 0 }}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  className="absolute text-xl pointer-events-none select-none z-30"
                >
                  
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex justify-between items-center z-10">
              <button
                onClick={() => setIsFlashlightOn(!isFlashlightOn)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {isFlashlightOn ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                <span>{isFlashlightOn ? 'الكشاف يعمل 🔦' : 'إضاءة الكشاف'}</span>
              </button>
              <button
                onClick={() => speakArabic(currentPuppet.speech)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 text-amber-950 text-xs font-extrabold flex items-center gap-1.5 shadow hover:scale-105 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسمع صوت الحيوان</span>
              </button>
            </div>

            {/* Active Shadow Animal Puppet */}
            <div className="my-6 relative flex flex-col items-center justify-center z-20">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [-3, 3, -3],
                }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                onClick={handleInteractPuppet}
                className="cursor-pointer group flex flex-col items-center"
              >
                <div className="w-44 h-44 rounded-full bg-amber-400/10 border-2 border-amber-300/40 backdrop-blur-md flex items-center justify-center relative shadow-[0_0_60px_rgba(251,191,36,0.35)] group-hover:scale-105 transition-transform">
                  <span className="text-8xl filter brightness-0 opacity-80 group-hover:brightness-100 transition-all select-none">
                    {currentPuppet.icon}
                  </span>
                  <div className="absolute -bottom-3 bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full text-xs shadow">
                    اضغط ليتحدث الحيوان! 
                  </div>
                </div>

                <h4 className="text-lg font-black text-amber-300 mt-5 font-cairo">
                  {currentPuppet.name}
                </h4>
                <p className="text-xs text-amber-200/80 mt-1 max-w-sm font-medium">
                  "{currentPuppet.speech}"
                </p>
              </motion.div>
            </div>

            {/* Animal Selection Bar */}
            <div className="flex justify-center gap-2.5 z-20">
              {shadowPuppets.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveShadowIdx(idx);
                    speakArabic(item.speech);
                  }}
                  className={`px-3 py-2 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    idx === activeShadowIdx
                      ? 'border-amber-400 bg-amber-400/30 text-amber-300 shadow-md scale-105 ring-2 ring-amber-300'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
