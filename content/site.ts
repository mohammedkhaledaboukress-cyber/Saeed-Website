import type { L } from "@/lib/i18n";

/* ============================================================================
 * EVERYTHING ON THE SITE LIVES IN THIS FILE.
 *
 * No real data has been confirmed yet, so every name, number, quote and video
 * below is a placeholder. The layout and design are final; the content is not.
 *
 * While PLACEHOLDER is true a banner says so on every page. Set it to false
 * only once the checklist below is fully done — it is the last switch to flip.
 *
 *   [ ] person.name            — exact Arabic spelling + Latin transliteration
 *   [ ] person.location        — city
 *   [ ] metrics                — real figures, all four
 *   [ ] clients                — real names, handles, follower deltas, dates
 *   [ ] work                   — real clips in /public/video + real context
 *   [ ] caseStudy              — the diabetes-trainer numbers
 *   [ ] beforeAfter            — real raw-vs-graded pairs
 *   [ ] testimonials           — real quotes, names, permission obtained
 *   [ ] about.bio              — in Saeed's own words
 *   [ ] contact.whatsapp/email — real handles
 *   [ ] /public/img/portrait.jpg
 *   [ ] PLACEHOLDER = false
 *
 * Videos: drop real files into /public/video using the same filenames and
 * nothing else needs to change. Keep posters in /public/img with matching
 * names so nothing pops in while loading.
 * ========================================================================== */

export const PLACEHOLDER = true;

export const person = {
  /* TODO: confirm exact spelling in both languages. */
  name: { ar: "سعيد", en: "Saeed" } satisfies L,
  /* The positioning line. Chosen deliberately: he runs operations, he doesn't
     just cut clips. Editing is the proof, not the product. */
  role: {
    ar: "قائد إنتاج المحتوى",
    en: "Content Operations Lead",
  } satisfies L,
  location: { ar: "الرياض، السعودية", en: "Riyadh, Saudi Arabia" } satisfies L,
};

export const nav = [
  { id: "work", label: { ar: "الأعمال", en: "Work" } satisfies L },
  { id: "system", label: { ar: "المنظومة", en: "The System" } satisfies L },
  { id: "clients", label: { ar: "العملاء", en: "Clients" } satisfies L },
  { id: "about", label: { ar: "عنه", en: "About" } satisfies L },
];

export const hero = {
  eyebrow: { ar: "إنتاج المحتوى", en: "Content Production" } satisfies L,
  headline: {
    ar: "أبني منظومات\nإنتاج المحتوى.",
    en: "I build content\noperations.",
  } satisfies L,
  body: {
    ar: "أربع سنوات في قيادة الإنتاج لأكبر العلامات الرياضية في السعودية — فرق، وأنظمة، ومخرجات تُحرّك الأرقام.",
    en: "Four years running production for Saudi Arabia's largest fitness brands — the teams, the systems, and the output that moves the numbers.",
  } satisfies L,
  cta: { ar: "شاهد الريل", en: "Watch the reel" } satisfies L,
  ctaSecondary: { ar: "تواصل", en: "Get in touch" } satisfies L,
};

export const reel = {
  eyebrow: { ar: "الريل", en: "Showreel" } satisfies L,
  title: { ar: "دقيقة واحدة.", en: "One minute." } satisfies L,
  body: {
    ar: "مختارات من أعمال أربع سنوات. الصوت مكتوم — اضغط للتشغيل بالصوت.",
    en: "A cut of four years of work. Muted by default — press for sound.",
  } satisfies L,
  /* TODO: replace with the real showreel. 45-75s, 1080p minimum. */
  src: "/video/reel.mp4",
  poster: "/img/reel.jpg",
  duration: { ar: "00:58", en: "00:58" } satisfies L,
};

/* TODO: every one of these four numbers needs to be real. They are the most
   load-bearing claims on the page — a client will check them. */
export const metrics = [
  {
    value: 180,
    suffix: { ar: "م+", en: "M+" } satisfies L,
    label: { ar: "مشاهدة تم تحقيقها", en: "Views generated" } satisfies L,
  },
  {
    value: 120,
    suffix: { ar: "", en: "" } satisfies L,
    label: { ar: "مقطع شهريًا", en: "Videos shipped / month" } satisfies L,
  },
  {
    value: 14,
    suffix: { ar: "", en: "" } satisfies L,
    label: { ar: "فرد في الفريق", en: "People directed" } satisfies L,
  },
  {
    value: 4,
    suffix: { ar: "", en: "" } satisfies L,
    label: { ar: "سنوات", en: "Years" } satisfies L,
  },
];

export const clientsSection = {
  eyebrow: { ar: "العملاء", en: "Clients" } satisfies L,
  title: {
    ar: "من يثق به.",
    en: "Who trusts him.",
  } satisfies L,
  body: {
    ar: "علاقات طويلة، لا مشاريع متفرقة. أقصر تعاون في القائمة مضى عليه عامان.",
    en: "Long relationships, not one-off projects. The shortest engagement below is two years old.",
  } satisfies L,
};

/* TODO: real names, handles and figures. The transliterations here came from a
   voice note and have NOT been verified — getting a client's name wrong is the
   one unrecoverable mistake on a page like this. */
export const clients = [
  {
    id: "abdulaziz",
    name: { ar: "عبدالعزيز الدلهي", en: "Abdulaziz Al-Delhi" } satisfies L,
    handle: "@placeholder",
    scope: {
      ar: "مونتاج رئيسي، إدارة المحتوى",
      en: "Lead editing, content direction",
    } satisfies L,
    since: "2022",
    growth: { ar: "320 ألف ← 1.4 مليون", en: "320K → 1.4M" } satisfies L,
  },
  {
    id: "masoud",
    name: { ar: "محمد مسعود", en: "Mohammed Masoud" } satisfies L,
    handle: "@placeholder",
    scope: {
      ar: "مونتاج رئيسي، استراتيجية المقاطع",
      en: "Lead editing, clip strategy",
    } satisfies L,
    since: "2022",
    growth: { ar: "500 ألف ← 2.1 مليون", en: "500K → 2.1M" } satisfies L,
  },
  {
    id: "inspire",
    name: { ar: "إنسباير", en: "Inspire" } satisfies L,
    handle: "@placeholder",
    scope: {
      ar: "مدير إنتاج المحتوى — الإشراف على محتوى الفريق بالكامل",
      en: "Content Production Manager — content for the full team",
    } satisfies L,
    since: "2023",
    growth: { ar: "9 أعضاء فريق", en: "9 team members" } satisfies L,
  },
  {
    id: "yazid",
    name: { ar: "يزيد", en: "Yazid" } satisfies L, // TODO: full name
    handle: "@placeholder",
    scope: { ar: "مونتاج ومخرجات أسبوعية", en: "Editing, weekly output" } satisfies L,
    since: "2024",
    growth: { ar: "80 ألف ← 310 ألف", en: "80K → 310K" } satisfies L,
  },
  {
    id: "coach-d",
    name: { ar: "كوتش [يُحدَّد]", en: "Coach [TBC]" } satisfies L, // TODO: name
    handle: "@placeholder",
    scope: {
      ar: "بناء منظومة المحتوى بالكامل",
      en: "Full content operation, built from zero",
    } satisfies L,
    since: "2024",
    growth: { ar: "دراسة حالة ↓", en: "Case study ↓" } satisfies L,
  },
];

export const workSection = {
  eyebrow: { ar: "الأعمال", en: "Selected work" } satisfies L,
  title: { ar: "المخرجات.", en: "The output." } satisfies L,
  body: {
    ar: "يعمل الصوت عند المرور على المقطع. اضغط للعرض بالحجم الكامل.",
    en: "Hover for sound. Press for full size.",
  } satisfies L,
};

/* TODO: replace each clip and its context. `role` matters most — be precise
   about what he did himself vs. directed, because clients ask. */
export const work = [
  {
    id: "w1",
    src: "/video/work-01.mp4",
    poster: "/img/work-01.jpg",
    aspect: "9/16",
    client: { ar: "عبدالعزيز الدلهي", en: "Abdulaziz Al-Delhi" } satisfies L,
    format: { ar: "ريل", en: "Reel" } satisfies L,
    role: { ar: "مونتاج", en: "Edited" } satisfies L,
    result: { ar: "4.2 مليون مشاهدة", en: "4.2M views" } satisfies L,
  },
  {
    id: "w2",
    src: "/video/work-02.mp4",
    poster: "/img/work-02.jpg",
    aspect: "9/16",
    client: { ar: "محمد مسعود", en: "Mohammed Masoud" } satisfies L,
    format: { ar: "مقطع من بودكاست", en: "Podcast cut" } satisfies L,
    role: { ar: "إشراف", en: "Directed" } satisfies L,
    result: { ar: "1.8 مليون مشاهدة", en: "1.8M views" } satisfies L,
  },
  {
    id: "w3",
    src: "/video/work-03.mp4",
    poster: "/img/work-03.jpg",
    aspect: "9/16",
    client: { ar: "إنسباير", en: "Inspire" } satisfies L,
    format: { ar: "إعلان", en: "Ad" } satisfies L,
    role: { ar: "مونتاج وإشراف", en: "Edited & directed" } satisfies L,
    result: { ar: "310 ألف مشاهدة", en: "310K views" } satisfies L,
  },
  {
    id: "w4",
    src: "/video/work-04.mp4",
    poster: "/img/work-04.jpg",
    aspect: "9/16",
    client: { ar: "كوتش [يُحدَّد]", en: "Coach [TBC]" } satisfies L,
    format: { ar: "محتوى تعليمي", en: "Educational" } satisfies L,
    role: { ar: "استراتيجية وإشراف", en: "Strategy & direction" } satisfies L,
    result: { ar: "920 ألف مشاهدة", en: "920K views" } satisfies L,
  },
  {
    id: "w5",
    src: "/video/work-05.mp4",
    poster: "/img/work-05.jpg",
    aspect: "9/16",
    client: { ar: "يزيد", en: "Yazid" } satisfies L,
    format: { ar: "ريل", en: "Reel" } satisfies L,
    role: { ar: "مونتاج", en: "Edited" } satisfies L,
    result: { ar: "640 ألف مشاهدة", en: "640K views" } satisfies L,
  },
  {
    id: "w6",
    src: "/video/work-06.mp4",
    poster: "/img/work-06.jpg",
    aspect: "9/16",
    client: { ar: "عبدالعزيز الدلهي", en: "Abdulaziz Al-Delhi" } satisfies L,
    format: { ar: "ريل", en: "Reel" } satisfies L,
    role: { ar: "مونتاج", en: "Edited" } satisfies L,
    result: { ar: "2.7 مليون مشاهدة", en: "2.7M views" } satisfies L,
  },
  {
    id: "w7",
    src: "/video/work-07.mp4",
    poster: "/img/work-07.jpg",
    aspect: "16/9",
    client: { ar: "محمد مسعود", en: "Mohammed Masoud" } satisfies L,
    format: { ar: "محتوى طويل", en: "Long-form" } satisfies L,
    role: { ar: "مونتاج رئيسي", en: "Lead editor" } satisfies L,
    result: { ar: "14 دقيقة · 880 ألف", en: "14 min · 880K" } satisfies L,
  },
  {
    id: "w8",
    src: "/video/work-08.mp4",
    poster: "/img/work-08.jpg",
    aspect: "16/9",
    client: { ar: "إنسباير", en: "Inspire" } satisfies L,
    format: { ar: "فيلم للعلامة", en: "Brand film" } satisfies L,
    role: { ar: "إشراف وإنتاج", en: "Directed & produced" } satisfies L,
    result: { ar: "حملة 2025", en: "2025 campaign" } satisfies L,
  },
];

/* The strongest story on the site: not editing, but building a production
   operation that moved a business metric.
   TODO: every number here. This is the case study that justifies the rate. */
export const caseStudy = {
  eyebrow: { ar: "دراسة حالة", en: "Case study" } satisfies L,
  title: {
    ar: "بناء منظومة محتوى من الصفر.",
    en: "A content operation, built from zero.",
  } satisfies L,
  client: {
    ar: "مدرّب سعودي متخصص في تدريب حالات ما قبل السكري والسكري.",
    en: "A Saudi coach specialising in training pre-diabetic and diabetic clients.",
  } satisfies L,
  problem: {
    label: { ar: "المشكلة", en: "The problem" } satisfies L,
    body: {
      ar: "تخصّص نادر وطلب حقيقي، لكن المخرجات كانت متقطعة ويعتمد كل شيء على وقت المدرّب نفسه. لا يمكن لمنتج واحد أن يكون هو المنظومة.",
      en: "A rare specialism and real demand, but output was sporadic and everything depended on the coach's own hours. One person cannot be the system.",
    } satisfies L,
  },
  steps: [
    {
      n: "01",
      title: { ar: "توظيف مصمم جرافيك", en: "Hired a graphic designer" } satisfies L,
      body: {
        ar: "هوية بصرية ثابتة لكل مقطع، بدل إعادة اختراع الشكل في كل مرة.",
        en: "One consistent visual language across everything, instead of reinventing the look each time.",
      } satisfies L,
    },
    {
      n: "02",
      title: { ar: "توظيف محرر مخصص", en: "Hired a dedicated editor" } satisfies L,
      body: {
        ar: "طاقة إنتاج ثابتة لا تتوقف عند جدول المدرّب.",
        en: "Production capacity that no longer stops at the coach's calendar.",
      } satisfies L,
    },
    {
      n: "03",
      title: { ar: "توظيف مراجع محتوى", en: "Hired a content reviewer" } satisfies L,
      body: {
        ar: "مراجعة دقة قبل النشر — ضرورية في محتوى يتعامل مع حالات صحية.",
        en: "An accuracy gate before publishing — essential when the content touches a medical condition.",
      } satisfies L,
    },
    {
      n: "04",
      title: { ar: "بناء خط إنتاج", en: "Built the pipeline" } satisfies L,
      body: {
        ar: "تصوير دفعة واحدة، تقطيع، جدولة، قياس. مخرجات متوقعة كل أسبوع.",
        en: "Batch filming, clipping, scheduling, measurement. Predictable output, every week.",
      } satisfies L,
    },
  ],
  /* TODO: real before/after figures. */
  results: [
    {
      before: { ar: "4", en: "4" } satisfies L,
      after: { ar: "28", en: "28" } satisfies L,
      label: { ar: "مقطع شهريًا", en: "Videos per month" } satisfies L,
    },
    {
      before: { ar: "1", en: "1" } satisfies L,
      after: { ar: "4", en: "4" } satisfies L,
      label: { ar: "حجم الفريق", en: "Team size" } satisfies L,
    },
    {
      before: { ar: "—", en: "—" } satisfies L,
      after: { ar: "3.2×", en: "3.2×" } satisfies L,
      label: { ar: "المتدربون الجدد", en: "New client intake" } satisfies L,
    },
  ],
  note: {
    ar: "لا تظهر على هذا الموقع أي صور أو نتائج لمتدربين. المحتوى الطبي يتطلب موافقة صريحة.",
    en: "No client faces or results appear on this site. Content touching a medical condition requires explicit consent.",
  } satisfies L,
};

export const beforeAfterSection = {
  eyebrow: { ar: "قبل / بعد", en: "Before / after" } satisfies L,
  title: { ar: "ما يُضيفه المونتاج.", en: "What the edit adds." } satisfies L,
  body: {
    ar: "اسحب المقسّم. يسارًا الخام كما خرج من الكاميرا، يمينًا النسخة النهائية.",
    en: "Drag the divider. Raw camera footage on one side, the finished cut on the other.",
  } satisfies L,
};

/* TODO: real raw-vs-graded pairs. Two or three is plenty. */
export const beforeAfter = [
  {
    id: "ba1",
    before: "/video/ba-01-before.mp4",
    after: "/video/ba-01-after.mp4",
    poster: "/img/ba-01-after.jpg",
    label: { ar: "محتوى طويل · تصحيح لوني", en: "Long-form · colour grade" } satisfies L,
  },
  {
    id: "ba2",
    before: "/video/ba-02-before.mp4",
    after: "/video/ba-02-after.mp4",
    poster: "/img/ba-02-after.jpg",
    label: { ar: "إعلان · إيقاع وتدرّج", en: "Ad · pacing and grade" } satisfies L,
  },
];

export const services = {
  eyebrow: { ar: "طريقة العمل", en: "How he works" } satisfies L,
  title: { ar: "ما يفعله.", en: "What he does." } satisfies L,
  does: [
    {
      title: { ar: "بناء فرق الإنتاج", en: "Builds production teams" } satisfies L,
      body: {
        ar: "توظيف وتدريب وإدارة المحررين والمقطّعين والمصممين والمراجعين.",
        en: "Hires, trains and directs editors, clippers, designers and reviewers.",
      } satisfies L,
    },
    {
      title: { ar: "تشغيل خطوط المخرجات", en: "Runs output pipelines" } satisfies L,
      body: {
        ar: "من التصوير إلى النشر بجدول ثابت ومخرجات متوقعة.",
        en: "Filming to publishing on a fixed cadence, with predictable volume.",
      } satisfies L,
    },
    {
      title: { ar: "استراتيجية المحتوى", en: "Sets content strategy" } satisfies L,
      body: {
        ar: "ماذا يُصوَّر، وكيف يُقطَّع، وأين يُنشر، وما الذي يُقاس.",
        en: "What gets filmed, how it's cut, where it goes, and what gets measured.",
      } satisfies L,
    },
    {
      title: { ar: "المونتاج بنفسه", en: "Edits himself" } satisfies L,
      body: {
        ar: "الأعمال التي تستحق ذلك — الريل، والإعلانات، وأفلام العلامة.",
        en: "On the work that earns it — reels, ads and brand films.",
      } satisfies L,
    },
  ],
  doesNotTitle: { ar: "ما لا يفعله.", en: "What he doesn't." } satisfies L,
  doesNot: [
    { ar: "مشاريع لمرة واحدة بلا استمرارية.", en: "One-off projects with no continuity." } satisfies L,
    { ar: "المحتوى بالكمّ دون استراتيجية.", en: "Volume for its own sake, with no strategy." } satisfies L,
    { ar: "العمل بلا وصول إلى الأرقام.", en: "Work without access to the numbers." } satisfies L,
  ],
};

export const testimonialsSection = {
  eyebrow: { ar: "شهادات", en: "Testimonials" } satisfies L,
  title: { ar: "بكلماتهم.", en: "In their words." } satisfies L,
};

/* TODO: real quotes, real names, and written permission from each person
   before this ships. One of these should be from someone who worked UNDER
   him — that is the one a client hiring a production lead actually cares about. */
export const testimonials = [
  {
    id: "t1",
    src: "/video/testimonial-01.mp4",
    poster: "/img/testimonial-01.jpg",
    quote: {
      ar: "نص الشهادة سيوضع هنا. اقتباس قصير ومحدد يذكر رقمًا أو نتيجة ملموسة أقوى بكثير من المجاملات العامة.",
      en: "Testimonial copy goes here. A short, specific quote that names a number or a concrete outcome is worth far more than a compliment.",
    } satisfies L,
    name: { ar: "اسم العميل", en: "Client name" } satisfies L,
    title: { ar: "المسمى · الحساب", en: "Title · handle" } satisfies L,
  },
  {
    id: "t2",
    src: "/video/testimonial-02.mp4",
    poster: "/img/testimonial-02.jpg",
    quote: {
      ar: "نص الشهادة سيوضع هنا. الأفضل أن تكون مقطعًا مصوّرًا من 20 إلى 30 ثانية بالجوال وإضاءة جيدة.",
      en: "Testimonial copy goes here. Best as a 20–30 second phone video in decent light, with this text as the caption.",
    } satisfies L,
    name: { ar: "اسم العميل", en: "Client name" } satisfies L,
    title: { ar: "المسمى · الحساب", en: "Title · handle" } satisfies L,
  },
  {
    id: "t3",
    src: "/video/testimonial-03.mp4",
    poster: "/img/testimonial-03.jpg",
    quote: {
      ar: "نص الشهادة سيوضع هنا. إحدى هذه الشهادات يُفضّل أن تكون من شخص عمل تحت إدارته.",
      en: "Testimonial copy goes here. One of these should come from someone who has worked under him.",
    } satisfies L,
    name: { ar: "اسم عضو الفريق", en: "Team member name" } satisfies L,
    title: { ar: "المسمى", en: "Title" } satisfies L,
  },
];

export const about = {
  eyebrow: { ar: "عنه", en: "About" } satisfies L,
  title: { ar: "المحتوى عملية، لا إلهام.", en: "Content is a process, not inspiration." } satisfies L,
  /* TODO: replace with 80-120 words in Saeed's own voice. His words, lightly
     edited — not polished marketing copy. That is the difference. */
  bio: {
    ar: "نص السيرة سيوضع هنا، بصوت سعيد نفسه، من 80 إلى 120 كلمة. يُفضّل أن يتحدث عن طريقة عمله وما يؤمن به في المحتوى، لا قائمة بالمهارات. الكلمات الحقيقية تُقرأ على أنها ثقة؛ النصوص التسويقية الجاهزة تُقرأ على أنها ضعف.",
    en: "Bio copy goes here — 80 to 120 words in Saeed's own voice. It should be about how he works and what he believes about content, not a list of skills. Real words read as confidence; polished marketing copy reads as the opposite.",
  } satisfies L,
  portrait: "/img/portrait.jpg", // TODO: real portrait, plain background, soft light
};

export const contact = {
  eyebrow: { ar: "تواصل", en: "Contact" } satisfies L,
  title: { ar: "لنتحدث.", en: "Let's talk." } satisfies L,
  body: {
    ar: "يعمل مع عدد محدود من العملاء في الوقت نفسه. إن كنت تبني شيئًا يحتاج مخرجات حقيقية، تواصل.",
    en: "He works with a small number of clients at a time. If you're building something that needs real output, get in touch.",
  } satisfies L,
  /* TODO: real contact details. */
  whatsapp: "966500000000",
  whatsappLabel: { ar: "واتساب", en: "WhatsApp" } satisfies L,
  email: "hello@example.com",
  emailLabel: { ar: "البريد", en: "Email" } satisfies L,
};

export const ui = {
  langToggle: { ar: "English", en: "العربية" } satisfies L,
  previewNotice: {
    ar: "نسخة أولية للتصميم — جميع الأسماء والأرقام والمقاطع والشهادات مؤقتة وتحتاج تأكيدًا.",
    en: "Design preview — every name, number, clip and quote is a placeholder pending confirmation.",
  } satisfies L,
  soundOn: { ar: "الصوت", en: "Sound" } satisfies L,
  play: { ar: "تشغيل", en: "Play" } satisfies L,
  close: { ar: "إغلاق", en: "Close" } satisfies L,
  before: { ar: "خام", en: "Raw" } satisfies L,
  after: { ar: "نهائي", en: "Final" } satisfies L,
  since: { ar: "منذ", en: "Since" } satisfies L,
  rights: {
    ar: "جميع الحقوق محفوظة.",
    en: "All rights reserved.",
  } satisfies L,
};
