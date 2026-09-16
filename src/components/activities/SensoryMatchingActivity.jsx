import React, { useState } from 'react';
import { Award, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { useSensory } from '../../context/SensoryContext';

const SHAPES_DATA = [
  { id: 1, name: "دَائِرَة خَضْرَاء هَادِئَة", type: "circle", colorClass: "bg-emerald-200 border-emerald-400 text-emerald-800", icon: "🟢", targetId: "target-circle" },
  { id: 2, name: "مُرَبَّع أَوْف وَايْت", type: "square", colorClass: "bg-cream-300 border-cream-500 text-cream-900", icon: "⏹️", targetId: "target-square" },
  { id: 3, name: "نَجْمَة سَمَاوِيَّة", type: "star", colorClass: "bg-sky-200 border-sky-400 text-sky-800", icon: "⭐", targetId: "target-star" },
  { id: 4, name: "قَلْب عَنَّابِي", type: "heart", colorClass: "bg-burgundy-200 border-burgundy-400 text-burgundy-900", icon: "❤️", targetId: "target-heart" }
];

export const SensoryMatchingActivity = ({ onFinish }) => {
  const { playCalmTone, markActivityComplete, addStar, playWrongFeedback } = useSensory();
  const [selectedCard, setSelectedCard] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const handleSelectSource = (item) => {
    if (matchedIds.includes(item.id)) return;
    setSelectedCard(item);
    playCalmTone('gentle-tap');
    setFeedback(`اخْتَرْتَ: ${item.name}. الآن اضْغَطْ عَلَى الشَّكْلِ الْمُطَابِق!`);
  };

  const handleSelectTarget = (target) => {
    if (!selectedCard) {
      setFeedback("اضغط على أحد الأشكال في الأعلى أولاً!");
      return;
    }

    if (selectedCard.type === target.type) {
      const newMatched = [...matchedIds, selectedCard.id];
      setMatchedIds(newMatched);
      setSelectedCard(null);
      playCalmTone('success');
      addStar(1);
      setFeedback(`رَائِع! تَطَابُقٌ نَاجِحٌ لِشَكْلِ ${target.name}!`);

      if (newMatched.length === SHAPES_DATA.length) {
        markActivityComplete('sensory-match');
      }
    } else {
      playWrongFeedback('خطأ! هذا شكل مختلف، حاول مرة ثانية يا بطل!');
      setFeedback("شَكْلٌ مُخْتَلِف، حَاوِلْ مَعَ الشَّكْلِ الْمُمَاثِل بِهُدُوء");
    }
  };

  const handleReset = () => {
    setMatchedIds([]);
    setSelectedCard(null);
    setFeedback(null);
  };

  const isCompleted = matchedIds.length === SHAPES_DATA.length;

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-cream-300">
        <div>
          <span className="px-3 py-1 bg-sky-100 text-sky-900 rounded-full text-xs font-bold">
            نَشَاطُ الْمُطَابَقَةِ وَالتَّرْكِيزِ الْبَصَرِي
          </span>
          <p className="text-xs text-cream-700 mt-1">تطابق مهدئ بدون مؤقت زمني لتقليل التوتر الحسي</p>
        </div>
        <div className="text-sm font-bold text-burgundy-900 bg-burgundy-50 border border-burgundy-200 px-3 py-1 rounded-full">
          المطابقة: {matchedIds.length} / {SHAPES_DATA.length}
        </div>
      </div>

      {isCompleted ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">إِنْجَازٌ رَائِع وَتَرْكِيزٌ عَالٍ! 🎉</h3>
          <p className="text-cream-800 mb-6 text-base">
            لَقَدْ قُمْتَ بِمُطَابَقَةِ جَمِيعِ الْأَشْكَالِ بِهُدُوءٍ وَدِقَّة.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-base transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>إِعَادَةُ النَّشَاط</span>
            </button>
            {onFinish && (
              <button
                onClick={onFinish}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-burgundy-800 hover:bg-burgundy-900 text-cream-50 font-bold text-base shadow-md transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>الْأَنْشِطَةُ التَّالِيَة</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Source Elements */}
          <div className="mb-6">
            <p className="text-sm font-bold text-cream-800 mb-3 text-center">
              1. اضْغَطْ عَلَى الشَّكْلِ هُنَا:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SHAPES_DATA.map((item) => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedCard?.id === item.id;

                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelectSource(item)}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      isMatched
                        ? 'opacity-30 border-dashed border-cream-400 bg-cream-100 cursor-not-allowed scale-95'
                        : isSelected
                        ? 'border-burgundy-700 bg-burgundy-50 shadow-md scale-105 ring-2 ring-burgundy-500'
                        : `${item.colorClass} hover:scale-102`
                    }`}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-xs font-bold text-center">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Guidance */}
          <div className="p-3 bg-cream-200/80 border border-cream-300 rounded-xl text-center text-sm font-medium text-cream-900 mb-6">
            {feedback || "اخْتَرْ شَكْلاً مِنْ الأَعْلَى ثُمَّ ابْحَثْ عَنْ مَثِيلِهِ فِي الْأَسْفَل 🍃"}
          </div>

          {/* Target Match Zone */}
          <div>
            <p className="text-sm font-bold text-cream-800 mb-3 text-center">
              2. طَابِقْ مَعَ الْمَكَانِ الْمُنَاسِب:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Shuffled targets */}
              {[SHAPES_DATA[2], SHAPES_DATA[0], SHAPES_DATA[3], SHAPES_DATA[1]].map((target) => {
                const isMatched = matchedIds.includes(target.id);
                return (
                  <button
                    key={`target-${target.id}`}
                    onClick={() => handleSelectTarget(target)}
                    className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${
                      isMatched
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                        : 'border-cream-400 bg-white hover:border-burgundy-500 hover:bg-cream-50'
                    }`}
                  >
                    <span className="text-3xl">{isMatched ? '✅' : target.icon}</span>
                    <span className="text-xs font-bold">
                      {isMatched ? 'تَمَّتِ الْمُطَابَقَة' : `مَكَان ${target.name}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
