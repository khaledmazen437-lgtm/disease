import React from 'react';
import { Lock, Sparkles, Gamepad2, X } from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

export const LockedFeatureModal = ({ isOpen, onClose, featureName, onGoToActivities }) => {
  const { playCalmTone } = useSensory();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Animation Icon */}
        <div className="w-20 h-20 rounded-3xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
          <Lock className="w-10 h-10" />
        </div>

        {/* Title */}
        <span className="inline-block text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-2">
          قريباً • جاري العمل والتجهيز
        </span>

        <h3 className="text-2xl font-black font-cairo text-gray-900 mb-2">
          {featureName || 'هذه الخاصية قيد التطوير'}
        </h3>

        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          يتم حالياً تطوير هذه الخدمة للمراحل القادمة. التركيز الأساسي في المرحلة الحالية على <strong>عالم الطفل والأنشطة التأهيلية</strong> ليقوم الأطباء بتجربتها وتقييمها.
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            onClose();
            onGoToActivities();
            playCalmTone('success');
          }}
          className="w-full py-3.5 rounded-2xl bg-burgundy-800 hover:bg-burgundy-900 text-white font-bold font-cairo text-base shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>تجربة عالم الطفل والأنشطة الآن</span>
        </button>
      </div>
    </div>
  );
};
