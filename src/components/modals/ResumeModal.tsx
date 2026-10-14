import React, { useEffect, useState } from 'react';
import { X, Printer, Copy, Check, Download, ExternalLink, FileText } from 'lucide-react';
import { PortfolioData } from '../../types/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const generateCvText = () => {
    return `
${data.profile.name.toUpperCase()}
${data.profile.applicantStatus}
Email: ${data.profile.email} | Location: ${data.profile.location}
GitHub: ${data.profile.githubUrl || 'N/A'} | Scholar: ${data.profile.scholarUrl || 'N/A'}

============================================================
ACADEMIC OBJECTIVE & ORIENTATION
============================================================
${data.profile.leadBio}

============================================================
AREAS OF INTELLECTUAL INQUIRY
============================================================
${data.academicInterests.map((ai) => `* ${ai.title} (${ai.discipline})\n  ${ai.description}`).join('\n\n')}

============================================================
SELECTED COMPUTATIONAL PROJECTS
============================================================
${data.projects.map((p) => `* ${p.title} [${p.year}] - ${p.category}\n  Problem: ${p.problemStatement}\n  Contribution: ${p.studentContribution}\n  Outcome: ${p.outcomesAndLessons}`).join('\n\n')}

============================================================
INDEPENDENT RESEARCH DOSSIERS
============================================================
${data.researchInquiries.map((ri) => `* ${ri.topic} (${ri.status})\n  Question: ${ri.researchQuestion}\n  Approach: ${ri.methodApproach}`).join('\n\n')}

============================================================
VERIFIED HONORS & AWARDS
============================================================
${data.achievements.filter((a) => a.isVerified).map((a) => `* [${a.year}] ${a.title} - ${a.awardingBody}\n  ${a.description}`).join('\n\n')}

============================================================
SKILLS & METHODOLOGICAL TOOLS
============================================================
${data.skills.map((s) => `${s.category}:\n  ${s.skills.map((sk) => `${sk.name} (${sk.focus})`).join(', ')}`).join('\n\n')}
`.trim();
  };

  const handleDownloadTxt = () => {
    const textCv = generateCvText();
    const blob = new Blob([textCv], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academic-cv-${data.profile.name.replace(/\s+/g, '-').toLowerCase() || 'applicant'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess('TXT');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${data.profile.name} - Academic Curriculum Vitae</title>
<style>
  body { font-family: 'Times New Roman', Times, serif; max-width: 800px; margin: 40px auto; color: #111; line-height: 1.5; padding: 0 20px; }
  h1 { text-align: center; margin-bottom: 4px; font-size: 26pt; font-weight: normal; }
  .subtitle { text-align: center; font-size: 11pt; color: #555; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .contact { text-align: center; font-size: 10pt; color: #444; border-bottom: 2px solid #222; padding-bottom: 14px; margin-bottom: 24px; }
  h2 { font-size: 12pt; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #ccc; padding-bottom: 3px; margin-top: 24px; color: #8C6D37; }
  p { margin: 6px 0; font-size: 10.5pt; }
  .entry { margin-bottom: 14px; }
  .entry-header { display: flex; justify-content: space-between; font-weight: bold; }
  @media print { body { margin: 20mm; } }
</style>
</head>
<body>
  <h1>${data.profile.name}</h1>
  <div class="subtitle">${data.profile.applicantStatus}</div>
  <div class="contact">
    ${data.profile.email} &bull; ${data.profile.location} &bull; GitHub: ${data.profile.githubUrl || 'N/A'}
  </div>
  <h2>I. Academic Objective</h2>
  <p>${data.profile.leadBio}</p>
  <h2>II. Selected Projects & Inquiries</h2>
  ${data.projects.map(p => `
    <div class="entry">
      <div class="entry-header"><span>${p.title}</span><span>${p.year}</span></div>
      <p><em>Problem:</em> ${p.problemStatement}</p>
      <p><em>Contribution:</em> ${p.studentContribution}</p>
      <p><em>Outcomes:</em> ${p.outcomesAndLessons}</p>
    </div>
  `).join('')}
  <h2>III. Verified Honors</h2>
  ${data.achievements.filter(a => a.isVerified).map(a => `
    <div class="entry">
      <div class="entry-header"><span>${a.title}</span><span>${a.year}</span></div>
      <p>${a.awardingBody} &bull; ${a.description}</p>
    </div>
  `).join('')}
  <h2>IV. Skills</h2>
  ${data.skills.map(s => `
    <p><strong>${s.category}:</strong> ${s.skills.map(sk => sk.name).join(', ')}</p>
  `).join('')}
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academic-cv-${data.profile.name.replace(/\s+/g, '-').toLowerCase() || 'applicant'}.html`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess('HTML');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // In case iframe sandboxing restricts print, fallback to download
      handleDownloadHtml();
    }
  };

  const handleCopyPlainText = () => {
    const textCv = generateCvText();
    navigator.clipboard.writeText(textCv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[var(--bg-primary)] border border-[var(--accent-gold)]/40 shadow-2xl flex flex-col justify-between transition-colors">
        {/* Sticky Action Bar */}
        <div className="sticky top-0 z-20 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-subtle)] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <span className="font-serif text-sm font-semibold text-[var(--text-primary)]">
              Curriculum Vitae
            </span>
            <span className="text-[11px] font-mono text-[var(--text-muted)] hidden sm:inline">
              · Academic Monograph Format
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadTxt}
              title="Download text file"
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] rounded transition-colors"
            >
              {downloadSuccess === 'TXT' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Download .txt</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadHtml}
              title="Download clean HTML/Print format"
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] rounded transition-colors"
            >
              {downloadSuccess === 'HTML' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Downloaded</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Download .html</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyPlainText}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] rounded transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[var(--accent-navy)] text-white hover:bg-[var(--accent-navy-hover)] rounded transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume viewer"
              className="cursor-pointer p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Academic CV Document Content */}
        <div className="p-8 sm:p-14 bg-[var(--bg-surface)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent-gold)]/20 transition-colors">
          {/* Header */}
          <div className="text-center pb-6 border-b-2 border-[var(--text-primary)] mb-8">
            <h1 id="resume-title" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
              {data.profile.name}
            </h1>
            <p className="text-xs font-mono text-[var(--accent-gold)] tracking-wider uppercase mb-2">
              {data.profile.applicantStatus}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-mono text-[var(--text-muted)]">
              <span>{data.profile.email}</span>
              <span aria-hidden="true">·</span>
              <span>{data.profile.location}</span>
              {data.profile.githubUrl && (
                <>
                  <span aria-hidden="true">·</span>
                  <a href={data.profile.githubUrl} target="_blank" rel="noreferrer" className="underline">
                    GitHub
                  </a>
                </>
              )}
              {data.profile.linkedinUrl && (
                <>
                  <span aria-hidden="true">·</span>
                  <a href={data.profile.linkedinUrl} target="_blank" rel="noreferrer" className="underline">
                    LinkedIn
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Section: Academic Orientation */}
          <div className="mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#B69A62] font-bold border-b border-[#E2DFD6] pb-1 mb-3">
              I. ACADEMIC ORIENTATION & ASPIRATIONS
            </h2>
            <p className="text-sm text-[#14243A]/90 leading-relaxed font-sans">
              {data.profile.leadBio}
            </p>
            <p className="text-xs text-[#14243A]/75 mt-2 leading-relaxed font-sans italic">
              Intended Major Fields: Computer Science, Applied Mathematics, and Cognitive Science.
            </p>
          </div>

          {/* Section: Independent Research & Inquiries */}
          <div className="mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#B69A62] font-bold border-b border-[#E2DFD6] pb-1 mb-3">
              II. INDEPENDENT INQUIRIES & RESEARCH DOSSIERS
            </h2>
            <div className="space-y-4">
              {data.researchInquiries.map((ri) => (
                <div key={ri.id} className="text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-semibold text-sm font-serif text-[#14243A]">{ri.topic}</span>
                    <span className="text-[#B69A62]">{ri.status} ({ri.dateStarted})</span>
                  </div>
                  <p className="text-[#14243A]/85 mt-1 font-sans italic">
                    Question: "{ri.researchQuestion}"
                  </p>
                  <p className="text-[#14243A]/75 mt-1 font-sans">
                    Methodology: {ri.methodApproach}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Selected Projects */}
          <div className="mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#B69A62] font-bold border-b border-[#E2DFD6] pb-1 mb-3">
              III. SELECTED COMPUTATIONAL PROJECTS
            </h2>
            <div className="space-y-5">
              {data.projects.map((project) => (
                <div key={project.id} className="text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-semibold text-sm font-serif text-[#14243A]">{project.title}</span>
                    <span className="text-[#14243A]/60 tabular-nums">{project.category} · {project.year}</span>
                  </div>
                  <p className="text-[#14243A]/85 mt-1 font-sans">
                    <strong className="font-mono text-[11px] text-[#B69A62]">Problem:</strong> {project.problemStatement}
                  </p>
                  <p className="text-[#14243A]/85 mt-1 font-sans">
                    <strong className="font-mono text-[11px] text-[#14243A]/70">Contribution:</strong> {project.studentContribution}
                  </p>
                  <p className="text-[#14243A]/75 mt-1 font-sans">
                    <strong className="font-mono text-[11px] text-[#14243A]/70">Outcome:</strong> {project.outcomesAndLessons}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Verified Honors & Academic Distinctions */}
          <div className="mb-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#B69A62] font-bold border-b border-[#E2DFD6] pb-1 mb-3">
              IV. VERIFIED HONORS & RECOGNITION
            </h2>
            <div className="space-y-3">
              {data.achievements
                .filter((a) => a.isVerified)
                .map((ach) => (
                  <div key={ach.id} className="text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-semibold text-[#14243A]">{ach.title}</span>
                      <span className="text-[#B69A62] tabular-nums">{ach.year}</span>
                    </div>
                    <p className="text-[#14243A]/60 font-mono text-[11px]">{ach.awardingBody} · {ach.category}</p>
                    <p className="text-[#14243A]/80 font-sans mt-0.5">{ach.description}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Section: Skills & Methodologies */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#B69A62] font-bold border-b border-[#E2DFD6] pb-1 mb-3">
              V. TECHNICAL & METHODOLOGICAL COMPETENCIES
            </h2>
            <div className="space-y-2 text-xs">
              {data.skills.map((cat) => (
                <div key={cat.category} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-mono text-[11px] font-semibold text-[#14243A] sm:w-48 shrink-0">
                    {cat.category}:
                  </span>
                  <span className="text-[#14243A]/80 font-sans">
                    {cat.skills.map((s) => s.name).join(' · ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CV Footer */}
          <div className="mt-12 pt-6 border-t border-[#E2DFD6] text-center text-[10px] font-mono text-[#14243A]/50">
            Document generated for university admissions evaluation. All statements subject to verification via official transcripts and code repositories.
          </div>
        </div>
      </div>
    </div>
  );
};
