import React, { useState } from 'react';
import { Award, ShieldCheck, Plus, SlidersHorizontal, ArrowUpDown, CheckCircle2, ChevronRight, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Achievement } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';
import { useLanguage } from '../../context/LanguageContext';

interface AchievementsProps {
  achievements: Achievement[];
  onOpenCustomizer: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({
  achievements,
  onOpenCustomizer,
}) => {
  const { t } = useLanguage();
  const verifiedAchievements = achievements.filter((a) => a.isVerified);
  const [showEmptyStatePreview, setShowEmptyStatePreview] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortDescending, setSortDescending] = useState(true);
  const [inspectedAchievement, setInspectedAchievement] = useState<Achievement | null>(null);

  const categories = ['All', 'Academic Competition', 'Program Fellowship', 'Standardized / AP'];

  const filteredAchievements = verifiedAchievements
    .filter((a) => {
      if (selectedCategory === 'All') return true;
      return a.category === selectedCategory;
    })
    .sort((a, b) => {
      if (sortDescending) {
        return b.year.localeCompare(a.year);
      }
      return a.year.localeCompare(b.year);
    });

  const displayList = showEmptyStatePreview ? [] : filteredAchievements;

  return (
    <section id="achievements" className="scroll-mt-24 py-20 border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  {t.achievements.kicker}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                {t.achievements.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowEmptyStatePreview(!showEmptyStatePreview)}
                className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] underline underline-offset-4 cursor-pointer"
                title="Toggle to preview how the section looks before verified credentials are entered"
              >
                {showEmptyStatePreview ? t.achievements.showPlaceholders : t.achievements.previewEmpty}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onOpenCustomizer}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] hover:border-[var(--accent-gold)] rounded transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>{t.achievements.editHonors}</span>
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills & Sort Button */}
        {!showEmptyStatePreview && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[var(--accent-navy)] text-white font-semibold shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSortDescending(!sortDescending)}
              className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2.5 py-1 border border-[var(--border-subtle)] rounded transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3 h-3 text-[var(--accent-gold)]" />
              <span>Sort Year: {sortDescending ? 'Desc' : 'Asc'}</span>
            </button>
          </div>
        )}

        {/* Empty State when no achievements exist */}
        {displayList.length === 0 ? (
          <ScrollReveal>
            <div className="p-12 border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] text-center max-w-2xl mx-auto my-6 rounded">
              <div className="w-12 h-12 rounded-full border border-[var(--accent-gold)]/50 flex items-center justify-center mx-auto mb-4 text-[var(--accent-gold)]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
                {t.achievements.emptyTitle}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed max-w-lg mx-auto mb-6">
                {t.achievements.emptyText}
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-white bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] transition-colors rounded cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>{t.achievements.addAchievement}</span>
              </motion.button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayList.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  whileHover={{ x: 4, borderColor: 'var(--accent-gold)' }}
                  key={item.id}
                  onClick={() => setInspectedAchievement(item)}
                  className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all rounded shadow-xs cursor-pointer group"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    {/* Unboxed Metadata (Zero-Pill Rule) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                      <span className="text-[var(--accent-gold)] font-semibold uppercase">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-semibold">{item.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.awardingBody}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] border border-[var(--accent-gold)]/40 px-3 py-1.5 bg-[var(--bg-surface-elevated)] self-start md:self-auto rounded group-hover:bg-[var(--accent-gold)]/10 transition-colors">
                    <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                    <span>{t.achievements.verifiedRecord}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:translate-x-1 transition-transform ml-1" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal Inspection for Selected Credential */}
        <AnimatePresence>
          {inspectedAchievement && (
            <div
              role="dialog"
              aria-modal="true"
              onClick={() => setInspectedAchievement(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-lg w-full bg-[var(--bg-surface)] border border-[var(--accent-gold)]/50 p-6 sm:p-8 rounded shadow-2xl space-y-4"
              >
                <div className="flex items-start justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-gold)] font-semibold">
                      Credential Verification Ledger
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--text-primary)] mt-1">
                      {inspectedAchievement.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInspectedAchievement(null)}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]/50">
                    <span className="text-[var(--text-muted)]">Awarding Body:</span>
                    <span className="text-[var(--text-primary)] font-semibold">{inspectedAchievement.awardingBody}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]/50">
                    <span className="text-[var(--text-muted)]">Session / Year:</span>
                    <span className="text-[var(--text-primary)] font-semibold">{inspectedAchievement.year}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-subtle)]/50">
                    <span className="text-[var(--text-muted)]">Category:</span>
                    <span className="text-[var(--accent-gold)] font-semibold uppercase">{inspectedAchievement.category}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[var(--text-muted)]">Verification Status:</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                    </span>
                  </div>
                </div>

                <div className="bg-[var(--bg-surface-subtle)] p-3.5 border border-[var(--border-subtle)] rounded text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  {inspectedAchievement.description}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setInspectedAchievement(null)}
                    className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[var(--accent-navy)] text-white hover:bg-[var(--accent-navy-hover)] rounded cursor-pointer"
                  >
                    Close Ledger
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
