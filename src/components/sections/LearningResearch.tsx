import React, { useState } from 'react';
import { BookOpen, Compass, FileCheck, ArrowRight, Library, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { ResearchInquiry } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';
import { useLanguage } from '../../context/LanguageContext';

interface LearningResearchProps {
  inquiries: ResearchInquiry[];
}

export const LearningResearch: React.FC<LearningResearchProps> = ({ inquiries }) => {
  const { t } = useLanguage();
  const [copiedCitationIdx, setCopiedCitationIdx] = useState<string | null>(null);

  const handleCopyCitation = (citation: string, id: string) => {
    navigator.clipboard.writeText(citation);
    setCopiedCitationIdx(id);
    setTimeout(() => setCopiedCitationIdx(null), 2000);
  };

  return (
    <section id="research" className="scroll-mt-24 py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  {t.research.kicker}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                {t.research.title}
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider text-left md:text-right">
                {t.research.subtitle}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Academic Integrity Clarification Banner */}
        <ScrollReveal distance={16} delay={0.1}>
          <div className="mb-12 p-4 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-start gap-3 rounded">
            <Library className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
            <p className="text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
              {t.research.integrityNote}
            </p>
          </div>
        </ScrollReveal>

        {/* Inquiries Grid */}
        <div className="space-y-8">
          {inquiries.map((inquiry, index) => (
            <ScrollReveal key={inquiry.id} delay={index * 0.12} distance={24}>
              <article className="p-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all hover:border-[var(--accent-gold)]/60 rounded">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)] mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                    <span className="text-[var(--accent-gold)] font-semibold tabular-nums">DOSSIER 0{index + 1}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase">{inquiry.status}</span>
                    <span aria-hidden="true">·</span>
                    <span>Commenced {inquiry.dateStarted}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    Independent Inquiry
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Main Topic & Question */}
                  <div className="lg:col-span-7 space-y-4">
                    <h3 className="font-serif text-2xl font-medium tracking-tight text-[var(--text-primary)]">
                      {inquiry.topic}
                    </h3>

                    <div className="bg-[var(--bg-surface-subtle)] p-4 border border-[var(--border-subtle)] rounded">
                      <span className="block text-[11px] font-mono text-[var(--accent-gold)] uppercase font-semibold mb-1">
                        {t.research.centralQuestion}
                      </span>
                      <p className="font-serif text-base sm:text-lg text-[var(--text-primary)] italic leading-relaxed">
                        "{inquiry.researchQuestion}"
                      </p>
                    </div>

                    <div>
                      <span className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2 font-semibold">
                        {t.research.methodFramework}
                      </span>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                        {inquiry.methodApproach}
                      </p>
                    </div>
                  </div>

                  {/* Key Insights & Primary Literature */}
                  <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-[var(--border-subtle)] lg:pl-8">
                    <div>
                      <span className="block text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] mb-3 font-semibold">
                        {t.research.keyInsights}
                      </span>
                      <ul className="space-y-2.5">
                        {inquiry.keyInsights.map((insight, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                            <span className="text-[var(--accent-gold)] font-mono mt-0.5 font-bold">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-subtle)]">
                      <span className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2 font-semibold">
                        {t.research.primarySources}
                      </span>
                      <ul className="space-y-2">
                        {inquiry.references.map((ref, rIdx) => {
                          const refKey = `${inquiry.id}-ref-${rIdx}`;
                          return (
                            <li
                              key={rIdx}
                              className="group text-xs font-serif italic text-[var(--text-secondary)] leading-normal flex items-start justify-between gap-2 p-1.5 rounded hover:bg-[var(--bg-surface-elevated)] transition-colors"
                            >
                              <span>[{rIdx + 1}] {ref}</span>
                              <button
                                type="button"
                                onClick={() => handleCopyCitation(ref, refKey)}
                                title="Copy citation"
                                className="opacity-0 group-hover:opacity-100 p-1 text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-all shrink-0 cursor-pointer"
                              >
                                {copiedCitationIdx === refKey ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
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
