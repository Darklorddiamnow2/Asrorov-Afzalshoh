import React from 'react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/portfolio';

interface AcademicPortraitProps {
  profile: StudentProfile;
  className?: string;
}

export const AcademicPortrait: React.FC<AcademicPortraitProps> = ({ profile, className = '' }) => {
  if (profile.portraitType === 'image' && profile.portraitImageUrl) {
    return (
      <div className={`relative group ${className}`}>
        {/* Subtle decorative gold framing corners */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--accent-gold)]" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--accent-gold)]" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--accent-gold)]" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--accent-gold)]" />

        <div className="overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] aspect-[3/4] shadow-sm">
          <img
            src={profile.portraitImageUrl}
            alt={`Academic portrait of ${profile.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs font-mono tracking-wider text-[var(--text-muted)] uppercase">
            {profile.name} · {profile.applicantStatus.split('·')[0].trim()}
          </p>
        </div>
      </div>
    );
  }

  // Refined Typographic Academic Archival Composition
  return (
    <div className={`relative ${className}`}>
      {/* Editorial framing accents */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[var(--accent-gold)]" />
      <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-[var(--accent-gold)]" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-[var(--accent-gold)]" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[var(--accent-gold)]" />

      <div className="aspect-[3/4] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 flex flex-col justify-between relative overflow-hidden shadow-sm transition-colors">
        {/* Subtle geometric background watermark lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="archival-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#archival-grid)" />
          </svg>
        </div>

        {/* Top Header of Plate */}
        <div className="relative z-10 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 text-[11px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
          <span>PORTFOLIO FOLIO</span>
          <span className="text-[var(--accent-gold)] font-medium">ANNO MMXXVI</span>
        </div>

        {/* Center Monogram Insignia with subtle motion hover */}
        <div className="relative z-10 my-auto text-center flex flex-col items-center">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-28 h-28 rounded-full border border-[var(--accent-gold)]/40 flex items-center justify-center p-2 mb-4 bg-[var(--bg-surface-elevated)] cursor-pointer"
          >
            {/* Concentric subtle hairline circles */}
            <div className="absolute inset-1 rounded-full border border-dashed border-[var(--accent-gold)]/30" />
            <div className="absolute inset-3 rounded-full border border-[var(--border-subtle)]" />
            <span className="font-serif text-3xl font-semibold tracking-wider text-[var(--text-primary)]">
              {profile.monogram || 'AA'}
            </span>
          </motion.div>

          <h4 className="font-serif text-xl tracking-tight text-[var(--text-primary)] font-medium">
            {profile.name || 'Afzalshoh Asrorov'}
          </h4>
          <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-[220px] font-sans">
            Independent Research & Theoretical Inquiry
          </p>
          <div className="h-px w-10 bg-[var(--accent-gold)] mt-3 mb-2" />
          <span className="text-[10px] font-mono text-[var(--accent-gold)] tracking-wider uppercase">
            Curiosity · Rigor · Contribution
          </span>
        </div>

        {/* Plate Footer */}
        <div className="relative z-10 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
          <span>VERITAS ET SCIENTIA</span>
          <span>ADMISSIONS CANDIDATE</span>
        </div>
      </div>

      <div className="mt-2.5 text-center">
        <span className="text-[11px] font-mono text-[var(--text-muted)]">
          Scholar Insignia Plate · Afzalshoh Asrorov
        </span>
      </div>
    </div>
  );
};
