import React, { useState } from 'react';
import { Users, Filter } from 'lucide-react';
import { PeekabooHandsActivity } from './level2/PeekabooHandsActivity';
import { SingingMovingHeadActivity } from './level2/SingingMovingHeadActivity';
import { MusicianTrainerActivity } from './level2/MusicianTrainerActivity';
import { SynchronizedCountdownActivity } from './level2/SynchronizedCountdownActivity';
import { CrazyFacesActivity } from './level2/CrazyFacesActivity';
import { InteractiveFaucetActivity } from './level2/InteractiveFaucetActivity';
import { BeeHoneycombHideActivity } from './level2/BeeHoneycombHideActivity';
import { NameResponseCallActivity } from './level2/NameResponseCallActivity';
import { SocialGestureMimicryActivity } from './level2/SocialGestureMimicryActivity';
import { TurnTakingBallActivity } from './level2/TurnTakingBallActivity';
import { FaceDecoratorActivity } from './level2/FaceDecoratorActivity';
import { SocialSmileMirrorActivity } from './level2/SocialSmileMirrorActivity';
import { ActivityAudioGuide } from '../ActivityAudioGuide';

export const VisualPeopleActivity = ({ onFinish }) => {
  const [activeSubTab, setActiveSubTab] = useState('peekaboo_hands');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'الكل (12 نشاطاً للمستوى الثاني)' },
    { id: 'gaze_faces', label: 'ألعاب الغميضة وتعبيرات الوجه' },
    { id: 'social_interaction', label: 'الاستجابة للمناداة وتبادل الأدوار' },
    { id: 'music_rhythm', label: ' الغناء والموسيقى والعد' },
    { id: 'interactive_tools', label: 'الأدوات والإكسسوارات' },
  ];

  const subActivities = [
    { id: 'peekaboo_hands', title: 'لعبة الغميضة واليدين (بخ)', tag: 'النشاط 1', cat: 'gaze_faces', component: PeekabooHandsActivity },
    { id: 'name_response', title: 'الاستجابة للمناداة النظر بالعينين', tag: 'النشاط 2', cat: 'social_interaction', component: NameResponseCallActivity },
    { id: 'social_mimicry', title: 'تقليد حركات وإيماءات اليد', tag: 'النشاط 3', cat: 'social_interaction', component: SocialGestureMimicryActivity },
    { id: 'turn_taking_ball', title: 'تبادل الأدوار وتمرير الكرة', tag: 'النشاط 4', cat: 'social_interaction', component: TurnTakingBallActivity },
    { id: 'singing_head', title: 'الرأس المتحركة المغنية', tag: 'النشاط 5', cat: 'music_rhythm', component: SingingMovingHeadActivity },
    { id: 'musician_trainer', title: 'الموسيقار وتوجيه الأدوات', tag: 'النشاط 6', cat: 'music_rhythm', component: MusicianTrainerActivity },
    { id: 'synchronized_countdown', title: 'العد التنازلي والقفز والقبلات', tag: 'النشاط 7', cat: 'music_rhythm', component: SynchronizedCountdownActivity },
    { id: 'crazy_faces', title: 'الوشوش المجنونة والتعبيرات', tag: 'النشاط 8', cat: 'gaze_faces', component: CrazyFacesActivity },
    { id: 'face_decorator', title: 'تزيين الوجوه والإكسسوارات', tag: 'النشاط 9', cat: 'interactive_tools', component: FaceDecoratorActivity },
    { id: 'social_smile', title: 'الابتسامة الاجتماعية التفاعلية', tag: 'النشاط 10', cat: 'gaze_faces', component: SocialSmileMirrorActivity },
    { id: 'interactive_faucet', title: 'الحنفية والتحكم بالمياه', tag: 'النشاط 11', cat: 'interactive_tools', component: InteractiveFaucetActivity },
    { id: 'bee_honeycomb', title: 'الخلية المتقطعة والنحلة والدبدوب', tag: 'النشاط 12', cat: 'interactive_tools', component: BeeHoneycombHideActivity },
  ];

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    const filtered = catId === 'all' ? subActivities : subActivities.filter((s) => s.cat === catId);
    if (filtered.length > 0 && !filtered.some((s) => s.id === activeSubTab)) {
      setActiveSubTab(filtered[0].id);
    }
  };

  const filteredSubActivities =
    selectedCategory === 'all'
      ? subActivities
      : subActivities.filter((s) => s.cat === selectedCategory);

  const currentSub =
    subActivities.find((s) => s.id === activeSubTab) || filteredSubActivities[0] || subActivities[0];
  const ActiveSubComponent = currentSub.component;

  return (
    <div className="space-y-6">
      {/* Category Filter & Sub Activity Tabs Switcher */}
      <div className="bg-white border border-cream-300 rounded-3xl p-5 shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-200 pb-3">
          <div className="flex items-center gap-2 text-sm font-black font-cairo text-rose-950">
            <Users className="w-5 h-5 text-rose-700" />
            <span>المستوى الثاني: أنشطة التواصل مع الأشخاص (12 نشاط تفاعلي):</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-4 h-4 text-cream-600 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'bg-cream-100 hover:bg-cream-200 text-cream-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub Activities Grid Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2.5 max-h-[300px] overflow-y-auto p-1 scrollbar-thin">
          {filteredSubActivities.map((sub) => {
            const isActive = activeSubTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubTab(sub.id)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-rose-800 text-cream-50 border-rose-950 shadow-md scale-102 ring-2 ring-rose-500'
                    : 'bg-cream-50 hover:bg-cream-100 text-cream-900 border-cream-300'
                }`}
              >
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full mb-1 inline-block w-fit ${
                    isActive ? 'bg-cream-50/20 text-cream-100' : 'bg-rose-50 text-rose-900'
                  }`}
                >
                  {sub.tag}
                </span>
                <span className="text-xs font-bold font-cairo leading-snug">{sub.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Audio Guide & Spoken Explanation */}
      <ActivityAudioGuide
        activityId={currentSub.id}
        title={currentSub.title}
      />

      {/* Render Selected Interactive Activity */}
      <ActiveSubComponent
        onFinish={() => {
          const currentIdx = subActivities.findIndex((s) => s.id === activeSubTab);
          if (currentIdx + 1 < subActivities.length) {
            setActiveSubTab(subActivities[currentIdx + 1].id);
          } else if (onFinish) {
            onFinish();
          }
        }}
      />
    </div>
  );
};
