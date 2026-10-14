import React from 'react';
import { ArrowDownRight, FileText, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/portfolio';
import { AcademicPortrait } from '../visuals/AcademicPortrait';
import { ScrollReveal } from '../common/ScrollReveal';

interface HeroProps {
  profile: StudentProfile;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume, onOpenCustomizer }) => {
  const handleScrollToProjects = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const el = document.getElementById('projects');
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.classList.add('outline-2', 'outline-[var(--accent-gold)]', 'transition-all');
      setTimeout(() => {
        el.classList.remove('outline-2', 'outline-[var(--accent-gold)]');
      }, 1600);
      try {
        window.history.pushState(null, '', '#projects');
      } catch {
        // ignore
      }
    } else {
      window.location.hash = 'projects';
    }
  };

  return (
    <section className="relative pt-12 pb-20 border-b border-[var(--border-subtle)] overflow-hidden transition-colors">
      {/* Subtle background ambient line */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-[var(--border-subtle)]/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Split Screen Hero: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal direction="down" distance={16} delay={0.05}>
              {/* Small Kicker Label */}
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-6 bg-[var(--accent-gold)]" />
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  {profile.kicker || 'PERSONAL ACADEMIC PORTFOLIO'}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal distance={16} delay={0.1}>
              {/* Candidate Sub-identifier */}
              <div className="mb-4">
                <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wide">
                  {profile.applicantStatus}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal distance={20} delay={0.15}>
              {/* Dominant Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--text-primary)] leading-[1.08] mb-6 text-balance">
                {profile.headline || 'Curiosity into Contribution.'}
              </h1>
            </ScrollReveal>

            <ScrollReveal distance={20} delay={0.2}>
              {/* Lead Introductory Paragraph */}
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-sans mb-5 max-w-2xl">
                {profile.leadBio}
              </p>

              {profile.secondaryBio && (
                <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans mb-8 max-w-2xl">
                  {profile.secondaryBio}
                </p>
              )}
            </ScrollReveal>

            {/* Action Buttons */}
            <ScrollReveal distance={20} delay={0.25}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href="#projects"
                  id="hero-explore-work-btn"
                  onClick={handleScrollToProjects}
                  className="cursor-pointer select-none inline-flex items-center gap-2.5 px-6 py-3.5 bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] text-white text-xs font-medium uppercase tracking-wider transition-all shadow-xs group focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
                >
                  <span>Explore My Work</span>
                  <ArrowDownRight className="w-4 h-4 text-[var(--accent-gold)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  id="hero-view-resume-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenResume();
                  }}
                  className="cursor-pointer select-none inline-flex items-center gap-2.5 px-6 py-3.5 bg-transparent hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] text-xs font-medium uppercase tracking-wider transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
                >
                  <FileText className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>View Resume</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={onOpenCustomizer}
                  className="cursor-pointer text-xs font-mono text-[var(--text-muted)] hover:text-[var(--accent-gold)] underline underline-offset-4 transition-colors py-2"
                >
                  Edit candidate placeholders
                </motion.button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Academic Portrait / Typographic Insignia */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ScrollReveal direction="left" distance={28} delay={0.2} className="w-full max-w-md">
              <AcademicPortrait profile={profile} />
            </ScrollReveal>
          </div>
        </div>

        {/* Full-width Proof / Orientation Strip below the split */}
        <ScrollReveal distance={20} delay={0.3}>
          <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)]/50">
              <span className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Primary Focus
              </span>
              <span className="font-serif text-lg text-[var(--text-primary)] font-medium mt-1 block">
                Computational & Quantitative
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)]/50">
              <span className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Methodology
              </span>
              <span className="font-serif text-lg text-[var(--text-primary)] font-medium mt-1 block">
                Formal Modeling & Simulation
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)]/50">
              <span className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Inquiry Dossiers
              </span>
              <span className="font-serif text-lg text-[var(--text-primary)] font-medium mt-1 block tabular-nums">
                3 Disciplines · 2 Explorations
              </span>
            </div>

            <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)]/50">
              <span className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                Admissions Target
              </span>
              <span className="font-serif text-lg text-[var(--text-primary)] font-medium mt-1 block">
                Fall 2026 Undergraduate
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
