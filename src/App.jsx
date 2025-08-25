// GalstyanSchool Landing Page — React + Tailwind with i18n (HY • EN • RU)
// Drop into App.jsx (Vite/CRA) or app/page.jsx (Next.js). Tailwind required.

import { useState, useEffect } from "react";

const CONFIG = {
  businessName: {
    hy: "Գալստյան Դպրոց",
    en: "Galstyan School",
    ru: "Школа Галстяна",
  },
  logo: "/logo.svg",
  phone: "+374 (94) 766-409",
  email: "info@galstyanschool.com",
  address: {
    hy: "Երևան, Հայաստան",
    en: "Yerevan, Armenia",
    ru: "Ереван, Армения",
  },
  social: {
    x: "https://x.com/galstyanschool",
    linkedin: "https://www.linkedin.com/company/galstyanschool/",
    instagram: "https://www.instagram.com/galstyanschool/",
  },
  color: {
    bg: "bg-sky-950",
    card: "bg-sky-900",
    text: "text-white",
    subtext: "text-sky-200",
    accent: "from-sky-500 to-indigo-400",
    ring: "ring-sky-500/30",
  },
};

// --- Translations ---
const I18N = {
  hy: {
    banner: "✨ Անվճար փորձնական դաս նոր ուսանողների համար — գրանցվեք այսօր",
    nav: {
      courses: "Դասընթացներ",
      teachers: "Ուսուցիչներ",
      schedule: "Ժամացույց",
      pricing: "Գնացուցակ",
      faq: "ՀՏՀ",
      enroll: "Գրանցվել",
    },
    hero: {
      badge: "Մաթեմատիկա • Ֆիզիկա • Անգլերեն • Ծրագրավորում",
      tagline: "Սովորիր․ Զարգացիր․ Հաջողիր․",
      subtitle:
        "Բարձրորակ դասեր մաթեմատիկա, ֆիզիկա, անգլերեն և ծրագրավորում բոլոր մակարդակների համար։",
      primary: "Միացիր անվճար փորձնական դասին",
      secondary: "Դասընթացներ",
      smalls: [
        "🎯 Փոքր խմբեր և անհատական",
        "🧑‍🏫 Օլիմպիադայի պատրաստում",
        "📝 Քննության պատրաստում (ԱՏ/IELTS/SAT)",
        "💻 Նախագծային ծրագրավորում",
      ],
    },
    courses: {
      title: "Մեր դասընթացները",
      subtitle: "Հիմնական առարկաներ՝ ամուր հիմք ստեղծելու համար։",
      items: [
        {
          icon: "➗",
          title: "Մաթեմատիկա",
          desc:
            "Ալգեբրա, երկրաչափություն, տրիգոնոմետրիա, հաշվարկ, խնդիրների լուծում, օլիմպիադա։",
        },
        {
          icon: "🧲",
          title: "Ֆիզիկա",
          desc:
            "Մեխանիկա, էլեկտրամագնիսականություն, օպտիկա, փորձեր և գործնական մտածողություն։",
        },
        {
          icon: "📚",
          title: "Անգլերեն",
          desc:
            "Քերականություն, բառապաշար, ընթերցանություն/գրառում, խոսքի վստահություն, IELTS։",
        },
        {
          icon: "💻",
          title: "Ծրագրավորում",
          desc:
            "Python և C++՝ հիմքերից մինչև ալգորիթմներ, տվյալների կառուցվածքներ և նախագծեր։",
        },
      ],
    },
    teachers: {
      title: "Մեր ուսուցիչները",
      subtitle:
        "Փորձառու մենթորներ՝ հստակության, պրակտիկայի և արդյունքների վրա կենտրոնացած։",
      items: [
        { name: "Մաթեմատիկայի Ուսուցիչ", blurb: "10+ տարվա փորձ օլիմպիադա և քննություններ։" },
        { name: "Ֆիզիկայի Ուսուցիչ", blurb: "Լաբորատոր մոտեցում, փորձեր և ինտուիցիա։" },
        { name: "Անգլերենի Ուսուցիչ", blurb: "Խոսքի վրա հիմնած դասեր՝ գործնական թեմաներ։" },
      ],
    },
    schedule: {
      title: "Շաբաթական ժամացույց",
      subtitle: "Ճկուն ժամանակացույց․ խմբակային կամ անհատական։",
      groups: [
        "Երկ/Չոր/Ուրբ — 18:00–19:30 (Մաթ/Ֆիզ)",
        "Երք/Հնգ — 18:00–19:30 (Անգլ / Ծրագրավորում)",
        "Շբթ — 12:00–14:00 (Խառը պրակտիկա)",
      ],
      oneOnOne:
        "Անհատական դասեր՝ 10:00–20:00։ Նշեք նախընտրելի օրերը, և մենք կկազմակերպենք։",
    },
    results: {
      title: "Արդյունքներ, որոնք կարող եք սպասել",
      subtitle: "Շոշափելի առաջընթաց՝ մի քանի շաբաթում",
      kpis: [
        { kpi: "+2x", label: "Տնայինների կատարում և վստահություն" },
        { kpi: "−30%", label: "Սխալների նվազում թեստերում" },
        { kpi: "+1–2", label: "Գնահատականի աճ մեկ գիտամյա ընթացքում" },
      ],
    },
    pricing: {
      title: "Գնացուցակ",
      subtitle: "Պարզ և թափանցիկ",
      tiers: [
        {
          name: "Խմբակային",
          price: "֏12,000",
          period: "90 րոպե",
          features: ["Մինչև 8 ուսանող", "Շաբաթական արձագանք", "Վարժություններ"],
          cta: "Միանալ խմբին",
        },
        {
          name: "Անհատական",
          price: "֏20,000",
          period: "60 րոպե",
          features: ["Անհատական պլան", "Ճկուն գրաֆիկ", "Թարմացումներ ծնողներին"],
          cta: "Ամրագրել 1‑on‑1",
        },
        {
          name: "Քննության պատրաստում",
          price: "Պայմանագրով",
          period: "ծրագիր",
          features: ["Դիագնոստիկ թեստ", "Թիրախային ծրագիր", "Փորձարքային քննություններ"],
          cta: "Ստանալ առաջարկ",
        },
      ],
      note: "* Զեղչեր՝ ամսական փաթեթների և քույր-եղբայրների համար",
    },
    faq: {
      title: "ՀՏՀ",
      subtitle: "Հաճախ տրվող հարցեր",
      items: [
        { q: "Առցանց դասեր ունե՞ք", a: "Այո, առցանց (Zoom/Meet) և առկա Երևանում։" },
        { q: "Ո՞ր մակարդակներին է", a: "5-րդ դասարանից մինչև բուհ ընդունելություն։" },
        { q: "Տունաշխա՞տ ենք տալիս", a: "Այո, հավասարակշռված տնայիններ՝ հետադարձ կապով։" },
        { q: "Կա՞ փորձնական", a: "Այո, անվճար փորձնական դաս՝ նախքան վճարելը։" },
      ],
    },
    enroll: {
      title: "Գրանցվել հիմա",
      subtitle: "Ամրագրեք անվճար փորձնական դաս կամ տվեք հարց",
      contactLead:
        "Գրեք մեզ էլ.փոստով, զանգահարեք, կամ օգտագործեք ձևը․ պատասխանում ենք մեկ աշխատանքային օրվա ընթացքում։",
      form: {
        name: "Ծնող/Ուսանողի անուն",
        email: "Էլ-փոստ",
        course: "Դասընթաց",
        format: "Ձևաչափ",
        time: "Նախընտրելի ժամ",
        message: "Հաղորդագրություն",
        placeholderMsg:
          "Գրեք դասարան, նպատակներ և նախընտրելի գրաֆիկ",
        submit: "Ուղարկել",
        courseOptions: ["Մաթեմատիկա", "Ֆիզիկա", "Անգլերեն", "Ծրագրավորում"],
        formatOptions: ["Խմբակային", "Անհատական", "Առցանց", "Առկա"],
      },
    },
    footer: {
      links: { enroll: "Գրանցվել", faq: "ՀՏՀ", pricing: "Գնացուցակ" },
    },
  },
  en: {
    banner: "✨ Free trial lesson for new students — book today",
    nav: {
      courses: "Courses",
      teachers: "Teachers",
      schedule: "Schedule",
      pricing: "Pricing",
      faq: "FAQ",
      enroll: "Enroll",
    },
    hero: {
      badge: "Math • Physics • English • Programming",
      tagline: "Learn. Grow. Excel.",
      subtitle:
        "High‑quality lessons in Math, Physics, English, and Programming for all levels.",
      primary: "Join a Free Trial Lesson",
      secondary: "View Courses",
      smalls: [
        "🎯 Small groups & 1‑on‑1",
        "🧑‍🏫 Olympiad prep",
        "📝 Exam readiness (AT/IELTS/SAT)",
        "💻 Project‑based coding",
      ],
    },
    courses: {
      title: "Our Courses",
      subtitle: "Core subjects designed to build a strong foundation.",
      items: [
        { icon: "➗", title: "Math", desc: "Algebra, geometry, trigonometry, calculus, problem solving, olympiad." },
        { icon: "🧲", title: "Physics", desc: "Mechanics, E&M, optics, experiments, real‑world intuition." },
        { icon: "📚", title: "English", desc: "Grammar, vocabulary, reading & writing, speaking confidence, IELTS." },
        { icon: "💻", title: "Programming", desc: "Python & C++ from basics to algorithms, data structures, and projects." },
      ],
    },
    teachers: {
      title: "Meet our teachers",
      subtitle: "Experienced mentors focused on clarity, practice, and results.",
      items: [
        { name: "Math Mentor", blurb: "10+ years teaching olympiad math & exams." },
        { name: "Physics Mentor", blurb: "Lab‑first approach, demos & intuition building." },
        { name: "English Mentor", blurb: "Speaking‑heavy lessons with practical topics." },
      ],
    },
    schedule: {
      title: "Weekly schedule",
      subtitle: "Flexible time slots. Choose group or 1‑on‑1.",
      groups: [
        "Mon/Wed/Fri — 18:00–19:30 (Math / Physics)",
        "Tue/Thu — 18:00–19:30 (English / Programming)",
        "Sat — 12:00–14:00 (Mixed practice)",
      ],
      oneOnOne:
        "1‑on‑1 lessons between 10:00–20:00. Tell us your preferred days and we’ll arrange.",
    },
    results: {
      title: "Results you can expect",
      subtitle: "Real improvements within weeks",
      kpis: [
        { kpi: "+2x", label: "Homework completion & confidence" },
        { kpi: "−30%", label: "Fewer mistakes on quizzes" },
        { kpi: "+1–2", label: "Grade improvement in a term" },
      ],
    },
    pricing: {
      title: "Pricing",
      subtitle: "Simple and transparent",
      tiers: [
        {
          name: "Group",
          price: "֏12,000",
          period: "per 90‑min lesson",
          features: ["Max 8 students", "Weekly progress notes", "Practice worksheets"],
          cta: "Join Group",
        },
        {
          name: "1‑on‑1",
          price: "֏20,000",
          period: "per 60‑min lesson",
          features: ["Personal plan", "Flexible schedule", "Parent updates"],
          cta: "Book 1‑on‑1",
        },
        {
          name: "Exam Prep",
          price: "Custom",
          period: "per program",
          features: ["Diagnostic test", "Targeted curriculum", "Mock exams"],
          cta: "Get a Quote",
        },
      ],
      note: "* Discounts for monthly bundles and siblings available.",
    },
    faq: {
      title: "FAQ",
      subtitle: "Common questions",
      items: [
        { q: "Do you offer online lessons?", a: "Yes. In‑person in Yerevan or online via Zoom/Meet." },
        { q: "What levels do you teach?", a: "From grade 5 to university entrance." },
        { q: "Do you give homework?", a: "Yes, balanced homework with feedback to build mastery." },
        { q: "Can we try before paying?", a: "Absolutely—book a free trial lesson." },
      ],
    },
    enroll: {
      title: "Enroll now",
      subtitle: "Book your free trial lesson or ask a question.",
      contactLead:
        "Email us, call us, or use the form. We reply within one business day.",
      form: {
        name: "Parent/Student Name",
        email: "Email",
        course: "Course",
        format: "Format",
        time: "Preferred Time",
        message: "Message",
        placeholderMsg:
          "Tell us the student's grade, goals, and preferred schedule",
        submit: "Send",
        courseOptions: ["Math", "Physics", "English", "Programming"],
        formatOptions: ["Group", "1‑on‑1", "Online", "In‑person"],
      },
    },
    footer: {
      links: { enroll: "Enroll", faq: "FAQ", pricing: "Pricing" },
    },
  },
  ru: {
    banner: "✨ Бесплатный пробный урок для новых учеников — запишитесь сегодня",
    nav: {
      courses: "Курсы",
      teachers: "Преподаватели",
      schedule: "Расписание",
      pricing: "Цены",
      faq: "Вопросы",
      enroll: "Запись",
    },
    hero: {
      badge: "Математика • Физика • Английский • Программирование",
      tagline: "Учись. Расти. Добивайся.",
      subtitle:
        "Качественные занятия по математике, физике, английскому и программированию для всех уровней.",
      primary: "Записаться на бесплатный пробный урок",
      secondary: "Посмотреть курсы",
      smalls: [
        "🎯 Небольшие группы и индивидуально",
        "🧑‍🏫 Подготовка к олимпиадам",
        "📝 Подготовка к экзаменам (AT/IELTS/SAT)",
        "💻 Проектное программирование",
      ],
    },
    courses: {
      title: "Наши курсы",
      subtitle: "Базовые предметы для прочного фундамента.",
      items: [
        { icon: "➗", title: "Математика", desc: "Алгебра, геометрия, тригонометрия, анализ, решение задач, олимпиада." },
        { icon: "🧲", title: "Физика", desc: "Механика, ЭМ, оптика, эксперименты и практическое мышление." },
        { icon: "📚", title: "Английский", desc: "Грамматика, лексика, чтение и письмо, разговорная практика, IELTS." },
        { icon: "💻", title: "Программирование", desc: "Python и C++ от основ до алгоритмов, структуры данных и проекты." },
      ],
    },
    teachers: {
      title: "Наши преподаватели",
      subtitle: "Опытные наставники, ориентированные на практику и результат.",
      items: [
        { name: "Преподаватель математики", blurb: "Более 10 лет подготовки к олимпиадам и экзаменам." },
        { name: "Преподаватель физики", blurb: "Лабораторный подход, демонстрации и интуиция." },
        { name: "Преподаватель английского", blurb: "Уроки с упором на разговорную практику." },
      ],
    },
    schedule: {
      title: "Недельное расписание",
      subtitle: "Гибкие слоты. Группы и индивидуально.",
      groups: [
        "Пн/Ср/Пт — 18:00–19:30 (Математика / Физика)",
        "Вт/Чт — 18:00–19:30 (Английский / Программирование)",
        "Сб — 12:00–14:00 (Смешанная практика)",
      ],
      oneOnOne:
        "Индивидуально с 10:00 до 20:00. Сообщите удобные дни — подберём время.",
    },
    results: {
      title: "Ожидаемые результаты",
      subtitle: "Заметный прогресс за несколько недель",
      kpis: [
        { kpi: "+2x", label: "Выполнение домашних и уверенность" },
        { kpi: "−30%", label: "Меньше ошибок в тестах" },
        { kpi: "+1–2", label: "Рост оценок за четверть" },
      ],
    },
    pricing: {
      title: "Цены",
      subtitle: "Просто и прозрачно",
      tiers: [
        {
          name: "Группа",
          price: "֏12,000",
          period: "за 90‑мин занятие",
          features: ["До 8 учеников", "Еженедельный прогресс", "Практические задания"],
          cta: "Записаться в группу",
        },
        {
          name: "Индивидуально",
          price: "֏20,000",
          period: "за 60‑мин урок",
          features: ["Личный план", "Гибкий график", "Обратная связь для родителей"],
          cta: "Забронировать урок",
        },
        {
          name: "Экзамены",
          price: "Индивидуально",
          period: "программа",
          features: ["Диагностический тест", "Целевая программа", "Пробные экзамены"],
          cta: "Получить предложение",
        },
      ],
      note: "* Скидки на абонементы и для братьев/сестёр.",
    },
    faq: {
      title: "Вопросы и ответы",
      subtitle: "Частые вопросы",
      items: [
        { q: "Проводите ли вы онлайн‑занятия?", a: "Да. Очно в Ереване и онлайн (Zoom/Meet)." },
        { q: "С какими уровнями вы работаете?", a: "С 5 класса до поступления в вуз." },
        { q: "Даёте ли вы домашние задания?", a: "Да, сбалансированные задания с обратной связью." },
        { q: "Можно ли попробовать бесплатно?", a: "Да, бесплатный пробный урок." },
      ],
    },
    enroll: {
      title: "Запишитесь сейчас",
      subtitle: "Бесплатный пробный урок или вопрос",
      contactLead:
        "Напишите на почту, позвоните или заполните форму. Отвечаем в течение рабочего дня.",
      form: {
        name: "Имя родителя/ученика",
        email: "Email",
        course: "Курс",
        format: "Формат",
        time: "Удобное время",
        message: "Сообщение",
        placeholderMsg:
          "Укажите класс, цели и предпочитаемое расписание",
        submit: "Отправить",
        courseOptions: ["Математика", "Физика", "Английский", "Программирование"],
        formatOptions: ["Группа", "Индивидуально", "Онлайн", "Очно"],
      },
    },
    footer: {
      links: { enroll: "Запись", faq: "Вопросы", pricing: "Цены" },
    },
  },
};

const LangButton = ({ code, label, active, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Change language to ${label}`}
    className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold ring-1 transition ${
      active
        ? "bg-white/15 text-white ring-white/30"
        : "bg-white/5 text-sky-200 ring-white/10 hover:bg-white/10"
    }`}
  >
    <span className="text-base leading-none">
      {code === "hy" ? "🇦🇲" : code === "en" ? "🇬🇧" : "🇷🇺"}
    </span>
    <span>{label}</span>
  </button>
);

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="px-3 py-2 text-sm font-medium text-sky-200 hover:text-white hover:opacity-90"
  >
    {children}
  </a>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-20 md:py-28">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-base md:text-lg text-sky-200">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  </section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sky-200">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`${CONFIG.color.card} rounded-2xl p-6 ring-1 ring-white/10 shadow-xl ${className}`}>{children}</div>
);

const Feature = ({ icon, title, desc }) => (
  <Card>
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-white/0">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-sky-200">{desc}</p>
      </div>
    </div>
  </Card>
);

const PricingCard = ({ name, price, period, features, cta, ctaHref = "#enroll" }) => (
  <Card>
    <div className="flex flex-col h-full">
      <div>
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        <div className="mt-4 flex items-end gap-1">
          <div className="text-4xl font-bold text-white">{price}</div>
          <div className="text-sm text-sky-200">/{period}</div>
        </div>
        <ul className="mt-6 space-y-2 text-sm text-sky-200">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5">✅</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <a
        href={ctaHref}
        className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-95"
      >
        {cta}
      </a>
    </div>
  </Card>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 p-4">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-base font-medium text-white">{q}</span>
        <span className="text-sky-200">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-sm text-sky-200">{a}</p>}
    </div>
  );
};

export default function LandingPage() {
  const [lang, setLang] = useState("hy");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("lang");
      if (saved && I18N[saved]) setLang(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang);
    }
  }, [lang]);

  const t = (path) => {
    const parts = path.split(".");
    return parts.reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : null), I18N[lang]);
  };

  return (
    <div className={`min-h-screen ${CONFIG.color.bg} ${CONFIG.color.text} antialiased`}>
      {/* Top banner */}
      <div className="bg-gradient-to-r from-sky-600/10 to-indigo-500/10 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-2 text-center text-xs text-sky-200">
          {t("banner")}
        </div>
      </div>

      {/* Nav with language selector */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-sky-950/60 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="#home" className="flex items-center gap-2">
            <img
              src={CONFIG.logo}
              alt={CONFIG.businessName[lang] + " logo"}
              className="h-10 w-auto md:h-12"
            />
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-400" />
            <span className="text-white font-semibold">{CONFIG.businessName[lang]}</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="#courses">{t("nav.courses")}</NavLink>
            <NavLink href="#teachers">{t("nav.teachers")}</NavLink>
            <NavLink href="#schedule">{t("nav.schedule")}</NavLink>
            <NavLink href="#pricing">{t("nav.pricing")}</NavLink>
            <NavLink href="#faq">{t("nav.faq")}</NavLink>
            <NavLink href="#enroll">{t("nav.enroll")}</NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <LangButton code="hy" label="Հայ" active={lang === "hy"} onClick={() => setLang("hy")} />
            <LangButton code="en" label="EN" active={lang === "en"} onClick={() => setLang("en")} />
            <LangButton code="ru" label="РУ" active={lang === "ru"} onClick={() => setLang("ru")} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgba(56,189,248,.25),transparent)]" />
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <Badge>{t("hero.badge")}</Badge>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight text-white">
              {CONFIG.businessName[lang]}: {t("hero.tagline")}
            </h1>
            <p className="mt-5 text-lg text-sky-200">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#enroll"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-95"
              >
                {t("hero.primary")}
              </a>
              <a
                href="#courses"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15"
              >
                {t("hero.secondary")}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-sky-200">
              {t("hero.smalls").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <Section id="courses" title={t("courses.title")} subtitle={t("courses.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t("courses.items").map((c, i) => (
            <Feature key={i} icon={c.icon} title={c.title} desc={c.desc} />
          ))}
        </div>
      </Section>

      {/* Teachers */}
      <Section id="teachers" title={t("teachers.title")} subtitle={t("teachers.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t("teachers.items").map((tch, i) => (
            <Card key={i}>
              <div className="text-xl font-semibold text-white">{tch.name}</div>
              <p className="mt-2 text-sm text-sky-200">{tch.blurb}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Schedule */}
      <Section id="schedule" title={t("schedule.title")} subtitle={t("schedule.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-white font-semibold">{t("nav.courses")}</h3>
            <ul className="mt-3 text-sm text-sky-200 space-y-2">
              {t("schedule.groups").map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-white font-semibold">1‑on‑1</h3>
            <p className="mt-3 text-sm text-sky-200">{t("schedule.oneOnOne")}</p>
          </Card>
        </div>
      </Section>

      {/* Results */}
      <Section id="results" title={t("results.title")} subtitle={t("results.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t("results.kpis").map((c, i) => (
            <Card key={i}>
              <div className="text-4xl font-bold text-white">{c.kpi}</div>
              <p className="mt-2 text-sky-200">{c.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" title={t("pricing.title")} subtitle={t("pricing.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t("pricing.tiers").map((tier, i) => (
            <PricingCard
              key={i}
              name={tier.name}
              price={tier.price}
              period={tier.period}
              features={tier.features}
              cta={tier.cta}
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-sky-200">{t("pricing.note")}</p>
      </Section>

      {/* FAQ */}
      <Section id="faq" title={t("faq.title")} subtitle={t("faq.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t("faq.items").map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      {/* Enroll / Contact */}
      <Section id="enroll" title={t("enroll.title")} subtitle={t("enroll.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <p className="text-sm text-sky-200">
              {t("enroll.contactLead")}{" "}
              <a href={`mailto:${CONFIG.email}`} className="underline decoration-white/30 hover:decoration-white">
                {CONFIG.email}
              </a>
              , {CONFIG.phone}
            </p>
            <div className="mt-6 space-y-2 text-sm text-sky-200">
              <div>📍 {CONFIG.address[lang]}</div>
              <div className="flex items-center gap-3">
                <a className="underline decoration-white/20" href={CONFIG.social.instagram}>Instagram</a>
                <a className="underline decoration-white/20" href={CONFIG.social.x}>X</a>
                <a className="underline decoration-white/20" href={CONFIG.social.linkedin}>LinkedIn</a>
              </div>
            </div>
          </Card>

          <div className="md:col-span-2">
            <form
              className={`grid grid-cols-1 gap-4 rounded-2xl ${CONFIG.color.card} p-6 ring-1 ring-white/10`}
              action="https://formspree.io/f/your-form-id" // Replace with your Formspree ID or backend endpoint
              method="POST"
            >
              <input type="hidden" name="source" value="website" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-sky-200">{t("enroll.form.name")}</label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder:text-sky-400 outline-none ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-sky-500/50"
                    placeholder="Arthur Avagyan"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-sky-200">{t("enroll.form.email")}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder:text-sky-400 outline-none ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-sky-500/50"
                    placeholder="arthura@gmail.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm text-sky-200">{t("enroll.form.course")}</label>
                  <select name="course" className="w-full rounded-xl bg-white/5 px-4 py-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-sky-500/50">
                    {t("enroll.form.courseOptions").map((o, i) => (
                      <option key={i}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-sky-200">{t("enroll.form.format")}</label>
                  <select name="format" className="w-full rounded-xl bg-white/5 px-4 py-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-sky-500/50">
                    {t("enroll.form.formatOptions").map((o, i) => (
                      <option key={i}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-sky-200">{t("enroll.form.time")}</label>
                  <input name="time" placeholder="Tue 18:00" className="w-full rounded-xl bg-white/5 px-4 py-3 text-white ring-1 ring-white/10 focus:ring-2 focus:ring-sky-500/50" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-sky-200">{t("enroll.form.message")}</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-xl bg-white/5 px-4 py-3 text-white placeholder:text-sky-400 outline-none ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-sky-500/50"
                  placeholder={t("enroll.form.placeholderMsg")}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:opacity-95"
              >
                {t("enroll.form.submit")}
              </button>
              <p className="text-xs text-sky-200">By submitting, you agree to be contacted about your request.</p>
            </form>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-sky-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} {CONFIG.businessName[lang]}. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#enroll" className="underline decoration-white/20">{t("footer.links.enroll")}</a>
              <a href="#faq" className="underline decoration-white/20">{t("footer.links.faq")}</a>
              <a href="#pricing" className="underline decoration-white/20">{t("footer.links.pricing")}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
