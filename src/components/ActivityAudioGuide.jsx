import React, { useState } from 'react';
import { useSensory } from '../context/SensoryContext';
import { getActivityAudioGuide } from '../config/activityAudioGuides';
import { ActivityExplanationModal } from './ActivityExplanationModal';

export const ActivityAudioGuide = ({ activityId, title = '', className = '' }) => {
  const { playCalmTone } = useSensory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const guide = getActivityAudioGuide(activityId, title);

  const handleOpenModal = () => {
    playCalmTone('gentle-tap');
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`bg-gradient-to-r from-amber-50/95 via-cream-50 to-orange-50/90 border-2 border-amber-300/80 rounded-3xl p-4 sm:p-5 shadow-soft transition-all duration-300 relative overflow-hidden ${className}`}
        dir="rtl"
      >
        {/* Decorative gentle background glow */}
        <div className="absolute -top-10 -left-10 w-28 h-28 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-orange-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Side: Title & Spoken Summary Text */}
          <div className="flex-1 space-y-2 text-right">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-950 text-xs font-black font-cairo shadow-xs">
                <span>دليل وتأهيل النشاط</span>
              </div>
              <span className="text-xs font-bold text-cream-700 bg-white/90 border border-cream-200 px-2.5 py-0.5 rounded-xl shadow-xs">
                {guide.tag}
              </span>
            </div>

            {/* Goal & Description */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-900">
                <span>الهدف المباشر: {guide.goal}</span>
              </div>
              
              {/* Audio Script Quote / Subtitle readout */}
              <p className="text-xs sm:text-sm text-cream-950 leading-relaxed font-medium p-3 rounded-2xl border bg-white/80 border-cream-200/80 shadow-xs">
                "{guide.audioScript}"
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Explanation Modal Control */}
          <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
            {/* Modal Explanation Steps Button */}
            <button
              onClick={handleOpenModal}
              className="flex items-center justify-center px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm font-cairo shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 border border-amber-400"
              title="عرض خطوات اللعب وشرح النشاط بالتفصيل"
            >
              <span>خطوات النشاط</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Explanation Modal */}
      <ActivityExplanationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        guide={guide}
      />
    </>
  );
};
