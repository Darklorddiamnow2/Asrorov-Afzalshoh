import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TimelineMilestone } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';

interface TimelineProps {
  timeline: TimelineMilestone[];
}

export const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Coursework', 'Research', 'Project', 'Milestone'];

  const filteredTimeline = timeline.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="timeline" className="scroll-mt-24 py-20 border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  07. INTELLECTUAL TRAJECTORY
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                Development Timeline
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
              {categories.map((cat) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition-all ${
                    activeCategory === cat
                      ? 'bg-[var(--accent-navy)] text-white font-semibold shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline Layout */}
        <div className="relative border-l border-[var(--border-subtle)] ml-4 md:ml-32 pl-8 md:pl-12 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredTimeline.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                key={item.id}
                className="relative group"
              >
                {/* Timeline Node Indicator with pulse effect */}
                <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--text-primary)] bg-[var(--bg-primary)] group-hover:bg-[var(--accent-gold)] group-hover:border-[var(--accent-gold)] transition-colors" />

                {/* Date Column (floats to the left on desktop) */}
                <div className="md:absolute md:-left-36 md:top-1 text-left md:text-right w-24">
                  <span className="text-xs font-mono text-[var(--accent-gold)] font-semibold block tabular-nums">
                    {item.year}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase block">
                    {item.semester}
                  </span>
                </div>

                {/* Milestone Card */}
                <motion.div
                  whileHover={{ x: 4, borderColor: 'var(--accent-gold)' }}
                  className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-2">
                    <span className="uppercase text-[var(--accent-gold)] font-semibold">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>Step 0{index + 1}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {item.impactOrOutput && (
                    <div className="pt-3 border-t border-[var(--border-subtle)]/70 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                      <span className="text-[var(--accent-gold)] font-medium">Documented Output:</span>
                      <span className="text-[var(--text-primary)]">{item.impactOrOutput}</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
