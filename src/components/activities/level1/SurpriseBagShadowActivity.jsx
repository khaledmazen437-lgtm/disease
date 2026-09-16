import React, { useState } from 'react';
import { Award, RotateCcw, Trophy, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const SurpriseBagShadowActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, markActivityComplete, addStar } = useSensory();

  // Dedicated score counter for Surprise Bag activity
  const [bagScore, setBagScore] = useState(0);
  const [currentStage, setCurrentStage] = useState(1); // Stage 1 (1 item), Stage 2 (2 items), Stage 3 (3 items), Stage 4 (4 items)
  const [isBagOpened, setIsBagOpened] = useState(false);
  const [matchedInStage, setMatchedInStage] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Pool of surprise items
  const itemsPool = [
    { id: 1, name: 'دبدوب الألعاب', icon: '🧸' },
    { id: 2, name: 'السيارة الملونة', icon: '🚗' },
    { id: 3, name: 'النجمة المضيئة', icon: '⭐' },
    { id: 4, name: 'التفاحة الحمراء', icon: '🍎' },
    { id: 5, name: 'الكرة الملونة', icon: '⚽' },
    { id: 6, name: 'القطة اللطيفة', icon: '🐱' },
    { id: 7, name: 'الطيارة السريعة', icon: '✈️' },
    { id: 8, name: 'الصاروخ الفضائي', icon: '🚀' },
    { id: 9, name: 'علبة الألوان', icon: '🎨' },
    { id: 10, name: 'المكعب الخشبي', icon: '🧩' },
  ];

  // Stage items configuration
  // Stage 1: 1 item | Stage 2: 2 items | Stage 3: 3 items | Stage 4: 4 items
  const getStageItems = (stage) => {
    return itemsPool.slice(0, stage);
  };

  const stageItems = getStageItems(currentStage);

  // Open Bag for current stage
  const handleOpenBag = () => {
    playCustomSound('bag_zipper');
    setIsBagOpened(true);
  };

  // Match shadow target
  const handleMatchShadow = (targetItem) => {
    if (matchedInStage.includes(targetItem.id)) return;

    playCustomSound('bakh_surprise');
    addStar(1);

    const newScore = bagScore + 15;
    const newMatched = [...matchedInStage, targetItem.id];

    setBagScore(newScore);
    setMatchedInStage(newMatched);

    // If all items in this stage are matched, advance to next stage!
    if (newMatched.length === stageItems.length) {
      if (currentStage < 4) {
        setTimeout(() => {
          setCurrentStage(prev => prev + 1);
          setMatchedInStage([]);
          setIsBagOpened(false);
        }, 600);
      } else {
        setIsCompleted(true);
        markActivityComplete('surprise-bag-l1');
      }
    }
  };

  const handleResetGame = () => {
    setBagScore(0);
    setCurrentStage(1);
    setMatchedInStage([]);
    setIsBagOpened(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Game Header & Dedicated Score Counter */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-900 border border-rose-300 text-xs font-bold mb-1">
            <span>النشاط الثامن</span>
            <span>مراحل مطابقة الظل التدريجية</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">مراحل مطابقة المفاجآت والظلال (المرحلة {currentStage} من 4) 🎁</h3>
        </div>

        {/* Dedicated Game Score Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط مطابقة الظل:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{bagScore} نقطة</span>
            </div>
          </div>
          <div className="bg-rose-100 border border-rose-300 px-3 py-2 rounded-2xl text-xs font-bold text-rose-900">
            المرحلة الحالية: {currentStage} / 4
          </div>
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-10 bg-white border border-cream-300 rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">إنجاز كافة مراحل مطابقة الظل! 🎉🎁</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في اجتياز جميع المراحل التدريجية لمطابقة الظلال وحصلت على <strong>{bagScore} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleResetGame}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة اللعب من المرحلة 1</span>
            </button>
            {onFinish && (
              <button
                onClick={onFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-burgundy-900 text-cream-50 font-bold text-sm shadow-md"
              >
                <span>إنهاء المستوى الأول</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          {!isBagOpened ? (
            /* Step 1: Open Bag for Current Stage */
            <div className="bg-white border border-cream-300 rounded-3xl p-8 text-center shadow-soft">
              <p className="text-xs text-cream-700 mb-4 font-medium">
                 المرحلة {currentStage}: افتح كيس المفاجآت لاكتشاف ({currentStage}) {currentStage === 1 ? 'مفاجأة واحدة' : currentStage === 2 ? 'مفاجأتان' : 'مفاجآت'}!
              </p>
              <button
                onClick={handleOpenBag}
                className="p-8 rounded-3xl bg-gradient-to-tr from-burgundy-800 to-burgundy-950 text-amber-300 shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center mx-auto gap-3 border-2 border-burgundy-700 cursor-pointer"
              >
                <Gift className="w-20 h-20 animate-bounce" />
                <span className="text-sm font-bold font-cairo text-white">
                  افتح كيس المفاجآت (المرحلة {currentStage}) 
                </span>
              </button>
            </div>
          ) : (
            /* Step 2: Match Revealed Stage Items with Shadows */
            <div className="bg-white border border-cream-300 rounded-3xl p-6 shadow-soft text-center">
              <span className="text-xs font-bold text-cream-800 block mb-3">
                المفاجآت المكتشفة في المرحلة {currentStage}:
              </span>

              {/* Revealed Stage Items */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {stageItems.map((item) => {
                  const isMatched = matchedInStage.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border flex flex-col items-center gap-1 transition-all ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 opacity-60'
                          : 'bg-amber-50 border-amber-300 shadow-sm animate-pulse'
                      }`}
                    >
                      <span className="text-5xl">{item.icon}</span>
                      <span className="text-xs font-bold font-cairo text-cream-900">{item.name}</span>
                      {isMatched && (
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> تمت المطابقة
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs font-bold text-cream-800 mb-4">
                اضغط على الظل المطابق لكل عنصر من الظلال المعروضة بالأسفل:
              </p>

              {/* Shadow Targets Grid matching the stage items count */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
                {stageItems.map((item) => {
                  const isMatched = matchedInStage.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleMatchShadow(item)}
                      className={`p-5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-400 opacity-50 cursor-not-allowed'
                          : 'border-cream-400 bg-cream-100 hover:border-burgundy-500 hover:bg-cream-50 hover:scale-105 active:scale-95 cursor-pointer'
                      }`}
                    >
                      <span className="text-5xl filter brightness-0 opacity-75">{item.icon}</span>
                      <span className="text-xs font-bold text-cream-700">
                        {isMatched ? ' تم التنسيق' : `ظل ${item.name}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
