import React from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

export const ResearchPage = ({ setCurrentTab }) => {
  const { playCalmTone } = useSensory();

  const sampleArticles = [
    {
      title: "أحدث المعايير العلمية لتصميم البيئات الرقمية المهدئة لذوي طيف التوحد",
      category: "التكامل الحسي والتكنولوجيا",
      author: "د. سارة المنصوري",
      date: "قريباً في المرحلة 2"
    },
    {
      title: "أثر التغذية البصرية الراجعة ونظام المكافآت الترددية في تعديل السلوك",
      category: "العلاج السلوكي المعرفي",
      author: "د. طارق الحكيم",
      date: "قريباً في المرحلة 2"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Coming Soon Notice */}
      <div className="bg-gradient-to-r from-amber-50 via-cream-100 to-amber-50 border-2 border-amber-300/80 rounded-3xl p-8 sm:p-12 text-center shadow-soft mb-12 relative overflow-hidden">
        <div className="w-20 h-20 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center text-4xl mx-auto mb-6">
          <BookOpen className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-200/80 text-amber-950 font-bold text-xs mb-4">
          <Clock className="w-4 h-4 text-amber-800" />
          <span>المرحلة الثانية من خارطة الطريق (Roadmap Phase 2)</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-cairo text-gray-900 mb-3">
          قِسمُ الأَبْحَاثِ وَالدِّرَاسَاتِ العِلْمِيَّة
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
          سيتم إطلاق هذه البوابة قريباً لتضم مكتبة موثقة من أحدث الأبحاث الطبية والتربوية العالمية في تأهيل طيف التوحد بإشراف نخبة من المتخصصين.
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

      {/* Preview of Upcoming Research */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-cairo text-gray-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>نماذج من الأبحاث قيد الإعداد والنشر:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleArticles.map((art, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm opacity-80">
              <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2.5 py-0.5 rounded-md">
                {art.category}
              </span>
              <h4 className="font-bold text-base text-gray-900 font-cairo mt-2 mb-1">{art.title}</h4>
              <p className="text-xs text-gray-500">{art.author} • {art.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
