#  (Project Architecture & Complete Reference Guide)

> **تاريخ التحديث**: سبتمبر 2026  
> **اسم التطبيق**: منصة التوحد لتنمية مهارات التفاعل والتواصل البصري (Autism Skills Platform)

---

## 📑 جدول المحتويات
1. [الرؤية والهدف من المشروع](#1-الرؤية-والهدف-من-المشروع)
2. [الهندسة المعمارية للنظام والتقنيات (Architecture & Tech Stack)](#2-الهندسة-المعمارية-للنظام-والتقنيات)
3. [فلسفة التصميم وتجربة المستخدم (UI/UX Principles)](#3-فلسفة-التصميم-وتجربة-المستخدم)
4. [هيكلية شجرة الملفات والمجلدات (Folder Structure)](#4-هيكلية-شجرة-الملفات-والمجلدات)
5. [شرح وفائدة كل ملف بالتفصيل (Detailed File-by-File Reference)](#5-شرح-وفائدة-كل-ملف-بالتفصيل)
   - [الملفات الإدارية والإعدادات (Root & Config)](#أ-الملفات-الإدارية-والإعدادات)
   - [إدارة الحالة العامة والتخليق الصوتي (Context & Sound Synthesizer)](#ب-إدارة-الحالة-العامة-والتخليق-الصوتي)
   - [المكونات الشاملة (Shared Components)](#ج-المكونات-الشاملة-shared-components)
   - [الألعاب والأنشطة التفاعلية (Activities & Games)](#د-الألعاب-والأنشطة-التفاعلية)
   - [صفحات التطبيق الرئيسية (Pages)](#هـ-صفحات-التطبيق-الرئيسية)
   - [الخلفية وقاعدة البيانات (Server & Prisma)](#و-الخلفية-وقاعدة-البيانات)
6. [آخر التحديثات والتعديلات المنفذة (Latest Updates Log)](#6-آخر-التحديثات-والتعديلات-المنفذة)

---

## 1.  الرؤية والهدف من المشروع
**منصة التوحد** هي منصة علاجية وتأهيلية تفاعلية متكاملة تهدف إلى:
- **تعزيز التواصل البصري (Eye Contact & Visual Gaze)**: عبر ألعاب متدرجة ومحفزات بصرية مهدئة تشجع الطفل على النظر وتثبيت النظر بأسلوب سلس دون إجبار.
- **تنمية مهارات التخاطب والتواصل البديل (PECS & Non-Verbal)**: توفير أدوات التواصل البصري بالصور والبطاقات التفاعلية.
- **التفريغ والاسترخاء الحسي (Sensory De-escalation & Sound Therapy)**: توليد أصوات طبيعية ناعمة (أمواج البحر، المطر، دندنة صوتية، عصافير) باستخدام تخليق الترددات الحية لمنع النفور والتوتر الحسي.
- **إرشاد ولي الأمر (Evidence-Based Parent Guidance)**: تقديم 10 محاور توجيهية موثقة علمياً (مبنية على توصيات NHS و Autism Speaks) تساعد الوالدين في إدارة مواقف الرفض والانفعال والتدريب اليومي.

---

## 2.  الهندسة المعمارية للنظام والتقنيات

### التقنيات الأساسية (Tech Stack):
- **React 18**: لبناء الواجهات التفاعلية المستقلة والمكونات القابلة لإعادة الاستخدام.
- **Vite 6**: للتجميع والتطوير السريع لبناء حزم عالية الأداء (`dist/`).
- **Tailwind CSS 3**: لبناء تصميمات مخصصة بـ HSL Color Palettes، وظلال ناعمة (Soft Shadows)، وتأثيرات زجاجية (Glassmorphism).
- **Framer Motion**: لإضافة حركات مجهرية (Micro-animations) وانتقالات ثلاثية الأبعاد (3D Perspective Tilts).
- **Web Audio API**: ميزة مبتكرة لتخليق الأصوات الطبيعية والمؤثرات الصوتية ديناميكياً داخل المتصفح بدون الحاجة لملفات صوت خارجية ثقيلة.
- **Lucide React Icons**: أيقونات بصرية دقيقة وواضحة تناسب التصميم دون الحاجة للرموز التعبيرية التقليدية.

---

## 3.  فلسفة التصميم وتجربة المستخدم (UI/UX Principles)

1. **الابتعاد التام عن الرموز التعبيرية (Strictly Emoji-Free UI)**:
   - تم استبدال جميع الـ Emojis بأيقونات برمجية ناعمة من `lucide-react` أو شارات نصية واضحة لتجنب المشتتات البصرية أو التفسيرات الخاطئة لدى أطفال التوحد.
2. **الكروت ثلاثية الأبعاد التكتيكية (3D Tactile Cards & Tilt Effects)**:
   - كل قسم أو لعبة يظهر كبطاقة 3D ذات عمق بصري يمنح شعوراً بالواقعية والجاذبية.
3. **أزرار الضغط التكتيكي (`.btn-dribbble-primary`)**:
   - تصميم أزرار تفاعلية تعطي انطباعاً بالضغط الملموس (Push Button Effect) مع نغمات ناعمة عند النقر (`gentle-tap`).
4. **التوافق الحسي (Sensory-Friendly Color Palette)**:
   - اعتماد ألوان الـ Cream, Amber, Teal, Emerald, Amber, Violet بأطياف ناعمة مريحة للعين لمنع الإجهاد البصري.

---

## 4.  هيكلية شجرة الملفات والمجلدات

```text
مشروع منصة التوحد/
├── package.json                   # التبعيات والسكربتات
├── vite.config.js                 # إعدادات Vite وإضافات React
├── tailwind.config.js             # إعدادات ألوان Tailwind والأشكال
├── postcss.config.js              # معالجة ملفات CSS
├── PROJECT_ARCHITECTURE_GUIDE.md  # هذا الملف (الدليل الشامل للهندسة المعمارية)
├── server/
│   └── prisma/
│       └── schema.prisma          # مخطط قاعدة البيانات (المستخدمين والأنشطة)
└── src/
    ├── main.jsx                   # نقطة انطلاق React DOM
    ├── App.jsx                    # المكون الرئيسي والمسارات Navigation
    ├── index.css                  # قواعد CSS والأنماط ثلاثية الأبعاد 3D
    ├── context/
    │   └── SensoryContext.jsx     # سياق الحالة العامة وتخليق الأصوات Web Audio API
    ├── config/
    │   ├── audioRegistry.js       # سجل ذبذبات النغمات والمؤثرات
    │   └── activityAudioGuides.js # الدليل الصوتي والتوجيهي لكل نشاط
    ├── components/
    │   ├── Navbar.jsx             # شريط التنقل العلوي مع إعدادات التهدئة الحسية
    │   ├── Footer.jsx             # التذييل السفلي وتوثيق الدولة (مصر)
    │   ├── SensoryMediaParentHub.jsx # مركز الوسائط المهدئة وإرشادات ولي الأمر (3 كروت 3D)
    │   ├── ActivityAudioGuide.jsx # شريط التوجيه الصوتي أعلى اللعبة
    │   ├── ActivityExplanationModal.jsx # نافذة الشرح التفصيلي للنشاط
    │   ├── CelebrationModal.jsx   # نافذة الاحتفال بالنجاح
    │   ├── LockedFeatureModal.jsx # نافذة القفل وتنبيه متطلبات فتح المستوى
    │   └── activities/            # مجلد الألعاب والأنشطة التفاعلية
    │       ├── VisualObjectsActivity.jsx
    │       ├── VisualPeopleActivity.jsx
    │       ├── VisualCombinedActivity.jsx
    │       ├── EmotionRecognitionActivity.jsx
    │       ├── RoutineSequencerActivity.jsx
    │       ├── SensoryMatchingActivity.jsx
    │       ├── SoundWordExplorerActivity.jsx
    │       └── level1/             # ألعاب المستوى الأول المتقدمة (22 لعبة تفاعلية)
    │           ├── GazeFixationTimerActivity.jsx
    │           ├── PecsVisualCommunicatorActivity.jsx
    │           ├── CupsShellEyeActivity.jsx
    │           ├── BubblePopActivity.jsx
    │           ├── FaceMasksActivity.jsx
    │           └── ... (باقي ألعاب التتبع البصري والحسي)
    └── pages/                     # صفحات التطبيق الرئيسية
        ├── HomePage.jsx           # الصفحة الرئيسية المليئة بالكروت الحية والتقييم
        ├── ActivitiesPage.jsx     # صفحة الأنشطة والمستويات الـ 3 الرئيسية
        ├── DoctorsPage.jsx        # دليل الأخصائيين والعيادات المعتمدة
        ├── CommunityPage.jsx      # مجتمع أولياء الأمور والدعم
        ├── ProfilePage.jsx        # ملف الطفل والإحصائيات
        └── ResearchPage.jsx       # الأبحاث والدراسات العلمية
```

---

## 5.  شرح وفائدة كل ملف بالتفصيل

### أ. الملفات الإدارية والإعدادات

#### 1. [`package.json`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/package.json)
- **الفائدة**: يحوي بيانات المشروع، التبعيات البرمجية (`react`, `framer-motion`, `lucide-react`, `tailwindcss`)، وسكربتات التشغيل (`dev`, `build`, `preview`).

#### 2. [`vite.config.js`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/vite.config.js)
- **الفائدة**: إعدادات مُجمع المشروع Vite وتفعيل إضافة `@vitejs/plugin-react` لضمان البناء السريع ومعالجة الموديلات.

#### 3. [`src/index.css`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/index.css)
- **الفائدة**: يحتوي على التصميم الأساسي، تحسينات Tailwind CSS، تعريف الفئات ثلاثية الأبعاد مثل `.btn-dribbble-primary` وتأثيرات `tilt-card-3d` والخطوط العربية المعتمدة (`Cairo`, `Readex Pro`).

#### 4. [`src/main.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/main.jsx)
- **الفائدة**: مدخل التطبيق المباشر، يتولى ربط تطبيق React بالشجرة الرئيسية `React.StrictMode` وتغليفه بـ `SensoryProvider`.

#### 5. [`src/App.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/App.jsx)
- **الفائدة**: المكون الهيكلي الرئيسي، يتولى إدارة التنقل بين الصفحات (`home`, `activities`, `doctors`, `community`, `profile`, `research`) وعرض الـ `Navbar` والـ `Footer`.

---

### ب. إدارة الحالة العامة والتخليق الصوتي

#### 1. [`src/context/SensoryContext.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/context/SensoryContext.jsx)
- **الفائدة**: القلب النابض للمنصة، يقدم:
  1. **مُخلق الأصوات الحيوية (Web Audio API Synthesizer)**: لتوليد نغمات مهدئة، وأصوات الطبيعة (العصافير، المطر، أمواج البحر، والهمهمة) ديناميكياً بدون ملفات خارجية.
  2. **وضع التهدئة الحسية (Sensory Calming Mode)**: للتحكم في خفض السطوع والاهتزازات عند شعور الطفل بالتوتر.
  3. **نظام التلعيب وتتبع الإنجاز**: تتبع النقاط التراكمية والشارات وإعادة التعيين.

#### 2. [`src/config/audioRegistry.js`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/config/audioRegistry.js)
- **الفائدة**: سجل إعدادات الذبذبات الترددية والأصوات التكتيكية بالنظام (`gentle-tap`, `success-sparkle`, `calming-tone`).

#### 3. [`src/config/activityAudioGuides.js`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/config/activityAudioGuides.js)
- **الفائدة**: قاعدة بيانات نصوص التوجيه العلمي والصوتي لكل لعبة، تشمل الهدف المباشر للنشاط ونصيحة ولي الأمر.

---

### ج. المكونات الشاملة (Shared Components)

#### 1. [`src/components/Navbar.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/components/Navbar.jsx)
- **الفائدة**: شريط التنقل العلوي المصمم بـ 3D Tilt يحتوي على شعار المنصة، روابط التصفح السريع، زر وضع التهدئة الحسية، وعداد النقاط الشامل.

#### 2. [`src/components/Footer.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/components/Footer.jsx)
- **الفائدة**: التذييل السفلي ذو التصميم التكتيكي المحدث بأسماء المراكز، توثيق الاعتماد، والموقع الرسمي (**مصر**).

#### 3. [`src/components/SensoryMediaParentHub.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/components/SensoryMediaParentHub.jsx)
- **الفائدة**: مركز الوسائط المهدئة وإرشادات ولي الأمر المتكامل بـ **3 كروت 3D مستقلة**:
  1. **قسم الأصوات الطبيعية الـ 6 (Web Audio API Synthesizer)**: عصافير، مطر، بحر، همهمة صوتية، أجراس خشبية، وأصوات المزرعة.
  2. **قسم فيديوهات التخاطب (10 فيديوهات يوتيوب مختارة)**: مشغل مرئي مع أزرار المشاهدة المباشرة المضمونة.
  3. **قسم إرشادات ولي الأمر (10 محاور علمية)**: دليل التعامل مع الرفض والانفعال، وتدريب التواصل البصري بدون إجبار.

#### 4. [`src/components/ActivityAudioGuide.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/components/ActivityAudioGuide.jsx)
- **الفائدة**: الشريط التوجيهي المعروض أعلى كل لعبة لعرض الهدف المباشر وشارة الإرشاد، مع زر فتح نافذة التوضيح المفصلة.

#### 5. [`src/components/ActivityExplanationModal.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/components/ActivityExplanationModal.jsx)
- **الفائدة**: نافذة تشريح وتوضيح اللعبة تفصيلياً لولي الأمر (طريقة اللعب، الهدف السلوكي، وكيفية مساعدة الطفل).

#### 6. [`src/components/CelebrationModal.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/components/CelebrationModal.jsx)
- **الفائدة**: النافذة الاحتفالية التي تظهر عند إتمام الطفل للعبة بنجاح لمنحه مكافأة بصرية ونقاط تشجيعية.

#### 7. [`src/components/LockedFeatureModal.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/components/LockedFeatureModal.jsx)
- **الفائدة**: تنبيه المتطلبات السابقة والنقاط المطلوبة قبل فتح المستويات المتقدمة لضمان التدرج العلاجي.

---

### د. الألعاب والأنشطة التفاعلية

#### المكونات الرئيسية داخل `src/components/activities/`:
- **`VisualObjectsActivity.jsx`**: لعبة تتبع الأشياء والمجسمات البصرية.
- **`VisualPeopleActivity.jsx`**: لعبة التواصل البصري مع وجوه الأشخاص.
- **`VisualCombinedActivity.jsx`**: ألعاب الدمج البصري والبيئة المزدحمة.
- **`EmotionRecognitionActivity.jsx`**: التعرف على انفعالات الوجوه والتعابير.
- **`RoutineSequencerActivity.jsx`**: ترتيب روتين المهام اليومية (غسيل اليدين، تناول الطعام).
- **`SensoryMatchingActivity.jsx`**: مطابقة الأشكال والأنماط الحسية.
- **`SoundWordExplorerActivity.jsx`**: استكشاف النطق والأصوات اللغوية.

#### ألعاب المستوى الأول المتقدمة داخل `src/components/activities/level1/`:
- **`GazeFixationTimerActivity.jsx`**: مؤقت تثبيت النظر مع حساب الثواني وسجلات التحسن.
- **`PecsVisualCommunicatorActivity.jsx`**: نطق ورص بطاقات التواصل PECS (أنا أريد، ماء، لعبة...).
- **`CupsShellEyeActivity.jsx`**: لعبة الأكواب الثلاثية وتتبع الكرة بالعين.
- **`BubblePopActivity.jsx`**: تفجير الفقاعات الملونة.
- **`FaceMasksActivity.jsx`**: مطابقة الأقنعة وتتبع ملامح الوجه.
- **`AdventureTunnelActivity.jsx`**, **`ClimbJumpActivity.jsx`**, **`EyeDirectionActivity.jsx`**, **`GlowingLampsActivity.jsx`**, **`LipReadingActivity.jsx`**, **`MimicSoundFaceActivity.jsx`**, **`NonVerbalCubesActivity.jsx`**, **`RainCloudActivity.jsx`**, **`RemoteCarPathActivity.jsx`**, **`RingsStackActivity.jsx`**, **`SeatSwapActivity.jsx`**, **`ShadowTheaterActivity.jsx`**, **`SoundButtonsActivity.jsx`**, **`SurpriseBagShadowActivity.jsx`**, **`SwingFlyActivity.jsx`**, **`TwoTrainersActivity.jsx`**, **`VehicleChaserActivity.jsx`**: ألعاب متخصصة لتدريب التركيز والتتبع الحركي السمعي.

---

### هـ. صفحات التطبيق الرئيسية (Pages)

#### 1. [`src/pages/HomePage.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/pages/HomePage.jsx)
- **الفائدة**: الواجهة الرئيسية للزائر ولي الأمر، تحتوي على التقييم السريع والتأهيل البصري وحاسبة المستويات ومراجعات الأهالي والكروت الـ 3D التفاعلية.

#### 2. [`src/pages/ActivitiesPage.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/pages/ActivitiesPage.jsx)
- **الفائدة**: مركز التحكم بالألعاب والمستويات الـ 3 (الأشياء والمجسمات، وجوه الأشخاص، الأنشطة المركبة)، وعرض مساحة اللعب النشطة مع مؤقت تثبيت النظر ومحاكي PECS.

#### 3. [`src/pages/DoctorsPage.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/pages/DoctorsPage.jsx)
- **الفائدة**: دليل الاستشاريين والأخصائيين المعتمدين لحجز المواعيد والتواصل المباشر.

#### 4. [`src/pages/CommunityPage.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/pages/CommunityPage.jsx)
- **الفائدة**: مجتمع داعم لأسر الأطفال وتبادل التجارب والقصص الملهمة.

#### 5. [`src/pages/ProfilePage.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/pages/ProfilePage.jsx)
- **الفائدة**: ملف الطفل وتتبع التقدم والتطوير السلوكي والشارات المكتسبة.

#### 6. [`src/pages/ResearchPage.jsx`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/src/pages/ResearchPage.jsx)
- **الفائدة**: استعراض الأبحاث الطبية والدراسات الموثقة المعتمدة لتعزيز ثقة ولي الأمر.

---

### و. الخلفية وقاعدة البيانات

#### [`server/prisma/schema.prisma`](file:///c:/Users/super%20magic/Desktop/%D9%85%D8%B4%D8%A4%D9%88%D8%B9%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AA%D9%88%D8%AD%D8%AF/server/prisma/schema.prisma)
- **الفائدة**: المخطط الهيكلي لقواعد البيانات (Prisma ORM) لربط قاعدة البيانات ببيانات المستخدمين، الأطفال، الجلسات، وسجلات التطور السلوكي مستقبلاً.

---

## 6.  آخر التحديثات والتعديلات المنفذة (Latest Updates Log)

1. **تعديل `Footer.jsx`**:
   - تغيير نص الموقع الجغرافي رسميًا إلى **مصر**.
   - إزالة الرموز التعبيرية كلياً واعتماد الأيقونات والخطوط المعتمدة.

2. **تطوير `SensoryMediaParentHub.jsx`**:
   - تحويل المكون إلى **3 كروت 3D مستقلة** بتأثيرات Tilt وعمق بصري مميز.
   - دمج **6 تراكات تخليق صوتي حيوي (Web Audio API)** للاسترخاء والاعتياد السمعي بدون ملفات خارجية.
   - ربط **10 فيديوهات يوتيوب محددة** مع خيار مشاهدة مباشر بروابط مضمونة 100%.
   - توفير **دليل الـ 10 محاور لإرشادات ولي الأمر** بأسلوب مقروء ونقي بدون أزرار قراءة صوتية بناءً على التوجيهات.

3. **اختبار البناء النهائي (Production Build Check)**:
   - تم تشغيل `npm run build` واجتياز التجميع بـ **2015 modules transformed** بنجاح كامل جاهز للنشر (`Exit Code 0`).
