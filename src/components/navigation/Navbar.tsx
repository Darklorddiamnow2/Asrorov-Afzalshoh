import React, { useState } from 'react';
import { Menu, X, FileText, SlidersHorizontal, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  profile: StudentProfile;
  onOpenResume: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenResume,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Academic Interests', href: '#academic-interests' },
    { label: 'Projects', href: '#projects' },
    { label: 'Research', href: '#research' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Skills', href: '#skills' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 84;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      try {
        window.history.pushState(null, '', href);
      } catch {
        // ignore
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark / Monogram */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 text-left focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full border border-[var(--accent-gold)]/60 flex items-center justify-center font-serif text-sm font-semibold text-[var(--text-primary)] group-hover:border-[var(--accent-gold)] group-hover:bg-[var(--bg-surface-elevated)] transition-all"
          >
            {profile.monogram || 'SN'}
          </motion.span>
          <div className="flex flex-col">
            <span className="font-serif text-base lg:text-lg font-semibold tracking-tight text-[var(--text-primary)]">
              {profile.name}
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)] uppercase hidden sm:inline">
              Academic Portfolio
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation links */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-7 text-xs font-medium tracking-wide text-[var(--text-secondary)] uppercase"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="whitespace-nowrap shrink-0 hover:text-[var(--text-primary)] hover:border-b hover:border-[var(--accent-gold)] pb-0.5 transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action, Theme Toggle & Customizer */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dark / Light Theme Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Ivory Mode' : 'Switch to Midnight Dark Mode'}
            aria-label="Toggle visual theme"
            className="p-2 text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--accent-gold)] animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text-primary)] animate-in spin-in-180 duration-300" />
            )}
          </motion.button>

          {/* Quick Customizer Drawer Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={onOpenCustomizer}
            title="Edit portfolio placeholders or customize data"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span className="hidden md:inline">Edit Data</span>
          </motion.button>

          {/* Primary Action: View Resume */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase text-white bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] border border-[var(--border-subtle)] rounded transition-all shadow-xs whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>View Resume</span>
          </motion.button>

          {/* Mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="xl:hidden p-2 text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] px-6 py-6 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wider text-[var(--text-primary)]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-1.5 border-b border-[var(--border-subtle)]/60 hover:text-[var(--accent-gold)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-white bg-[var(--accent-navy)] rounded"
                >
                  <FileText className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>View Full Academic Resume</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      toggleTheme();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] rounded hover:bg-[var(--bg-surface-elevated)]"
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--accent-gold)]" /> : <Moon className="w-4 h-4" />}
                    <span>Theme: {theme === 'dark' ? 'Midnight' : 'Ivory'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCustomizer();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] rounded hover:bg-[var(--bg-surface-elevated)]"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>Edit Data</span>
                  </button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
