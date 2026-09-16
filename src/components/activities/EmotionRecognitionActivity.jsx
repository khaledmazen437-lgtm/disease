import React, { useState } from 'react';
import { Smile, Frown, Meh, Heart, Award, Sparkles, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';
import { useSensory } from '../../context/SensoryContext';

const EMOTION_SCENARIOS = [
  {
    id: 1,
    prompt: "سَمِعَ أَحْمَد قِصَّةً جَمِيلَةً مَعَ أُمِّهِ قَبْلَ النَّوْمِ. كَيْفَ يَشْعُرُ أَحْمَد؟",
    situationImage: "📖",
    correctEmotion: "happy",
    audioText: "كيف يشعر أحمد عندما يسمع قصة جميلة مع أمه؟",
    options: [
      { id: "happy", label: "سَعِيدٌ وَمُرْتَاح", emoji: "😊", iconBg: "bg-emerald-100 border-emerald-300 text-emerald-800" },
      { id: "sad", label: "حَزِين", emoji: "😢", iconBg: "bg-blue-100 border-blue-300 text-blue-800" },
      { id: "angry", label: "غَاضِب", emoji: "😠", iconBg: "bg-rose-100 border-rose-300 text-rose-800" }
    ]
  },
  {
    id: 2,
    prompt: "انْكَسَرَتْ لُعْبَةُ سَارَة الْمُفَضَّلَة. كَيْفَ تَشْعُرُ سَارَة الآن؟",
    situationImage: "🧸",
    correctEmotion: "sad",
    audioText: "كيف تشعر سارة عندما انكسرت لعبتها؟",
    options: [
      { id: "happy", label: "فَرْحَانَة", emoji: "😄", iconBg: "bg-emerald-100 border-emerald-300 text-emerald-800" },
      { id: "sad", label: "حَزِينَة وَتَحْتَاجُ عِنَاقاً", emoji: "🥺", iconBg: "bg-blue-100 border-blue-300 text-blue-800" },
      { id: "surprised", label: "مُنْدَهِشَة", emoji: "😲", iconBg: "bg-amber-100 border-amber-300 text-amber-800" }
    ]
  },
  {
    id: 3,
    prompt: "يَجْلِسُ عُمَر فِي غُرْفَتِهِ الْهَادِئَة يَرْسُمُ شَجَرَةً خَضْرَاء. كَيْفَ هُوَ شُعُورُهُ؟",
    situationImage: "🎨",
    correctEmotion: "calm",
    audioText: "كيف يشعر عمر وهو يرسم بهدوء؟",
    options: [
      { id: "calm", label: "هَادِئٌ وَمُسْتَرْخٍ", emoji: "😌", iconBg: "bg-teal-100 border-teal-300 text-teal-800" },
      { id: "angry", label: "مُنْزَعِج", emoji: "😣", iconBg: "bg-rose-100 border-rose-300 text-rose-800" },
      { id: "scared", label: "خَائِف", emoji: "😨", iconBg: "bg-purple-100 border-purple-300 text-purple-800" }
    ]
  }
];

export const EmotionRecognitionActivity = ({ onFinish }) => {
  const { playCalmTone, markActivityComplete, addStar, playWrongFeedback } = useSensory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null); // 'correct' | 'try-again' | null
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = EMOTION_SCENARIOS[currentIndex];

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId);
    if (optionId === currentQuestion.correctEmotion) {
      setFeedbackState('correct');
      playCalmTone('success');
      addStar(2);
      
      setTimeout(() => {
        if (currentIndex < EMOTION_SCENARIOS.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setSelectedOption(null);
          setFeedbackState(null);
        } else {
          setIsCompleted(true);
          markActivityComplete('emotion-recognition');
        }
      }, 1500);
    } else {
      setFeedbackState('try-again');
      playWrongFeedback('خطأ! انظر في ملامح الوجه وحاول مرة ثانية يا بطل!');
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setFeedbackState(null);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="bg-cream-50 border-2 border-burgundy-200 rounded-3xl p-8 text-center max-w-xl mx-auto shadow-soft">
        <div className="w-20 h-20 bg-burgundy-100 text-burgundy-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <Award className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black font-cairo text-burgundy-950 mb-2">أَحْسَنْتَ يَا بَطَل! 🎉</h3>
        <p className="text-cream-800 text-lg mb-6">
          لَقَدْ تَعَرَّفْتَ عَلَى جَمِيعِ الْمَشَاعِرِ بِشَكْلٍ رَائِع وَهَادِئ!
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cream-200 hover:bg-cream-300 text-burgundy-900 font-bold text-base transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>إِعَادَةُ التَّدْرِيب</span>
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
    );
  }

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto shadow-soft">
      {/* Progress & Indicator */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-cream-300">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-burgundy-100 text-burgundy-900 rounded-full text-xs font-bold">
            نَشَاطُ التَّعَرُّفِ عَلَى الْمَشَاعِر
          </span>
          <span className="text-xs text-cream-700 font-medium">
            السؤال {currentIndex + 1} مِنْ {EMOTION_SCENARIOS.length}
          </span>
        </div>
        
        {/* Visual Progress Steps */}
        <div className="flex gap-2">
          {EMOTION_SCENARIOS.map((_, idx) => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'bg-burgundy-700 scale-125'
                  : idx < currentIndex
                  ? 'bg-emerald-500'
                  : 'bg-cream-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Situation Card */}
      <div className="bg-cream-100/90 border border-cream-300 rounded-2xl p-6 text-center mb-8 relative">
        <div className="text-6xl mb-4 animate-gentle-float select-none">
          {currentQuestion.situationImage}
        </div>
        <h4 className="text-xl sm:text-2xl font-bold font-cairo text-cream-950 leading-relaxed mb-3">
          {currentQuestion.prompt}
        </h4>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrect = option.id === currentQuestion.correctEmotion;

          let btnStyles = "border-2 border-cream-300 bg-white hover:border-burgundy-400 text-cream-900";
          if (isSelected && feedbackState === 'correct') {
            btnStyles = "border-2 border-emerald-500 bg-emerald-50 text-emerald-950 shadow-md scale-105";
          } else if (isSelected && feedbackState === 'try-again') {
            btnStyles = "border-2 border-amber-400 bg-amber-50 text-amber-950";
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              className={`p-5 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all duration-200 select-none ${btnStyles}`}
            >
              <span className="text-4xl">{option.emoji}</span>
              <span className="font-bold text-base font-cairo">{option.label}</span>
            </button>
          );
        })}
      </div>

      {/* Calming Feedback Area */}
      {feedbackState === 'correct' && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center justify-center gap-3 animate-fade-in font-bold text-center">
          <Sparkles className="w-5 h-5 text-emerald-700" />
          <span>مُمْتَاز جِدّاً! إِجَابَةٌ صَحِيحَة وَشُعُورٌ دَقِيق ✨</span>
        </div>
      )}

      {feedbackState === 'try-again' && (
        <div className="p-4 bg-amber-100 border border-amber-300 text-amber-900 rounded-2xl flex items-center justify-center gap-3 animate-fade-in font-medium text-center">
          <span>خُذْ نَفَساً هَادِئاً وَحَاوِلْ مَرَّةً أُخْرَى، أَنْتَ قَادِر! 🌿</span>
        </div>
      )}
    </div>
  );
};
