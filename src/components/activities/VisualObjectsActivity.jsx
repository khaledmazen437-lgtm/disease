import React, { useState } from 'react';
import { Gamepad2, Sparkles, Filter } from 'lucide-react';
import { BubblePopActivity } from './level1/BubblePopActivity';
import { RingsStackActivity } from './level1/RingsStackActivity';
import { GlowingLampsActivity } from './level1/GlowingLampsActivity';
import { VehicleChaserActivity } from './level1/VehicleChaserActivity';
import { RemoteCarPathActivity } from './level1/RemoteCarPathActivity';
import { SoundButtonsActivity } from './level1/SoundButtonsActivity';
import { RainCloudActivity } from './level1/RainCloudActivity';
import { SurpriseBagShadowActivity } from './level1/SurpriseBagShadowActivity';
import { FaceMasksActivity } from './level1/FaceMasksActivity';
import { SwingFlyActivity } from './level1/SwingFlyActivity';
import { ClimbJumpActivity } from './level1/ClimbJumpActivity';
import { TwoTrainersActivity } from './level1/TwoTrainersActivity';
import { ShadowTheaterActivity } from './level1/ShadowTheaterActivity';
import { EyeDirectionActivity } from './level1/EyeDirectionActivity';
import { CupsShellEyeActivity } from './level1/CupsShellEyeActivity';
import { LipReadingActivity } from './level1/LipReadingActivity';
import { AdventureTunnelActivity } from './level1/AdventureTunnelActivity';
import { NonVerbalCubesActivity } from './level1/NonVerbalCubesActivity';
import { SeatSwapActivity } from './level1/SeatSwapActivity';
import { MimicSoundFaceActivity } from './level1/MimicSoundFaceActivity';
import { ActivityAudioGuide } from '../ActivityAudioGuide';

export const VisualObjectsActivity = ({ onFinish }) => {
  const [activeSubTab, setActiveSubTab] = useState('bubbles');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'الكل (20 نشاطاً تفاعلياً)' },
    { id: 'objects', label: 'الأشياء والعناصر' },
    { id: 'faces', label: 'ألعاب الوجه والتعبيرات' },
    { id: 'movement', label: 'الحركة والقفز والتأرجح' },
    { id: 'gaze_signals', label: 'تتبع العين والإشارات' },
  ];

  const subActivities = [
    { id: 'bubbles', title: 'فرقعة فقاعات الصابون ', tag: 'النشاط 1', cat: 'objects', component: BubblePopActivity },
    { id: 'rings', title: 'لعبة الحلقات الملونة 3D ', tag: 'النشاط 2', cat: 'objects', component: RingsStackActivity },
    { id: 'lamps', title: 'اللمض والكرات المضيئة ', tag: 'النشاط 3', cat: 'objects', component: GlowingLampsActivity },
    { id: 'chaser', title: 'تتبع كرات المركبات ', tag: 'النشاط 4', cat: 'objects', component: VehicleChaserActivity },
    { id: 'remote_car', title: 'السيارة بالريموت والمسار ', tag: 'النشاط 5', cat: 'objects', component: RemoteCarPathActivity },
    { id: 'sound_buttons', title: 'الأزرار والأصوات الملونة ', tag: 'النشاط 6', cat: 'objects', component: SoundButtonsActivity },
    { id: 'rain_cloud', title: 'السحابة والماء والمنخل ', tag: 'النشاط 7', cat: 'objects', component: RainCloudActivity },
    { id: 'surprise_bag', title: 'كيس المفاجآت والظلال ', tag: 'النشاط 8', cat: 'objects', component: SurpriseBagShadowActivity },

    // Interactive Activities Suite
    { id: 'face_masks', title: 'ألعاب الوجه والأقنعة (بخ!) ', tag: 'النشاط 9', cat: 'faces', component: FaceMasksActivity },
    { id: 'swing_fly', title: 'التأرجح والطيران في الجو ', tag: 'النشاط 10', cat: 'movement', component: SwingFlyActivity },
    { id: 'climb_jump', title: 'التسلق والقفز (العد 1-5) ', tag: 'النشاط 11', cat: 'movement', component: ClimbJumpActivity },
    { id: 'two_trainers', title: 'التواصل المشترك والزغزغة ', tag: 'النشاط 12', cat: 'faces', component: TwoTrainersActivity },
    { id: 'shadow_theater', title: 'مسرح ظل الخيال والكشاف ', tag: 'النشاط 13', cat: 'objects', component: ShadowTheaterActivity },
    { id: 'eye_direction', title: 'الإشارة بالعين وتتبع النظرة ', tag: 'النشاط 14', cat: 'gaze_signals', component: EyeDirectionActivity },
    { id: 'cups_shell_eye', title: 'راقب عيني حتى تكسبني ', tag: 'النشاط 15', cat: 'gaze_signals', component: CupsShellEyeActivity },
    { id: 'lip_reading', title: 'فقدت صوتي وتعبيرات الشفاه ', tag: 'النشاط 16', cat: 'faces', component: LipReadingActivity },
    { id: 'adventure_tunnel', title: 'نفق المغامرة الشفاف والظهور ', tag: 'النشاط 17', cat: 'movement', component: AdventureTunnelActivity },
    { id: 'non_verbal_cubes', title: 'تعليمات المكعبات غير اللفظية ', tag: 'النشاط 18', cat: 'gaze_signals', component: NonVerbalCubesActivity },
    { id: 'seat_swap', title: 'تبادل الأماكن بالإيماء والكرسي ', tag: 'النشاط 19', cat: 'gaze_signals', component: SeatSwapActivity },
    { id: 'mimic_sound_face', title: 'قلد أصواتي وتعبيراتي ', tag: 'النشاط 20', cat: 'faces', component: MimicSoundFaceActivity },
  ];

  const filteredSubActivities =
    selectedCategory === 'all'
      ? subActivities
      : subActivities.filter((s) => s.cat === selectedCategory);

  const currentSub =
    subActivities.find((s) => s.id === activeSubTab) || subActivities[0];
  const ActiveSubComponent = currentSub.component;

  return (
    <div className="space-y-6">
      {/* Category Filter & Sub Activity Tabs Switcher */}
      <div className="bg-white border border-cream-300 rounded-3xl p-5 shadow-soft space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-200 pb-3">
          <div className="flex items-center gap-2 text-sm font-black font-cairo text-burgundy-950">
            <Gamepad2 className="w-5 h-5 text-burgundy-700" />
            <span>أنشطة التواصل البصري والتفاعل التفاعلية (20 نشاط متكامل):</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-4 h-4 text-cream-600 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-burgundy-900 text-white shadow-sm'
                    : 'bg-cream-100 hover:bg-cream-200 text-cream-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub Activities Grid Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[300px] overflow-y-auto p-1 scrollbar-thin">
          {filteredSubActivities.map((sub) => {
            const isActive = activeSubTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubTab(sub.id)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-burgundy-900 text-cream-50 border-burgundy-950 shadow-md scale-102 ring-2 ring-burgundy-600'
                    : 'bg-cream-50 hover:bg-cream-100 text-cream-900 border-cream-300'
                }`}
              >
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full mb-1 inline-block w-fit ${
                    isActive ? 'bg-cream-50/20 text-cream-100' : 'bg-burgundy-50 text-burgundy-900'
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

