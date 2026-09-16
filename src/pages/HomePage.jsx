import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImage from '../assets/Autism-01-1024x695.jpg';
import { 
  Gamepad2, 
  CheckCircle2, 
  Quote, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Star,
  Eye,
  Award,
  Heart,
  ShieldCheck,
  Zap,
  Users
} from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

// Custom Elegant Burgundy Line-Art Icons for Features & Programs
const BurgundyIcons = {
  Creativity: () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-burgundy-800">
      <path d="M32 6C20.954 6 12 14.954 12 26c0 6.942 3.53 13.064 8.91 16.666v5.334a4 4 0 004 4h14.18a4 4 0 004-4v-5.334C48.47 39.064 52 32.942 52 26 52 14.954 43.046 6 32 6z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24 52h16m-14 4h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 16v10m-6-4l12 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M22 14l10-4 10 4-10 4-10-4z" stroke="#D97706" strokeWidth="2" fill="none"/>
    </svg>
  ),
  School: () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-burgundy-800">
      <path d="M32 10L6 24l26 14 26-14L32 10z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M14 28.5v16.5c0 8 8 13 18 13s18-5 18-13V28.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M52 25v16" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="32" cy="24" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 38v10m8-10v10m8-10v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  Activities: () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-burgundy-800">
      <rect x="10" y="10" width="44" height="44" rx="8" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M10 24h44M24 10v44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="17" cy="17" r="2.5" fill="#D97706"/>
      <circle cx="38" cy="17" r="2.5" fill="currentColor"/>
      <circle cx="17" cy="38" r="2.5" fill="currentColor"/>
      <circle cx="38" cy="38" r="2.5" fill="#D97706"/>
      <path d="M44 31l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Teacher: () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-burgundy-800">
      <rect x="22" y="10" width="34" height="24" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M28 17h14m-14 5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M39 34v16m-6 0h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="16" cy="22" r="6" stroke="#D97706" strokeWidth="2.5"/>
      <path d="M8 44c0-5 3.5-9 8-9s8 4 8 9v6H8v-6z" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M24 38l8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  HeartCare: () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-burgundy-800">
      <path d="M32 52s-18-11-18-24a10 10 0 0118-6 10 10 0 0118 6c0 13-18 24-18 24z" fill="#800020" fillOpacity="0.9"/>
      <path d="M32 52s-18-11-18-24a10 10 0 0118-6 10 10 0 0118 6c0 13-18 24-18 24z" stroke="currentColor" strokeWidth="2"/>
      <path d="M22 22a4 4 0 014-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  ProgVisualCommunication: () => (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-burgundy-800">
      <path d="M6 32s10-18 26-18 26 18 26 18-10 18-26 18S6 32 6 32z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="32" r="10" stroke="#D97706" strokeWidth="2.5"/>
      <circle cx="32" cy="32" r="4.5" fill="#800020"/>
      <path d="M32 10v4m0 36v4M12 16l3 3m34 26l3 3M52 16l-3 3m-34 26l-3 3" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
};

// Animation Stagger Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] }
  }
};

export const HomePage = ({ setCurrentTab }) => {
  const { playCalmTone } = useSensory();
  
  // Interactive State for FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Dynamic Auto-Moving Testimonials Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Direct CTA navigation to Child Activities
  const handleStartActivities = () => {
    playCalmTone('success');
    setCurrentTab('activities');
  };

  // 1. المميزات - Features Data
  const featuresList = [
    {
      id: 1,
      title: "تطوير مهارات التفكير الإبداعي",
      description: "منصة بطل الرقمية تساعد الأطفال على تطوير مهارات التفكير الإبداعي لديهم بأسلوب محفز ومهدئ.",
      IconComponent: BurgundyIcons.Creativity
    },
    {
      id: 2,
      title: "مواكبة الصفوف الدراسية",
      description: "يمكن للأطفال مواكبة صفوفهم الدراسية من خلال منصة بطل الرقمية التعليمية التفاعلية.",
      IconComponent: BurgundyIcons.School
    },
    {
      id: 3,
      title: "أنشطة تفاعلية وألعاب تعليمية",
      description: "المنصة تتضمن أنشطة تفاعلية وألعاب تعليمية بالصوت والتصفيق تحفز الأطفال على إنجاز دروسهم.",
      IconComponent: BurgundyIcons.Activities
    },
    {
      id: 4,
      title: "التواصل المباشر مع المعلم",
      description: "إمكانية التواصل بشكل مباشر مع المعلم والأخصائي المتابع لمتابعة تطور الطفل.",
      IconComponent: BurgundyIcons.Teacher
    },
    {
      id: 5,
      title: "مجانية ومتاحة بدعم شركة MHD",
      description: "هذه المنصة التعليمية مجانية وتقدمها شركة MHD بإشراف هندسي وطبي متكامل.",
      IconComponent: BurgundyIcons.HeartCare
    }
  ];

  // 2. دور منصة بطل - Roles & Values
  const platformRoles = [
    "التصدي لتوقف التعليم بسبب الظروف الجوية أو الصحية.",
    "تقديم محتوى تعليمي وتوعوي وترفيهي للأطفال.",
    "مساعدة الأطفال على متابعة رحلتهم التعليمية بثقة.",
    "تقديم نصائح ومحتوى مفيد للآباء والأمهات.",
    "التواصل مع الطالب وولي أمره خلال الإجازات والعطل الرسمية.",
    "مساعدة الآباء والأمهات على دعم التوازن النفسي والطبي والتعليمي لأطفالهم."
  ];

  // 4. آراء المستفيدين المتحركة
  const testimonials = [
    {
      id: 1,
      text: "منصة مميزة قدمت لي الكثير من المعلومات حول طيف التوحد وساعدتني في كيفية التعامل مع ابني.. يعطيكم العافية.",
      author: "أم سعود (ولي أمر)",
      role: "أم لطفل في طيف التوحد",
      city: "المحلة الكبرى",
      rating: 5
    },
    {
      id: 2,
      text: "سعيد جداً بمنصة التوحد الرقمية، تعلمت واستفدت الكثير من برامج التأهيل والأنشطة التفاعلية المهدئة.",
      author: "أبو ريان (ولي أمر)",
      role: "ولي أمر متابع",
      city: "طنطا",
      rating: 5
    },
    {
      id: 3,
      text: "تجربة استثنائية رفعت مستوى الوعي والتفاعل عند طفلي وأعطتنا خطة واضحة لمتابعة روتينه اليومي بدون قلق.",
      author: "أ. نورة الغامدي",
      role: "أخصائية تكامل حسي",
      city: "القاهرة",
      rating: 5
    },
    {
      id: 4,
      text: "الأنشطة مصممة بعناية فائقة تلبي احتياجات الطفل الحسية بدون أي مؤثرات مزعجة، إنجاز رائع لفريق MHD.",
      author: "د. هاني الشناوي",
      role: "استشاري سلوك أطفال",
      city: "المنصورة",
      rating: 5
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const nextTestimonial = () => {
    playCalmTone('gentle-tap');
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    playCalmTone('gentle-tap');
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // 5. الأسئلة الشائعة
  const faqs = [
    {
      q: "كيف تختلف منصة بطل عن المنصات التعليمية التقليدية؟",
      a: "تم تصميم منصة بطل بهوية بصرية مهدئة بدون إشعاعات ساطعة أو مؤقتات ضغط زمني، مما يوفر بيئة حسية آمنة تناسب الخصائص الإدراكية لذوي طيف التوحد."
    },
    {
      q: "هل الأنشطة والبرامج مناسبة لجميع مستويات طيف التوحد؟",
      a: "نعم، البرامج مقسمة إلى مسارات متدرجة من المبتدئ إلى المتقدم، مع دعم لبطاقات PECS المصورة للأطفال غير الناطقين وتدريبات مخصصة لكل مهارة."
    },
    {
      q: "كيف يمكن لولي الأمر والأخصائي متابعة تقارير تقدم الطفل؟",
      a: "توفر المنصة لوحة مؤشرات تسجل بدقة الأنشطة المنجزة، والوقت المستغرق، والنجوم التأهيلية المكتسبة لتقديم تقرير شامل للأخصائي."
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden font-cairo">
      
      {/* 1. Hero Section الفاخر جداً مع صورة الطفل الأصلية Autism-01-1024x695.jpg والأنيميشن التفاعلي */}
      <section className="relative w-full min-h-[540px] md:min-h-[620px] flex items-center justify-center overflow-hidden">
        
        {/* Animated Background Glowing Orbs */}
        <motion.div 
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.65, 0.35]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-12 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl z-1 pointer-events-none"
        />
        <motion.div 
          animate={{ 
            y: [0, 25, 0],
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.55, 0.25]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-12 w-80 h-80 bg-amber-500/25 rounded-full blur-3xl z-1 pointer-events-none"
        />

        {/* Background Child Image with Smooth Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="بطل منصة التوحد" 
            className="w-full h-full object-cover object-[center_35%] transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/85 via-black/50 to-black/40"></div>
        </div>

        {/* Hero Content Box with Staggered Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center text-white space-y-6"
        >
          {/* Hero Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-lg text-white">
            ابدأ حصّتك على منصة <span className="text-amber-300">بَـطَـل</span> الرقمية
          </h1>

          {/* Hero Paragraph */}
          <p className="text-base sm:text-xl md:text-2xl text-cream-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow">
            نعمل في منصة بطل على تطوير مهارات أطفال التوحد البصرية والحسية وتهذيب سلوكهم في بيئة آمنة مهدئة.
          </p>

          {/* Animated Dribbble SaaS Hero CTA Button */}
          <div className="pt-4 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleStartActivities}
              className="btn-dribbble-primary group text-base sm:text-lg px-10 py-4.5 rounded-full shadow-2xl hover:shadow-purple-900/50"
            >
              <span>دخول بوابة الأنشطة الآن</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-[-6px] transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 2. مميزات منصة بطل الرقمية مع الأيقونات العنابية والأنيميشن التفاعلي */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 inline-block relative pb-4">
            مميزات منصة <span className="text-burgundy-900">بَـطَـل</span> الرقمية
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-amber-500 rounded-full"></span>
          </h2>
        </div>

        {/* Features Staggered Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12 text-center"
        >
          {featuresList.slice(0, 3).map((item) => {
            const Icon = item.IconComponent;
            return (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white border border-cream-200 rounded-3xl p-8 flex flex-col items-center group shadow-soft hover:shadow-soft-lg transition-all duration-300"
              >
                <div className="mb-6 transform group-hover:scale-115 transition-transform duration-300">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-burgundy-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Row Centered Features */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto text-center"
        >
          {featuresList.slice(3, 5).map((item) => {
            const Icon = item.IconComponent;
            return (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white border border-cream-200 rounded-3xl p-8 flex flex-col items-center group shadow-soft hover:shadow-soft-lg transition-all duration-300"
              >
                <div className="mb-6 transform group-hover:scale-115 transition-transform duration-300">
                  <Icon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-burgundy-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 3. دور منصة بطل الرقمية (قائمة الفحص والتحقق مع أنيميشن التفاعلات) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Right Column: Checklist */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 relative inline-block pb-3">
                  دور منصة <span className="text-burgundy-900">بَـطَـل</span> الرقمية
                  <span className="absolute bottom-0 right-0 w-20 h-1.5 bg-amber-500 rounded-full"></span>
                </h2>
              </div>

              <ul className="space-y-4 pt-4">
                {platformRoles.map((roleText, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-burgundy-50 text-burgundy-800 flex items-center justify-center flex-shrink-0 mt-0.5 border border-burgundy-200 shadow-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
                      {roleText}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Left Column: Photo */}
            <div className="lg:col-span-5">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="relative rounded-3xl overflow-hidden shadow-md border border-gray-200 group"
              >
                <img
                  src={heroImage}
                  alt="طفل يتعلم على منصة بطل"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/70 via-transparent to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-sm sm:text-base drop-shadow">
                    أطفالنا أبطال المستقبل في منصة بَطَل
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. قسم البرامج التأهيلية المصمم بأسلوب متتقدم */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            البرامج التأهيلية المتخصصة
          </h2>
          <p className="text-base text-gray-500 font-medium">
            تصفح البرنامج المتاح حالياً للتجربة والاختبار المباشر
          </p>
        </div>

        {/* Single Focused Program Card: برنامج التواصل البصري */}
        <div className="max-w-xl mx-auto">
          <motion.div
            whileHover={{ y: -6 }}
            onClick={handleStartActivities}
            className="bg-white border-2 border-cream-300 hover:border-burgundy-600 rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer group relative overflow-hidden"
          >
            {/* Active Live Pulse Badge */}
            <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>متاح للتجربة الآن</span>
            </div>

            {/* Burgundy Line-Art Visual Communication Icon */}
            <div className="w-24 h-24 rounded-3xl bg-cream-100/90 border border-cream-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-gentle">
              <BurgundyIcons.ProgVisualCommunication />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-burgundy-900 transition-colors mb-3">
              برنامج التواصل البصري والتكامل الحسي
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 max-w-md">
              تمارين تفاعلية متخصصة لتعزيز التواصل البصري، تمييز المشاعر، والمطابقة الشكلية المهدئة لذوي طيف التوحد.
            </p>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleStartActivities}
              className="btn-dribbble-primary w-full group rounded-2xl py-4"
            >
              <span>دخول تدريبات البرنامج التفاعلية (صفحة الطفل)</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-[-6px] transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 5. بانر ابدأ عالمك الآن مع الأثر البصري الفاخر */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-burgundy-900 via-burgundy-950 to-burgundy-900 rounded-3xl p-8 sm:p-12 text-white shadow-soft-lg relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-right">
              <h3 className="text-2xl sm:text-4xl font-black text-white mb-2">
                ابدأ عالمك الآن على منصة <span className="text-amber-300">بَـطَـل</span> الرقمية
              </h3>
              <p className="text-xs sm:text-sm text-cream-200">
                انطلق مباشرة إلى عالم الأنشطة التفاعلية والتدريبات التأهيلية المهدئة حسياً
              </p>
            </div>

            <div className="flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartActivities}
                className="btn-dribbble-amber group rounded-2xl px-9 py-4 shadow-xl"
              >
                <span>الدخول لبوابة الطفل</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. آراء المستفيدين المتحركة والديناميكية بـ AnimatePresence */}
      <section 
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            آراء المستفيدين
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            ماذا يقول طلاب برنامج التوحد الرقمية وآباؤهم عن المنصة
          </p>
        </div>

        <div className="relative bg-white border-2 border-cream-300 rounded-3xl p-8 sm:p-12 shadow-soft transition-all min-h-[260px] flex flex-col justify-between">
          <div className="text-amber-400 mb-4 flex justify-center opacity-80">
            <Quote className="w-12 h-12 rotate-180" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentTestimonialIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4"
            >
              <p className="text-base sm:text-xl text-gray-800 leading-relaxed font-medium max-w-3xl mx-auto">
                "{testimonials[currentTestimonialIndex].text}"
              </p>

              <div className="pt-4 border-t border-cream-200 max-w-xs mx-auto">
                <h4 className="font-bold text-base text-burgundy-950">
                  {testimonials[currentTestimonialIndex].author}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  {testimonials[currentTestimonialIndex].role} • {testimonials[currentTestimonialIndex].city}
                </p>
                <div className="flex justify-center mt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>رأي معتمد • مستفيد موثق</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -right-4 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-cream-300 shadow-md hover:bg-cream-100 text-burgundy-900 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="السابق"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -left-4 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-cream-300 shadow-md hover:bg-cream-100 text-burgundy-900 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            title="التالي"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex justify-center items-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentTestimonialIndex(idx);
                  playCalmTone('gentle-tap');
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentTestimonialIndex 
                    ? 'w-8 bg-burgundy-800' 
                    : 'w-2.5 bg-cream-300 hover:bg-cream-400'
                }`}
                title={`الرأي ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. الأسئلة الشائعة مع أنيميشن التوسع Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-burgundy-100 text-burgundy-900 text-xs font-bold mb-3">
            <HelpCircle className="w-4 h-4 text-burgundy-800" />
            <span>الأسئلة الشائعة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            كل ما تود معرفته عن المنصة
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => {
                    setOpenFaqIndex(isOpen ? null : idx);
                    playCalmTone('gentle-tap');
                  }}
                  className="w-full p-5 text-right font-bold text-base text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-burgundy-800" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
