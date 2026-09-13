import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, Search, Sparkles, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FaqItem {
  id: string;
  category: 'pricing' | 'tech' | 'process' | 'general';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'pricing',
    categoryLabel: 'Pricing & PKR Estimates',
    question: 'What are your standard project budget brackets in Pakistani Rupees (PKR)?',
    answer: 'We operate on transparent, deliverable-driven milestones tailored to Pakistani startups and global enterprises alike. Project pricing is structured around technical complexity:',
    highlights: [
      'Discovery & Rapid MVP: PKR 50,000 – PKR 150,000 (3 to 5 weeks delivery)',
      'Custom Web & Mobile Platforms: PKR 150,000 – PKR 400,000 (8 to 12 weeks)',
      'High-Scale SaaS & Enterprise Infrastructure: PKR 400,000 – PKR 1,000,000+',
      'Standard Milestone Payment: 30% kickoff, 40% beta staging review, 30% production deployment',
    ],
  },
  {
    id: 'faq-2',
    category: 'pricing',
    categoryLabel: 'Pricing & PKR Estimates',
    question: 'What payment channels do you support for Pakistani and overseas clients?',
    answer: 'We provide seamless, tax-compliant invoicing. For local Pakistani companies, we accept direct corporate bank transfers (IBAN), Raast instant settlement, and digital accounts. For international partners, we accept wire transfers via SWIFT, Wise, and Payoneer.',
    highlights: [
      'Direct Pakistani Corporate Bank Transfer (FBR NTN compliant tax invoices)',
      'Instant settlement via Raast & digital corporate banking',
      'Multi-currency SWIFT & Wise wire transfer for overseas founders',
    ],
  },
  {
    id: 'faq-3',
    category: 'tech',
    categoryLabel: 'Tech & IP Ownership',
    question: 'Do we own 100% of the source code, repositories, and intellectual property?',
    answer: 'Yes, unconditionally. TECHMATE provides complete intellectual property assignment upon milestone completion. All source code, Git repositories, Figma design files, cloud deployment keys, and documentation are transferred to your organization under a strict bilateral NDA.',
    highlights: [
      'Full IP transfer clause signed before kickoff',
      'Direct access to private GitHub / GitLab repositories throughout sprints',
      'Zero vendor lock-in; clean architecture that any senior engineer can maintain',
    ],
  },
  {
    id: 'faq-4',
    category: 'process',
    categoryLabel: 'Process & Timelines',
    question: 'How does TECHMATE structure agile sprints and communicate progress?',
    answer: 'We operate with high-transparency Agile Scrum cycles. You receive a dedicated Slack or WhatsApp channel with the engineering lead, bi-weekly clickable staging deployments, and live task boards in Linear or Jira.',
    highlights: [
      'Direct access to senior developers and software architects',
      'Bi-weekly live staging previews on cloud URLs',
      'Transparent sprint planning and daily standup recaps',
    ],
  },
  {
    id: 'faq-5',
    category: 'tech',
    categoryLabel: 'Tech & IP Ownership',
    question: 'Which modern technology stacks do your engineering teams specialize in?',
    answer: 'We specialize in modern, battle-tested software ecosystems. Frontend: React, Next.js, TypeScript, Tailwind CSS. Mobile: Flutter, React Native, iOS/Android. Backend & Cloud: Node.js, Python, PostgreSQL, Firebase, Google Cloud Platform (GCP), and Docker containers.',
    highlights: [
      'Production-grade TypeScript across frontend and backend',
      'Sub-second API response architectures with PostgreSQL and Redis',
      'Native-feel mobile apps built with Flutter and React Native',
    ],
  },
  {
    id: 'faq-6',
    category: 'process',
    categoryLabel: 'Process & Timelines',
    question: 'Do you provide post-launch maintenance and technical SLA support in Pakistan?',
    answer: 'Every project built by TECHMATE includes a complimentary 30-day post-launch warranty period covering any bug fixes, security validations, and optimization. We also offer ongoing monthly SLA maintenance packages starting at PKR 15,000/month.',
    highlights: [
      '30-Day complimentary bug-free deployment guarantee',
      'Server health monitoring, database backups, and security patching',
      'On-demand feature roadmap development and scaling sprints',
    ],
  },
  {
    id: 'faq-7',
    category: 'general',
    categoryLabel: 'General & Engagement',
    question: 'Can you provide dedicated remote engineers or staff augmentation?',
    answer: 'Yes. Beyond fixed-scope projects, TECHMATE provides dedicated full-time engineering pods. Whether you need a senior Next.js specialist, a Flutter mobile developer, or a Python AI engineer, our vetted Pakistani engineers work in your timezone.',
    highlights: [
      'Vetted Senior Engineers (Top 3% technical assessments)',
      'Flexible month-to-month contracts with 2-week risk-free trial',
      'Seamless integration into your internal Jira and GitHub workflows',
    ],
  },
  {
    id: 'faq-8',
    category: 'general',
    categoryLabel: 'General & Engagement',
    question: 'Where is TECHMATE located and can we meet in person in Pakistan?',
    answer: 'TECHMATE is headquartered in Pakistan with core engineering hubs across Lahore, Islamabad, and Karachi. We routinely host discovery sessions and technical roadmap reviews in person for corporate clients and founders across Pakistan.',
    highlights: [
      'Executive in-person consultation available in Lahore, Islamabad, and Karachi',
      'Hybrid delivery model with seamless Google Meet / Zoom discovery workshops',
      'Global delivery capability with clients in North America, GCC, and Europe',
    ],
  },
];

interface FaqSectionProps {
  onAskQuestion?: (customQuestion?: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onAskQuestion }) => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<string[]>(['faq-1']);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setOpenItems(FAQ_ITEMS.map((item) => item.id));
  };

  const collapseAll = () => {
    setOpenItems([]);
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'pricing', label: 'Pricing & PKR' },
    { id: 'tech', label: 'Tech & IP' },
    { id: 'process', label: 'Process & Timelines' },
    { id: 'general', label: 'General & Team' },
  ];

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const matchesText =
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        (item.highlights && item.highlights.some((h) => h.toLowerCase().includes(query)));

      return matchesCat && matchesText;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#0B1D3A] border-b border-white/5 relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1E63F3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('faqBadge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 font-['Poppins']">
            {t('faqTitle')}
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            {t('faqSubtitle')}
          </p>
        </div>

        {/* Search Bar & Category Tabs */}
        <div className="mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search topics (e.g., PKR pricing, source code, Flutter, SLA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#112B5F]/40 border border-white/10 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#4DA8FF] focus:bg-[#112B5F]/60 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded-md hover:bg-white/10"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1E63F3] text-white shadow-md shadow-blue-500/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <button
                type="button"
                onClick={expandAll}
                className="hover:text-[#4DA8FF] transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={collapseAll}
                className="hover:text-[#4DA8FF] transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-[#112B5F]/20 rounded-2xl border border-white/10 p-8">
              <HelpCircle className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <p className="text-white font-semibold">No questions found matching &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for keywords like &ldquo;PKR&rdquo;, &ldquo;IP&rdquo;, or &ldquo;React&rdquo;.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-[#4DA8FF] bg-white/5 hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = openItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-[#112B5F]/60 border-[#4DA8FF]/40 shadow-xl'
                      : 'bg-[#112B5F]/30 border-white/10 hover:border-white/20 hover:bg-[#112B5F]/40'
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                          isOpen ? 'bg-[#4DA8FF] shadow-[0_0_8px_#4DA8FF]' : 'bg-slate-500'
                        }`}
                      />
                      <span className="text-sm sm:text-base font-semibold text-white font-['Poppins']">
                        {item.question}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        isOpen
                          ? 'bg-[#1E63F3] text-white border-white/20 rotate-180'
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 space-y-4 animate-in fade-in-50 duration-200">
                      <p>{item.answer}</p>

                      {item.highlights && item.highlights.length > 0 && (
                        <div className="space-y-2 bg-[#0B1D3A]/70 p-4 rounded-xl border border-white/5">
                          {item.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                              <CheckCircle2 className="w-4 h-4 text-[#4DA8FF] shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          Topic: {item.categoryLabel}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onAskQuestion) {
                              onAskQuestion(`Question regarding: ${item.question}`);
                            } else {
                              const contactEl = document.getElementById('contact');
                              if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="text-xs font-semibold text-[#4DA8FF] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Ask More About This</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 bg-gradient-to-r from-[#112B5F] to-[#0B1D3A] rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-[#4DA8FF] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Have an Unanswered Question?</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white font-['Poppins']">
              Talk directly with a TECHMATE Technical Architect
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              We provide no-obligation technical scoping, architecture blueprints, and PKR estimates within 24 hours.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onAskQuestion) {
                onAskQuestion('General Inquiry & Project Scoping');
              } else {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] hover:from-[#112B5F] hover:to-[#1E63F3] rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consult an Engineer</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
