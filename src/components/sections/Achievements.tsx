import React, { useState } from 'react';
import { Award, ShieldCheck, Plus, SlidersHorizontal, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Achievement } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';

interface AchievementsProps {
  achievements: Achievement[];
  onOpenCustomizer: () => void;
}

export const Achievements: React.FC<AchievementsProps> = ({
  achievements,
  onOpenCustomizer,
}) => {
  const verifiedAchievements = achievements.filter((a) => a.isVerified);
  const [showEmptyStatePreview, setShowEmptyStatePreview] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Academic Competition', 'Olympiad', 'Program Fellowship', 'Standardized / AP'];

  const filteredAchievements = verifiedAchievements.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
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
                  05. VERIFIED RECORD
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                Honors, Competitions & Credentials
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowEmptyStatePreview(!showEmptyStatePreview)}
                className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] underline underline-offset-4"
                title="Toggle to preview how the section looks before verified credentials are entered"
              >
                {showEmptyStatePreview ? 'Show Sample Placeholders' : 'Preview Empty State'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onOpenCustomizer}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Edit Honors</span>
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills (Functional Buttons) */}
        {!showEmptyStatePreview && (
          <div className="mb-6 flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-[var(--accent-navy)] text-white font-semibold shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        )}

        {/* Empty State when no achievements exist */}
        {displayList.length === 0 ? (
          <ScrollReveal>
            <div className="p-12 border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] text-center max-w-2xl mx-auto my-6">
              <div className="w-12 h-12 rounded-full border border-[var(--accent-gold)]/50 flex items-center justify-center mx-auto mb-4 text-[var(--accent-gold)]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[var(--text-primary)] mb-2">
                Verified Achievements Pending Input
              </h3>
              <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed max-w-lg mx-auto mb-6">
                In strict adherence to academic integrity guidelines, zero fabricated Olympiad medals or test percentiles are displayed. When official qualifying results or honors are certified, they appear in this ledger.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider text-white bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] transition-colors rounded"
              >
                <Plus className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Add Verified Achievement</span>
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
                  whileHover={{ x: 3, borderColor: 'var(--accent-gold)' }}
                  key={item.id}
                  className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
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

                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)]">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] border border-[var(--accent-gold)]/30 px-3 py-1.5 bg-[var(--bg-surface-elevated)] self-start md:self-auto rounded">
                    <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
                    <span>VERIFIED RECORD</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};
