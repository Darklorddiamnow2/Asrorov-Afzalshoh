import React, { useEffect } from 'react';
import { X, ExternalLink, Github, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../../types/portfolio';
import { ProjectDiagram } from '../visuals/ProjectDiagram';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--accent-gold)]/40 shadow-2xl p-6 sm:p-10 flex flex-col justify-between transition-colors">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
            <span className="text-[var(--accent-gold)] uppercase tracking-wider font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-semibold">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.status}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Content Body */}
        <div className="space-y-8">
          <div>
            <h2
              id="modal-project-title"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[var(--text-primary)] mb-3"
            >
              {project.title}
            </h2>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed font-sans">
              {project.shortOverview}
            </p>
          </div>

          {/* Schematic Diagram with interactive controls */}
          <div className="my-6">
            <ProjectDiagram
              type={project.diagramType}
              caption={project.diagramCaption}
              interactive={true}
            />
          </div>

          {/* Problem Statement & Contribution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-subtle)]">
            <div className="bg-[var(--bg-surface)] p-5 border border-[var(--border-subtle)]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] mb-2 font-semibold">
                Problem or Theoretical Question Addressed
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                {project.problemStatement}
              </p>
            </div>

            <div className="bg-[var(--bg-surface)] p-5 border border-[var(--border-subtle)]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-gold)] mb-2 font-semibold">
                Student Specific Individual Contribution
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
                {project.studentContribution}
              </p>
            </div>
          </div>

          {/* Methodology & Analytical Steps */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-3">
              Tools, Methods & Computational Pipeline
            </h3>
            <ul className="space-y-2.5">
              {project.methodology.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes & Lessons */}
          <div className="bg-[var(--bg-surface-elevated)] p-5 border border-[var(--border-subtle)]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-2">
              Empirical Findings & Key Lessons Learned
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              {project.outcomesAndLessons}
            </p>
          </div>
        </div>

        {/* Modal Action Links */}
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider text-white bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] transition-colors rounded"
              >
                <span>Live Interactive Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              </motion.a>
            )}

            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] transition-colors rounded"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Repository</span>
              </motion.a>
            )}

            {project.documentUrl && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                href={project.documentUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] underline underline-offset-4"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                <span>Technical Report (PDF)</span>
              </motion.a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] uppercase tracking-wider"
          >
            Close Window [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
