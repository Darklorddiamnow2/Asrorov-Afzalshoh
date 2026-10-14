import React from 'react';
import { motion } from 'motion/react';
import { AboutContent } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';

interface AboutProps {
  about: AboutContent;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  return (
    <section id="about" className="scroll-mt-24 py-20 border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  01. STATEMENT OF ORIENTATION
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                About My Intellectual Development
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              Philosophy · Approach · Aims
            </span>
          </div>
        </ScrollReveal>

        {/* Narrative Grid: Two-column intellectual statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7 space-y-6 text-[var(--text-primary)] text-base sm:text-lg leading-relaxed font-sans">
            {about.biography.map((paragraph, index) => (
              <ScrollReveal key={index} delay={index * 0.12} distance={20}>
                <p
                  className={index === 0 ? 'first-letter:text-5xl first-letter:font-serif first-letter:text-[var(--text-primary)] first-letter:mr-2.5 first-letter:float-left first-letter:leading-none' : ''}
                >
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-8 border-l border-[var(--border-subtle)] lg:pl-10">
            <ScrollReveal delay={0.2} direction="left">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] mb-3 font-semibold">
                  Approach to Learning
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  {about.intellectualApproach}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="left">
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] mb-3 font-semibold">
                  University Objectives
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                  {about.universityAspirations}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="left">
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] mb-3 font-semibold">
                  Independent Inquiry Standard
                </h3>
                <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed italic">
                  Independent projects are treated not as extracurricular embellishments, but as self-assigned laboratory problems subject to peer-style critique, version control, and reproducible writeups.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Intellectual Pillars / Principles */}
        <div>
          <ScrollReveal>
            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                Guiding Principles of Inquiry
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'var(--accent-gold)' }}
                  transition={{ duration: 0.2 }}
                  className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between h-full transition-colors shadow-xs"
                >
                  <div>
                    <span className="text-xs font-mono text-[var(--accent-gold)] mb-2 block tabular-nums font-semibold">
                      0{index + 1}
                    </span>
                    <h4 className="font-serif text-lg font-medium text-[var(--text-primary)] mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wide mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
