import React, { useState } from 'react';
import { ArrowUpRight, HelpCircle, BookOpen, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AcademicInterest } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';
import { useLanguage } from '../../context/LanguageContext';

interface AcademicInterestsProps {
  interests: AcademicInterest[];
  onSelectProject?: (projectId: string) => void;
}

export const AcademicInterests: React.FC<AcademicInterestsProps> = ({
  interests,
  onSelectProject,
}) => {
  const { t } = useLanguage();
  const [copiedQuestionIdx, setCopiedQuestionIdx] = useState<string | null>(null);
  const [expandedTexts, setExpandedTexts] = useState<Record<string, boolean>>({});

  const handleCopyQuestion = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionIdx(id);
    setTimeout(() => setCopiedQuestionIdx(null), 2000);
  };

  const toggleExpandText = (interestId: string) => {
    setExpandedTexts((prev) => ({
      ...prev,
      [interestId]: !prev[interestId],
    }));
  };

  return (
    <section id="academic-interests" className="scroll-mt-24 py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  {t.interests.kicker}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                {t.interests.title}
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider max-w-xs text-left md:text-right">
              {t.interests.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Layout: Stack of elegant research monographs */}
        <div className="space-y-12">
          {interests.map((interest, index) => (
            <ScrollReveal key={interest.id} delay={index * 0.12} distance={30}>
              <article className="p-8 lg:p-10 border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all hover:border-[var(--accent-gold)]/60 hover:shadow-xs rounded">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Meta & Title */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                      <span className="text-[var(--accent-gold)] font-semibold tabular-nums">0{index + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span className="uppercase tracking-wider">{interest.discipline}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
                      {interest.title}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                      {interest.description}
                    </p>

                    {/* Foundational Texts / Canon with Expand/Collapse */}
                    {interest.foundationalTexts && interest.foundationalTexts.length > 0 && (
                      <div className="pt-4 border-t border-[var(--border-subtle)]/70">
                        <button
                          type="button"
                          onClick={() => toggleExpandText(interest.id)}
                          className="flex items-center justify-between w-full text-xs font-mono text-[var(--accent-gold)] uppercase mb-2 hover:underline cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 font-semibold">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{t.interests.coreTexts} ({interest.foundationalTexts.length})</span>
                          </div>
                          {expandedTexts[interest.id] ? (
                            <ChevronUp className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                          )}
                        </button>

                        <AnimatePresence initial={false}>
                          {(!expandedTexts[interest.id] || expandedTexts[interest.id]) && (
                            <ul className="space-y-1.5">
                              {interest.foundationalTexts.map((text, i) => (
                                <li key={i} className="text-xs text-[var(--text-secondary)] italic font-serif flex items-center justify-between gap-2">
                                  <span>{text}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Connected Projects */}
                    {interest.relatedProjectIds && interest.relatedProjectIds.length > 0 && onSelectProject && (
                      <div className="pt-2">
                        {interest.relatedProjectIds.map((pId) => (
                          <motion.button
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            key={pId}
                            type="button"
                            onClick={() => onSelectProject(pId)}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent-gold)] underline underline-offset-4 transition-colors cursor-pointer"
                          >
                            <span>{t.interests.inspectPrototype}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Core Research & Investigation Questions */}
                  <div className="lg:col-span-7 bg-[var(--bg-surface-subtle)] p-6 lg:p-8 border border-[var(--border-subtle)] rounded">
                    <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[var(--accent-gold)]" />
                        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold">
                          {t.interests.coreInquiriesTitle}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                        {t.interests.hypothesesBadge}
                      </span>
                    </div>

                    <ul className="space-y-4">
                      {interest.coreQuestions.map((question, qIdx) => {
                        const copyKey = `${interest.id}-q-${qIdx}`;
                        return (
                          <li
                            key={qIdx}
                            className="group flex items-start justify-between gap-3 p-2 rounded hover:bg-[var(--bg-surface-elevated)] transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <span className="font-mono text-xs text-[var(--accent-gold)] mt-0.5 tabular-nums font-semibold">
                                [{qIdx + 1}]
                              </span>
                              <p className="text-sm text-[var(--text-primary)] font-sans leading-relaxed">
                                {question}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyQuestion(question, copyKey)}
                              title="Copy research question to clipboard"
                              className="opacity-0 group-hover:opacity-100 p-1.5 text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-all shrink-0 cursor-pointer"
                            >
                              {copiedQuestionIdx === copyKey ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                      <span>{t.interests.statusActive}</span>
                      <span>{t.interests.statusLevel}</span>
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
