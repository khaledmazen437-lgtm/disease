import React from 'react';
import { Users, Clock, ArrowRight, MessageSquare, Heart } from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

export const CommunityPage = ({ setCurrentTab }) => {
  const { playCalmTone } = useSensory();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-r from-sky-50 via-cream-100 to-sky-50 border-2 border-sky-200 rounded-3xl p-8 sm:p-12 text-center shadow-soft mb-12 relative overflow-hidden">
        <div className="w-20 h-20 rounded-2xl bg-sky-100 border border-sky-300 text-sky-800 flex items-center justify-center text-4xl mx-auto mb-6">
          <Users className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-950 font-bold text-xs mb-4">
          <Clock className="w-4 h-4 text-sky-700" />
          <span>المرحلة الثانية من خارطة الطريق (Roadmap Phase 2)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-cairo text-gray-900 mb-3">
          مُجْتَمَعُ وَمُنْتَدَى أَوْلِيَاءِ الأُمُور
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
          مساحة تفاعلية آمنة قيد التجهيز لتبادل الخبرات وقصص النجاح بين أولياء الأمور، وطرح الاستفسارات اليومية بحرية وأمان تام.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setCurrentTab('activities');
              playCalmTone('success');
            }}
            className="px-8 py-3.5 rounded-2xl bg-burgundy-800 hover:bg-burgundy-900 text-white font-bold font-cairo text-sm shadow-md transition-all flex items-center gap-2"
          >
            <span>انتقل لتجربة عالم الطفل والأنشطة التفاعلية</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center text-gray-500 text-xs">
        حالياً، التركيز الأساسي في المرحلة الحالية على اختبار <strong>عالم الطفل والأنشطة التأهيلية</strong> من قبل الأطباء والأخصائيين.
      </div>
    </div>
  );
};
