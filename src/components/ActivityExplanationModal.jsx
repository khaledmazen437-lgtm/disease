import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

export const ActivityExplanationModal = ({ isOpen, onClose, guide }) => {
  const { playCalmTone } = useSensory();

  if (!isOpen || !guide) return null;

  const handleStartGame = () => {
    playCalmTone('success');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Darkened gentle backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-burgundy-950/65 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-white via-cream-50 to-amber-50/50 rounded-3xl border-2 border-amber-200/90 shadow-2xl overflow-hidden z-10 my-auto text-right"
          dir="rtl"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 p-5 sm:p-6 text-white relative overflow-hidden">
            <div className="flex items-center justify-between relative z-10">
              <div>
                <div className="inline-block px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold font-cairo mb-1">
                  {guide.tag || 'دليل النشاط والتأهيل'}
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-cairo text-white drop-shadow-xs">
                  {guide.title}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer active:scale-95 shrink-0"
                title="إغلاق النافذة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body Content */}
          <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* 1. Direct Therapeutic & Behavioral Goal */}
            <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 shadow-xs">
              <div className="text-amber-900 font-bold text-sm font-cairo mb-1.5">
                الهدف المباشر من هذا النشاط:
              </div>
              <p className="text-xs sm:text-sm text-cream-950 leading-relaxed font-medium">
                {guide.goal}
              </p>
            </div>

            {/* 2. Step-by-Step Playing Instructions */}
            <div className="space-y-3">
              <h4 className="text-sm font-black font-cairo text-burgundy-950">
                كيف نلعب؟ (خطوات النشاط بالتفصيل):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {guide.steps && guide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-cream-200 rounded-2xl p-3.5 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center font-cairo shadow-xs">
                          {step.number || idx + 1}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold font-cairo text-burgundy-950 mb-1">
                        {step.title}
                      </h5>
                    </div>
                    <p className="text-[11px] text-cream-800 leading-snug font-medium mt-1">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Specialist / Parent Guidance Tip */}
            {guide.tip && (
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3.5 text-emerald-950 text-xs leading-relaxed font-medium shadow-xs">
                <div>
                  <span className="font-bold text-emerald-900 block mb-0.5">إرشاد لولي الأمر والأخصائي:</span>
                  <span>{guide.tip}</span>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer / Action */}
          <div className="p-4 sm:p-5 bg-cream-100 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs font-bold text-cream-800">
              أكمل النشاط بنجاح لتحصل على نجمة ذهبية جديدة!
            </div>

            <button
              onClick={handleStartGame}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black text-sm font-cairo shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center"
            >
              <span>بدء اللعب الان</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
