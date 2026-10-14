import React, { useState } from 'react';
import { Mail, Copy, Check, Github, Linkedin, BookOpen, Send, ArrowUpRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';

interface ContactProps {
  profile: StudentProfile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [inquiryType, setInquiryType] = useState('Admissions / Evaluative Inquiry');
  const [visitorName, setVisitorName] = useState('');
  const [visitorAffiliation, setVisitorAffiliation] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getFormattedDraft = () => {
    return (
      `To: ${profile.email}\n` +
      `Subject: [Academic Portfolio] ${inquiryType} from ${visitorName || 'Colleague'}\n\n` +
      `Hello ${profile.name},\n\n` +
      `My Name: ${visitorName || 'N/A'}\n` +
      `Affiliation: ${visitorAffiliation || 'N/A'}\n` +
      `Category: ${inquiryType}\n\n` +
      `Message:\n${messageText || 'I reviewed your academic portfolio and would appreciate connecting regarding your recent research projects.'}\n\n` +
      `Best regards,\n${visitorName || 'Sender'}`
    );
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(getFormattedDraft());
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Academic Portfolio] ${inquiryType} from ${visitorName || 'Colleague'}`);
    const body = encodeURIComponent(
      `Hello ${profile.name},\n\n` +
      `Affiliation: ${visitorAffiliation || 'N/A'}\n` +
      `Inquiry Category: ${inquiryType}\n\n` +
      `Message:\n${messageText}\n\n` +
      `Best regards,\n${visitorName || 'Sender'}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setMessageSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-24 py-20 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[var(--border-subtle)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono tracking-widest text-[var(--accent-gold)] uppercase font-semibold">
                  08. CORRESPONDENCE
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                Connect & Academic Inquiries
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider max-w-xs text-left md:text-right">
              Open to discussions with university admissions officers, faculty investigators, and student researchers
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Channels & Verification Links */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal distance={20} delay={0.1}>
              <div>
                <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mb-3">
                  Direct Channels
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                  I welcome dialogue regarding my computational projects, research questions, or potential laboratory alignment in university.
                </p>

                {/* Email Address with Copy Button */}
                <div className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="w-5 h-5 text-[var(--accent-gold)] shrink-0" />
                    <div className="truncate">
                      <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase">
                        Primary Institutional / Contact Email
                      </span>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors truncate block font-medium"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className="px-3 py-1.5 text-xs font-mono border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors flex items-center gap-1.5 shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
                  >
                    {copiedEmail ? (
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
                  </motion.button>
                </div>
              </div>
            </ScrollReveal>

            {/* Professional Profiles */}
            <ScrollReveal distance={20} delay={0.2}>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3 font-semibold">
                  Scholarly & Code Repositories
                </h4>
                <div className="space-y-2.5">
                  {profile.githubUrl && (
                    <motion.a
                      whileHover={{ x: 3, borderColor: 'var(--accent-gold)' }}
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between transition-colors group rounded"
                    >
                      <div className="flex items-center gap-2.5">
                        <Github className="w-4 h-4 text-[var(--text-primary)]" />
                        <span className="text-xs font-mono text-[var(--text-primary)]">GitHub Code Repository</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                  )}

                  {profile.linkedinUrl && (
                    <motion.a
                      whileHover={{ x: 3, borderColor: 'var(--accent-gold)' }}
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between transition-colors group rounded"
                    >
                      <div className="flex items-center gap-2.5">
                        <Linkedin className="w-4 h-4 text-[var(--text-primary)]" />
                        <span className="text-xs font-mono text-[var(--text-primary)]">LinkedIn Academic Profile</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                  )}

                  {profile.scholarUrl && (
                    <motion.a
                      whileHover={{ x: 3, borderColor: 'var(--accent-gold)' }}
                      href={profile.scholarUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between transition-colors group rounded"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-[var(--text-primary)]" />
                        <span className="text-xs font-mono text-[var(--text-primary)]">Google Scholar / Citations Profile</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                  )}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal distance={20} delay={0.3}>
              <div className="pt-4 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)]">
                <p>Location: {profile.location}</p>
                <p className="mt-1">Encrypted correspondence available upon request.</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Working Inquiry Composition Form */}
          <div className="lg:col-span-7">
            <ScrollReveal distance={28} delay={0.2} direction="left">
              <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 shadow-xs">
                <div className="mb-6 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                      Draft Academic Inquiry
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-sans mt-0.5">
                      Sends directly to {profile.email} via your preferred email client
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider font-semibold">
                    Direct Dispatch
                  </span>
                </div>

                <form onSubmit={handleSubmitInquiry} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                      Inquiry Purpose
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-sans bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none rounded"
                    >
                      <option value="Admissions / Evaluative Inquiry">Admissions / Evaluative Inquiry</option>
                      <option value="Faculty / Lab Research Collaboration">Faculty / Lab Research Collaboration</option>
                      <option value="Peer Intellectual Discussion">Peer Intellectual Discussion</option>
                      <option value="General Inquiry">General Academic Correspondence</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Jane Doe / Admissions Officer"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-sans bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none rounded placeholder:text-[var(--text-muted)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                        Institution / University
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Stanford University / MIT"
                        value={visitorAffiliation}
                        onChange={(e) => setVisitorAffiliation(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-sans bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none rounded placeholder:text-[var(--text-muted)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                      Message / Inquiries
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Inquire regarding specific paper replications, code repository architecture, or research questions..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-sans bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-gold)] focus:outline-none rounded placeholder:text-[var(--text-muted)]"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] rounded"
                      >
                        <Send className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                        <span>Send via Email Client</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={handleCopyDraft}
                        title="Copy message draft to clipboard"
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-mono border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors text-[var(--text-primary)]"
                      >
                        {copiedDraft ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Draft Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                            <span>Copy Draft</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    {messageSent && (
                      <span className="text-xs font-mono text-emerald-600 animate-in fade-in">
                        Email client launched!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
