import React from 'react';
import { ArrowUp, Github, Linkedin, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/portfolio';

interface FooterProps {
  profile: StudentProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--accent-navy)] text-[#F8F7F3] pt-16 pb-12 border-t border-[var(--accent-gold)]/30 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10 items-start">
          {/* Col 1: Monogram & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full border border-[var(--accent-gold)] flex items-center justify-center font-serif text-xs font-semibold text-[var(--accent-gold)]">
                {profile.monogram || 'SN'}
              </span>
              <span className="font-serif text-xl font-medium tracking-tight text-white">
                {profile.name}
              </span>
            </div>

            <p className="text-xs text-white/70 font-sans leading-relaxed max-w-sm">
              Personal academic portfolio documenting intellectual trajectory, independent investigations, and computational projects for university evaluation.
            </p>

            <div className="text-[11px] font-mono text-[var(--accent-gold)] tracking-wider uppercase pt-2">
              Curiosity into Contribution · Anno MMXXVI
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 block mb-2 font-semibold">
              Portfolio Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-white/80">
              <a href="#about" className="hover:text-[var(--accent-gold)] transition-colors">About</a>
              <a href="#academic-interests" className="hover:text-[var(--accent-gold)] transition-colors">Interests</a>
              <a href="#projects" className="hover:text-[var(--accent-gold)] transition-colors">Projects</a>
              <a href="#research" className="hover:text-[var(--accent-gold)] transition-colors">Research</a>
              <a href="#achievements" className="hover:text-[var(--accent-gold)] transition-colors">Achievements</a>
              <a href="#skills" className="hover:text-[var(--accent-gold)] transition-colors">Skills</a>
              <a href="#timeline" className="hover:text-[var(--accent-gold)] transition-colors">Timeline</a>
              <a href="#contact" className="hover:text-[var(--accent-gold)] transition-colors">Contact</a>
            </div>
          </div>

          {/* Col 3: Repositories & Back to Top */}
          <div className="md:col-span-3 space-y-4 flex flex-col items-start md:items-end justify-between h-full">
            <div className="flex items-center gap-3">
              {profile.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[var(--accent-gold)] transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}
              {profile.linkedinUrl && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[var(--accent-gold)] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              )}
              {profile.scholarUrl && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={profile.scholarUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Google Scholar profile"
                  className="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[var(--accent-gold)] transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                </motion.a>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-white/70 hover:text-[var(--accent-gold)] transition-colors pt-4 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Integrity Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/50 gap-4">
          <p>
            © {currentYear} {profile.name}. All original code, writing, and research models licensed under MIT / CC BY 4.0.
          </p>
          <p className="text-center sm:text-right">
            Undergraduate Academic Portfolio · Part 1 of 2 (Identity & Academic Inquiries)
          </p>
        </div>
      </div>
    </footer>
  );
};
