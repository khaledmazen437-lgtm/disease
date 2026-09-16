import React, { useState } from 'react';
import { Award, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft, Sun } from 'lucide-react';
import { useSensory } from '../../context/SensoryContext';

const MORNING_STEPS = [
  { id: 'wake', order: 1, title: 'الاستيقاظ من النوم', emoji: '☀️', desc: 'أفتح عيني بابتسامة هادئة' },
  { id: 'brush', order: 2, title: 'تنظيف الأسنان والوجه', emoji: '🪥', desc: 'أغسل وجهي وأنظف أسناني بالفرشاة' },
  { id: 'clothes', order: 3, title: 'ارتداء الملابس', emoji: '👕', desc: 'أرتدي ملابسي المريحة' },
  { id: 'breakfast', order: 4, title: 'تناول فطور صحي', emoji: '🥛', desc: 'أشرب الحليب وأتناول طعاماً لذيذاً' },
];

export const RoutineSequencerActivity = ({ onFinish }) => {
  const { playCalmTone, markActivityComplete, addStar } = useSensory();
  // Start with shuffled steps
  const [currentOrder, setCurrentOrder] = useState([
    MORNING_STEPS[2], // Clothes
    MORNING_STEPS[0], // Wake
    MORNING_STEPS[3], // Breakfast
    MORNING_STEPS[1], // Brush
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const moveItem = (index, direction) => {
    playCalmTone('gentle-tap');
    const newItems = [...currentOrder];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setCurrentOrder(newItems);
    
    // Check if sorted
    const isSorted = newItems.every((item, idx) => item.order === idx + 1);
    if (isSorted) {
      setIsSuccess(true);
      playCalmTone('success');
      addStar(3);
      markActivityComplete('routine-sequencer');
    }
  };

  const handleReset = () => {
    setCurrentOrder([
      MORNING_STEPS[2],
      MORNING_STEPS[0],
      MORNING_STEPS[3],
      MORNING_STEPS[1],
    ]);
    setIsSuccess(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-cream-300">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <span className="px-3 py-0.5 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
              رُوتِينُ الصَّبَاحِ الْبَصَرِي
            </span>
            <h4 className="font-bold text-cream-950 text-base">رَتِّبْ خُطُوَاتِ صَبَاحِكَ الْمُمَيَّز</h4>
          </div>
        </div>
      </div>

      {isSuccess ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">رَائِع جِدّاً! صَبَاحُكَ مُنَظَّم وَمُشْرِق 🌅</h3>
          <p className="text-cream-800 mb-6 text-base">
            لَقَدْ رَتَّبْتَ خُطُوَاتِ الْيَوْمِ بِتَرْتِيبٍ صَحِيح وَمُمْتَاز!
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-base transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>إِعَادَةُ التَّرْتِيب</span>
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
        <div className="space-y-3">
          <p className="text-xs text-cream-700 font-medium mb-2">
            اضْغَطْ عَلَى الأَسْهُم لِتَحْرِيكِ كُلِّ خُطْوَةٍ إِلَى مَوْقِعِهَا الصَّحِيح:
          </p>

          {currentOrder.map((step, idx) => (
            <div
              key={step.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-cream-300 hover:border-burgundy-300 transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-cream-200 text-burgundy-900 font-bold flex items-center justify-center text-sm">
                  {idx + 1}
                </span>
                <span className="text-3xl select-none">{step.emoji}</span>
                <div>
                  <h5 className="font-bold text-base text-cream-950 font-cairo">{step.title}</h5>
                  <p className="text-xs text-cream-700">{step.desc}</p>
                </div>
              </div>

              {/* Move Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  disabled={idx === 0}
                  onClick={() => moveItem(idx, -1)}
                  className="p-2 rounded-xl bg-cream-100 hover:bg-burgundy-100 text-burgundy-900 disabled:opacity-30 disabled:hover:bg-cream-100 transition-colors"
                  title="نقل للأعلى"
                >
                  <span className="font-bold text-xs">▲</span>
                </button>
                <button
                  disabled={idx === currentOrder.length - 1}
                  onClick={() => moveItem(idx, 1)}
                  className="p-2 rounded-xl bg-cream-100 hover:bg-burgundy-100 text-burgundy-900 disabled:opacity-30 disabled:hover:bg-cream-100 transition-colors"
                  title="نقل للأسفل"
                >
                  <span className="font-bold text-xs">▼</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
