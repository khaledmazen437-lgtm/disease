import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Tv, 
  Heart, 
  Play, 
  Pause, 
  Volume2, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Headphones, 
  Video, 
  Users,
  ExternalLink,
  ShieldCheck,
  Radio,
  Waves,
  Trees,
  Sun,
  CloudRain,
  Bird
} from 'lucide-react';
import { useSensory } from '../context/SensoryContext';

// 6 Curated Real Nature & Environmental Auditory Habituation Tracks
const SENSORY_AUDIO_TRACKS = [
  {
    id: 1,
    title: 'تغريد العصافير الناعمة وحفيف الأشجار (Natural Birds & Forest Breeze)',
    category: 'أصوات الطبيعة والحديقة',
    description: 'أصوات عصافير مهدئة مع حفيف أشجار خفيف لمساعدة الطفل على الاعتياد البصري والسمعي للطبيعة في المنزل.'
  },
  {
    id: 2,
    title: 'خرير جدول الماء وأصوات المطر الخفيف (Stream Brook & Gentle Raindrops)',
    category: 'خرير الماء والمطر',
    description: 'صوت تدفق المياه المهدئة وقطرات المطر الناعمة لتصفية الذهن وتقليل التوتر الحسي لدى الطفل.'
  },
  {
    id: 3,
    title: 'أمواج البحر الناعمة على الشاطئ (Soothing Ocean Shoreline Waves)',
    category: 'أمواج البحر والشاطئ',
    description: 'صوت مد وجزر أمواج البحر الهادئة لتهدئة الانفعالات الحركية وجلب الاسترخاء الحسي العميق.'
  },
  {
    id: 4,
    title: 'صوت الهمهمة البشرية والدندنة الدافئة (Comforting Human Vocal Humming)',
    category: 'صوت ودندنة بشرية مهدئة',
    description: 'همهمات صوتية بشرية مهدئة ودافئة لتشجيع الطفل على الاعتياد على النبرة البشرية والأمان الاجتماعي.'
  },
  {
    id: 5,
    title: 'أصوات أجراس الهواء الخشبية وحسيس الليل (Wooden Chimes & Forest Night)',
    category: 'أجراس خشبية وحسيس الطبيعة',
    description: 'نغمات أجراس خشبية دافئة مع حسيس طبيعي مهدئ لتهدئة الطفل قبل النوم وفي أوقات الاسترخاء.'
  },
  {
    id: 6,
    title: 'أصوات المزرعة الناعمة والحيوانات الأليفة (Soft Peaceful Pets & Nature)',
    category: 'أصوات حيوانات وبيئة أليفة',
    description: 'أصوات مهدئة ومحببة للحيوانات الأليفة (قطة، عصفور، كلب ناعم) لتأهيل الطفل سمعياً وتدريبه على التعود عليها.'
  }
];

// User-Selected YouTube Educational Videos (10 Videos & Shorts)
const YOUTUBE_VIDEOS = [
  {
    id: '1',
    videoId: 'YmorYQMYvrM',
    title: 'مقطع تأهيلي لتطوير التواصل والانتباه البصري',
    category: 'مرئيات Shorts تأهيلية',
    description: 'مقطع فيديو قصير لتطوير التفاعل والتواصل لدى الطفل بأسلوب مشجع.',
    embedUrl: 'https://www.youtube.com/embed/YmorYQMYvrM?rel=0',
    watchUrl: 'https://youtube.com/shorts/YmorYQMYvrM?si=fTPke_yD8lqCvXZ8'
  },
  {
    id: '2',
    videoId: 'CrEqT1_3Gsc',
    title: 'تدريب عملي على التخاطب وتعزيز التركيز',
    category: 'تدريبات عمليّة وتخاطب',
    description: 'فيديو تعليمي يوضح الخطوات العملية لتعزيز التفاعل والتواصل في المنزل.',
    embedUrl: 'https://www.youtube.com/embed/CrEqT1_3Gsc?rel=0',
    watchUrl: 'https://youtu.be/CrEqT1_3Gsc?si=acGAxDIkwXkzWijQ'
  },
  {
    id: '3',
    videoId: 'BPh-77dAzRM',
    title: 'إرشادات وأنشطة بصرية وتأهيلية لأولياء الأمور',
    category: 'إرشادات وتأهيل الأسرة',
    description: 'نشاط تفاعلي موجه للوالدين لتعليم الطفل مهارات الانتباه والتواصل السلس.',
    embedUrl: 'https://www.youtube.com/embed/BPh-77dAzRM?rel=0',
    watchUrl: 'https://youtu.be/BPh-77dAzRM?si=YBA0s58o5nqbimWd'
  },
  {
    id: '4',
    videoId: 'LgkQWqYo6cI',
    title: 'تمارين التتبع البصري والاستجابة العفوية',
    category: 'مرئيات Shorts تأهيلية',
    description: 'مقطع قصير لتشجيع الطفل على الاستجابة والتتبع البصري العفوي.',
    embedUrl: 'https://www.youtube.com/embed/LgkQWqYo6cI?rel=0',
    watchUrl: 'https://youtube.com/shorts/LgkQWqYo6cI?si=UD2sKDgNIvUdy6Dl'
  },
  {
    id: '5',
    videoId: 'sW08_GiWjGk',
    title: 'أنشطة تفاعلية لتنمية مهارات التفاعل الاجتماعي',
    category: 'مهارات التفاعل الاجتماعي',
    description: 'خطوات ممتعة لتنمية المشاركة والتفاعل الاجتماعي لدى طفل التوحد.',
    embedUrl: 'https://www.youtube.com/embed/sW08_GiWjGk?rel=0',
    watchUrl: 'https://youtube.com/shorts/sW08_GiWjGk?si=U_xEgDnobH6KM2Fp'
  },
  {
    id: '6',
    videoId: 'hoy128fHobA',
    title: 'خطوات عمليّة لتطوير الانتباه المشترك لدى الطفل',
    category: 'تأهيل الانتباه المشترك',
    description: 'تطبيق عملي لتوجيه انتباه الطفل وتحفيز الانتباه المزدوج.',
    embedUrl: 'https://www.youtube.com/embed/hoy128fHobA?rel=0',
    watchUrl: 'https://youtube.com/shorts/hoy128fHobA?si=bLHOZKf1ri22WUqw'
  },
  {
    id: '7',
    videoId: '_TCur5NpMW4',
    title: 'استراتيجيات تهدئة التوتر الحسي والتواصل اللطيف',
    category: 'التكامل والتخاطب الحسي',
    description: 'إرشادات لتهدئة الانفعالات والتعامل اللطيف مع التوتر الحسي.',
    embedUrl: 'https://www.youtube.com/embed/_TCur5NpMW4?rel=0',
    watchUrl: 'https://youtube.com/shorts/_TCur5NpMW4?si=gmqfPV4OwENKuLKw'
  },
  {
    id: '8',
    videoId: 'm3Ogpuhscmw',
    title: 'تمارين التفاعل البصري والتخاطب الأسري',
    category: 'تدريبات التخاطب الأسري',
    description: 'شرح تطبيقي لمهارات التفاعل الأسري وزيادة التواصل البصري.',
    embedUrl: 'https://www.youtube.com/embed/m3Ogpuhscmw?rel=0',
    watchUrl: 'https://youtu.be/m3Ogpuhscmw?si=_8dKV6UnYosg8G7g'
  },
  {
    id: '9',
    videoId: 'I_Hlqp96rw0',
    title: 'خطوات عيادية لتعزيز تركيز الطفل والتواصل اليومي',
    category: 'إرشادات عيادية يومية',
    description: 'تطبيقات عيادية لتطوير النظرة المباشرة وتقليل التشتت البصري.',
    embedUrl: 'https://www.youtube.com/embed/I_Hlqp96rw0?rel=0',
    watchUrl: 'https://youtu.be/I_Hlqp96rw0?si=iw8tGABUolk82mUI'
  },
  {
    id: '10',
    videoId: '8aDeHKzdOuM',
    title: 'نشاط ممتع لتحفيز الانتباه والمشاركة العفوية',
    category: 'مرئيات Shorts تفاعلية',
    description: 'مقطع فيديو قصير يعرض أنشطة تحفيز الانتباه والمشاركة بدون ضغط.',
    embedUrl: 'https://www.youtube.com/embed/8aDeHKzdOuM?rel=0',
    watchUrl: 'https://youtube.com/shorts/8aDeHKzdOuM?si=ZzBE-d0BXx0wqlXG'
  }
];

// Parent Therapy Tips & Guidance (Comprehensive Evidence-Based Guide - 10 Modules)
const PARENT_TIPS = [
  {
    id: 1,
    title: 'الهدف الأساسي: التحفيز اللطيف وليس الإجبار',
    category: 'الفلسفة التأهيلية',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    text: 'التواصل البصري عند طفل التوحد يختلف من طفل لآخر. الهدف ليس إجباره على النظر في العينين، بل مساعدته بلطف على الانتباه والتواصل بالطريقة الأكثر راحة له. إجباره قد يزيد التوتر؛ لذلك عزّز أي نظرة طبيعية ولو استمرت ثانية واحدة.',
    points: [
      'التواصل البصري ليس المعيار الوحيد للتقدم.',
      'بعض الأطفال يستمعون ويفهمون وهم ينظرون بعيداً.',
      'النظر المباشر قد يسبب ضغطاً حسياً لبعض الأطفال.'
    ]
  },
  {
    id: 2,
    title: 'نصائح عمليّة في التعامل اليومي',
    category: 'استراتيجيات يومية',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    text: 'خطوات يومية بسيطة تساعد على خفض المشتتات وتشجيع التواصل العفوي في المنزل:',
    points: [
      'اجلس على مستوى عين الطفل، وقلّل الضوضاء والشاشات حوله.',
      'قرّب لعبه أو وجبته المفضلة بجانب عينيك دون تحريكها فجأة.',
      'عندما ينظر إليك، استجب فوراً بابتسامة أو مدح أو إعطائه اللعبة.',
      'ابدأ بثوانٍ قليلة فقط ثم زد المدة تدريجياً إذا كان الطفل مرتاحاً.',
      'تحدّث بجمل قصيرة وبنبرة هادئة، وامنح الطفل وقتاً كافياً للرد.',
      'كافئ أي محاولة تواصل (إشارة، صورة، صوت) وليس النظر وحده.'
    ]
  },
  {
    id: 3,
    title: 'تمرين تطبيقي قصير للبيت (3–5 دقائق)',
    category: 'تمارين منزلية',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    text: 'تمرين سلس ينفذ مرتين يومياً حين يكون الطفل هادئاً وغير متعب:',
    points: [
      'اختر وقتاً يكون فيه الطفل مرتاحاً وغير جائع.',
      'اجلس أمامه وضع اللعبة المفضلة قرب وجهك وانتظر بهدوء.',
      'عند أي التفاتة أو نظرة، قل مباشرة: «شاطر، شفتني!» وقدّم اللعبة.',
      'كرر التمرين 3–5 مرات فقط ثم توقف قبل أن يشعر بالضيق.',
      'يمكن تدريب التتبع البصري بلعبة تتحرك ببطء يمينًا ويسارًا.'
    ]
  },
  {
    id: 4,
    title: 'عبارات أفضل للتشجيع وأخطاء يجب تجنبها',
    category: 'لغة التواصل والأسلوب',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    text: 'الكلمات المشجعة تبني الأمان والاشتراك، بينما الإجبار يخلق النفور:',
    points: [
      'جرّب عبارات: «أنا هنا»، «وريني عايز إيه»، «خد وقتك»، «سمعتك».',
      'بدلاً من: «بص في عيني»، «ارفع وجهك»، «بص لي الأول».',
      'تجنب: مسك وجه الطفل أو رفع ذقنه بالقوة.',
      'تجنب: عقاب الطفل أو حرمانه لأنه لم ينظر لعينيك.',
      'تجنب: طلب النظر المباشر وقت نوبة الغضب أو التعب.'
    ]
  },
  {
    id: 5,
    title: 'ألعاب منزلية بسيطة لتعزيز الانتباه المشترك',
    category: 'ألعاب وتفاعل',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    text: 'ألعاب ممتعة تحفز النظر والمشاركة بدون ضغط حسي:',
    points: [
      'لعبة الفقاعات: انفخ الفقاعات وتوقف، انتظر أي تواصل وقل «فقاعات؟» ثم انفخ ثانية.',
      'لعبة 1، 2، 3: قل «واحد، اثنان...» وتوقف، وحين يلتفت قل «ثلاثة!» وابدأ اللعب.',
      'تقليد الحركات: قلّد حركة الطفل (تصفيق، طرق) لبناء الانتباه المشترك.',
      'القصة المصورة: أشر إلى صور الكتاب وسمّها، يكفي متابعة الصور دون النظر لوجهك.',
      'لعبة الاختيار: قدّم خيارين فقط (سيارة أو كرة) وانتظر أن ينظر أو يشير لاختياره.'
    ]
  },
  {
    id: 6,
    title: 'الخطة اليومية ومتى تطلبون المساعدة الطبيّة؟',
    category: 'الخطة والاستشارة الطبية',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    text: 'خطة تأهيلية متزنة وإشارات متى يستدعي الأمر الاستشارة التخصصية:',
    points: [
      'الخطة: 5–10 دقائق مرتين يومياً، اترك الطفل يقود اللعب، واستجب فوراً لأي تواصل.',
      'متى تستشير الأخصائي؟ إذا كان لا يستجيب لاسمه، أو يبدو لا يرى جيداً، أو يتضايق بشدة.',
      'استعن بأخصائي نطق أو علاج وظيفي لديه خبرة بالتوحد.',
      'استخدام الصور وبطاقات PECS وسيلة تواصل حقيقية وناجحة وليست فشلاً.'
    ]
  },
  {
    id: 7,
    title: 'إدارة الرفض والانفعال والتفريغ الحسي',
    category: 'إدارة الانفعال والتفريغ الحسي',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    text: 'رفض الطفل للتواصل لا يعني أنه لا يريدكم؛ قد يكون متعباً، متوتراً، أو غارقاً في الأصوات والإضاءة والمطالب. ابدؤوا بتوفير الأمان، ثم ابنوا التواصل تدريجياً وبأي وسيلة تناسبه.',
    points: [
      'أوقفوا الأسئلة والأوامر مؤقتاً، وخفّضوا الكلام والإضاءة والضوضاء.',
      'اتركوا مسافة آمنة، ولا تلمسوه أو تجبروه على النظر أو الجلوس.',
      'استخدموا جملة قصيرة واحدة مثل: «أنا هنا» أو «أنت آمن».',
      'انتظروا عدة ثوانٍ أو أكثر؛ فالطفل يحتاج وقتاً لمعالجة الكلام قبل الرد.',
      'أبعدوا الأشياء الخطرة، ولا تناقشوا الطفل أو تعاقبوه أثناء الانفعال.'
    ]
  },
  {
    id: 8,
    title: 'البحث عن سبب الرفض واكتشاف نمط المحفزات',
    category: 'تحليل السلوك والنمط',
    badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
    text: 'اكتبوا لمدة أسبوع مذكرات صغيرة لما يحدث قبل الرفض وبعده؛ فاكتشاف النمط يساعد على تعديل البيئة والروتين لتقليل الضيق والتفريغ الحسي.',
    points: [
      'ماذا طُلب من الطفل قبل الرفض؟',
      'هل كان جائعاً أو متعباً أو مريضاً؟',
      'هل حدث تغيير في الروتين أو كان المكان صاخباً ومزدحماً؟',
      'هل انتهى نشاط يحبه فجأة؟',
      'إدارة الضوء والضوضاء والحفاظ على روتين مفهوم يقلل الانفعال.'
    ]
  },
  {
    id: 9,
    title: 'التواصل غير اللفظي والوسائل البديلة',
    category: 'التواصل غير اللفظي والبديل',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    text: 'لا تنتظروا الكلام أو التواصل البصري فقط؛ اعتبروا الإشارات والصور سُبلاً حقيقية للتواصل واستجيبوا لها بوضوح لخلق الأمان وتقليل الإحباط.',
    points: [
      'النظر إلى الشيء أو الإشارة إليه.',
      'سحب يد الأب أو الأم نحو المطلوب.',
      'إعطاء صورة أو غرض أو استخدام لوحة صور PECS.',
      'حركة الجسم أو الصوت أو البكاء.',
      'إذا قادك للمطبخ قل: «ماء؟» واعرض الماء أو صورته فوراً.'
    ]
  },
  {
    id: 10,
    title: 'التدريب التدريجي والهدف اليومي البسيط',
    category: 'خطة اليوم والتأهيل المتخصص',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300',
    text: 'ابدأوا اليوم بهدف صغير جداً: أن يطلب الطفل شيئاً واحداً بأي طريقة، واستجيبوا له مباشرة مع استشارة المتخصص عند الحاجة.',
    points: [
      'التدريب وقت الهدوء: اجلسوا قرب الطفل وشاركوه نشاطاً يحبه لدقائق.',
      'ما ينبغي تجنبه: لا تكرروا الاسم عشرات المرات، ولا تجادلوا وقت الانفعال.',
      'لا تحاولوا إيقاف حركات التهدئة الذاتية (Stimming) ما دامت غير مؤذية.',
      'متى تطلبون متخصصاً؟ عند فقدان مهارات سابقة، أو تكرر الانفعال بشدة.',
      'افحصوا السمع والبصر والألم والإمساك والنوم؛ فقد تظهر كرفض للتواصل.'
    ]
  }
];

export const SensoryMediaParentHub = () => {
  const { playCalmTone, speakArabic, playSynthesizedAnimalSound } = useSensory();
  const [activeSection, setActiveSection] = useState(null); // 'audio', 'videos', 'tips'
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [activeIframeId, setActiveIframeId] = useState(null);

  const audioCtxRef = useRef(null);
  const activeNodesRef = useRef([]);
  const activeIntervalRef = useRef(null);

  // Stop Web Audio playback cleanly
  const stopAudioSynth = () => {
    if (activeIntervalRef.current) {
      clearInterval(activeIntervalRef.current);
      activeIntervalRef.current = null;
    }
    if (activeNodesRef.current && activeNodesRef.current.length > 0) {
      activeNodesRef.current.forEach((node) => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        } catch (_) {}
      });
      activeNodesRef.current = [];
    }
  };

  useEffect(() => {
    return () => {
      stopAudioSynth();
    };
  }, []);

  // Web Audio Real Nature & Habituation Audio Synthesizer
  const playTrackSynth = (trackId) => {
    stopAudioSynth();

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 1.0);
    masterGain.connect(ctx.destination);
    activeNodesRef.current.push(masterGain);

    if (trackId === 1) {
      // Track 1: Natural Birds Chirp & Gentle Breeze
      // Wind background
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.08;
      }
      const windNoise = ctx.createBufferSource();
      windNoise.buffer = buffer;
      windNoise.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(400, now);
      windFilter.Q.value = 1.2;

      windNoise.connect(windFilter);
      windFilter.connect(masterGain);
      windNoise.start(now);
      activeNodesRef.current.push(windNoise, windFilter);

      // Periodic Bird Chirps
      const playBirdChirp = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const cTime = ctx.currentTime;
        const baseFreq = 2400 + Math.random() * 800;

        [0, 0.12, 0.24].forEach((delay) => {
          const osc = ctx.createOscillator();
          const chirpGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(baseFreq, cTime + delay);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, cTime + delay + 0.06);
          osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, cTime + delay + 0.1);

          chirpGain.gain.setValueAtTime(0.18, cTime + delay);
          chirpGain.gain.exponentialRampToValueAtTime(0.001, cTime + delay + 0.11);

          osc.connect(chirpGain);
          chirpGain.connect(masterGain);
          osc.start(cTime + delay);
          osc.stop(cTime + delay + 0.12);
        });
      };

      playBirdChirp();
      activeIntervalRef.current = setInterval(playBirdChirp, 2200);

    } else if (trackId === 2) {
      // Track 2: Stream Brook & Raindrops
      // Water stream continuous noise
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.1;
      }
      const waterNoise = ctx.createBufferSource();
      waterNoise.buffer = buffer;
      waterNoise.loop = true;

      const waterFilter = ctx.createBiquadFilter();
      waterFilter.type = 'lowpass';
      waterFilter.frequency.setValueAtTime(750, now);

      waterNoise.connect(waterFilter);
      waterFilter.connect(masterGain);
      waterNoise.start(now);
      activeNodesRef.current.push(waterNoise, waterFilter);

      // Raindrops hitting leaves
      const playRaindrop = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const cTime = ctx.currentTime;
        for (let i = 0; i < 3; i++) {
          const delay = Math.random() * 0.8;
          const osc = ctx.createOscillator();
          const dropGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(1400 + Math.random() * 600, cTime + delay);
          osc.frequency.exponentialRampToValueAtTime(800, cTime + delay + 0.05);

          dropGain.gain.setValueAtTime(0.12, cTime + delay);
          dropGain.gain.exponentialRampToValueAtTime(0.001, cTime + delay + 0.06);

          osc.connect(dropGain);
          dropGain.connect(masterGain);
          osc.start(cTime + delay);
          osc.stop(cTime + delay + 0.07);
        }
      };

      playRaindrop();
      activeIntervalRef.current = setInterval(playRaindrop, 1200);

    } else if (trackId === 3) {
      // Track 3: Soothing Ocean Waves
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.12;
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, now);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1, now); // Slow 10s wave sweep
      lfoGain.gain.setValueAtTime(300, now);

      lfo.connect(filter.frequency);
      noise.connect(filter);
      filter.connect(masterGain);

      lfo.start(now);
      noise.start(now);

      activeNodesRef.current.push(noise, lfo, lfoGain, filter);

    } else if (trackId === 4) {
      // Track 4: Comforting Human Vocal Humming (Ooh / Mmm Formant Lullaby)
      const playHumanHumNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const cTime = ctx.currentTime;
        const notes = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63]; // G3, A3, B3, C4, D4, E4
        const freq = notes[Math.floor(Math.random() * notes.length)];

        const osc = ctx.createOscillator();
        const formant1 = ctx.createBiquadFilter();
        const formant2 = ctx.createBiquadFilter();
        const humGain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, cTime);

        // Vocal Formant filters for "Ooh / Mmm" human voice texture
        formant1.type = 'bandpass';
        formant1.frequency.value = 400;
        formant1.Q.value = 3.5;

        formant2.type = 'bandpass';
        formant2.frequency.value = 800;
        formant2.Q.value = 3.5;

        humGain.gain.setValueAtTime(0.01, cTime);
        humGain.gain.linearRampToValueAtTime(0.25, cTime + 0.4);
        humGain.gain.exponentialRampToValueAtTime(0.001, cTime + 2.8);

        osc.connect(formant1);
        osc.connect(formant2);
        formant1.connect(humGain);
        formant2.connect(humGain);
        humGain.connect(masterGain);

        osc.start(cTime);
        osc.stop(cTime + 2.9);
      };

      playHumanHumNote();
      activeIntervalRef.current = setInterval(playHumanHumNote, 2400);

    } else if (trackId === 5) {
      // Track 5: Wooden Chimes & Forest Night
      const notes = [329.63, 440.00, 523.25, 659.25, 783.99, 880.00];
      let chimeStep = 0;

      const playWoodenChime = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const cTime = ctx.currentTime;
        const freq = notes[chimeStep % notes.length];
        chimeStep++;

        const osc = ctx.createOscillator();
        const chimeGain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, cTime);

        chimeGain.gain.setValueAtTime(0.2, cTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, cTime + 1.8);

        osc.connect(chimeGain);
        chimeGain.connect(masterGain);

        osc.start(cTime);
        osc.stop(cTime + 1.9);
      };

      playWoodenChime();
      activeIntervalRef.current = setInterval(playWoodenChime, 1800);

    } else if (trackId === 6) {
      // Track 6: Soft Farm Animals & Environment Habituation
      const animalList = ['cat', 'bird', 'chick', 'cow', 'duck'];
      let animalIdx = 0;

      const triggerSoftAnimalHabituation = () => {
        const nextAnimal = animalList[animalIdx % animalList.length];
        animalIdx++;
        playSynthesizedAnimalSound(nextAnimal);
      };

      triggerSoftAnimalHabituation();
      activeIntervalRef.current = setInterval(triggerSoftAnimalHabituation, 3200);
    }
  };

  const sectionsData = [
    {
      id: 'audio',
      title: 'قسم أصوات الطبيعة والاعتياد السمعي (6 أصوات)',
      subtitle: 'مكتبة صوتیة معبرة عن أصوات الطبيعة (عصافير، مطر، بحر، ودندنة بشرية) لتأهيل الطفل والاعتياد عليها ببيئة آمنة',
      tag: '6 أصوات طبيعية وتأهيلية',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
      buttonText: 'دخول قسم أصوات الطبيعة والاعتياد (6 أصوات)'
    },
    {
      id: 'videos',
      title: 'قسم فيديوهات التخاطب والمرئيات (6 مقاطع متخصصة)',
      subtitle: 'مكتبة مرئيات تعليمية متخصصة في التواصل البصري والتخاطب وتدريب الوالدين',
      tag: '6 مقاطع تعليمية متخصصة',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      buttonText: 'دخول قسم الفيديوهات المرئية (6 مقاطع)'
    },
    {
      id: 'tips',
      title: 'قسم إرشادات ودليل ولي الأمر',
      subtitle: 'دليل كامل ونصائح علمية موثوقة للأب والأم للتعامل والتأهيل اليومي',
      tag: 'إرشادات الأسرة والتأهيل',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=600&q=80',
      buttonText: 'دخول قسم دليل ولي الأمر'
    }
  ];

  const handleToggleAudio = (track) => {
    if (playingAudioId === track.id) {
      setPlayingAudioId(null);
      stopAudioSynth();
      playCalmTone('gentle-tap');
    } else {
      setPlayingAudioId(track.id);
      playTrackSynth(track.id);
    }
  };

  const handleOpenSection = (sectionId) => {
    playCalmTone('gentle-tap');
    setActiveSection(sectionId);
  };

  const handleBackToGrid = () => {
    stopAudioSynth();
    setPlayingAudioId(null);
    playCalmTone('gentle-tap');
    setActiveSection(null);
  };

  // Detailed Interactive Section Workspace View
  if (activeSection) {
    const currentSectionInfo = sectionsData.find(s => s.id === activeSection);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35 }}
        className="max-w-6xl mx-auto my-10 font-cairo"
      >
        {/* Workspace Top Header & Back Button */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.03, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToGrid}
            className="btn-dribbble-glass border border-cream-300 shadow-sm"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للأقسام الرئيسية</span>
          </motion.button>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${currentSectionInfo.badgeColor}`}>
            {currentSectionInfo.tag}
          </span>
        </div>

        {/* Section Banner Header */}
        <div className="bg-white border border-cream-300 rounded-3xl p-6 sm:p-8 mb-8 shadow-soft flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden border border-cream-200 shrink-0">
            <img src={currentSectionInfo.image} alt={currentSectionInfo.title} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-burgundy-950 mb-2">{currentSectionInfo.title}</h2>
            <p className="text-sm text-cream-800 leading-relaxed font-medium">{currentSectionInfo.subtitle}</p>
          </div>
        </div>

        {/* Render Workspace Content based on activeSection */}
        {activeSection === 'audio' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SENSORY_AUDIO_TRACKS.map((track) => {
              const isPlaying = playingAudioId === track.id;

              return (
                <div
                  key={track.id}
                  className={`card-3d-tilt p-6 flex flex-col justify-between border-2 transition-all ${
                    isPlaying ? 'border-emerald-500 bg-emerald-50/80 shadow-xl ring-2 ring-emerald-300' : 'border-cream-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
                        {track.category}
                      </span>
                      {isPlaying && (
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 animate-pulse">
                          <Volume2 className="w-4 h-4 text-emerald-600 animate-bounce" /> جاري التشغيل المهدئ
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-base text-burgundy-950 mb-2 leading-snug">{track.title}</h4>
                    <p className="text-xs text-cream-700 leading-relaxed font-medium mb-6">{track.description}</p>
                  </div>

                  <button
                    onClick={() => handleToggleAudio(track)}
                    className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isPlaying 
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md ring-2 ring-emerald-300' 
                        : 'btn-dribbble-primary'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'إيقاف الصوت الطبيعي' : 'تشغيل صوت الطبيعة والتأهيل'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeSection === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {YOUTUBE_VIDEOS.map((vid) => {
              return (
                <div key={vid.id} className="bg-white border border-cream-300 rounded-3xl p-5 shadow-soft flex flex-col justify-between space-y-4">
                  <div>
                    <div className="w-full h-52 rounded-2xl overflow-hidden border border-cream-200 bg-black relative mb-3 shadow-inner">
                      <iframe
                        src={vid.embedUrl}
                        title={vid.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300 inline-block">
                        {vid.category}
                      </span>
                      <h4 className="font-extrabold text-xs sm:text-sm text-burgundy-950 leading-relaxed pt-1">{vid.title}</h4>
                      <p className="text-[11px] text-cream-700 leading-normal">{vid.description}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-cream-200">
                    <a
                      href={vid.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dribbble-primary text-xs py-2.5 px-3 flex items-center justify-center gap-2 font-bold w-full text-center shadow-md"
                    >
                      <span>تشغيل المقطع في يوتيوب ↗</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeSection === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PARENT_TIPS.map((tip) => (
              <div key={tip.id} className="bg-white border border-cream-300 rounded-3xl p-6 shadow-soft space-y-4 text-right flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${tip.badgeColor || 'bg-emerald-100 text-emerald-900 border-emerald-300'}`}>
                      {tip.category}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="font-extrabold text-base text-burgundy-950 leading-snug">{tip.title}</h4>
                  <p className="text-xs text-cream-800 leading-relaxed font-medium bg-cream-50/80 p-3.5 rounded-2xl border border-cream-200">
                    {tip.text}
                  </p>

                  {tip.points && tip.points.length > 0 && (
                    <ul className="space-y-2 pt-1 pr-2">
                      {tip.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-cream-900 leading-relaxed font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-burgundy-600 mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  // Main Standalone 3-Section Cards Grid (Matching 3D Level Cards layout)
  return (
    <div className="my-8 font-cairo max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main 3 Standalone Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sectionsData.map((section) => (
          <motion.div
            key={section.id}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="card-3d-tilt p-6 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Image Header */}
              <div className="w-full h-52 rounded-2xl overflow-hidden mb-5 border border-cream-200 relative group-hover:scale-102 transition-transform duration-300">
                <img src={section.image} alt={section.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm backdrop-blur-md ${section.badgeColor}`}>
                    {section.tag}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-cream-950 mb-2 leading-snug group-hover:text-burgundy-900 transition-colors">
                {section.title}
              </h3>
              <p className="text-xs text-cream-700 leading-relaxed mb-6">
                {section.subtitle}
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-cream-200">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpenSection(section.id)}
                className="btn-dribbble-primary w-full py-3 px-4 rounded-2xl text-sm font-bold shadow-lg"
              >
                <span>{section.buttonText}</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
