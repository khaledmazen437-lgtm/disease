import React, { useState } from 'react';
import { User, Award, Shield, Settings, Heart, CheckCircle2, Clock, Trophy } from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

export const ProfilePage = ({ setCurrentTab }) => {
  const { childStars, completedActivities, playCalmTone } = useSensory();
  const [activeChildName, setActiveChildName] = useState('البطل أحمد');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-cairo">
      {/* Profile Header */}
      <div className="bg-white border border-cream-300 rounded-3xl p-8 shadow-soft mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-burgundy-800 to-burgundy-950 text-white flex items-center justify-center shadow-md border-4 border-white">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-burgundy-950">
                {activeChildName}
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-0.5 rounded-full font-bold">
                حساب نشط ومتابَع
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cream-700">
              ملف الطفل التأهيلي • إشراف ولي الأمر والأخصائي المتابع
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-amber-700 font-bold text-sm bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>{childStars * 10} نقطة تأهيلية</span>
              </div>
              <div className="flex items-center gap-1.5 text-burgundy-800 font-bold text-sm bg-burgundy-50 px-3 py-1 rounded-xl border border-burgundy-200">
                <Award className="w-4 h-4 text-burgundy-700" />
                <span>{completedActivities.length} أنشطة مكتملة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-cream-300 rounded-3xl p-6 shadow-soft">
          <h3 className="font-bold text-lg text-burgundy-950 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-burgundy-800" />
            <span>الجدول اليومي والأهداف المنجزة</span>
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-cream-800">
            <li className="flex items-center justify-between p-3 bg-cream-50 rounded-xl">
              <span>نشاط التعرف على المشاعر</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> مكتمل
              </span>
            </li>
            <li className="flex items-center justify-between p-3 bg-cream-50 rounded-xl">
              <span>نشاط المطابقة والتركيز البصري</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> مكتمل
              </span>
            </li>
            <li className="flex items-center justify-between p-3 bg-cream-50 rounded-xl">
              <span>روتين الصباح البصري</span>
              <span className="text-amber-700 font-bold">قيد المتابعة</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-cream-300 rounded-3xl p-6 shadow-soft">
          <h3 className="font-bold text-lg text-burgundy-950 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-burgundy-800" />
            <span>التفضيلات الحسية المعتمدة</span>
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-cream-800">
            <li className="flex items-center justify-between p-3 bg-cream-50 rounded-xl">
              <span>مستوى التحفيز البصري:</span>
              <span className="font-bold text-burgundy-900">أوف وايت مهدئ (منخفض)</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-cream-50 rounded-xl">
              <span>المؤثرات الصوتية:</span>
              <span className="font-bold text-burgundy-900">نغمات ترددية هارمونية ناعمة</span>
            </li>
            <li className="flex items-center justify-between p-3 bg-cream-50 rounded-xl">
              <span>الضغط الزمني:</span>
              <span className="font-bold text-emerald-700">بدون مؤقت (Zero Stress)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Launch CTA */}
      <div className="text-center">
        <button
          onClick={() => {
            playCalmTone('success');
            setCurrentTab('activities');
          }}
          className="px-8 py-4 rounded-2xl bg-burgundy-800 hover:bg-burgundy-900 text-cream-50 font-bold text-base shadow-soft hover:shadow-soft-lg transition-all cursor-pointer"
        >
          متابعة أنشطة وتدريبات البطل
        </button>
      </div>
    </div>
  );
};
