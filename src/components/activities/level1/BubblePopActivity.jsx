import React, { useState, useEffect } from 'react';
import { Award, RotateCcw, Sparkles, Volume2, Shield, Trophy } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const BubblePopActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();
  
  // Dedicated score counter for Soap Bubbles activity
  const [gameScore, setGameScore] = useState(0);
  const [targetGoal] = useState(10);
  const [poppedCount, setPoppedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [popEffects, setPopEffects] = useState([]);

  // Floating bubbles state array inside the frame
  const [bubbles, setBubbles] = useState([
    { id: 1, x: 20, y: 30, size: 64, color: 'from-pink-300/80 to-purple-300/60 border-pink-400', speedX: 0.4, speedY: -0.5 },
    { id: 2, x: 60, y: 70, size: 72, color: 'from-sky-300/80 to-teal-300/60 border-sky-400', speedX: -0.3, speedY: -0.4 },
    { id: 3, x: 40, y: 50, size: 56, color: 'from-amber-300/80 to-rose-300/60 border-amber-400', speedX: 0.5, speedY: -0.6 },
    { id: 4, x: 75, y: 25, size: 68, color: 'from-emerald-300/80 to-cyan-300/60 border-emerald-400', speedX: -0.4, speedY: -0.3 },
    { id: 5, x: 25, y: 75, size: 60, color: 'from-purple-300/80 to-indigo-300/60 border-purple-400', speedX: 0.3, speedY: -0.5 },
  ]);

  // Animation loop for gentle floating movement of bubbles inside the framed area
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setBubbles(prevBubbles =>
        prevBubbles.map(b => {
          let newX = b.x + b.speedX;
          let newY = b.y + b.speedY;

          // Bounce off left/right frame borders
          if (newX <= 5 || newX >= 88) b.speedX *= -1;
          // Bounce off top/bottom frame borders
          if (newY <= 5 || newY >= 82) b.speedY *= -1;

          return {
            ...b,
            x: Math.max(5, Math.min(88, newX)),
            y: Math.max(5, Math.min(82, newY))
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isCompleted]);

  // Handle popping a bubble ("يفسيه")
  const handlePopBubble = (bubbleId, e) => {
    if (isCompleted) return;

    if (e) {
      e.stopPropagation();
    }

    const clickedBubble = bubbles.find(b => b.id === bubbleId);
    if (clickedBubble) {
      const popId = Date.now() + Math.random();
      setPopEffects(prev => [...prev, { id: popId, x: clickedBubble.x, y: clickedBubble.y, size: clickedBubble.size }]);
      setTimeout(() => {
        setPopEffects(prev => prev.filter(p => p.id !== popId));
      }, 600);
    }

    try {
      if (typeof playCustomSound === 'function') {
        playCustomSound('bubble_pop');
      } else if (typeof playCalmTone === 'function') {
        playCalmTone('success');
      }
    } catch (err) {
      console.warn('Sound playback fallback', err);
    }

    addStar(1);

    // Update dedicated score counter
    const newScore = gameScore + 10;
    const newPopped = poppedCount + 1;
    setGameScore(newScore);
    setPoppedCount(newPopped);

    // Respawn popped bubble at a new random position inside frame
    setBubbles(prev =>
      prev.map(b => {
        if (b.id === bubbleId) {
          return {
            ...b,
            x: Math.floor(Math.random() * 75) + 10,
            y: Math.floor(Math.random() * 65) + 15,
            speedX: (Math.random() - 0.5) * 0.8,
            speedY: (Math.random() - 0.5) * 0.8
          };
        }
        return b;
      })
    );

    // Check completion condition
    if (newPopped >= targetGoal) {
      setIsCompleted(true);
      if (typeof speakArabic === 'function') {
        speakArabic('ممتاز يا بطل! فرقعت جميع الفقاعات بنجاح!');
      }
      markActivityComplete('bubble-pop-l1');
    }
  };

  const handleResetGame = () => {
    setGameScore(0);
    setPoppedCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Game Header & Dedicated Score Counter */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold mb-1">
            <span>النشاط الأول </span>
            <span>لعبة فرقعة فقاعات الصابون</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">تتبع وفرقعة فقاعات الصابون</h3>
        </div>

        {/* Dedicated Game Score Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط اللعبة:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{gameScore} نقطة</span>
            </div>
          </div>
          <div className="bg-sky-100 border border-sky-300 px-3 py-2 rounded-2xl text-xs font-bold text-sky-900">
            الفقاعات المفرقعة: {poppedCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-10 bg-white border border-cream-300 rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">إنجاز ممتاز وفائق!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            لقد نجحت في تتبع وفرقعة {targetGoal} فقاعات صابون وحصلت على <strong>{gameScore} نقطة</strong> خاصة بهذه اللعبة!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleResetGame}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>اللعب مجدداً</span>
            </button>
            {onFinish && (
              <button
                onClick={onFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-burgundy-900 text-cream-50 font-bold text-sm shadow-md"
              >
                <span>الانتقال للنشاط التالي</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xs text-cream-700 mb-3 text-center font-medium">
             انظر إلى الشاشة، تتبع الفقاعات التي تطفو واضغط عليها لفرقعتها وإحراز النقاط!
          </p>

          {/* Framed Interactive Screen Area */}
          <div className="bg-gradient-to-b from-sky-50 via-indigo-50/40 to-blue-50 border-4 border-indigo-200 rounded-3xl h-[340px] relative overflow-hidden shadow-inner cursor-pointer select-none">
            {/* Soft decorative light highlights inside frame */}
            <div className="absolute top-4 left-4 w-24 h-24 bg-white/40 rounded-full blur-xl pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-32 h-32 bg-sky-200/30 rounded-full blur-xl pointer-events-none" />

            {/* Interactive Floating Soap Bubbles */}
            {bubbles.map((b) => (
              <button
                key={b.id}
                onClick={(e) => handlePopBubble(b.id, e)}
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                }}
                className={`absolute rounded-full bg-gradient-to-tr ${b.color} border-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-110 active:scale-75 animate-pulse flex items-center justify-center cursor-pointer`}
              >
                <div className="w-3 h-3 bg-white/70 rounded-full absolute top-2 right-2 blur-[0.5px]" />
                <span className="text-xs opacity-0 hover:opacity-100 transition-opacity text-white font-bold">فرقع!</span>
              </button>
            ))}

            {/* Visual Pop Burst Effects */}
            {popEffects.map((p) => (
              <div
                key={p.id}
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size * 1.3}px`,
                  height: `${p.size * 1.3}px`,
                }}
                className="absolute pointer-events-none rounded-full border-4 border-amber-300 animate-ping flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-amber-400 animate-spin" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
