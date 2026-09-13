import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import ServicesSection from './components/ServicesSection';
import WhyTechmateSection from './components/WhyTechmateSection';
import FeaturedProjectsSection from './components/FeaturedProjectsSection';
import ProcessSection from './components/ProcessSection';
import TechnologySection from './components/TechnologySection';
import BrandStatementSection from './components/BrandStatementSection';
import TestimonialSection from './components/TestimonialSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BrandModal from './components/BrandModal';
import ProjectDetailModal from './components/ProjectDetailModal';
import ChatWidget from './components/ChatWidget';
import { ProjectItem } from './types';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [contactService, setContactService] = useState<string>('Custom Software Development');

  const scrollToContact = (serviceName?: string) => {
    if (serviceName) {
      setContactService(serviceName);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0B1D3A] text-white font-['Poppins'] flex flex-col selection:bg-[#1E63F3] selection:text-white relative">
        {/* Dynamic Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Enhanced Interactive Cursor Aura & Physics Follower */}
        <CustomCursor />

        {/* 1. Navigation Bar with Language Switcher */}
        <Navbar
          onOpenBrandKit={() => setIsBrandModalOpen(true)}
          onNavigateContact={() => scrollToContact()}
        />

        <main className="flex-1">
          {/* 2. Hero Section */}
          <HeroSection
            onStartProject={() => scrollToContact()}
            onExploreWork={scrollToProjects}
          />

          {/* 3. Trust / Introduction Section */}
          <TrustSection />

          {/* 4. Services Section (What We Build) */}
          <ServicesSection
            onSelectService={(serviceTitle) => scrollToContact(serviceTitle)}
          />

          {/* 5. Why TECHMATE Section */}
          <WhyTechmateSection />

          {/* 6. Featured Projects Section */}
          <FeaturedProjectsSection
            onSelectProject={(project) => setSelectedProject(project)}
          />

          {/* 7. Process Section (From Idea to Digital Reality) */}
          <ProcessSection />

          {/* 8. Technology Section (Built With Modern Technology) */}
          <TechnologySection />

          {/* 9. Brand Statement Section (Turning Ideas Into Digital Reality) */}
          <BrandStatementSection
            onStartProject={() => scrollToContact()}
          />

          {/* 10. Testimonial Section */}
          <TestimonialSection />

          {/* 11. Frequently Asked Questions (Accordion) */}
          <FaqSection
            onAskQuestion={(customQuestion) => scrollToContact(customQuestion)}
          />

          {/* 12. Call to Action (Have an Idea?) */}
          <CtaSection
            onStartProject={() => scrollToContact()}
          />

          {/* 13. Contact Section (Let's Build Something Great) with Enhanced Real-Time Validation */}
          <ContactSection
            preselectedService={contactService}
          />
        </main>

        {/* 14. Footer */}
        <Footer
          onOpenBrandKit={() => setIsBrandModalOpen(true)}
        />

        {/* Brand Identity Guidelines Modal */}
        <BrandModal
          isOpen={isBrandModalOpen}
          onClose={() => setIsBrandModalOpen(false)}
        />

        {/* Project Details Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStartSimilar={(title) => scrollToContact(`Custom solution similar to ${title}`)}
        />

        {/* Real-time Sales & Support Chat Widget */}
        <ChatWidget onOpenContactForm={scrollToContact} />
      </div>
    </LanguageProvider>
  );
}
