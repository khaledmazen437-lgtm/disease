import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, RotateCcw, Trophy, Volume2, Music, HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { useSensory } from '../../../context/SensoryContext';

export const SoundButtonsActivity = ({ onFinish }) => {
  const { 
    soundEnabled, 
    speakArabic, 
    playCalmTone, 
    playCustomSound, 
    playSynthesizedAnimalSound, 
    playWrongFeedback,
    triggerCelebration 
  } = useSensory();

  const [activeTabMode, setActiveTabMode] = useState('explore'); // 'explore' | 'quiz'
  const [soundScore, setSoundScore] = useState(0);
  const [playingAnimalId, setPlayingAnimalId] = useState(null);

  // Quiz State
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [targetQuizAnimal, setTargetQuizAnimal] = useState(null);
  const [quizCandidates, setQuizCandidates] = useState([]);
  const [quizFeedback, setQuizFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  // Full 12 Real Animal Library with Natural HD Photos
  const animalsList = [
    {
      id: 1,
      key: 'cat',
      name: 'القطة اللطيفة',
      speechText: 'قطة',
      soundLabel: 'مياوو',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80',
      audioUrl: 'https://cdn.freesound.org/previews/415/415209_5121236-lq.mp3'
    },
    {
      id: 2,
      key: 'dog',
      name: 'الكلب الأليف',
      speechText: 'كلب',
      soundLabel: 'هوف هوف',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80',
      audioUrl: 'https://cdn.freesound.org/previews/462/462250_8386274-lq.mp3'
    },
    {
      id: 3,
      key: 'chick',
      name: 'الكتاكيت الصغار',
      speechText: 'كتكوت',
      soundLabel: 'صوصو صوصو',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=500&q=80',
      audioUrl: 'https://cdn.freesound.org/previews/316/316920_4921277-lq.mp3'
    },
    {
      id: 4,
      key: 'cow',
      name: 'البقرة الطيبة',
      speechText: 'بقرة',
      soundLabel: 'مواااا',
      image: 'https://images.unsplash.com/photo-1570042707220-4a87e50337c7?auto=format&fit=crop&w=500&q=80',
      audioUrl: 'https://cdn.freesound.org/previews/58/58277_634166-lq.mp3'
    },
    {
      id: 5,
      key: 'sheep',
      name: 'الخروف الوديع',
      speechText: 'خروف',
      soundLabel: 'مببباع',
      image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=500&q=80',
      audioUrl: 'https://cdn.freesound.org/previews/467/467339_71257-lq.mp3'
    },
    {
      id: 6,
      key: 'lion',
      name: 'الأسد القوي',
      speechText: 'أسد',
      soundLabel: 'زئير الأسد',
      image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=500&q=80',
      audioUrl: 'https://cdn.freesound.org/previews/495/495004_10388062-lq.mp3'
    },
    {
      id: 7,
      key: 'duck',
      name: 'البطة السابحة',
      speechText: 'بطة',
      soundLabel: 'واك واك',
      image: 'https://images.unsplash.com/photo-1555852095-64e7428df0fa?auto=format&fit=crop&w=500&q=80',
      audioUrl: ''
    },
    {
      id: 8,
      key: 'frog',
      name: 'الضفدع الأخضر',
      speechText: 'ضفدع',
      soundLabel: 'كواك كواك',
      image: 'https://images.unsplash.com/photo-1559253664-ab241cf267fc?auto=format&fit=crop&w=500&q=80',
      audioUrl: ''
    },
    {
      id: 9,
      key: 'bird',
      name: 'العصفور المغرد',
      speechText: 'عصفور',
      soundLabel: 'زقزقة العصفور',
      image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=500&q=80',
      audioUrl: ''
    },
    {
      id: 10,
      key: 'horse',
      name: 'الحصان الأصيل',
      speechText: 'حصان',
      soundLabel: 'صهيل الحصان',
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=500&q=80',
      audioUrl: ''
    },
    {
      id: 11,
      key: 'elephant',
      name: 'الفيل الكبيير',
      speechText: 'فيل',
      soundLabel: 'صوت الفيل',
      image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=500&q=80',
      audioUrl: ''
    },
    {
      id: 12,
      key: 'rooster',
      name: 'الديك النشيط',
      speechText: 'ديك',
      soundLabel: 'كوكودوكو',
      image: 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?auto=format&fit=crop&w=500&q=80',
      audioUrl: ''
    }
  ];

  // Play animal sound with fallback to Web Audio API synthesizer
  const playAnimalAudioAndSpeech = (animal) => {
    if (!soundEnabled) return;
    setPlayingAnimalId(animal.id);

    // 1. Acoustic Synthesizer trigger
    playSynthesizedAnimalSound(animal.key || animal.id);

    // 2. Clear Arabic voice prompt
    speakArabic(`${animal.speechText}.. ${animal.soundLabel}`);

    // 3. Optional remote audio recording if present
    if (animal.audioUrl) {
      try {
        const audio = new Audio(animal.audioUrl);
        audio.volume = 0.85;
        audio.play().catch(() => {});
      } catch (_) {}
    }

    setTimeout(() => {
      setPlayingAnimalId(null);
    }, 2200);
  };

  const handlePressAnimalInExplore = (animal) => {
    playAnimalAudioAndSpeech(animal);
    setSoundScore((prev) => prev + 10);
  };

  // Generate Quiz Round
  const startNewQuizRound = () => {
    setQuizFeedback(null);
    setSelectedCandidateId(null);
    // Pick random target animal
    const target = animalsList[Math.floor(Math.random() * animalsList.length)];
    setTargetQuizAnimal(target);

    // Pick 3 random wrong choices
    const otherAnimals = animalsList.filter((a) => a.id !== target.id);
    const shuffledOthers = [...otherAnimals].sort(() => Math.random() - 0.5).slice(0, 3);
    const candidates = [target, ...shuffledOthers].sort(() => Math.random() - 0.5);
    setQuizCandidates(candidates);

    // Auto play target sound
    setTimeout(() => {
      playAnimalAudioAndSpeech(target);
    }, 300);
  };

  useEffect(() => {
    if (activeTabMode === 'quiz' && !targetQuizAnimal) {
      startNewQuizRound();
    }
  }, [activeTabMode]);

  const handleSelectQuizChoice = (candidate) => {
    if (quizFeedback === 'correct') return;
    setSelectedCandidateId(candidate.id);

    if (candidate.id === targetQuizAnimal.id) {
      setQuizFeedback('correct');
      setQuizScore((prev) => prev + 20);
      triggerCelebration({
        title: 'شاطر شاطر يا بطل! 👏🎉',
        message: `إجابة صحيحة! هذا صوت ${targetQuizAnimal.name}!`,
      });
      setTimeout(() => {
        setQuizQuestionIndex((prev) => prev + 1);
        startNewQuizRound();
      }, 2500);
    } else {
      setQuizFeedback('wrong');
      playWrongFeedback('حاول مرة ثانية يا بطل! استمع للصوت جيداً 🌟');
    }
  };

  return (
    <div className="bg-cream-50 border border-cream-300 rounded-3xl p-4 sm:p-8 max-w-5xl mx-auto shadow-soft font-cairo">
      
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-cream-300 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>نشاط التأهيل البصري والصوتي • أصوات الحيوانات الحقيقية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-burgundy-950">
            أصوات ومظاهر الحيوانات الطبيعية الحقيقية 🐾
          </h2>
        </div>

        {/* Dedicated Score Display */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-amber-100 border border-amber-300 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div className="text-right">
              <span className="text-[10px] text-amber-900 font-bold block">نقاط الإنجاز:</span>
              <span className="text-lg font-black text-amber-700">{soundScore + quizScore} نقطة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Modes Bar */}
      <div className="flex justify-center gap-3 mb-8 bg-cream-100 p-1.5 rounded-2xl border border-cream-300 max-w-md mx-auto">
        <button
          onClick={() => {
            setActiveTabMode('explore');
            playCalmTone('gentle-tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTabMode === 'explore'
              ? 'bg-burgundy-800 text-white shadow-md'
              : 'text-cream-800 hover:bg-cream-200'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>استكشاف الصور والأصوات 🎵</span>
        </button>

        <button
          onClick={() => {
            setActiveTabMode('quiz');
            playCalmTone('gentle-tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTabMode === 'quiz'
              ? 'bg-amber-500 text-cream-950 shadow-md'
              : 'text-cream-800 hover:bg-cream-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>تحدي خَمِّن الصوت 🧩</span>
        </button>
      </div>

      {/* Mode 1: Free Exploration Mode with Natural Real Photos */}
      {activeTabMode === 'explore' && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <p className="text-xs sm:text-sm text-cream-700 text-center font-medium">
            اضغط على أي صورة حيوان طبيعية لسماع صوته الحقيقي ونطقه العربي المباشر! 🔊
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {animalsList.map((animal) => {
              const isPlaying = playingAnimalId === animal.id;
              return (
                <motion.button
                  key={animal.id}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePressAnimalInExplore(animal)}
                  className={`bg-white border-2 ${isPlaying ? 'border-amber-500 ring-4 ring-amber-200' : 'border-cream-300'} rounded-3xl p-3 shadow-soft hover:shadow-lg transition-all flex flex-col items-center gap-3 cursor-pointer relative overflow-hidden group`}
                >
                  {/* Natural High-Res Animal Photo */}
                  <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden relative shadow-inner border border-cream-200">
                    <img 
                      src={animal.image} 
                      alt={animal.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    
                    {/* Soundwave Bar Animation when Playing */}
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="flex items-end gap-1.5 h-8 bg-black/60 px-3 py-1.5 rounded-full border border-white/30">
                          {[0.1, 0.3, 0.5, 0.2, 0.4].map((delay, idx) => (
                            <motion.span
                              key={idx}
                              animate={{ height: ['20%', '100%', '20%'] }}
                              transition={{ repeat: Infinity, duration: 0.5, delay }}
                              className="w-1.5 bg-amber-400 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Name and Sound Label */}
                  <div className="text-center w-full">
                    <h4 className="text-sm font-bold text-burgundy-950 mb-0.5">{animal.name}</h4>
                    <span className="text-[11px] bg-burgundy-50 text-burgundy-900 border border-burgundy-200 px-2.5 py-0.5 rounded-full font-bold inline-block">
                      "{animal.soundLabel}"
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Mode 2: Interactive Sound Quiz Game with Real Photos */}
      {activeTabMode === 'quiz' && targetQuizAnimal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Question Box */}
          <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 text-center shadow-soft relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
              <span>السؤال رقم {quizQuestionIndex + 1}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-burgundy-950 mb-4">
              اختر صورة الحيوان صاحب هذا الصوت 🎧
            </h3>

            {/* Re-listen Button */}
            <button
              onClick={() => playAnimalAudioAndSpeech(targetQuizAnimal)}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-cream-950 font-bold text-sm shadow-md transition-all inline-flex items-center gap-2 transform hover:scale-105 cursor-pointer"
            >
              <Volume2 className="w-5 h-5 animate-pulse" />
              <span>إعادة استماع صوت الحيوان 🔊</span>
            </button>
          </div>

          {/* Candidates Grid with Real Animal Photos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quizCandidates.map((candidate) => {
              const isSelected = selectedCandidateId === candidate.id;
              
              let borderStyle = "border-cream-300";
              if (isSelected && quizFeedback === 'correct') {
                borderStyle = "border-emerald-500 bg-emerald-50 ring-4 ring-emerald-300";
              } else if (isSelected && quizFeedback === 'wrong') {
                borderStyle = "border-rose-500 bg-rose-50 animate-shake";
              }

              return (
                <motion.button
                  key={candidate.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleSelectQuizChoice(candidate)}
                  className={`bg-white border-2 ${borderStyle} rounded-3xl p-3 flex flex-col items-center justify-center gap-2.5 shadow-soft hover:shadow-md transition-all cursor-pointer relative overflow-hidden group`}
                >
                  <div className="w-full h-36 rounded-2xl overflow-hidden shadow-inner border border-cream-200">
                    <img 
                      src={candidate.image} 
                      alt={candidate.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>

                  <span className="text-sm font-bold text-burgundy-950">{candidate.name}</span>

                  {isSelected && quizFeedback === 'correct' && (
                    <div className="absolute top-2 right-2 text-emerald-600 bg-white/90 rounded-full p-1 shadow-md">
                      <CheckCircle2 className="w-6 h-6 fill-emerald-100 text-emerald-600" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Feedback banner */}
          {quizFeedback === 'wrong' && (
            <div className="bg-rose-100 border border-rose-300 text-rose-950 rounded-2xl p-4 text-center text-xs sm:text-sm font-bold shadow-sm">
              حاول مرة ثانية يا بطل! يمكنك الاستماع للصوت مجدداً بالأعلى 🌟
            </div>
          )}
        </motion.div>
      )}

      {/* Completion & Next Activity Bar */}
      {onFinish && (
        <div className="mt-8 pt-6 border-t border-cream-300 flex justify-end">
          <button
            onClick={onFinish}
            className="px-8 py-3.5 rounded-2xl bg-burgundy-900 hover:bg-burgundy-950 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>الانتقال للنشاط التالي</span>
          </button>
        </div>
      )}
    </div>
  );
};
