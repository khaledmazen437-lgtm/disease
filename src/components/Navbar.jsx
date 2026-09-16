import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock } from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

export const Navbar = ({ currentTab, setCurrentTab, onOpenLockedModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { soundEnabled, playCalmTone } = useSensory();

  // Navigation tabs with locked states for upcoming protected modules
  const navItems = [
    { id: 'home', label: 'الرئيسية', isLocked: false },
    { id: 'activities', label: 'عالم الطفل والأنشطة', isLocked: false, isLive: true },
    { id: 'community', label: 'مجتمع الأهالي', isLocked: true },
    { id: 'research', label: 'الأبحاث والدراسات', isLocked: true },
    { id: 'doctors', label: 'بوابة الأطباء والاستشارات', isLocked: true },
    { id: 'profile', label: 'الملف الشخصي', isLocked: true },
  ];

  const handleNavClick = (item) => {
    playCalmTone('gentle-tap');
    if (item.isLocked) {
      onOpenLockedModal(item.label);
    } else {
      setCurrentTab(item.id);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs font-cairo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          
          {/* Brand: "بَطَل" */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playCalmTone('gentle-tap');
              setCurrentTab('home');
            }}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="text-2xl sm:text-3xl font-black text-burgundy-950 tracking-tight">
              بَـطَـل
            </span>
            <span className="text-[10px] sm:text-[11px] bg-purple-100 text-purple-900 font-bold px-2.5 py-0.5 rounded-full border border-purple-300 shadow-sm">
              منصة تجريبية للأطباء فقط
            </span>
          </motion.div>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all relative flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-burgundy-950 font-black'
                      : item.isLive
                      ? 'text-burgundy-900 hover:bg-burgundy-50 font-black'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  
                  {item.isLive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="متاح للتجربة الفورية"></span>
                  )}
                  {item.isLocked && (
                    <Lock className="w-3 h-3 text-gray-400 opacity-60" />
                  )}

                  {/* Active Animated Bottom Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-burgundy-800 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with Smooth Slide Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-gray-200 px-4 py-3 space-y-1 shadow-md overflow-hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleNavClick(item);
                }}
                className={`w-full text-right px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  currentTab === item.id 
                    ? 'bg-burgundy-50 text-burgundy-950 font-black' 
                    : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                {item.isLocked && (
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">قريباً</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
