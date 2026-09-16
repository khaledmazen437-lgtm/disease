import React, { useState, useEffect } from 'react';
import { Award, RotateCcw, Trophy, CloudRain, Droplets } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const RainCloudActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  // Dedicated score counter for Rain Cloud activity
  const [rainScore, setRainScore] = useState(0);
  const [targetGoal] = useState(6);
  const [caughtCount, setCaughtCount] = useState(0);
  const [bowlWaterLevel, setBowlWaterLevel] = useState(10); // Water level inside bowl (10% to 100%)
  const [isCompleted, setIsCompleted] = useState(false);

  // Slow, gentle raindrops falling straight down into the bowl
  const [raindrops, setRaindrops] = useState([
    { id: 1, x: 25, y: 15, speed: 0.4 },
    { id: 2, x: 50, y: 10, speed: 0.5 },
    { id: 3, x: 75, y: 20, speed: 0.45 },
  ]);

  // Raindrops animation falling into bowl
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setRaindrops(prev =>
        prev.map(drop => {
          let newY = drop.y + drop.speed;
          // When drop lands inside the bottom bowl area (y >= 75%)
          if (newY >= 75) {
            newY = 12; // Loop drop back to top cloud
          }
          return { ...drop, y: newY };
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, [isCompleted]);

  // Catch raindrop and fill bowl with water!
  const handleCatchDrop = (dropId) => {
    if (isCompleted) return;

    playCustomSound('rain_stream');
    addStar(1);

    const newScore = rainScore + 15;
    const newCaught = caughtCount + 1;
    const newWaterLevel = Math.min(100, bowlWaterLevel + 15);

    setRainScore(newScore);
    setCaughtCount(newCaught);
    setBowlWaterLevel(newWaterLevel);

    // Reset caught drop to top cloud
    setRaindrops(prev =>
      prev.map(d => (d.id === dropId ? { ...d, y: 12, x: Math.floor(Math.random() * 65) + 15 } : d))
    );

    if (newCaught >= targetGoal) {
      setIsCompleted(true);
      markActivityComplete('rain-cloud-l1');
    }
  };

  const handleResetGame = () => {
    setRainScore(0);
    setCaughtCount(0);
    setBowlWaterLevel(10);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Game Header & Dedicated Score Counter */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold mb-1">
            <span>النشاط السابع</span>
            <span>تجميع ماء السحابة في الوعاء</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">تجميع قطرات المطر وملء الوعاء بالماء 🥣</h3>
        </div>

        {/* Dedicated Game Score Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط السحابة:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{rainScore} نقطة</span>
            </div>
          </div>
          <div className="bg-sky-100 border border-sky-300 px-3 py-2 rounded-2xl text-xs font-bold text-sky-900">
            امتلاء الوعاء: {bowlWaterLevel}%
          </div>
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-10 bg-white border border-cream-300 rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">امتلاء الوعاء بالماء بنجاح! 🎉🥣</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في تجميع قطرات المطر وملء وعاء الماء بالكامل وحصلت على <strong>{rainScore} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleResetGame}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة ملء الوعاء</span>
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
             اضغط على قطرات المطر لتجميعها وتسقيلها مباشرة لتملأ الوعاء بالماء بالأسفل!
          </p>

          {/* Rain & Water Bowl Container */}
          <div className="bg-gradient-to-b from-slate-900 via-sky-950 to-blue-950 border-4 border-slate-800 rounded-3xl h-[330px] relative overflow-hidden shadow-inner flex flex-col justify-between">
            {/* Top Cloud */}
            <div className="pt-3 flex justify-center items-center gap-2 text-white/90">
              <CloudRain className="w-16 h-16 text-sky-300 animate-pulse" />
              <span className="text-xs font-bold font-cairo">سحابة المطر المهدئة </span>
            </div>

            {/* Falling Raindrops */}
            {raindrops.map((drop) => (
              <button
                key={drop.id}
                onClick={() => handleCatchDrop(drop.id)}
                style={{ left: `${drop.x}%`, top: `${drop.y}%` }}
                className="absolute -translate-x-1/2 w-12 h-14 rounded-b-full bg-gradient-to-b from-sky-200 via-sky-400 to-blue-500 border-2 border-white flex items-center justify-center shadow-xl transition-transform hover:scale-125 active:scale-90 cursor-pointer z-20"
              >
                <Droplets className="w-6 h-6 text-white" />
              </button>
            ))}

            {/* Bottom Interactive Water Bowl */}
            <div className="pb-3 px-8 flex justify-center">
              <div className="w-80 h-24 bg-amber-100/10 border-4 border-amber-300/80 rounded-b-[3rem] relative overflow-hidden flex items-end justify-center backdrop-blur-md shadow-2xl">
                {/* Water Level Filling Layer */}
                <div
                  style={{ height: `${bowlWaterLevel}%` }}
                  className="w-full bg-gradient-to-t from-blue-600 via-sky-500 to-sky-300 transition-all duration-500 relative flex items-center justify-center"
                >
                  {/* Water Ripple Surface Line */}
                  <div className="w-full h-1.5 bg-white/70 absolute top-0 animate-pulse" />
                  <span className="text-xs font-black text-white drop-shadow font-cairo z-10">
                    وعاء المجمع: {bowlWaterLevel}% 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
