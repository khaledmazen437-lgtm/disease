import React, { useState } from 'react';
import { Layers, Filter, Sparkles, Award } from 'lucide-react';
import { GlassesPullActivity } from './level3/GlassesPullActivity';
import { PeekabooCountingActivity } from './level3/PeekabooCountingActivity';
import { TurnOnLightsActivity } from './level3/TurnOnLightsActivity';
import { TunnelAdventureActivity } from './level3/TunnelAdventureActivity';
import { MagicBubblesActivity } from './level3/MagicBubblesActivity';
import { PoppingBalloonsActivity } from './level3/PoppingBalloonsActivity';
import { BlockBuildingActivity } from './level3/BlockBuildingActivity';
import { TrashBasketActivity } from './level3/TrashBasketActivity';
import { FreezeDanceActivity } from './level3/FreezeDanceActivity';
import { FollowMeMimicActivity } from './level3/FollowMeMimicActivity';
import { SupermarketShopperActivity } from './level3/SupermarketShopperActivity';
import { SandDrawingActivity } from './level3/SandDrawingActivity';
import { FaceStickerActivity } from './level3/FaceStickerActivity';
import { ActivityAudioGuide } from '../ActivityAudioGuide';

export const VisualCombinedActivity = ({ onFinish }) => {
  const [activeSubTab, setActiveSubTab] = useState('glasses_pull');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'الكل (13 نشاطاً للمستوى الثالث)' },
    { id: 'faces_emotions', label: 'الوجوه والتعبيرات والنظارات' },
    { id: 'cooperation_sharing', label: 'التعاون وتبادل الأدوار' },
    { id: 'movement_adventure', label: 'الحركة والتقليد والمغامرة' },
  ];

  const subActivities = [
    { id: 'glasses_pull', title: 'سحب النظارة للتواصل المباشر', tag: 'النشاط 1', cat: 'faces_emotions', component: GlassesPullActivity },
    { id: 'peekaboo_count', title: 'الغميضة مع العد (فرحان/زعلان)', tag: 'النشاط 2', cat: 'faces_emotions', component: PeekabooCountingActivity },
    { id: 'turn_on_lights', title: 'شغل النور واكتشف الوجه السعيد', tag: 'النشاط 3', cat: 'faces_emotions', component: TurnOnLightsActivity },
    { id: 'tunnel_adventure', title: 'لعبة النفق وتجميع أجزاء الوجه', tag: 'النشاط 4', cat: 'movement_adventure', component: TunnelAdventureActivity },
    { id: 'magic_bubbles', title: 'فقاعات سحرية مع وجوه مبهجة', tag: 'النشاط 5', cat: 'faces_emotions', component: MagicBubblesActivity },
    { id: 'popping_balloons', title: 'بالونات مفرقعة ومفاجأة الوجوه', tag: 'النشاط 6', cat: 'movement_adventure', component: PoppingBalloonsActivity },
    { id: 'block_building', title: 'تركيب مكعبات وتبادل الأدوار', tag: 'النشاط 7', cat: 'cooperation_sharing', component: BlockBuildingActivity },
    { id: 'trash_basket', title: 'سلة المهملات والنظافة المتبادلة', tag: 'النشاط 8', cat: 'cooperation_sharing', component: TrashBasketActivity },
    { id: 'freeze_dance', title: 'لعبة التجمد والرقص مع الموسيقى', tag: 'النشاط 9', cat: 'movement_adventure', component: FreezeDanceActivity },
    { id: 'follow_me_mimic', title: 'قلدني - تقليد حركات الشخص', tag: 'النشاط 10', cat: 'movement_adventure', component: FollowMeMimicActivity },
    { id: 'supermarket_shopper', title: 'السوبرماركت والطلب بالصوت العربي', tag: 'النشاط 11', cat: 'cooperation_sharing', component: SupermarketShopperActivity },
    { id: 'sand_drawing', title: 'ارسم باللون على الرمل الذهبي', tag: 'النشاط 12', cat: 'movement_adventure', component: SandDrawingActivity },
    { id: 'face_sticker', title: 'استيكرات الوجه المضحكة والمرح', tag: 'النشاط 13', cat: 'faces_emotions', component: FaceStickerActivity },
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
          <div className="flex items-center gap-2 text-sm font-black font-cairo text-purple-950">
            <Layers className="w-5 h-5 text-purple-700" />
            <span>المستوى الثالث: التواصل مع الأشياء والأشخاص (13 نشاطاً تفاعلياً كاملاً):</span>
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
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'bg-cream-100 hover:bg-cream-200 text-cream-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub Activities Grid Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-[300px] overflow-y-auto p-1 scrollbar-thin">
          {filteredSubActivities.map((sub) => {
            const isActive = activeSubTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubTab(sub.id)}
                className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-purple-900 text-cream-50 border-purple-950 shadow-md scale-102 ring-2 ring-purple-500'
                    : 'bg-cream-50 hover:bg-cream-100 text-cream-900 border-cream-300'
                }`}
              >
                <span
                  className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full mb-1 inline-block w-fit ${
                    isActive ? 'bg-cream-50/20 text-cream-100' : 'bg-purple-100 text-purple-900'
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
