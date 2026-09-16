import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trophy, RotateCcw, Award, Volume2, Sparkles, Check } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const SupermarketShopperActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete, playWrongFeedback } = useSensory();

  const [stepIndex, setStepIndex] = useState(0);
  const [basket, setBasket] = useState([]);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const groceryItems = [
    { id: 'apple', name: 'تفاحة حمراء', icon: '🍎' },
    { id: 'milk', name: 'علبة حليب', icon: '🥛' },
    { id: 'banana', name: 'موزة صفراء', icon: '🍌' },
    { id: 'juice', name: 'عصير برتقال', icon: '🧃' },
    { id: 'bread', name: 'رغيف خبز', icon: '🍞' },
    { id: 'carrot', name: 'جزرة طازجة', icon: '🥕' },
  ];

  const shoppingRequests = [
    { targetId: 'apple', prompt: 'أهلاً بك يا بطل في السوبرماركت! من فضلك أعطني تفاحة حمراء!' },
    { targetId: 'milk', prompt: 'شكراً يا بطل! والآن، هل يمكنك إعطائي علبة حليب طازجة؟' },
    { targetId: 'banana', prompt: 'ممتاز جداً! والآن أريد موزة صفراء لذيذة!' },
    { targetId: 'juice', prompt: 'رائع يا عبقري! آخر طلب، أعطني علبة عصير منعش!' },
  ];

  const currentRequest = shoppingRequests[stepIndex];

  // Speak request upon step change
  useEffect(() => {
    if (!isCompleted && currentRequest) {
      speakArabic(currentRequest.prompt);
    }
  }, [stepIndex, isCompleted]);

  const handleSelectItem = (item) => {
    if (item.id === currentRequest.targetId) {
      playCalmTone('success');
      playCustomSound('pop');
      speakArabic(`شكراً جزيلاً! بالضبط هذا ما طلبته: ${item.name}! أنت بائع ومساعد عبقري!`);
      addStar(2);

      const updatedBasket = [...basket, item];
      setBasket(updatedBasket);
      setScore((prev) => prev + 25);

      if (stepIndex + 1 >= shoppingRequests.length) {
        setTimeout(() => {
          setIsCompleted(true);
          speakArabic('أحسنت يا بطل! أنهيت قائمة التسوق بالكامل ببراعة!');
          markActivityComplete('supermarket-shopper-l3');
        }, 1200);
      } else {
        setStepIndex((prev) => prev + 1);
      }
    } else {
      // Gentle wrong feedback
      const requestedName = shoppingRequests[stepIndex].targetId === 'apple' ? 'تفاحة حمراء' : shoppingRequests[stepIndex].targetId === 'milk' ? 'علبة حليب' : shoppingRequests[stepIndex].targetId === 'banana' ? 'موزة صفراء' : 'علبة عصير';
      playWrongFeedback(`خطأ! هذا ${item.name}، لكن البائع يطلب منك: ${requestedName}! حاول مرة ثانية يا بطل!`);
    }
  };

  const handleReset = () => {
    setStepIndex(0);
    setBasket([]);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold mb-1">
            <ShoppingCart className="w-3.5 h-3.5 text-emerald-700" />
            <span>المستوى الثالث - النشاط 11</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            السوبرماركت: اسمع طلب البائع واختر ما يريده
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
          <div className="bg-emerald-100 border border-emerald-300 px-3 py-2 rounded-2xl text-xs font-bold text-emerald-900">
            الطلب: {stepIndex + 1} / {shoppingRequests.length}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تسوق متكامل ومحادثة رائعة! 🛒✨</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            أكملت جميع طلبات البائع واستمعت للتوجيهات الصوتية العربية ببراعة!
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
          {/* Cashier Speaking Dialog Bubble */}
          <div className="bg-white border-2 border-emerald-300 rounded-3xl p-6 mb-6 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            {/* Cashier Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex flex-col items-center justify-center shrink-0 shadow-inner">
              <span className="text-5xl">👨‍💼</span>
              <span className="text-[10px] font-black font-cairo text-emerald-900">عم أحمد البائع</span>
            </div>

            {/* Speech Bubble */}
            <div className="flex-1 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs mb-2">
                <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>البائع يتحدث إليك باللغة العربية:</span>
              </div>
              <p className="text-base sm:text-lg font-black font-cairo text-burgundy-950 leading-relaxed">
                "{currentRequest.prompt}"
              </p>
            </div>
          </div>

          {/* Supermarket Shelves */}
          <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 mb-6 shadow-inner">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-black font-cairo text-amber-950">
                رفوف الأغراض في السوبرماركت (اختر ما طلبه البائع):
              </h4>
              <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                <ShoppingCart className="w-4 h-4" />
                <span>في السلة: {basket.length}</span>
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {groceryItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectItem(item)}
                  className="p-4 rounded-2xl bg-white border-2 border-cream-300 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="text-4xl drop-shadow-xs">{item.icon}</span>
                  <span className="text-xs font-black font-cairo text-burgundy-950">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sound Replay Helper */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => speakArabic(currentRequest.prompt)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>إعادة سماع طلب البائع 🗣️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
