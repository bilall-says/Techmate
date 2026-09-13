import React, { useState, useMemo } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Clock, Sparkles, AlertCircle, ShieldCheck, Check, HelpCircle } from 'lucide-react';
import { ContactFormData } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  preselectedService?: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService }) => {
  const { t, isUrdu } = useLanguage();

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    projectType: preselectedService || 'Custom Software Development',
    projectBudget: 'PKR 150,000 - PKR 400,000',
    message: '',
    requestNda: false,
  });

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const projectTypes = [
    'Custom Software Development',
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Cloud Solutions',
    'AI & Smart Solutions',
    'Other Technology Needs',
  ];

  const budgetRanges = [
    '< PKR 50,000 (Discovery / MVP)',
    'PKR 50,000 - PKR 150,000',
    'PKR 150,000 - PKR 400,000',
    'PKR 400,000 - PKR 1,000,000',
    'PKR 1,000,000+ (Enterprise Architecture)',
  ];

  // Validation Engine
  const errors = useMemo<FormErrors>(() => {
    const errs: FormErrors = {};

    // 1. Full Name
    const nameTrimmed = formData.fullName.trim();
    if (!nameTrimmed) {
      errs.fullName = isUrdu ? 'براہ کرم اپنا مکمل نام درج کریں۔' : 'Full name is required.';
    } else if (nameTrimmed.length < 3) {
      errs.fullName = isUrdu ? 'نام کم از کم 3 حروف پر مشتمل ہونا چاہیے۔' : 'Full name must be at least 3 characters.';
    } else if (!/^[a-zA-Z\u0600-\u06FF\s.'-]+$/.test(nameTrimmed)) {
      errs.fullName = isUrdu ? 'براہ کرم درست نام درج کریں۔' : 'Name should contain valid alphabetic characters.';
    }

    // 2. Email Address
    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailTrimmed) {
      errs.email = isUrdu ? 'ای میل ایڈریس درکار ہے۔' : 'Email address is required.';
    } else if (!emailRegex.test(emailTrimmed)) {
      errs.email = isUrdu ? 'درست ای میل پتہ درج کریں (مثال: name@company.com)' : 'Please enter a valid email address (e.g. name@company.com).';
    }

    // 3. Phone Number (Optional, but strictly validated if provided)
    const phoneTrimmed = (formData.phone || '').trim();
    if (phoneTrimmed) {
      // Pakistani formats: 0322 4787839, +92 3224787839, or international +1...
      const phoneRegex = /^(\+92|0)?\s?3[0-9]{2}[\s-]?[0-9]{7}$|^\+?[0-9\s-]{8,20}$/;
      if (!phoneRegex.test(phoneTrimmed)) {
        errs.phone = isUrdu
          ? 'درست فون نمبر درج کریں (مثال: +92 3224787839 یا 0322 4787839)'
          : 'Please enter a valid phone number (e.g. +92 3224787839 or 0322 4787839).';
      }
    }

    // 4. Message
    const msgTrimmed = formData.message.trim();
    if (!msgTrimmed) {
      errs.message = isUrdu ? 'منصوبے کی تفصیلات درکار ہیں۔' : 'Please provide a brief description of your project requirements.';
    } else if (msgTrimmed.length < 20) {
      errs.message = isUrdu
        ? `براہ کرم کم از کم 20 حروف لکھیں (ابھی ${msgTrimmed.length} حروف ہیں)`
        : `Please write at least 20 characters (${msgTrimmed.length}/20 currently).`;
    } else if (msgTrimmed.length > 1000) {
      errs.message = isUrdu ? 'پیغام 1000 حروف سے زیادہ نہیں ہو سکتا۔' : 'Message cannot exceed 1,000 characters.';
    }

    return errs;
  }, [formData, isUrdu]);

  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      message: true,
    });

    if (!isValid) {
      // Find first error field and scroll/focus
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate enterprise backend transmission with random tracking ID
    setTimeout(() => {
      const generatedId = `TM-PK-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmissionId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const isFieldInvalid = (field: keyof FormErrors) => {
    return (touched[field] || submitAttempted) && Boolean(errors[field]);
  };

  const isFieldValid = (field: keyof FormErrors, value: string) => {
    return (touched[field] || submitAttempted) && !errors[field] && value.trim().length > 0;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0B1D3A] border-b border-white/5 relative">
      {/* Background Decorative Radial */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#1E63F3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('contactBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 font-['Poppins']">
            {t('contactTitle')}
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details & SLA Guarantee */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#112B5F]/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl space-y-6 text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Poppins']">
                    TECHMATE Headquarters
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Software Engineering &amp; Technology House</p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Accepting Projects</span>
                </div>
              </div>

              <p className="text-sm text-white/70 leading-relaxed font-normal">
                Our Pakistani engineering hubs collaborate with founders and enterprises across Islamabad, Lahore, Karachi, and overseas partners in North America, GCC, and Europe.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[#4DA8FF] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Direct Inquiries</div>
                    <a
                      href="mailto:sheikhbilal04888@gmail.com"
                      className="text-base font-semibold text-white hover:text-[#4DA8FF] transition-colors"
                    >
                      sheikhbilal04888@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[#4DA8FF] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Locations</div>
                    <div className="text-base font-semibold text-white">
                      Pakistan <span className="text-xs text-[#4DA8FF] font-normal">(Lahore • Islamabad • Karachi)</span>
                    </div>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-[#4DA8FF] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Direct Phone / WhatsApp</div>
                    <a
                      href="tel:+923224787839"
                      className="text-base font-semibold text-white hover:text-[#4DA8FF] transition-colors"
                    >
                      +92 3224787839
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Commitment Card */}
            <div className="bg-[#0B1D3A]/90 text-white rounded-2xl p-7 shadow-md border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#4DA8FF]" />
                <span className="text-sm font-bold font-['Poppins']">24-Hour Technical Review SLA</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All submitted briefs undergo architecture feasibility reviews by a senior software engineer. We provide milestone timelines and PKR cost breakdowns within 24 business hours.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#4DA8FF]">
                <ShieldCheck className="w-4 h-4" />
                <span>Strict bilateral NDA upon request</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Real-Time Validation */}
          <div className="lg:col-span-7">
            <div className="bg-[#112B5F]/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl text-white">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#4DA8FF]">
                      <span>Ref ID:</span>
                      <strong className="text-white">{submissionId}</strong>
                    </div>

                    <h3 className="text-2xl font-bold text-white font-['Poppins']">
                      Project Brief Successfully Received!
                    </h3>

                    <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. A technical lead from TECHMATE will review your requirements for <span className="text-[#4DA8FF] font-semibold">{formData.projectType}</span> and respond to <span className="text-white font-semibold">{formData.email}</span> within 24 hours.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#0B1D3A]/80 rounded-2xl p-5 border border-white/5 text-left max-w-md mx-auto text-xs space-y-2 text-slate-300">
                    <div className="flex justify-between pb-1 border-b border-white/5">
                      <span className="text-slate-400">Budget Bracket:</span>
                      <span className="font-semibold text-white">{formData.projectBudget}</span>
                    </div>
                    {formData.companyName && (
                      <div className="flex justify-between pb-1 border-b border-white/5">
                        <span className="text-slate-400">Company:</span>
                        <span className="font-semibold text-white">{formData.companyName}</span>
                      </div>
                    )}
                    {formData.phone && (
                      <div className="flex justify-between pb-1 border-b border-white/5">
                        <span className="text-slate-400">Phone:</span>
                        <span className="font-semibold text-white">{formData.phone}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Confidentiality:</span>
                      <span className="font-semibold text-emerald-400">
                        {formData.requestNda ? 'NDA Required Prior To Call' : 'Standard Mutual Confidentiality'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmitAttempted(false);
                      setTouched({});
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        projectType: 'Custom Software Development',
                        projectBudget: 'PKR 150,000 - PKR 400,000',
                        message: '',
                        requestNda: false,
                      });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#4DA8FF] bg-white/5 hover:bg-[#1E63F3] hover:text-white rounded-xl border border-white/10 transition-colors cursor-pointer"
                  >
                    Send Another Project Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Top Submit Warning If Has Errors */}
                  {submitAttempted && !isValid && (
                    <div className="p-4 bg-red-950/40 text-red-300 text-xs font-medium rounded-2xl flex items-center gap-2.5 border border-red-500/40 animate-in fade-in-50 duration-200">
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                      <span>Please correct the highlighted fields below to submit your project brief.</span>
                    </div>
                  )}

                  {/* 1. Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="field-fullName"
                          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                        >
                          {t('contactFullName')} <span className="text-[#4DA8FF]">*</span>
                        </label>
                        {isFieldValid('fullName', formData.fullName) && (
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                            <Check className="w-3.5 h-3.5" /> Valid
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          id="field-fullName"
                          type="text"
                          autoComplete="name"
                          placeholder={isUrdu ? 'مثال: ریحان احمد' : 'e.g. Rehan Ahmad'}
                          value={formData.fullName}
                          onBlur={() => handleBlur('fullName')}
                          onChange={(e) => {
                            setFormData({ ...formData, fullName: e.target.value });
                          }}
                          className={`w-full px-4 py-3 rounded-xl border text-white text-sm focus:outline-none transition-all placeholder:text-slate-500 ${
                            isFieldInvalid('fullName')
                              ? 'bg-red-950/20 border-red-500/60 focus:border-red-400'
                              : isFieldValid('fullName', formData.fullName)
                              ? 'bg-[#0B1D3A]/80 border-emerald-500/40 focus:border-emerald-400'
                              : 'bg-[#0B1D3A]/80 border-white/10 focus:border-[#4DA8FF]'
                          }`}
                        />
                      </div>

                      {isFieldInvalid('fullName') && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="field-email"
                          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                        >
                          {t('contactEmail')} <span className="text-[#4DA8FF]">*</span>
                        </label>
                        {isFieldValid('email', formData.email) && (
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                            <Check className="w-3.5 h-3.5" /> Valid
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          id="field-email"
                          type="email"
                          autoComplete="email"
                          placeholder="rehan@company.com"
                          value={formData.email}
                          onBlur={() => handleBlur('email')}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                          }}
                          className={`w-full px-4 py-3 rounded-xl border text-white text-sm focus:outline-none transition-all placeholder:text-slate-500 ${
                            isFieldInvalid('email')
                              ? 'bg-red-950/20 border-red-500/60 focus:border-red-400'
                              : isFieldValid('email', formData.email)
                              ? 'bg-[#0B1D3A]/80 border-emerald-500/40 focus:border-emerald-400'
                              : 'bg-[#0B1D3A]/80 border-white/10 focus:border-[#4DA8FF]'
                          }`}
                        />
                      </div>

                      {isFieldInvalid('email') && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 2. Phone / WhatsApp & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="field-phone"
                          className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                        >
                          {t('contactPhone')}
                        </label>
                        {formData.phone && isFieldValid('phone', formData.phone) && (
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                            <Check className="w-3.5 h-3.5" /> Valid
                          </span>
                        )}
                      </div>

                      <input
                        id="field-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+92 3224787839"
                        value={formData.phone || ''}
                        onBlur={() => handleBlur('phone')}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-white text-sm focus:outline-none transition-all placeholder:text-slate-500 ${
                          isFieldInvalid('phone')
                            ? 'bg-red-950/20 border-red-500/60 focus:border-red-400'
                            : formData.phone && isFieldValid('phone', formData.phone)
                            ? 'bg-[#0B1D3A]/80 border-emerald-500/40 focus:border-emerald-400'
                            : 'bg-[#0B1D3A]/80 border-white/10 focus:border-[#4DA8FF]'
                        }`}
                      />

                      {isFieldInvalid('phone') && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label
                        htmlFor="field-companyName"
                        className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2"
                      >
                        {t('contactCompany')}
                      </label>
                      <input
                        id="field-companyName"
                        type="text"
                        autoComplete="organization"
                        placeholder="Organization or Venture"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0B1D3A]/80 border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#4DA8FF] transition-all"
                      />
                    </div>
                  </div>

                  {/* 3. Project Type & Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        {t('contactProjectType')}
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0B1D3A]/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#4DA8FF] transition-all cursor-pointer"
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#0B1D3A] text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        {t('contactBudget')}
                      </label>
                      <select
                        value={formData.projectBudget}
                        onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0B1D3A]/80 border border-white/10 text-white text-sm focus:outline-none focus:border-[#4DA8FF] transition-all cursor-pointer font-medium"
                      >
                        {budgetRanges.map((b) => (
                          <option key={b} value={b} className="bg-[#0B1D3A] text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 4. Message Description with Character Counter */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="field-message"
                        className="block text-xs font-semibold text-slate-300 uppercase tracking-wider"
                      >
                        {t('contactMessage')} <span className="text-[#4DA8FF]">*</span>
                      </label>
                      <span
                        className={`text-[11px] font-mono ${
                          formData.message.trim().length >= 20
                            ? 'text-emerald-400'
                            : formData.message.trim().length > 0
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {formData.message.trim().length} / 1000 characters
                        {formData.message.trim().length > 0 && formData.message.trim().length < 20 && (
                          <span className="ml-1 text-slate-400">(min. 20)</span>
                        )}
                      </span>
                    </div>

                    <textarea
                      id="field-message"
                      rows={4}
                      placeholder={
                        isUrdu
                          ? 'براہ کرم اپنے پراجیکٹ کا بنیادی خاکہ، متوقع ڈیلیوری اور ضروریات بیان کریں...'
                          : 'Describe your application vision, core technical requirements, expected launch timeline, and business objectives...'
                      }
                      value={formData.message}
                      onBlur={() => handleBlur('message')}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-white text-sm focus:outline-none transition-all placeholder:text-slate-500 resize-y leading-relaxed ${
                        isFieldInvalid('message')
                          ? 'bg-red-950/20 border-red-500/60 focus:border-red-400'
                          : isFieldValid('message', formData.message)
                          ? 'bg-[#0B1D3A]/80 border-emerald-500/40 focus:border-emerald-400'
                          : 'bg-[#0B1D3A]/80 border-white/10 focus:border-[#4DA8FF]'
                      }`}
                    />

                    {isFieldInvalid('message') && (
                      <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* 5. Mutual Non-Disclosure Agreement (NDA) Checkbox */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.requestNda)}
                      onChange={(e) => setFormData({ ...formData, requestNda: e.target.checked })}
                      className="mt-0.5 rounded border-white/20 bg-[#0B1D3A] text-[#1E63F3] focus:ring-[#4DA8FF] w-4 h-4 cursor-pointer"
                    />
                    <div className="text-xs text-slate-300 leading-normal">
                      <span className="font-semibold text-white block mb-0.5">Enterprise NDA Protection</span>
                      <span>{t('contactNda')}</span>
                    </div>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-[#112B5F] opacity-75 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] hover:from-[#112B5F] hover:to-[#1E63F3] hover:shadow-[0_0_25px_rgba(30,99,243,0.5)] active:scale-[0.99]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t('contactSubmitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t('contactSubmit')}</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4DA8FF]" />
                      <span>Zero Spam • Encrypted Communication • Direct Technical Architect Access</span>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
