/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  loadPortfolioData,
  savePortfolioData,
  resetPortfolioData,
} from './data/portfolioData';
import { PortfolioData, Project } from './types/portfolio';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { AcademicInterests } from './components/sections/AcademicInterests';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { LearningResearch } from './components/sections/LearningResearch';
import { Achievements } from './components/sections/Achievements';
import { Skills } from './components/sections/Skills';
import { Timeline } from './components/sections/Timeline';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/footer/Footer';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { ResumeModal } from './components/modals/ResumeModal';
import { CustomizerDrawer } from './components/customizer/CustomizerDrawer';
import { SlidersHorizontal } from 'lucide-react';

function PortfolioApp() {
  const [data, setData] = useState<PortfolioData>(() => loadPortfolioData());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [showNotificationRibbon, setShowNotificationRibbon] = useState(true);

  // Sync title with student name
  useEffect(() => {
    if (data.profile.name) {
      document.title = `${data.profile.name} · Academic Portfolio | Curiosity into Contribution`;
    }
  }, [data.profile.name]);

  const handleSaveData = (updated: PortfolioData) => {
    setData(updated);
    savePortfolioData(updated);
  };

  const handleResetData = () => {
    const reset = resetPortfolioData();
    setData(reset);
  };

  const handleSelectProjectById = (projectId: string) => {
    const found = data.projects.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--accent-gold)]/25 selection:text-[var(--text-primary)] transition-colors">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--accent-navy)] focus:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)]"
      >
        Skip to main content
      </a>

      {/* Understated Academic Context Ribbon */}
      {showNotificationRibbon && (
        <aside
          aria-label="Portfolio Notice"
          className="bg-[var(--accent-navy)] text-white/90 text-xs px-4 py-2 border-b border-[var(--accent-gold)]/30 flex items-center justify-between no-print transition-colors"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[11px] truncate">
              <span className="text-[var(--accent-gold)] font-semibold">ACADEMIC DOSSIER:</span>
              <span className="text-white/80 truncate">
                University Admissions Portfolio · Part 1 of 2: Intellectual Identity, Research & Projects
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent-gold)] hover:text-white underline underline-offset-2 transition-colors"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>Personalize Placeholders</span>
              </button>
              <button
                type="button"
                onClick={() => setShowNotificationRibbon(false)}
                aria-label="Dismiss notice"
                className="text-white/50 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Sticky Navigation Bar with Theme Toggle */}
      <Navbar
        profile={data.profile}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Main Page Landmark */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero
          profile={data.profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Section 01: Statement of Orientation / About */}
        <About about={data.about} />

        {/* Section 02: Intellectual Horizons / Academic Interests */}
        <AcademicInterests
          interests={data.academicInterests}
          onSelectProject={handleSelectProjectById}
        />

        {/* Section 03: Selected Artifacts / Featured Projects */}
        <FeaturedProjects
          projects={data.projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Section 04: Scholarly Inquiry / Learning & Research */}
        <LearningResearch inquiries={data.researchInquiries} />

        {/* Section 05: Verified Record / Achievements */}
        <Achievements
          achievements={data.achievements}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Section 06: Methodological Apparatus / Skills */}
        <Skills skillCategories={data.skills} />

        {/* Section 07: Development Timeline */}
        <Timeline timeline={data.timeline} />

        {/* Section 08: Correspondence / Contact */}
        <Contact profile={data.profile} />
      </main>

      {/* Footer */}
      <Footer profile={data.profile} />

      {/* Interactive Detail Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        data={data}
      />

      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        data={data}
        onSaveData={handleSaveData}
        onResetData={handleResetData}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
