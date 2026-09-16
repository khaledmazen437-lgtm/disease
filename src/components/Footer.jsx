import React from 'react';
import { Heart, Sparkles, Shield, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

export const Footer = ({ setCurrentTab }) => {
  const { playCalmTone } = useSensory();

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black font-cairo text-burgundy-950 tracking-tight">
                بَـطَـل
              </span>
             
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              المنصة الرقمية الأولى لدعم وتأهيل ذوي طيف التوحد، تقدم برامج وأنشطة تفاعلية مدروسة حسياً لتطوير مهارات التفكير والسلوك.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm font-cairo text-gray-900">روابط سريعة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { setCurrentTab('home'); playCalmTone('gentle-tap'); }} 
                  className="hover:text-burgundy-900 transition-colors"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentTab('activities'); playCalmTone('gentle-tap'); }} 
                  className="hover:text-burgundy-900 font-bold text-burgundy-900 flex items-center gap-1 transition-colors"
                >
                  <span>عالم الطفل والأنشطة </span>
                </button>
              </li>
              <li>
                <a 
                  href="#faq-section"
                  onClick={() => { setCurrentTab('home'); playCalmTone('gentle-tap'); }} 
                  className="hover:text-burgundy-900 transition-colors"
                >
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details (الموقع، الواتساب، الجيميل) */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm font-cairo text-gray-900">بيانات التواصل والمقر</h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-burgundy-800 flex-shrink-0" />
                <span>مصر </span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <a 
                  href="https://wa.me/201226935593" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-700 font-semibold underline decoration-emerald-300"
                  dir="ltr"
                >
                  +20 122 693 5593 (واتساب)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-burgundy-800 flex-shrink-0" />
                <a 
                  href="mailto:khaledmazen437@gamil.com" 
                  className="hover:text-burgundy-900 font-medium"
                >
                  khaledmazen437@gamil.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Engineers & Company Supervision */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm font-cairo text-gray-900">فريق التنفيذ والإشراف</h4>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5 text-xs">
              <span className="font-bold text-burgundy-950 block">شركة: MHD</span>
              <span className="text-gray-900 font-bold block text-burgundy-900">• الإشراف التخصصي: د. هناء</span>
              <span className="text-gray-700 block">• المهندس المسؤول: م. مازن خالد</span>
              <span className="text-gray-700 block">• المهندسة المسؤولة: م. خلود نجم</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Team Credit */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <p>© {new Date().getFullYear()} شركة MHD - جميع الحقوق محفوظة | مَنَصَّـة بَـطَـل</p>
          <p className="font-medium text-gray-700">
            تحت إشراف: <span className="font-bold text-burgundy-900">د. هناء</span> | تطوير وتنفيذ: <span className="font-bold text-burgundy-900">م. مازن خالد</span> & <span className="font-bold text-burgundy-900">م. خلود نجم</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
