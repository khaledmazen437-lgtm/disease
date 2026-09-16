import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Trophy, RotateCcw, Award, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const FollowMeMimicActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete } = useSensory();

  const [activeStep, setActiveStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const mimicMotions = [
    {
      id: 1,
      title: 'ارفع يديك للسماء 🙌',
      desc: 'ارفع يديك الاثنتين عالياً في الهواء وابتسم!',
      emoji: '🙌',
      voice: 'يلا يا بطل قلدني! ارفع يديك الاثنتين عالياً في السماء!',
    },
    {
      id: 2,
      title: 'صفق بيديك بحرارة 👏',
      desc: 'صفق بيدك ثلاث مرات وراقب يدي!',
      emoji: '👏',
      voice: 'صفق بيديك معي! صفق بكل حماس وقوة!',
    },
    {
      id: 3,
      title: 'المس أنفك بلطف 👃',
      desc: 'ضع إصبعك على مقدمة أنفك!',
      emoji: '👃',
      voice: 'المس أنفك الجميل بإصبعك وابتسم لعيناي!',
    },
    {
      id: 4,
      title: 'لوح بيدك وقل مرحباً 👋',
      desc: 'حرك كفك يميناً ويساراً في الهواء!',
      emoji: '👋',
      voice: 'لوح بيدك وقل مرحباً يا صديقي!',
    },
    {
      id: 5,
      title: 'ضع يديك على رأسك 🙆‍♂️',
      desc: 'المس رأسك وشعرك بلطف!',
      emoji: '🙆‍♂️',
      voice: 'ضع يديك الاثنتين فوق رأسك يا عبقري!',
    },
  ];

  const currentMotion = mimicMotions[activeStep];

  const handleMimicDone = () => {
    playCalmTone('success');
    playCustomSound('applause');
    speakArabic('أحسنت صنعاً يا بطل! حركة ممتازة وتقليد ذكي جداً!');
    addStar(2);

    const newScore = score + 20;
    setScore(newScore);

    if (activeStep + 1 >= mimicMotions.length) {
      setTimeout(() => {
        setIsCompleted(true);
        markActivityComplete(
          'follow-me-mimic-l3',
          'تقليد الحركات الجسدية ببراعة! 🙌👏',
          'شاطر شاطر! أحسنت يا بطل في تقليد جميع الحركات والتواصل الحركي البصري الممتاز!'
        );
      }, 1600);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-3xl mx-auto shadow-soft">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold mb-1">
            <Users className="w-3.5 h-3.5 text-amber-700" />
            <span>المستوى الثالث - النشاط 10</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            لعبة قلدني: تقليد حركات الشخص واليدين 🙋‍♂️✨
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
          <div className="bg-amber-100 border border-amber-300 px-3 py-2 rounded-2xl text-xs font-bold text-amber-900">
            الحركة: {activeStep + 1} / {mimicMotions.length}
          </div>
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-cream-950 mb-2">تقليد حركي فائق البراعة! 🌟🙌</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            قلدت جميع الحركات بنجاح وتوافق بصري حركي استثنائي ومبهج!
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
            شاهد المدرب أمامك وهو يقوم بالحركة، افعل مثله واضغط على زر التأكيد! 👇
          </p>

          {/* Trainer Motion Demonstration Card */}
          <div className="bg-white border-2 border-dashed border-amber-300 rounded-3xl p-8 sm:p-12 mb-6 min-h-[320px] flex flex-col items-center justify-center relative shadow-inner text-center">
            {/* Animated Emoji Movement */}
            <motion.div
              key={currentMotion.id}
              initial={{ scale: 0.5, rotate: -15 }}
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-8xl sm:text-9xl mb-4 drop-shadow-md select-none"
            >
              {currentMotion.emoji}
            </motion.div>

            <h4 className="text-2xl font-black font-cairo text-burgundy-950 mb-2">
              {currentMotion.title}
            </h4>

            <p className="text-sm text-cream-800 font-medium max-w-md mb-6">
              {currentMotion.desc}
            </p>

            {/* Confirmation Mimic Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMimicDone}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-base font-cairo shadow-lg flex items-center gap-3 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-100" />
              <span>أنا قلدتها يا بطل! (انتقال للحركة التالية) 👍</span>
            </motion.button>
          </div>

          {/* Sound Helper */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => speakArabic(currentMotion.voice)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>اسمع صوت المدرب 🗣️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
