import React, { useState } from 'react';
import { ArrowUpRight, Github, ExternalLink, ChevronRight, Search, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types/portfolio';
import { ProjectDiagram } from '../visuals/ProjectDiagram';
import { ScrollReveal } from '../common/ScrollReveal';

interface FeaturedProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

type ProjectFilter = 'All' | 'Computational' | 'Quantitative' | 'Cognitive';

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === 'All' || project.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortOverview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.problemStatement.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="projects" className="scroll-mt-24 py-20 border-b border-[var(--border-subtle)] transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  03. SELECTED ARTIFACTS
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                Featured Projects & Codebases
              </h2>
            </div>

            {/* Interactive Filter Control: Segmented Buttons */}
            <div className="flex items-center gap-1 p-1 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] self-start md:self-auto rounded">
              {(['All', 'Computational', 'Quantitative', 'Cognitive'] as ProjectFilter[]).map((filter) => (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 rounded ${
                    activeFilter === filter
                      ? 'bg-[var(--accent-navy)] text-white shadow-xs font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Search & Count Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search methods, tools, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none rounded transition-colors placeholder:text-[var(--text-muted)]"
            />
          </div>

          <div className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-2">
            <span>Showing {filteredProjects.length} of {projects.length} artifacts</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[var(--accent-gold)] hover:underline ml-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Project Grid with Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                key={project.id}
                className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--accent-gold)]/70 hover:shadow-sm transition-all group rounded-none"
              >
                <div>
                  {/* Visual Interactive Diagram */}
                  <div className="border-b border-[var(--border-subtle)]">
                    <ProjectDiagram
                      type={project.diagramType}
                      interactive={true}
                      className="border-0 bg-[var(--bg-surface-subtle)]"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Unboxed Metadata (Zero-Pill Rule) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] mb-2">
                      <span className="text-[var(--accent-gold)] uppercase font-semibold">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-semibold">{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.status}</span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium tracking-tight text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-gold)] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans mb-5 line-clamp-3">
                      {project.shortOverview}
                    </p>

                    <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                      <div>
                        <span className="block text-[11px] font-mono text-[var(--accent-gold)] uppercase font-semibold">
                          Core Problem Addressed:
                        </span>
                        <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5 line-clamp-2">
                          {project.problemStatement}
                        </p>
                      </div>

                      <div>
                        <span className="block text-[11px] font-mono text-[var(--text-muted)] uppercase font-semibold">
                          Individual Contribution:
                        </span>
                        <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5 line-clamp-2">
                          {project.studentContribution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-[var(--border-subtle)]/70 mt-4 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.03, x: 2 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent-gold)] font-medium uppercase tracking-wider py-2 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
                  >
                    <span>Examine Methodology</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  </motion.button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} GitHub repository`}
                        className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
