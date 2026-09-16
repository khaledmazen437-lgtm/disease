import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Sparkles, Navigation } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const VehicleChaserActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  // Dedicated score counter for Vehicle Chaser activity
  const [chaserScore, setChaserScore] = useState(0);
  const [targetGoal] = useState(6);
  const [chasedCount, setChasedCount] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState('car'); // 'car' | 'plane' | 'rocket'
  const [isCompleted, setIsCompleted] = useState(false);

  // Vehicles config
  const vehicles = {
    car: { name: 'السيارة الملونة', icon: '🚗', color: 'bg-rose-500' },
    plane: { name: 'الطيارة السريعة', icon: '✈️', color: 'bg-sky-500' },
    rocket: { name: 'الصاروخ الفضائي', icon: '🚀', color: 'bg-purple-500' },
  };

  // Target balls positions inside frame
  const [targetBall, setTargetBall] = useState({ x: 50, y: 40, color: 'bg-amber-400', icon: '🟡' });
  const [vehiclePos, setVehiclePos] = useState({ x: 20, y: 70 });

  const handleTapBall = () => {
    if (isCompleted) return;

    playCustomSound('car_engine');
    addStar(1);

    // Move vehicle towards ball position smoothly
    setVehiclePos({ x: targetBall.x, y: targetBall.y });

    // Update dedicated score for vehicle chaser (+15 points)
    const newScore = chaserScore + 15;
    const newChased = chasedCount + 1;
    setChaserScore(newScore);
    setChasedCount(newChased);

    if (newChased >= targetGoal) {
      setIsCompleted(true);
      markActivityComplete('vehicle-chaser-l1');
    } else {
      // Spawn new target ball at random coordinates
      const colors = ['bg-amber-400', 'bg-emerald-400', 'bg-rose-400', 'bg-purple-400', 'bg-sky-400'];
      const icons = ['🟡', '🟢', '🔴', '🟣', '🔵'];
      const randIdx = Math.floor(Math.random() * colors.length);

      setTimeout(() => {
        setTargetBall({
          x: Math.floor(Math.random() * 70) + 15,
          y: Math.floor(Math.random() * 60) + 15,
          color: colors[randIdx],
          icon: icons[randIdx]
        });
      }, 400);
    }
  };

  const handleResetGame = () => {
    setChaserScore(0);
    setChasedCount(0);
    setVehiclePos({ x: 20, y: 70 });
    setTargetBall({ x: 50, y: 40, color: 'bg-amber-400', icon: '🟡' });
    setIsCompleted(false);
  };

  const currentVehicle = vehicles[selectedVehicle];

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Game Header & Dedicated Score Counter */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 text-xs font-bold mb-1">
            <span>النشاط الرابع</span>
            <span>كرات ملونة ومطاردة المركبات</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">تتبع الكرات الملونة بالمطاردة</h3>
        </div>

        {/* Dedicated Game Score Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط مطاردة المركبات:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{chaserScore} نقطة</span>
            </div>
          </div>
          <div className="bg-indigo-100 border border-indigo-300 px-3 py-2 rounded-2xl text-xs font-bold text-indigo-900">
            الكرات المطاردة: {chasedCount} / {targetGoal}
          </div>
        </div>
      </div>

      {/* Vehicle Selection Bar */}
      <div className="flex justify-center items-center gap-3 mb-4">
        <span className="text-xs font-bold text-cream-800">اختر مركبة المطاردة:</span>
        {Object.keys(vehicles).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedVehicle(key)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
              selectedVehicle === key
                ? 'bg-burgundy-900 text-white border-burgundy-950 shadow-md scale-105'
                : 'bg-white border-cream-300 text-cream-900 hover:bg-cream-100'
            }`}
          >
            <span>{vehicles[key].icon}</span>
            <span>{vehicles[key].name}</span>
          </button>
        ))}
      </div>

      {isCompleted ? (
        <div className="text-center py-10 bg-white border border-cream-300 rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">مطاردة وتتبع بصرى خارق! 🎉</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في ملاحقة وتتبع جميع الكرات الملونة بـ {currentVehicle.name} وحصلت على <strong>{chaserScore} نقطة</strong> خاصة بهذه اللعبة!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleResetGame}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة اللعب</span>
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
             انظر إلى الكرة الملونة واضغط عليها لتتحرك {currentVehicle.name} فوراً نحوها وتصطادها!
          </p>

          {/* Framed Chaser Field */}
          <div className="bg-slate-900 border-4 border-slate-800 rounded-3xl h-[320px] relative overflow-hidden shadow-inner">
            {/* Target Colored Ball */}
            <button
              onClick={handleTapBall}
              style={{ left: `${targetBall.x}%`, top: `${targetBall.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-2xl shadow-lg animate-bounce transition-all hover:scale-125 cursor-pointer z-20"
            >
              {targetBall.icon}
            </button>

            {/* Chasing Vehicle Icon moving towards ball */}
            <div
              style={{ left: `${vehiclePos.x}%`, top: `${vehiclePos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl transition-all duration-500 ease-out z-10 filter drop-shadow-lg"
            >
              {currentVehicle.icon}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
