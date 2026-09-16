import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  ArrowRight,
  Eye,
  PlusCircle,
  Brain,
  ShieldCheck
} from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

import level1Img from '../assets/visual_levels/level1_objects.jpg';
import level2Img from '../assets/visual_levels/level2_people.jpg';
import level3Img from '../assets/visual_levels/level3_combined.jpg';

import { VisualObjectsActivity } from '../components/activities/VisualObjectsActivity';
import { VisualPeopleActivity } from '../components/activities/VisualPeopleActivity';
import { VisualCombinedActivity } from '../components/activities/VisualCombinedActivity';

import { GazeFixationTimerActivity } from '../components/activities/level1/GazeFixationTimerActivity';
import { PecsVisualCommunicatorActivity } from '../components/activities/level1/PecsVisualCommunicatorActivity';
import { EyeContactMatchActivity } from '../components/activities/level2/EyeContactMatchActivity';

import { SensoryMediaParentHub } from '../components/SensoryMediaParentHub';

export const ActivitiesPage = () => {
  const { playCalmTone, completedActivities, childStars } = useSensory();
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);

  // The 3 Clean Core Visual Contact Levels
  const visualLevels = [
    {
      id: 'level-1',
      levelNumber: 1,
      title: 'المستوى الأول: التواصل البصري مع الأشياء',
      subtitle: 'التأهيل البصري من خلال التركيز وتتبع الأجسام والعناصر البصرية',
      image: level1Img,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      tag: 'التواصل البصري مع الأشياء',
      description: 'يركز هذا المستوى على تطوير مهارات الانتباه البصري، وتتبع الأجسام والعناصر البصرية بدقة وهدوء.',
      sensoryLoad: 'منخفض جداً (مهدئ)',
      difficulty: 'المستوى الأول (مبتدئ)',
      component: VisualObjectsActivity,
      activities: [
        {
          id: 'gaze-fixation-timer-l1',
          title: 'اختبار تتبع النظرة والتثبيت البصري (Fixation Duration)',
          description: 'قياس زمن ثبات النظرة المتصل بالثواني وتتبع الأهداف البصرية للأطباء',
          component: GazeFixationTimerActivity
        },
        {
          id: 'pecs-visual-communicator-l1',
          title: 'لوحة بطاقات PECS للتواصل البصري والرمزي',
          description: 'نظام تبادل الصور المصورة العالمي للتعبير عن الاحتياجات بصرياً وصوتياً',
          component: PecsVisualCommunicatorActivity
        }
      ]
    },
    {
      id: 'level-2',
      levelNumber: 2,
      title: 'المستوى الثاني: التواصل البصري مع الأشخاص',
      subtitle: 'التعرف على الوجوه والنظر المباشر والتعبير الاجتماعي البشري',
      image: level2Img,
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      tag: 'التواصل البشري المباشر',
      description: 'يركز هذا المستوى على تعزيز النظر المباشر في عينين وتعبيرات الأشخاص والتعرف على انفعالاتهم ودعم التفاعل البشري.',
      sensoryLoad: 'منخفض ومريح',
      difficulty: 'المستوى الثاني (متوسط)',
      component: VisualPeopleActivity,
      activities: [
        {
          id: 'eye-contact-match-l2',
          title: 'تحديق عين العين وتحديد النظرة المباشرة',
          description: 'التمييز البصري بين الشخص الذي ينظر في عينيك مباشرة والنظرة الشاردة',
          component: EyeContactMatchActivity
        }
      ]
    },
    {
      id: 'level-3',
      levelNumber: 3,
      title: 'المستوى الثالث: التواصل البصري مع الأشياء والأشخاص',
      subtitle: 'الاهتمام المشترك (Joint Attention) والربط المزدوج - 13 نشاطاً تفاعلياً بالصوت والتشجيع',
      image: level3Img,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      tag: '13 نشاطاً تفاعلياً متكاملاً',
      description: 'أعلى مستويات التواصل البصري، يهدف لمشاركة الانتباه والربط البصري المزدوج بين الشخص والأشياء المحيطة، مع التفاعل الصوتي والتصفيق التشجيعي.',
      sensoryLoad: 'تفاعلي متتقدم',
      difficulty: 'المستوى الثالث (متقدم)',
      component: VisualCombinedActivity,
      activities: []
    }
  ];

  const handleOpenLevelWorkspace = (lvl) => {
    playCalmTone('gentle-tap');
    setSelectedLevelId(lvl.id);
  };

  const handleBackToLevels = () => {
    playCalmTone('gentle-tap');
    setActiveActivity(null);
    setSelectedLevelId(null);
  };

  // View 1: Active Single Activity
  if (activeActivity) {
    const ActivityComponent = activeActivity.component;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35 }}
        className="max-w-5xl mx-auto px-4 py-8 font-cairo"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.03, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToLevels}
            className="btn-dribbble-glass border border-cream-300 shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمستويات التواصل البصري</span>
          </motion.button>
          <h2 className="text-xl font-bold text-burgundy-950">{activeActivity.title}</h2>
        </div>

        {ActivityComponent && <ActivityComponent onFinish={handleBackToLevels} />}
      </motion.div>
    );
  }

  // View 2: Specific Level Workspace
  if (selectedLevelId) {
    const activeLvl = visualLevels.find(l => l.id === selectedLevelId);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35 }}
        className="max-w-5xl mx-auto px-4 py-8 font-cairo"
      >
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.03, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToLevels}
            className="btn-dribbble-glass border border-cream-300 shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لمستويات التواصل البصري</span>
          </motion.button>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${activeLvl.badgeColor}`}>
            {activeLvl.tag}
          </span>
        </div>

        {/* Level Banner */}
        <div className="bg-white border border-cream-300 rounded-3xl p-6 sm:p-8 mb-8 shadow-soft flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden shadow-soft border border-cream-200 shrink-0">
            <img src={activeLvl.image} alt={activeLvl.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-burgundy-50 border border-burgundy-200 text-burgundy-900 text-xs font-bold mb-3">
              <Eye className="w-3.5 h-3.5 text-burgundy-700" />
              <span>مساحة أنشطة {activeLvl.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-burgundy-950 mb-3 leading-snug">
              {activeLvl.title}
            </h2>
            <p className="text-sm text-cream-800 leading-relaxed mb-6">
              {activeLvl.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-cream-700">
              <span className="flex items-center gap-1 bg-cream-100 px-3 py-1.5 rounded-xl border border-cream-300">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                حمل حسي: {activeLvl.sensoryLoad}
              </span>
              <span className="flex items-center gap-1 bg-cream-100 px-3 py-1.5 rounded-xl border border-cream-300">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                {activeLvl.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Activities Component Suite for Level */}
        {activeLvl.component ? (
          <div className="mb-8">
            {(() => {
              const LevelComponent = activeLvl.component;
              return <LevelComponent onFinish={handleBackToLevels} />;
            })()}
          </div>
        ) : activeLvl.activities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {activeLvl.activities.map((act) => (
              <div key={act.id} className="bg-white border border-cream-300 rounded-3xl p-6 shadow-soft">
                <h4 className="font-bold text-lg text-burgundy-950 mb-2">{act.title}</h4>
                <p className="text-xs text-cream-700 mb-4">{act.description}</p>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveActivity(act)}
                  className="btn-dribbble-primary w-full py-2.5 rounded-xl text-xs font-bold shadow-md"
                >
                  بدء النشاط
                </motion.button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Ready Container for User-Defined Activities */
          <div className="bg-white border-2 border-dashed border-burgundy-300/70 rounded-3xl p-10 text-center mb-8 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-burgundy-50 border border-burgundy-200 text-burgundy-900 flex items-center justify-center mx-auto mb-4 text-2xl">
              <Brain className="w-8 h-8 text-burgundy-700" />
            </div>
            <h3 className="text-xl font-bold text-burgundy-950 mb-2">
              مساحة تنفيذ أنشطة {activeLvl.title}
            </h3>
            <p className="text-sm text-cream-800 leading-relaxed max-w-md mx-auto mb-6">
              الصفحة جاهزة ومفتوحة الآن لإضافة الأنشطة التي في ذهنك! أخبرني بتفاصيل النشاط الأول وسنقوم ببرمجته وبنائه فوراً.
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  // View 3: Dashboard View (The 3 Visual Contact Levels)
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-cairo"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-300 text-indigo-950 text-xs font-extrabold mb-4">
          <Eye className="w-4 h-4 text-indigo-700" />
          <span>مسار التأهيل البصري المتكامل</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-burgundy-950 tracking-tight leading-tight mb-4">
          مستويات التواصل البصري الثلاثة
        </h1>
        <p className="text-base sm:text-lg text-cream-800 leading-relaxed font-normal">
          تدرّج علمي وتأهيلي يغطي التواصل البصري مع الأشياء، والتواصل مع الأشخاص، والاهتمام المشترك.
        </p>
      </div>

      {/* Main 3 Visual Levels Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {visualLevels.map((lvl) => {
          return (
            <motion.div
              key={lvl.id}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="card-3d-tilt p-6 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image Header */}
                <div className="w-full h-52 rounded-2xl overflow-hidden mb-5 border border-cream-200 relative group-hover:scale-102 transition-transform duration-300">
                  <img 
                    src={lvl.image} 
                    alt={lvl.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm backdrop-blur-md ${lvl.badgeColor}`}>
                      المستوى {lvl.levelNumber}
                    </span>
                  </div>
                </div>

                {/* Tag */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-burgundy-900 bg-burgundy-50 border border-burgundy-200 px-3 py-1 rounded-full">
                    {lvl.tag}
                  </span>
                  <span className="text-xs text-cream-600 font-semibold">{lvl.difficulty}</span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-cream-950 mb-2 leading-snug group-hover:text-burgundy-900 transition-colors">
                  {lvl.title}
                </h3>
                <p className="text-xs text-cream-700 leading-relaxed mb-6">
                  {lvl.subtitle}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-cream-200">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenLevelWorkspace(lvl)}
                  className="btn-dribbble-primary w-full py-3 px-4 rounded-2xl text-sm font-bold shadow-lg"
                >
                  <Eye className="w-4 h-4 text-amber-300" />
                  <span>بدء أنشطة المستوى</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sensory Media & Parent Guidance Hub */}
      <SensoryMediaParentHub />

      {/* Note */}
      <div className="bg-gradient-to-r from-cream-100 via-cream-50 to-cream-100 border border-cream-300 rounded-3xl p-6 text-center max-w-3xl mx-auto shadow-soft">
        <h4 className="font-bold text-burgundy-950 text-base mb-2 flex items-center justify-center gap-2">
          <Brain className="w-5 h-5 text-burgundy-700" />
          <span>مساحة تنفيذ وتطوير الأنشطة المفتوحة</span>
        </h4>
        <p className="text-xs text-cream-800 leading-relaxed max-w-2xl mx-auto">
          اختر أي مستوى من المستويات الثلاثة بالـأعلى، وزودني بالأنشطة التي تريد إضافتها لنبدأ في بنائها مباشرة!
        </p>
      </div>
    </motion.div>
  );
};
