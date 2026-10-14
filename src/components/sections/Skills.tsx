import React, { useState } from 'react';
import { Terminal, Binary, BookText, Copy, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { SkillCategory } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skillCategories }) => {
  const [copied, setCopied] = useState(false);
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null);

  const getCategoryIcon = (index: number) => {
    switch (index % 3) {
      case 0:
        return <Terminal className="w-4 h-4 text-[var(--accent-gold)]" />;
      case 1:
        return <Binary className="w-4 h-4 text-[var(--accent-gold)]" />;
      case 2:
      default:
        return <BookText className="w-4 h-4 text-[var(--accent-gold)]" />;
    }
  };

  const handleCopySkills = () => {
    const text = skillCategories
      .map(
        (cat) =>
          `${cat.category.toUpperCase()}:\n${cat.skills.map((s) => `• ${s.name} — ${s.focus}`).join('\n')}`
      )
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="skills" className="scroll-mt-24 py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/40 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  06. METHODOLOGICAL APPARATUS
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                Skills & Analytical Tools
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={handleCopySkills}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Skills Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                    <span>Copy Skills Summary</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        {/* Skills Grid: 3 columns of categorized competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, catIdx) => (
            <ScrollReveal key={cat.category} delay={catIdx * 0.12} distance={24}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-8 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between h-full transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--border-subtle)] mb-4">
                    {getCategoryIcon(catIdx)}
                    <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                      {cat.category}
                    </h3>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] font-sans mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Skill List with Zero-Pill Discipline */}
                  <div className="space-y-4">
                    {cat.skills.map((skill, sIdx) => {
                      const isHighlighted = highlightedSkill === skill.name;
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setHighlightedSkill(isHighlighted ? null : skill.name)}
                          className={`pb-3 border-b border-[var(--border-subtle)]/50 last:border-0 last:pb-0 cursor-pointer p-1.5 rounded transition-colors ${
                            isHighlighted ? 'bg-[var(--accent-gold)]/10 border-[var(--accent-gold)]' : 'hover:bg-[var(--bg-surface-elevated)]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono text-[var(--text-primary)] font-semibold">
                            <span>{skill.name}</span>
                            {isHighlighted && (
                              <span className="text-[10px] text-[var(--accent-gold)] font-mono">Selected</span>
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--text-secondary)] font-sans mt-0.5">
                            {skill.focus}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  <span>VERIFIABLE VIA CODE REPO</span>
                  <span className="tabular-nums font-semibold">0{catIdx + 1}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
