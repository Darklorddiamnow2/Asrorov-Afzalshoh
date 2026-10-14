import React, { useState } from 'react';
import { Menu, X, FileText, SlidersHorizontal, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile } from '../../types/portfolio';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage, Language } from '../../context/LanguageContext';

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
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  React.useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-dropdown-container')) {
        setLangDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [langDropdownOpen]);

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.interests, href: '#academic-interests' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.research, href: '#research' },
    { label: t.nav.achievements, href: '#achievements' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.timeline, href: '#timeline' },
    { label: t.nav.contact, href: '#contact' },
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

  const languages: { code: Language; label: string; full: string }[] = [
    { code: 'en', label: 'Eng', full: 'English' },
    { code: 'uz', label: 'Uzb', full: "O'zbek" },
    { code: 'ru', label: 'Rus', full: 'Русский' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6 lg:gap-8">
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
            className="w-9 h-9 rounded-full border border-[var(--accent-gold)]/60 flex items-center justify-center font-serif text-sm font-semibold text-[var(--text-primary)] group-hover:border-[var(--accent-gold)] group-hover:bg-[var(--bg-surface-elevated)] transition-all shadow-xs"
          >
            {profile.monogram || 'AA'}
          </motion.span>
          <div className="flex flex-col">
            <span className="font-serif text-base lg:text-lg font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
              {profile.name || 'Afzalshoh Asrorov'}
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)] uppercase hidden sm:inline">
              {t.nav.portfolioTitle}
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation links */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-6 text-xs font-medium tracking-wide text-[var(--text-secondary)] uppercase"
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

        {/* Zone 3: Primary Action, Language Switcher, Theme Toggle & Customizer */}
        <div className="flex items-center gap-2 lg:gap-2.5 shrink-0">
          {/* Language Switcher Dropdown */}
          <div className="relative lang-dropdown-container">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded transition-all focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
              title="Change Language (Eng / Uzb / Rus)"
            >
              <Globe className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span className="uppercase font-semibold text-[11px]">
                {languages.find((l) => l.code === language)?.label}
              </span>
              <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
            </motion.button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1.5 w-32 bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xl rounded py-1 z-50 text-xs font-mono"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-[var(--bg-surface-elevated)] transition-colors ${
                        language === lang.code
                          ? 'text-[var(--accent-gold)] font-semibold bg-[var(--accent-gold)]/10'
                          : 'text-[var(--text-primary)]'
                      }`}
                    >
                      <span>{lang.full}</span>
                      <span className="text-[10px] text-[var(--text-muted)] uppercase">[{lang.label}]</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
              <Sun className="w-4 h-4 text-[var(--accent-gold)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--text-primary)]" />
            )}
          </motion.button>

          {/* Quick Customizer Drawer Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={onOpenCustomizer}
            title="Edit portfolio placeholders or customize data"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>{t.nav.editData}</span>
          </motion.button>

          {/* Primary Action: View Resume */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={onOpenResume}
            className="flex items-center gap-2 px-3.5 lg:px-4 py-2 text-xs font-medium tracking-wide uppercase text-white bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] border border-[var(--border-subtle)] rounded transition-all shadow-xs whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>{t.nav.viewResume}</span>
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

              {/* Language Choice in Mobile Menu */}
              <div className="pt-2 flex items-center justify-between border-t border-[var(--border-subtle)]">
                <span className="text-xs font-mono text-[var(--text-muted)]">Language:</span>
                <div className="flex items-center gap-1.5">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setLanguage(l.code)}
                      className={`px-2 py-1 text-xs font-mono rounded ${
                        language === l.code
                          ? 'bg-[var(--accent-navy)] text-white font-semibold'
                          : 'border border-[var(--border-subtle)] text-[var(--text-primary)]'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

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
                  <span>{t.nav.viewResume}</span>
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
                    <span>{theme === 'dark' ? 'Midnight' : 'Ivory'}</span>
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
                    <span>{t.nav.editData}</span>
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
