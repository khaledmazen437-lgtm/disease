import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Trophy, RotateCcw, Award, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const TunnelAdventureActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [collectedParts, setCollectedParts] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFaceAssembled, setIsFaceAssembled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Tunnel checkpoints: items to collect
  const tunnelCheckpoints = [
    { id: 'apple', name: 'تفاحة حمراء 🍎', partName: 'العينان المشرقتان 👀', icon: '🍎', partIcon: '👀', desc: 'جمعت التفاحة وحصلت على العينين!' },
    { id: 'banana', name: 'موزة صفراء 🍌', partName: 'الأنف اللطيف 👃', icon: '🍌', partIcon: '👃', desc: 'جمعت الموزة وحصلت على الأنف!' },
    { id: 'strawberry', name: 'فراولة حلوة 🍓', partName: 'الابتسامة الجميلة 👄', icon: '🍓', partIcon: '👄', desc: 'جمعت الفراولة وحصلت على الابتسامة!' },
    { id: 'orange', name: 'برتقالة منعشة 🍊', partName: 'الشعر الأنيق 👦', icon: '🍊', partIcon: '👦', desc: 'جمعت البرتقالة واكتمل الرأس والشعر!' },
  ];

  const handleCollect = (stepIdx) => {
    if (collectedParts.includes(stepIdx)) return;

    const item = tunnelCheckpoints[stepIdx];
    playCustomSound('pop');
    playCalmTone('success');
    speakArabic(`جمعت ${item.name}! والآن حصلت على ${item.partName}!`);
    addStar(2);

    const updated = [...collectedParts, stepIdx];
    setCollectedParts(updated);
    setScore((prev) => prev + 25);

    if (updated.length >= tunnelCheckpoints.length) {
      setTimeout(() => {
        setIsFaceAssembled(true);
        speakArabic('يا لها من مفاجأة مذهلة! لقد جمعت كل قطع الوجه واكتمل الوجه المبتسم الجميل في نهاية النفق!');
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete(
            'tunnel-face-l3',
            'إكمال رحلة النفق وتكوين الوجه! 🚇😊',
            'شاطر شاطر! أحسنت في جمع الفواكه وتكوين الوجه الكامل في نهاية النفق!'
          );
        }, 3200);
      }, 1000);
    } else {
      setCurrentStep(stepIdx + 1);
    }
  };

  const handleReset = () => {
    setCollectedParts([]);
    setCurrentStep(0);
    setScore(0);
    setIsFaceAssembled(false);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-900 border border-teal-300 text-xs font-bold mb-1">
            <Compass className="w-3.5 h-3.5 text-teal-700" />
            <span>المستوى الثالث - النشاط 4</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            لعبة النفق: جمع الفواكه وتكوين الوجه 🚇🍎
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">النقاط:</span>
              <span className="text-lg font-black text-amber-700 font-cairo">{score} نقطة</span>
            </div>
          </div>
          <div className="bg-teal-100 border border-teal-300 px-3 py-2 rounded-2xl text-xs font-bold text-teal-900">
            المجموعات: {collectedParts.length} / {tunnelCheckpoints.length}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">رحلة نفق مذهلة وتكوين متقن! 🎉</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            لقد جمعت جميع الفواكه وأجزاء الوجه وكونت شخصية مبتسمة بذكاء وحماس!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="px-6 py-3 rounded-2xl bg-cream-200 text-burgundy-900 font-bold text-sm flex items-center gap-2 cursor-pointer">
              <RotateCcw className="w-4 h-4" /> <span>إعادة النشاط</span>
            </button>
            {onFinish && (
              <button onClick={onFinish} className="px-6 py-3 rounded-2xl bg-burgundy-900 text-cream-50 font-bold text-sm shadow-md cursor-pointer">
                الانتقال للنشاط التالي
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          <p className="text-xs sm:text-sm text-cream-700 mb-6 text-center font-medium">
            سر في النفق واضغط على كل فاكهة لجمعها وتحويلها إلى جزء من وجه الصديق! 👇
          </p>

          {/* Tunnel Path Visualization */}
          <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-indigo-900 rounded-3xl p-6 mb-6 shadow-inner relative overflow-hidden">
            {/* Tunnel Arches */}
            <div className="flex justify-between items-center relative z-10 gap-2 overflow-x-auto py-4">
              {tunnelCheckpoints.map((item, idx) => {
                const isCollected = collectedParts.includes(idx);
                const isCurrent = idx === currentStep;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: isCollected ? 1 : 1.05 }}
                    onClick={() => !isCollected && handleCollect(idx)}
                    className={`flex-1 min-w-[120px] p-4 rounded-2xl border-2 text-center transition-all cursor-pointer select-none ${
                      isCollected
                        ? 'bg-teal-700/80 border-emerald-400 text-white'
                        : isCurrent
                        ? 'bg-amber-400 border-white text-burgundy-950 ring-4 ring-amber-300 animate-pulse'
                        : 'bg-teal-950/60 border-teal-700 text-cream-200 opacity-60'
                    }`}
                  >
                    <div className="text-3xl mb-1">{isCollected ? '✅ ' + item.partIcon : item.icon}</div>
                    <div className="text-xs font-black font-cairo block mb-1">{item.name}</div>
                    <div className="text-[10px] font-bold">
                      {isCollected ? item.partName : 'اضغط للجمع'}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Face Assembled Outcome Display */}
          <div className="bg-white border-2 border-dashed border-teal-300 rounded-3xl p-6 sm:p-8 mb-6 flex flex-col items-center justify-center min-h-[220px]">
            {isFaceAssembled ? (
              <motion.div
                initial={{ scale: 0.2, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-center"
              >
                {/* Big Formed Face */}
                <div className="w-36 h-36 mx-auto rounded-full bg-amber-200 border-4 border-amber-400 shadow-xl flex flex-col items-center justify-center relative mb-3">
                  <div className="text-3xl mb-1">👀</div>
                  <div className="text-xl mb-1">👃</div>
                  <div className="text-2xl">👄</div>
                  <div className="absolute -top-3 text-3xl">👦</div>
                </div>
                <div className="text-lg font-black font-cairo text-teal-950">
                  🎉 اكتمل الوجه السعيد بنجاح في نهاية النفق! 🎉
                </div>
              </motion.div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">🧩</div>
                <h4 className="text-sm font-bold font-cairo text-cream-800">
                  الأجزاء المجموعة حتى الآن: {collectedParts.length} من {tunnelCheckpoints.length}
                </h4>
                <div className="flex justify-center gap-3 mt-3">
                  {collectedParts.map((idx) => (
                    <span key={idx} className="p-2 bg-cream-100 rounded-xl text-xl shadow-xs">
                      {tunnelCheckpoints[idx].partIcon}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sound Helper */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => speakArabic('امشِ في النفق واجمع الفواكه لتكون وجه الصديق المبتسم')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>تعليمات صوتية 🗣️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
