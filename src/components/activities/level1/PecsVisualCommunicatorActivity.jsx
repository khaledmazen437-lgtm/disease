import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Trophy, RotateCcw, Award, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

// PECS 3D Tactile Cards Dataset
const PECS_CARDS = [
  { id: 'water', label: 'ماء', category: 'احتياجات', speechText: 'أريد أن أشرب ماء', bg: 'bg-blue-600', border: 'border-blue-800' },
  { id: 'food', label: 'أكل', category: 'احتياجات', speechText: 'أنا جائع، أريد طعاماً', bg: 'bg-amber-600', border: 'border-amber-800' },
  { id: 'happy', label: 'سعيد', category: 'مشاعر', speechText: 'أنا أشعر بالسعادة والراحة', bg: 'bg-emerald-600', border: 'border-emerald-800' },
  { id: 'play', label: 'لعب', category: 'أنشطة', speechText: 'أريد أن ألعب بالأنشطة التفاعلية', bg: 'bg-purple-600', border: 'border-purple-800' },
  { id: 'sleep', label: 'نوم', category: 'احتياجات', speechText: 'أشعر بالتعب وأريد أن أنام', bg: 'bg-indigo-600', border: 'border-indigo-800' },
  { id: 'help', label: 'مساعدة', category: 'تواصل', speechText: 'من فضل مساعدة', bg: 'bg-rose-600', border: 'border-rose-800' },
];

export const PecsVisualCommunicatorActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectPecsCard = (card) => {
    playCustomSound('gentle-tap');
    speakArabic(card.speechText);
    addStar(1);

    const newSelection = [...selectedCards, card];
    const newScore = score + 15;
    setSelectedCards(newSelection);
    setScore(newScore);

    if (newSelection.length >= 4) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'pecs-visual-communicator-l1',
          'شاطر شاطر يا بطل!',
          'ممتاز! أتقنت استخدام بطاقات PECS للتواصل البصري والتعبير عن احتياجاتك!'
        );
      }, 1500);
    }
  };

  const handleClearSentence = () => {
    setSelectedCards([]);
  };

  const handleSpeakSentence = () => {
    if (selectedCards.length === 0) return;
    const fullSentence = selectedCards.map((c) => c.speechText).join(' .. ');
    speakArabic(fullSentence);
  };

  const handleReset = () => {
    setSelectedCards([]);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-4xl mx-auto shadow-soft font-cairo">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>نظام PECS العالمي • لوحة التبادل البصري والرمزي</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            لوحة بطاقات PECS المصورة للتواصل البصري والتعبير عن الذات
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط التواصل:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-emerald-100 border border-emerald-300 px-3 py-2 rounded-2xl text-xs font-bold text-emerald-950">
            البطاقات المتبادلة: {selectedCards.length}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-burgundy-950 mb-2">تواصل بصري ورمزي ممتاااز!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            نجحت في التعبير عن الاحتياجات والمشاعر ببطاقات PECS المصورة وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="btn-dribbble-glass">
              <RotateCcw className="w-4 h-4" /> <span>إعادة اللوحة</span>
            </button>
            {onFinish && (
              <button onClick={onFinish} className="btn-dribbble-primary">
                الانتقال للنشاط التالي
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Active Sentence Exchange Bar */}
          <div className="bg-white border-2 border-emerald-300 rounded-2xl p-4 shadow-sm min-h-[90px] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-cream-700 block">الجملة البصرية المتبادلة:</span>
              {selectedCards.length === 0 ? (
                <span className="text-xs text-cream-500 font-medium">اضغط على بطاقات PECS بالأسفل لبناء جملتك للتواصل..</span>
              ) : (
                selectedCards.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`px-4 py-2 rounded-xl text-white font-extrabold text-xs shadow-md ${c.bg}`}
                  >
                    {c.label}
                  </motion.div>
                ))
              )}
            </div>

            {selectedCards.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeakSentence}
                  className="btn-dribbble-primary py-2 px-4 text-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>نطق الجملة</span>
                </button>
                <button
                  onClick={handleClearSentence}
                  className="btn-dribbble-glass py-2 px-3 text-xs"
                >
                  مسح
                </button>
              </div>
            )}
          </div>

          {/* PECS 3D Tactile Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {PECS_CARDS.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectPecsCard(card)}
                className={`card-3d-tilt p-5 flex flex-col items-center justify-between text-center cursor-pointer border-2 ${card.border}`}
              >
                <div className={`w-16 h-16 rounded-2xl ${card.bg} text-white flex items-center justify-center font-black text-lg shadow-lg mb-3 border-t-2 border-white/40`}>
                  {card.label}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-burgundy-950 mb-1">{card.label}</h4>
                  <span className="text-[10px] font-bold bg-cream-100 text-cream-800 px-2 py-0.5 rounded-full border border-cream-200">
                    {card.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
