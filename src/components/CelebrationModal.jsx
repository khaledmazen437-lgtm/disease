import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, X } from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

export const CelebrationModal = () => {
  const { celebrationData, closeCelebration, playClappingAndCheer } = useSensory();

  if (!celebrationData.isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-burgundy-950/60 backdrop-blur-sm animate-fade-in font-cairo">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-2xl text-center overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closeCelebration}
            className="absolute top-4 left-4 p-2 rounded-full text-gray-500 hover:text-burgundy-950 hover:bg-gray-100 transition-all cursor-pointer z-10"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Natural Child Rehabilitation Photo */}
          <div
            onClick={() => playClappingAndCheer()}
            className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 mb-5 rounded-full overflow-hidden border-4 border-amber-300 shadow-md cursor-pointer group"
            title="اضغط لسماع التشجيع الصوتي المباشر"
          >
            <img 
              src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=400&q=80" 
              alt="طفل بطل"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/90 text-amber-600 flex items-center justify-center shadow-md">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Clean Main Voice Title */}
          <motion.h2
            onClick={() => playClappingAndCheer()}
            initial={{ scale: 0.95 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl sm:text-3xl font-black text-burgundy-950 mb-6 cursor-pointer select-none"
            title="اضغط لسماع: شاطر شاطر يا بطل!"
          >
            شاطر شاطر يا بطل!
          </motion.h2>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Replay Cheering Sound Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playClappingAndCheer()}
              className="btn-dribbble-glass w-full sm:w-auto"
            >
              <Volume2 className="w-4 h-4 text-burgundy-700" />
              <span>إعادة سماع الصوت</span>
            </motion.button>

            {/* Continue Button */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeCelebration}
              className="btn-dribbble-primary w-full sm:w-auto py-3 px-7 rounded-2xl text-sm"
            >
              <span>استمرار ومتابعة التدريب</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
