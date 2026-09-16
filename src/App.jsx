import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SensoryProvider, useSensory } from './context/SensoryContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { CommunityPage } from './pages/CommunityPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ResearchPage } from './pages/ResearchPage';
import { LockedFeatureModal } from './components/LockedFeatureModal';
import { CelebrationModal } from './components/CelebrationModal';
import { ArrowUp } from 'lucide-react';

function MainAppContent() {
  const [currentTab, setCurrentTab] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lockedModalData, setLockedModalData] = useState({ isOpen: false, featureName: '' });
  const { playCalmTone } = useSensory();

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    playCalmTone('gentle-tap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLockedModal = (featureName) => {
    setLockedModalData({ isOpen: true, featureName });
  };

  const handleCloseLockedModal = () => {
    setLockedModalData({ isOpen: false, featureName: '' });
  };

  const handleGoToActivities = () => {
    setCurrentTab('activities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream-100 selection:bg-burgundy-100 selection:text-burgundy-950 relative overflow-x-hidden">
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenLockedModal={handleOpenLockedModal}
      />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 16, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.995 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="w-full"
          >
            {currentTab === 'home' && (
              <HomePage 
                setCurrentTab={setCurrentTab} 
                onOpenLockedModal={handleOpenLockedModal}
              />
            )}
            {currentTab === 'activities' && <ActivitiesPage />}
            {currentTab === 'community' && <CommunityPage setCurrentTab={setCurrentTab} />}
            {currentTab === 'doctors' && <DoctorsPage setCurrentTab={setCurrentTab} />}
            {currentTab === 'profile' && <ProfilePage setCurrentTab={setCurrentTab} />}
            {currentTab === 'research' && <ResearchPage setCurrentTab={setCurrentTab} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentTab={setCurrentTab} />

      {/* Floating Scroll To Top Button with Spring Animation */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-burgundy-800 hover:bg-burgundy-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-colors border-2 border-burgundy-600/60"
            title="العودة لأعلى الصفحة"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Coming Soon / Locked Feature Modal */}
      <LockedFeatureModal
        isOpen={lockedModalData.isOpen}
        onClose={handleCloseLockedModal}
        featureName={lockedModalData.featureName}
        onGoToActivities={handleGoToActivities}
      />

      {/* Audio & Visual Celebration Modal with Clapping & "شاطر شاطر" */}
      <CelebrationModal />
    </div>
  );
}

export function App() {
  return (
    <SensoryProvider>
      <MainAppContent />
    </SensoryProvider>
  );
}

export default App;
