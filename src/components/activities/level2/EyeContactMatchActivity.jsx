import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trophy, RotateCcw, Award, CheckCircle2, UserCheck, Check, X } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

// Real Face Gaze Discrimination Pairs (Unsplash Natural Photos)
const GAZE_PAIRS = [
  {
    id: 1,
    title: 'تحديد الشخص الذي ينظر لك مباشرة',
    correctId: 'a',
    personA: {
      id: 'a',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80',
      isDirectEyeContact: true,
      label: 'نظرة تواصل بصري مباشرة لعينيك'
    },
    personB: {
      id: 'b',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
      isDirectEyeContact: false,
      label: 'نظرة شاردة جانباً'
    }
  },
  {
    id: 2,
    title: 'تحديد النظرة المباشرة للوجه البشري',
    correctId: 'b',
    personA: {
      id: 'a',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      isDirectEyeContact: false,
      label: 'ينظر بعيداً للأسفل'
    },
    personB: {
      id: 'b',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
      isDirectEyeContact: true,
      label: 'تواصل بصري مباشر معك'
    }
  }
];

export const EyeContactMatchActivity = ({ onFinish }) => {
  const { playCalmTone, playCustomSound, speakArabic, addStar, markActivityComplete, playWrongFeedback } = useSensory();

  const [currentPairIdx, setCurrentPairIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentPair = GAZE_PAIRS[currentPairIdx];

  const handleSelectFace = (person) => {
    if (isCompleted) return;

    if (person.isDirectEyeContact) {
      playCalmTone('success');
      speakArabic('شاطر! تواصل بصري ممتاز ونظرة مباشرة ريعة!');
      addStar(2);

      const newScore = score + 30;
      setScore(newScore);

      if (currentPairIdx + 1 >= GAZE_PAIRS.length) {
        setTimeout(() => {
          setIsCompleted(true);
          markActivityComplete(
            'eye-contact-match-l2',
            'شاطر شاطر يا بطل!',
            'ممتاز! أتقنت التمييز والتواصل البصري المباشر مع وجوه الأشخاص!'
          );
        }, 1200);
      } else {
        setTimeout(() => {
          setCurrentPairIdx((prev) => prev + 1);
        }, 1200);
      }
    } else {
      playWrongFeedback('هذا الشخص ينظر بعيداً، اختر الوجه الذي ينظر لعينيك مباشرة يا بطل!');
      setFeedbackMsg('اختر الشخص الذي ينظر في عينيك مباشرة!');
      setTimeout(() => setFeedbackMsg(null), 2500);
    }
  };

  const handleReset = () => {
    setCurrentPairIdx(0);
    setScore(0);
    setFeedbackMsg(null);
    setIsCompleted(false);
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 max-w-4xl mx-auto shadow-soft font-cairo">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-950 border border-purple-300 text-xs font-bold mb-1">
            <Eye className="w-3.5 h-3.5 text-purple-700" />
            <span>المستوى الثاني • التمييز والتواصل البصري المباشر</span>
          </div>
          <h3 className="text-xl font-bold font-cairo text-burgundy-950">
            تحديق عين العين: اختر الشخص الذي ينظر في عينيك مباشرة
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
        </div>
      </div>

      {isCompleted ? (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-10 bg-white rounded-3xl p-8 shadow-soft">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-cairo text-burgundy-950 mb-2">تمييز التواصل البصري ممتاز!</h3>
          <p className="text-cream-800 mb-6 text-base max-w-md mx-auto">
            تميزت بدقة في معرفة الشخص الذي ينظر في عينيك وحصلت على <strong>{score} نقطة</strong>!
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleReset} className="btn-dribbble-glass">
              <RotateCcw className="w-4 h-4" /> <span>إعادة النشاط</span>
            </button>
            {onFinish && (
              <button onClick={onFinish} className="btn-dribbble-primary">
                الانتقال للنشاط التالي
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          {feedbackMsg && (
            <div className="bg-rose-50 border border-rose-300 text-rose-900 px-4 py-2 rounded-xl text-xs font-bold mb-4 text-center">
              {feedbackMsg}
            </div>
          )}

          <p className="text-sm font-bold text-burgundy-950 mb-6 text-center">
            {currentPair.title} 👇
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[currentPair.personA, currentPair.personB].map((person) => (
              <motion.div
                key={person.id}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelectFace(person)}
                className="card-3d-tilt p-4 cursor-pointer flex flex-col items-center group border-2 hover:border-purple-600 transition-colors"
              >
                <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 border border-cream-200 relative shadow-md">
                  <img
                    src={person.image}
                    alt="صورة وجه"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <button className="btn-dribbble-primary w-full text-xs py-2.5">
                  <UserCheck className="w-4 h-4" />
                  <span>هذا الشخص ينظر في عيني مباشرة</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
