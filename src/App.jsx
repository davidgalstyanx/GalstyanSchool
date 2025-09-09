// GalstyanSchool Landing Page — React + Tailwind with i18n (HY • EN • RU)
// Improved version with better component structure, SEO, and UX

import { useState, useEffect } from "react";
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
import { Feature } from './components/Feature';
import { PricingCard } from './components/PricingCard';
import { PricingAccordion } from './components/PricingAccordion';
import { EnrollPage } from './components/EnrollPage';
import { FAQItem } from './components/FAQItem';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { Card } from './components/Card';
import { LoadingSpinner } from './components/LoadingSpinner';
import { trackContactClick } from './utils/analytics';

const CONFIG = {
  businessName: {
    hy: "Գալստյան Ակադեմիա",
    en: "Galstyan Academy",
    ru: "Академия Галстяна",
  },
  owner: {
    name: {
      hy: "Մարատ Գալստյան",
      en: "Marat Galstyan",
      ru: "Марат Галստян",
    },
    photo: "/owner.jpg",
  },
  logo: "/logo.svg",
  phone: "+374 (94) 766-409",
  email: "maratgalstyan1967@gmail.com",
  address: {
    hy: "Երևան, Հայաստան",
    en: "Yerevan, Armenia",
    ru: "Ереван, Армения",
  },
  social: {
    facebook: "https://www.facebook.com/galstyanacademy",
    instagram: "https://www.instagram.com/galstyanacademy/",
  },
  color: {
    bg: "bg-sky-950",
    card: "bg-sky-900",
    text: "text-white",
    subtext: "text-sky-200",
    accent: "from-sky-500 to-indigo-400",
    ring: "ring-sky-500/30",
  },
  pricing: {
    group: {
      weekly1: {
        amd: 20000,
        rub: 5200, // ~1 AMD = 0.26 RUB
        usd: 52,   // ~1 AMD = 0.0026 USD
        lessons: 1,
      },
      weekly2: {
        amd: 40000,
        rub: 10400, // ~1 AMD = 0.26 RUB
        usd: 104,   // ~1 AMD = 0.0026 USD
        lessons: 2,
      },
      weekly3: {
        amd: 60000,
        rub: 15600, // ~1 AMD = 0.26 RUB
        usd: 156,   // ~1 AMD = 0.0026 USD
        lessons: 3,
      },
    },
    private: {
      weekly1: {
        amd: 40000,
        rub: 10400, // ~1 AMD = 0.26 RUB
        usd: 104,   // ~1 AMD = 0.0026 USD
        lessons: 1,
      },
      weekly2: {
        amd: 70000,
        rub: 18200, // ~1 AMD = 0.26 RUB
        usd: 182,   // ~1 AMD = 0.0026 USD
        lessons: 2,
      },
      weekly3: {
        amd: 100000,
        rub: 26000, // ~1 AMD = 0.26 RUB
        usd: 260,   // ~1 AMD = 0.0026 USD
        lessons: 3,
      },
    },
  },
};

// --- Translations ---
const I18N = {
  hy: {
    banner: "✨ Անվճար փորձնական դաս նոր ուսանողների համար — գրանցվեք այսօր",
    nav: {
      courses: "Դասընթացներ",
      founder: "Հիմնադիր",
      pricing: "Գնացուցակ",
      faq: "ՀՏՀ",
      contact: "Կապ",
    },
    hero: {
      badge: "Մաթեմատիկա • Ֆիզիկա",
      tagline: "Սովորիր․ Զարգացիր․ Հաջողիր․",
      subtitle:
        "Բարձրորակ դասեր մաթեմատիկա և ֆիզիկա բոլոր մակարդակների համար։",
      primary: "Միացիր դասընթացներին",
      secondary: "Դասընթացներ",
      founder: "Հիմնադիր",
      smalls: [
        "🎯 Փոքր խմբեր և անհատական",
        "📐 Մաթեմատիկա բոլոր մակարդակների համար",
        "⚗️ Ֆիզիկա՝ տեսություն և պրակտիկա",
      ],
    },
    courses: {
      title: "Մեր դասընթացները",
      subtitle: "Հիմնական առարկաներ՝ ամուր հիմք ստեղծելու համար։",
      comingSoon: "Շուտով",
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
          icon: "⚗️",
          title: "Քիմիա",
          desc: "Շուտով - օրգանական և անօրգանական քիմիա, լաբորատորիա։",
          disabled: true,
        },
        {
          icon: "🧬",
          title: "Կենսաբանություն",
          desc: "Շուտով - բջջային կենսաբանություն, գենետիկա, էկոլոգիա։",
          disabled: true,
        },
        {
          icon: "🇬🇧",
          title: "Անգլերեն",
          desc: "Շուտով - քերականություն, խոսակցություն, գրավոր արտահայտություն։",
          disabled: true,
        },
      ],
    },
    founder: {
      title: "Հիմնադիր",
      subtitle:
        "Փորձառու մենթոր՝ հստակության, պրակտիկայի և արդյունքների վրա կենտրոնացած։",
      blurb: "30+ տարվա փորձ ուսանողների պատրաստման և ակադեմիական հաջողության ապահովման բնագավառում։ Մարատ Գալստյանը կրթության մեջ տեսնում է ապագայի հիմքը և հավատում, որ ամեն ուսանող կարող է հասնել բարձունքների՝ ճիշտ ղեկավարության և աջակցության դեպքում։ Նրա մոտեցումը հիմնված է անհատական բանալու վրա՝ ամեն ուսանողի հետ աշխատելիս նրա ուժեղ և թույլ կողմերը բացահայտելու և դրանց հիման վրա կառուցելու համար։",
      mission: "Նպատակը պարզ է՝ ոչ միայն գիտելիքներ փոխանցել, այլև ներշնչել սովորելու սիրությունը և ինքնավստահությունը։ Մարատը համոզված է, որ կրթությունը պետք է լինի ոգևորիչ և գործնական՝ պատրաստելով ուսանողներին ոչ միայն քննությունների, այլև կյանքային մարտահրավերների համար։",
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
      title: "Ամսական գնացուցակ",
      subtitle: "Պարզ և թափանցիկ ամսական պլաններ",
      groupTiers: [
        {
          name: "Խմբակային - 1 դաս/շաբաթ",
          price: "group.weekly1",
          period: "ամսական",
          features: ["Մինչև 8 ուսանող", "4 դաս ամսական", "Վարժություններ", "Շաբաթական արձագանք"],
          cta: "Ընտրել պլան",
        },
        {
          name: "Խմբակային - 2 դաս/շաբաթ",
          price: "group.weekly2",
          period: "ամսական",
          features: ["Մինչև 8 ուսանող", "8 դաս ամսական", "Վարժություններ", "Շաբաթական արձագանք"],
          cta: "Ընտրել պլան",
        },
        {
          name: "Խմբակային - 3 դաս/շաբաթ",
          price: "group.weekly3",
          period: "ամսական",
          features: ["Մինչև 8 ուսանող", "12 դաս ամսական", "Վարժություններ", "Շաբաթական արձագանք"],
          cta: "Ընտրել պլան",
        },
      ],
      privateTiers: [
        {
          name: "Անհատական - 1 դաս/շաբաթ",
          price: "private.weekly1",
          period: "ամսական",
          features: ["Անհատական պլան", "4 դաս ամսական", "Ճկուն գրաֆիկ", "Թարմացումներ ծնողներին"],
          cta: "Ընտրել պլան",
        },
        {
          name: "Անհատական - 2 դաս/շաբաթ",
          price: "private.weekly2",
          period: "ամսական",
          features: ["Անհատական պլան", "8 դաս ամսական", "Ճկուն գրաֆիկ", "Թարմացումներ ծնողներին"],
          cta: "Ընտրել պլան",
        },
        {
          name: "Անհատական - 3 դաս/շաբաթ",
          price: "private.weekly3",
          period: "ամսական",
          features: ["Անհատական պլան", "12 դաս ամսական", "Ճկուն գրաֆիկ", "Թարմացումներ ծնողներին"],
          cta: "Ընտրել պլան",
        },
      ],
      note: "* Զեղչեր՝ քույր-եղբայրների համար",
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
        placeholders: {
          name: "Արթուր Ավագյան",
          email: "maratgalstyan1967@gmail.com",
          time: "Երք 18:00",
        },
      },
    },
    contact: {
      title: "Կապ",
      subtitle: "Կապվեք մեզ հետ",
      lead: "Հարցեր ունե՞ք կամ ցանկանու՞մ եք գրանցվել։ Մենք պատասխանում ենք մեկ աշխատանքային օրվա ընթացքում։",
    },
    footer: {
      links: { enroll: "Գրանցվել", faq: "ՀՏՀ", pricing: "Գնացուցակ" },
      rights: "Բոլոր իրավունքները պաշտպանված են",
    },
  },
  en: {
    banner: "✨ Free trial lesson for new students — book today",
    nav: {
      courses: "Courses",
      founder: "Founder",
      pricing: "Pricing",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      badge: "Math • Physics",
      tagline: "Learn. Grow. Excel.",
      subtitle:
        "High‑quality lessons in Math and Physics for all levels.",
      primary: "Join Courses",
      secondary: "View Courses",
      founder: "Founder",
      smalls: [
        "🎯 Small groups & private",
        "📐 Mathematics for all levels",
        "⚗️ Physics theory & practice",
      ],
    },
    courses: {
      title: "Our Courses",
      subtitle: "Core subjects designed to build a strong foundation.",
      comingSoon: "Coming Soon",
      items: [
        { icon: "➗", title: "Math", desc: "Algebra, geometry, trigonometry, calculus, problem solving, olympiad." },
        { icon: "🧲", title: "Physics", desc: "Mechanics, E&M, optics, experiments, real‑world intuition." },
        { icon: "⚗️", title: "Chemistry", desc: "Coming soon - organic & inorganic chemistry, laboratory work.", disabled: true },
        { icon: "🧬", title: "Biology", desc: "Coming soon - cell biology, genetics, ecology.", disabled: true },
        { icon: "🇬🇧", title: "English", desc: "Coming soon - grammar, conversation, written expression.", disabled: true },
      ],
    },
    founder: {
      title: "Founder",
      subtitle: "Experienced mentor focused on clarity, practice, and results.",
      blurb: "30+ years of experience in student preparation and ensuring academic success. Marat Galstyan sees education as the foundation of the future and believes that every student can reach great heights with the right guidance and support. His approach is based on finding the individual key to each student, working to discover their strengths and weaknesses and building upon them.",
      mission: "The goal is clear: not just to transfer knowledge, but to inspire a love of learning and confidence. Marat is convinced that education should be inspiring and practical, preparing students not only for exams, but for life's challenges.",
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
      title: "Monthly Pricing",
      subtitle: "Simple and transparent monthly plans",
      groupTiers: [
        {
          name: "Group - 1 lesson/week",
          price: "group.weekly1",
          period: "monthly",
          features: ["Max 8 students", "4 lessons monthly", "Practice worksheets", "Weekly progress notes"],
          cta: "Choose Plan",
        },
        {
          name: "Group - 2 lessons/week",
          price: "group.weekly2",
          period: "monthly",
          features: ["Max 8 students", "8 lessons monthly", "Practice worksheets", "Weekly progress notes"],
          cta: "Choose Plan",
        },
        {
          name: "Group - 3 lessons/week",
          price: "group.weekly3",
          period: "monthly",
          features: ["Max 8 students", "12 lessons monthly", "Practice worksheets", "Weekly progress notes"],
          cta: "Choose Plan",
        },
      ],
      privateTiers: [
        {
          name: "Private - 1 lesson/week",
          price: "private.weekly1",
          period: "monthly",
          features: ["Personal plan", "4 lessons monthly", "Flexible schedule", "Parent updates"],
          cta: "Choose Plan",
        },
        {
          name: "Private - 2 lessons/week",
          price: "private.weekly2",
          period: "monthly",
          features: ["Personal plan", "8 lessons monthly", "Flexible schedule", "Parent updates"],
          cta: "Choose Plan",
        },
        {
          name: "Private - 3 lessons/week",
          price: "private.weekly3",
          period: "monthly",
          features: ["Personal plan", "12 lessons monthly", "Flexible schedule", "Parent updates"],
          cta: "Choose Plan",
        },
      ],
      note: "* Discounts for siblings available.",
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
        formatOptions: ["Group", "Private", "Online", "In‑person"],
        placeholders: {
          name: "Arthur Avagyan",
          email: "maratgalstyan1967@gmail.com",
          time: "Tue 18:00",
        },
      },
    },
    contact: {
      title: "Contact",
      subtitle: "Get in touch with us",
      lead: "Have questions or want to enroll? We reply within one business day.",
    },
    footer: {
      links: { enroll: "Enroll", faq: "FAQ", pricing: "Pricing" },
      rights: "All rights reserved",
    },
  },
  ru: {
    banner: "✨ Бесплатный пробный урок для новых учеников — запишитесь сегодня",
    nav: {
      courses: "Курсы",
      founder: "Основатель",
      pricing: "Цены",
      faq: "Вопросы",
      contact: "Контакты",
    },
    hero: {
      badge: "Математика • Физика",
      tagline: "Учись. Расти. Добивайся.",
      subtitle:
        "Качественные занятия по математике и физике для всех уровней.",
      primary: "Записаться на курсы",
      secondary: "Посмотреть курсы",
      founder: "Основатель",
      smalls: [
        "🎯 Небольшие группы и индивидуальные",
        "📐 Математика для всех уровней",
        "⚗️ Физика: теория и практика",
      ],
    },
    courses: {
      title: "Наши курсы",
      subtitle: "Базовые предметы для прочного фундамента.",
      comingSoon: "Скоро",
      items: [
        { icon: "➗", title: "Математика", desc: "Алгебра, геометрия, тригонометрия, анализ, решение задач, олимпиада." },
        { icon: "🧲", title: "Физика", desc: "Механика, ЭМ, оптика, эксперименты и практическое мышление." },
        { icon: "⚗️", title: "Химия", desc: "Скоро - органическая и неорганическая химия, лабораторные работы.", disabled: true },
        { icon: "🧬", title: "Биология", desc: "Скоро - клеточная биология, генетика, экология.", disabled: true },
        { icon: "🇬🇧", title: "Английский", desc: "Скоро - грамматика, разговорная речь, письменное выражение.", disabled: true },
      ],
    },
    founder: {
      title: "Основатель",
      subtitle: "Опытный наставник, ориентированный на практику и результат.",
      blurb: "Более 10 лет опыта в подготовке студентов и обеспечении академических успехов. Марат Галстян видит в образовании основу будущего и верит, что каждый студент может достичь больших высот при правильном руководстве и поддержке. Его подход основан на поиске индивидуального ключа к каждому ученику, работая над выявлением их сильных и слабых сторон и опираясь на них.",
      mission: "Цель ясна: не просто передать знания, а вдохновить на любовь к учебе и уверенность в себе. Марат убежден, что образование должно быть вдохновляющим и практичным, готовя студентов не только к экзаменам, но и к жизненным вызовам.",
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
      title: "Месячные цены",
      subtitle: "Простые и прозрачные месячные планы",
      groupTiers: [
        {
          name: "Группа - 1 урок/неделя",
          price: "group.weekly1",
          period: "месячно",
          features: ["До 8 учеников", "4 урока в месяц", "Практические задания", "Еженедельный прогресс"],
          cta: "Выбрать план",
        },
        {
          name: "Группа - 2 урока/неделя",
          price: "group.weekly2",
          period: "месячно",
          features: ["До 8 учеников", "8 уроков в месяц", "Практические задания", "Еженедельный прогресс"],
          cta: "Выбрать план",
        },
        {
          name: "Группа - 3 урока/неделя",
          price: "group.weekly3",
          period: "месячно",
          features: ["До 8 учеников", "12 уроков в месяц", "Практические задания", "Еженедельный прогресс"],
          cta: "Выбрать план",
        },
      ],
      privateTiers: [
        {
          name: "Индивидуальные - 1 урок/неделя",
          price: "private.weekly1",
          period: "месячно",
          features: ["Личный план", "4 урока в месяц", "Гибкий график", "Обратная связь для родителей"],
          cta: "Выбрать план",
        },
        {
          name: "Индивидуальные - 2 урока/неделя",
          price: "private.weekly2",
          period: "месячно",
          features: ["Личный план", "8 уроков в месяц", "Гибкий график", "Обратная связь для родителей"],
          cta: "Выбрать план",
        },
        {
          name: "Индивидуальные - 3 урока/неделя",
          price: "private.weekly3",
          period: "месячно",
          features: ["Личный план", "12 уроков в месяц", "Гибкий график", "Обратная связь для родителей"],
          cta: "Выбрать план",
        },
      ],
      note: "* Скидки для братьев/сестёр.",
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
        formatOptions: ["Группа", "Индивидуальные", "Онлайн", "Очно"],
        placeholders: {
          name: "Артур Авагян",
          email: "maratgalstyan1967@gmail.com",
          time: "Вт 18:00",
        },
      },
    },
    contact: {
      title: "Контакты",
      subtitle: "Свяжитесь с нами",
      lead: "Есть вопросы или хотите записаться? Отвечаем в течение рабочего дня.",
    },
    footer: {
      links: { enroll: "Запись", faq: "Вопросы", pricing: "Цены" },
      rights: "Все права защищены",
    },
  },
};

const formatPrice = (pricePath, lang) => {
  const pathParts = pricePath.split('.');
  const prices = pathParts.reduce((obj, key) => obj[key], CONFIG.pricing);
  
  switch(lang) {
    case 'hy': return `֏${prices.amd.toLocaleString()}`;
    case 'en': return `$${prices.usd}`;
    case 'ru': return `₽${prices.rub.toLocaleString()}`;
    default: return `֏${prices.amd.toLocaleString()}`;
  }
};

// Smooth scrolling utility
const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function LandingPage() {
  const [lang, setLang] = useState("hy");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("lang");
      if (saved && I18N[saved]) setLang(saved);
      setIsLoading(false);
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

  // Add smooth scrolling to all internal links
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const elementId = target.getAttribute('href').substring(1);
        smoothScrollTo(elementId);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setCurrentPage('enroll');
    trackEvent('plan_selected', { plan: planId });
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedPlan(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (currentPage === 'enroll') {
    return (
      <EnrollPage 
        selectedPlan={selectedPlan}
        CONFIG={CONFIG}
        lang={lang}
        t={t}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className={`min-h-screen ${CONFIG.color.bg} ${CONFIG.color.text} antialiased`}>
      {/* Top banner */}
      <div className="bg-gradient-to-r from-sky-600/10 to-indigo-500/10 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-2 text-center text-xs text-sky-200">
          {t("banner")}
        </div>
      </div>

      {/* Header */}
      <Header lang={lang} setLang={setLang} t={t} CONFIG={CONFIG} />

      {/* Hero */}
      <Hero t={t} CONFIG={CONFIG} lang={lang} />

      {/* Courses */}
      <Section id="courses" title={t("courses.title")} subtitle={t("courses.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t("courses.items").map((c, i) => (
            <Feature key={i} icon={c.icon} title={c.title} desc={c.desc} CONFIG={CONFIG} disabled={c.disabled} comingSoonText={t("courses.comingSoon")} />
          ))}
        </div>
      </Section>

      {/* Results */}
      <Section id="results" title={t("results.title")} subtitle={t("results.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t("results.kpis").map((c, i) => (
            <Card key={i} CONFIG={CONFIG}>
              <div className="text-4xl font-bold text-white">{c.kpi}</div>
              <p className="mt-2 text-sky-200">{c.label}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Founder */}
      <Section id="founder" title={t("founder.title")} subtitle={t("founder.subtitle")}>
        <div className="flex justify-center">
          <Card className="max-w-md" CONFIG={CONFIG}>
            <div className="text-center">
              <img 
                src={CONFIG.owner.photo} 
                alt={CONFIG.owner.name[lang]} 
                className="w-96 h-96 mx-auto rounded-full mb-4 ring-4 ring-white/10 object-cover"
                loading="lazy"
              />
              <div className="text-xl font-semibold text-white">{CONFIG.owner.name[lang]}</div>
              <p className="mt-2 text-sm text-sky-200">{t("founder.blurb")}</p>
              {t("founder.mission") && (
                <p className="mt-4 text-sm text-sky-200 italic">{t("founder.mission")}</p>
              )}
            </div>
          </Card>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" title={t("pricing.title")} subtitle={t("pricing.subtitle")}>
        <PricingAccordion 
          t={t} 
          CONFIG={CONFIG} 
              lang={lang}
          formatPrice={formatPrice}
          onPlanSelect={handlePlanSelect}
            />
      </Section>

      {/* FAQ */}
      <Section id="faq" title={t("faq.title")} subtitle={t("faq.subtitle")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t("faq.items").map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      {/* Contact Info */}
      <Section id="contact" title={t("contact.title")} subtitle={t("contact.subtitle")}>
        <div className="max-w-4xl mx-auto">
          <Card CONFIG={CONFIG}>
            <div className="text-center">
              <p className="text-lg text-sky-200 mb-6">
                {t("contact.lead")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <i className="fa-solid fa-envelope text-2xl text-sky-400"></i>
                    <a 
                      href={`mailto:${CONFIG.email}`} 
                      className="text-sky-200 hover:text-white transition-colors text-lg"
                      onClick={() => trackContactClick('email')}
                    >
                {CONFIG.email}
              </a>
              </div>
                  <div className="flex items-center justify-center gap-3">
                    <i className="fa-solid fa-phone text-2xl text-sky-400"></i>
                    <a 
                      href={`tel:${CONFIG.phone}`} 
                      className="text-sky-200 hover:text-white transition-colors text-lg"
                      onClick={() => trackContactClick('phone')}
                    >
                      {CONFIG.phone}
                    </a>
                </div>
                  <div className="flex items-center justify-center gap-3">
                    <i className="fa-solid fa-location-dot text-2xl text-sky-400"></i>
                    <span className="text-sky-200">{CONFIG.address[lang]}</span>
                </div>
              </div>
                <div className="space-y-4">
                  <div className="text-sky-200">
                    <h4 className="text-white font-semibold mb-3">
                      {lang === "hy" ? "Մեր սոցիալական ցանցերը" : 
                       lang === "en" ? "Follow us" : "Мы в соцсетях"}
                    </h4>
                    <div className="flex justify-center gap-6">
                      <a 
                        className="text-sky-200 hover:text-white hover:scale-110 transition-all duration-200" 
                        href={CONFIG.social.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => trackContactClick('facebook')}
                        title="Facebook"
                      >
                        <i className="fa-brands fa-facebook text-3xl"></i>
                      </a>
                      <a 
                        className="text-sky-200 hover:text-white hover:scale-110 transition-all duration-200" 
                        href={CONFIG.social.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => trackContactClick('instagram')}
                        title="Instagram"
                      >
                        <i className="fa-brands fa-instagram text-3xl"></i>
                      </a>
                </div>
              </div>
              </div>
          </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <Footer t={t} CONFIG={CONFIG} lang={lang} />
    </div>
  );
}
