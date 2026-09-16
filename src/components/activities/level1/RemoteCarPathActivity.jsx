import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Flag } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const RemoteCarPathActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  // Dedicated score counter for Remote Car Path activity
  const [remoteScore, setRemoteScore] = useState(0);
  const [carPos, setCarPos] = useState({ x: 50, y: 50 }); // Start in center of arena
  const [carRotation, setCarRotation] = useState(0); // 0deg (up), 90deg (right), 180deg (down), 270deg (left)
  const [driveCount, setDriveCount] = useState(0);
  const [targetGoal] = useState(8);
  const [isCompleted, setIsCompleted] = useState(false);

  // Checkpoint target inside arena
  const [targetPos, setTargetPos] = useState({ x: 80, y: 30 });

  // Move car smoothly in 4 directions & rotate car towards that direction!
  const handleDriveDirection = (dir) => {
    if (isCompleted) return;

    playCustomSound('rc_car_motor');
    addStar(1);

    const newScore = remoteScore + 10;
    const newCount = driveCount + 1;
    setRemoteScore(newScore);
    setDriveCount(newCount);

    let newRotation = carRotation;
    let newX = carPos.x;
    let newY = carPos.y;

    if (dir === 'up') {
      newRotation = 0;
      newY = Math.max(12, carPos.y - 14);
    } else if (dir === 'right') {
      newRotation = 90;
      newX = Math.min(88, carPos.x + 14);
    } else if (dir === 'down') {
      newRotation = 180;
      newY = Math.min(85, carPos.y + 14);
    } else if (dir === 'left') {
      newRotation = 270;
      newX = Math.max(12, carPos.x - 14);
    }

    setCarRotation(newRotation);
    setCarPos({ x: newX, y: newY });

    // Check collision / proximity with target checkpoint
    const dist = Math.hypot(newX - targetPos.x, newY - targetPos.y);
    if (dist < 18) {
      playCalmTone('success');
      // Respawn target at new location
      setTargetPos({
        x: Math.floor(Math.random() * 70) + 15,
        y: Math.floor(Math.random() * 60) + 20,
      });
    }

    if (newCount >= targetGoal) {
      setIsCompleted(true);
      markActivityComplete('remote-car-l1');
    }
  };

  const handleResetGame = () => {
    setRemoteScore(0);
    setDriveCount(0);
    setCarPos({ x: 50, y: 50 });
    setCarRotation(0);
    setTargetPos({ x: 80, y: 30 });
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Game Header & Dedicated Score Counter */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
            <span>النشاط الخامس</span>
            <span>السيارة بالريموت والتحكم بـ 4 اتجاهات</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">التحكم بالريموت وتوجيه السيارة بـ 4 اتجاهات 🎮</h3>
        </div>

        {/* Dedicated Game Score Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط ريموت السيارة:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{remoteScore} نقطة</span>
            </div>
          </div>
          <div className="bg-amber-100 border border-amber-300 px-3 py-2 rounded-2xl text-xs font-bold text-amber-900">
            التحركات: {driveCount} / {targetGoal}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-10 bg-white border border-cream-300 rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">قيادة وتوجيه بالريموت ممتاز! 🎉</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في توجيه السيارة في كل الاتجاهات وحصلت على <strong>{remoteScore} نقطة</strong>!
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
          <p className="text-xs text-cream-700 mb-4 text-center font-medium">
            🎮 استخدم أسهم ريموت التحكم بالأسفل لتوجيه وتدوير السيارة للأمام، للخلف، لليمين، ولليسار 🚗!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Interactive Driving Arena Track */}
            <div className="md:col-span-2 bg-slate-900 border-4 border-slate-800 rounded-3xl h-[300px] relative overflow-hidden shadow-inner flex items-center justify-center">
              {/* Decorative track lines */}
              <div className="w-[85%] h-[75%] border-2 border-dashed border-slate-700/60 rounded-2xl absolute pointer-events-none" />

              {/* Target Checkpoint Flag */}
              <div
                style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl animate-bounce z-10"
              >
                🏁
              </div>

              {/* Remote Car with Directional Rotation */}
              <div
                style={{ 
                  left: `${carPos.x}%`, 
                  top: `${carPos.y}%`,
                  transform: `translate(-50%, -50%) rotate(${carRotation}deg)`
                }}
                className="absolute text-5xl transition-all duration-300 filter drop-shadow-xl z-20"
              >
                🏎️
              </div>
            </div>

            {/* 4-Directional Arrow Remote Control Unit */}
            <div className="bg-white border border-cream-300 rounded-3xl p-6 shadow-soft flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-cream-800 mb-4 font-cairo">
                ريموت التحكم بالأسهم الـ 4:
              </span>
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-[200px]">
                {/* Top Row: Forward Arrow */}
                <div />
                <button
                  onClick={() => handleDriveDirection('up')}
                  className="p-4 bg-burgundy-900 text-white rounded-2xl flex flex-col items-center justify-center hover:bg-burgundy-950 active:scale-90 shadow-md cursor-pointer"
                  title="أمام"
                >
                  <ArrowUp className="w-6 h-6 text-amber-300" />
                  <span className="text-[9px] font-bold mt-1">أمام</span>
                </button>
                <div />

                {/* Middle Row: Left, Center, Right Arrows */}
                <button
                  onClick={() => handleDriveDirection('left')}
                  className="p-4 bg-burgundy-900 text-white rounded-2xl flex flex-col items-center justify-center hover:bg-burgundy-950 active:scale-90 shadow-md cursor-pointer"
                  title="يسار"
                >
                  <ArrowLeft className="w-6 h-6 text-amber-300" />
                  <span className="text-[9px] font-bold mt-1">يسار</span>
                </button>
                <div className="flex items-center justify-center bg-cream-100 rounded-2xl border border-cream-300 text-xl font-bold text-burgundy-900">
                  🎮
                </div>
                <button
                  onClick={() => handleDriveDirection('right')}
                  className="p-4 bg-burgundy-900 text-white rounded-2xl flex flex-col items-center justify-center hover:bg-burgundy-950 active:scale-90 shadow-md cursor-pointer"
                  title="يمين"
                >
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                  <span className="text-[9px] font-bold mt-1">يمين</span>
                </button>

                {/* Bottom Row: Backward Arrow */}
                <div />
                <button
                  onClick={() => handleDriveDirection('down')}
                  className="p-4 bg-burgundy-900 text-white rounded-2xl flex flex-col items-center justify-center hover:bg-burgundy-950 active:scale-90 shadow-md cursor-pointer"
                  title="خلف"
                >
                  <ArrowDown className="w-6 h-6 text-amber-300" />
                  <span className="text-[9px] font-bold mt-1">خلف</span>
                </button>
                <div />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
