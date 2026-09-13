import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ur';

interface Translations {
  [key: string]: {
    en: string;
    ur: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation
  navHome: { en: 'Home', ur: 'صفحہ اول' },
  navAbout: { en: 'About', ur: 'ہمارے بارے میں' },
  navServices: { en: 'Services', ur: 'خدمات' },
  navProjects: { en: 'Projects', ur: 'منصوبے' },
  navTechStack: { en: 'Tech Stack', ur: 'ٹیکنالوجی' },
  navFaq: { en: 'FAQ', ur: 'عام سوالات' },
  navContact: { en: 'Contact', ur: 'رابطہ' },
  navBrandKit: { en: 'Brand Kit', ur: 'برانڈ گائیڈ' },
  navConsult: { en: "Let's Build", ur: 'مشاورت کریں' },
  navRegion: { en: 'PK • Global Remote', ur: 'پاکستان • عالمی ڈیلیوری' },

  // Hero Section
  heroBadge: { en: 'Premier Pakistani Software House', ur: 'پاکستان کا جدید سافٹ ویئر ہاؤس' },
  heroTagline: { en: 'Building Software. Creating Possibilities.', ur: 'سافٹ ویئر کی تعمیر۔ نئے امکانات کی تخلیق۔' },
  heroSubTagline: { en: 'Turning Ideas Into Digital Reality.', ur: 'خیالات کو ڈیجیٹل حقیقت میں بدلنا۔' },
  heroDescription: {
    en: 'TECHMATE is a high-velocity engineering house delivering production-grade web applications, cross-platform mobile apps, cloud systems, and intelligent software tailored for high-growth businesses.',
    ur: 'ٹیک میٹ ایک جدید ٹیکنالوجی پارٹنر ہے جو اسٹارٹ اپس اور کمپنیوں کے لیے اعلیٰ معیار کی ویب سائٹ، موبائل ایپس اور کلاؤڈ سسٹمز تیار کرتا ہے۔'
  },
  heroCtaPrimary: { en: "Let's Build Together", ur: 'آئیے مل کر بنائیں' },
  heroCtaSecondary: { en: 'Explore Our Work', ur: 'ہمارا کام دیکھیں' },
  heroActiveClients: { en: 'Active Enterprise Clients', ur: 'کامیاب تجارتی کلائنٹس' },
  heroCapitalManaged: { en: 'Capital Managed in PKR', ur: 'مجموعی پورٹ فولیو کا انتظام' },

  // Trust Metrics
  trustShipped: { en: 'Shipped Digital Products', ur: 'کامیاب ڈیجیٹل منصوبے' },
  trustUptime: { en: 'Production SLA Uptime', ur: 'بلاتعطل کلاؤڈ سروس' },
  trustRating: { en: 'Client CSAT Satisfaction', ur: 'کلائنٹ اطمینان کا تناسب' },
  trustRetention: { en: 'Long-term Client Retention', ur: 'مستقل کلائنٹ پارٹنرشپ' },

  // Contact Form
  contactBadge: { en: 'Start a Conversation', ur: 'گفتگو کا آغاز کریں' },
  contactTitle: { en: "Let's Build Something Great.", ur: 'آئیے کچھ شاندار تخلیق کریں۔' },
  contactSubtitle: {
    en: 'Have a project in mind or need expert technical consultation? Reach out to our engineering team today.',
    ur: 'کیا آپ کے پاس کوئی منفرد آئیڈیا ہے یا ٹیکنیکل مشاورت درکار ہے؟ ہماری انجینئرنگ ٹیم سے رابطہ کریں۔'
  },
  contactFullName: { en: 'Full Name', ur: 'مکمل نام' },
  contactEmail: { en: 'Email Address', ur: 'ای میل ایڈریس' },
  contactPhone: { en: 'Phone / WhatsApp', ur: 'فون یا واٹس ایپ نمبر' },
  contactCompany: { en: 'Company Name', ur: 'کمپنی یا اسٹارٹ اپ' },
  contactProjectType: { en: 'Project Type', ur: 'منصوبے کی قسم' },
  contactBudget: { en: 'Project Budget (PKR)', ur: 'پراجیکٹ بجٹ (پاکستانی روپے)' },
  contactMessage: { en: 'Project Details & Goals', ur: 'منصوبے کی تفصیلات اور اہداف' },
  contactNda: {
    en: 'Request a mutual Non-Disclosure Agreement (NDA) before sharing sensitive documentation.',
    ur: 'اہم دستاویزات شیئر کرنے سے قبل باہمی رازداری کا معاہدہ (این ڈی اے) درکار ہے۔'
  },
  contactSubmit: { en: 'Submit Project Request', ur: 'درخواست جمع کروائیں' },
  contactSubmitting: { en: 'Securing & Sending Request...', ur: 'درخواست بھیجی جا رہی ہے...' },

  // FAQ
  faqBadge: { en: 'Got Questions? We Have Answers', ur: 'سوالات و جوابات' },
  faqTitle: { en: 'Frequently Asked Questions', ur: 'اکثر پوچھے گئے سوالات' },
  faqSubtitle: {
    en: 'Everything you need to know about partnering with TECHMATE: project pricing in PKR, intellectual property, timelines, and technical execution.',
    ur: 'ٹیک میٹ کے ساتھ شراکت داری، پاکستانی روپے میں بجٹ، کوڈ کی ملکیت اور ترسیل کے طریقہ کار سے متعلق تمام تفصیلات۔'
  },

  // Footer
  footerTagline: { en: 'Building Software. Creating Possibilities.', ur: 'سافٹ ویئر کی تعمیر۔ نئے امکانات کی تخلیق۔' },
  footerRights: { en: 'All rights reserved.', ur: 'جملہ حقوق محفوظ ہیں۔' },

  // Chat Widget
  chatTitle: { en: 'TECHMATE Solutions & Sales', ur: 'ٹیک میٹ انجینئرنگ اور سیلز' },
  chatStatus: { en: 'Engineering Team • Online Now', ur: 'انجینئرنگ ٹیم • ابھی آن لائن ہے' },
  chatResponseTime: { en: 'Avg. response: < 3 mins (PKT)', ur: 'اوسط جوابی وقت: 3 منٹ سے کم' },
  chatGreeting: {
    en: "Assalam-o-Alaikum! Welcome to TECHMATE. How can our engineering team assist you today? Whether you're planning an MVP, enterprise system, or need a PKR quotation, we're here to help.",
    ur: 'السلام علیکم! ٹیک میٹ میں خوش آمدید۔ ہم آپ کے پراجیکٹ، موبائل یا ویب ایپلیکیشن، یا پاکستانی روپے میں تخمینہ بجٹ کے حوالے سے کس طرح رہنمائی کر سکتے ہیں؟'
  },
  chatPlaceholder: { en: 'Type your message or project query...', ur: 'اپنا پیغام یا سوال لکھیں...' },
  chatWhatsAppCta: { en: 'Chat on WhatsApp (+92 3224787839)', ur: 'واٹس ایپ پر فوری رابطہ کریں (+92 3224787839)' },
  chatTypicalResponse: { en: 'Local delivery across Pakistan & worldwide remote', ur: 'پاکستان بھر میں لوکل اور عالمی ریموٹ سروس' },
  chatQuickPrompts: { en: 'Quick Queries', ur: 'فوری سوالات' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isUrdu: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('techmate_language') as Language;
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('techmate_language', lang);
      document.documentElement.lang = lang;
      if (lang === 'ur') {
        document.documentElement.setAttribute('dir', 'ltr'); // Keep layout clean modern LTR with RTL typography accents
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ur' : 'en';
    setLanguage(nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    if (TRANSLATIONS[key]) {
      return TRANSLATIONS[key][language] || TRANSLATIONS[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isUrdu: language === 'ur',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
