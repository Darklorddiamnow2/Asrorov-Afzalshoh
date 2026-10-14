import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, Github, Linkedin, BookOpen, Send, Instagram, ArrowUpRight, MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { StudentProfile } from '../../types/portfolio';
import { ScrollReveal } from '../common/ScrollReveal';
import { useLanguage } from '../../context/LanguageContext';

interface ContactProps {
  profile: StudentProfile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const { t } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [inquiryType, setInquiryType] = useState('Admissions / Evaluative Inquiry');
  const [visitorName, setVisitorName] = useState('');
  const [visitorAffiliation, setVisitorAffiliation] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const contactEmail = profile.email || 'darklordiamnow2@gmail.com';
  const contactPhone = profile.phone || '+998(90)4771307';
  const rawPhoneDigits = contactPhone.replace(/[^0-9+]/g, '');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contactPhone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const getFormattedDraft = () => {
    return (
      `To: ${contactEmail}\n` +
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
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
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
                  {t.contact.kicker}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--text-primary)]">
                {t.contact.title}
              </h2>
            </div>
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider max-w-xs text-left md:text-right">
              {t.contact.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Channels & Verification Links */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal distance={20} delay={0.1}>
              <div>
                <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)] mb-3">
                  {t.contact.directChannels}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed mb-6">
                  {t.contact.channelsDesc}
                </p>

                {/* Contact Cards Container */}
                <div className="space-y-3.5">
                  {/* Email Address with Copy Button */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 shadow-xs rounded group hover:border-[var(--accent-gold)] transition-all"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-[var(--accent-gold)]" />
                      </div>
                      <div className="truncate">
                        <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                          {t.contact.primaryEmail}
                        </span>
                        <a
                          href={`mailto:${contactEmail}`}
                          className="text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors truncate block font-medium"
                        >
                          {contactEmail}
                        </a>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.94 }}
                      type="button"
                      onClick={handleCopyEmail}
                      title="Copy email to clipboard"
                      className="px-3 py-1.5 text-xs font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors flex items-center gap-1.5 shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">{t.contact.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                          <span>{t.contact.copy}</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {/* Direct Telephone / Mobile with Direct Call & Copy */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 shadow-xs rounded group hover:border-[var(--accent-gold)] transition-all"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-[var(--accent-gold)]" />
                      </div>
                      <div className="truncate">
                        <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                          {t.contact.telephone}
                        </span>
                        <a
                          href={`tel:${rawPhoneDigits}`}
                          className="text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors truncate block font-medium"
                        >
                          {contactPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`https://t.me/${rawPhoneDigits}`}
                        target="_blank"
                        rel="noreferrer"
                        title="Open in Telegram"
                        className="px-2.5 py-1.5 text-[11px] font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded text-[var(--text-muted)] hover:text-[var(--accent-gold)] transition-colors"
                      >
                        TG
                      </a>
                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        type="button"
                        onClick={handleCopyPhone}
                        title="Copy phone number to clipboard"
                        className="px-3 py-1.5 text-xs font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)] cursor-pointer"
                      >
                        {copiedPhone ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">{t.contact.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                            <span>{t.contact.copy}</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Telegram Channel / Direct Message */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 shadow-xs rounded group hover:border-[var(--accent-gold)] transition-all"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 flex items-center justify-center shrink-0">
                        <Send className="w-4 h-4 text-[var(--accent-gold)]" />
                      </div>
                      <div className="truncate">
                        <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                          Telegram Channel & Direct
                        </span>
                        <a
                          href="https://t.me/afzal_asrorov"
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors truncate block font-medium"
                        >
                          @afzal_asrorov
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="https://t.me/afzal_asrorov"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 text-xs font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>

                  {/* Instagram Profile */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 shadow-xs rounded group hover:border-[var(--accent-gold)] transition-all"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/30 flex items-center justify-center shrink-0">
                        <Instagram className="w-4 h-4 text-[var(--accent-gold)]" />
                      </div>
                      <div className="truncate">
                        <span className="block text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                          Instagram Profile
                        </span>
                        <a
                          href="https://instagram.com/afzalshoh.asrorov"
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-mono text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors truncate block font-medium"
                        >
                          @afzalshoh.asrorov
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href="https://instagram.com/afzalshoh.asrorov"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 text-xs font-mono border border-[var(--border-subtle)] hover:border-[var(--accent-gold)] hover:bg-[var(--bg-surface-elevated)] rounded text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors inline-flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>

            {/* Professional Profiles */}
            <ScrollReveal distance={20} delay={0.2}>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3 font-semibold">
                  {t.contact.reposTitle}
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
              <div className="pt-4 border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] space-y-1">
                <p>Location: <span className="text-[var(--text-primary)]">{profile.location}</span></p>
                <p>Candidate: <span className="text-[var(--accent-gold)]">{profile.name}</span></p>
                <p className="text-[11px] text-[var(--text-muted)]/80">Direct academic correspondence welcomed.</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Working Inquiry Composition Form */}
          <div className="lg:col-span-7">
            <ScrollReveal distance={28} delay={0.2} direction="left">
              <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-xs rounded">
                <div className="mb-6 pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                      {t.contact.draftTitle}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-sans mt-0.5">
                      {t.contact.draftDesc}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--accent-gold)] uppercase tracking-wider font-semibold border border-[var(--accent-gold)]/40 px-2 py-0.5 rounded">
                    Direct Dispatch
                  </span>
                </div>

                <form onSubmit={handleSubmitInquiry} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                      {t.contact.inquiryPurpose}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        'Admissions / Evaluative Inquiry',
                        'Faculty / Laboratory Alignment',
                        'Peer Research Collaboration',
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInquiryType(type)}
                          className={`p-2.5 text-xs font-sans text-left border rounded transition-all cursor-pointer ${
                            inquiryType === type
                              ? 'border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 text-[var(--text-primary)] font-medium shadow-xs'
                              : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                        {t.contact.yourName}
                      </label>
                      <input
                        type="text"
                        required
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="Dr. Eleanor Vance / Officer"
                        className="w-full px-3.5 py-2.5 text-xs font-sans bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent-gold)] focus:outline-none rounded transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                        {t.contact.institution}
                      </label>
                      <input
                        type="text"
                        value={visitorAffiliation}
                        onChange={(e) => setVisitorAffiliation(e.target.value)}
                        placeholder="University Admissions / Laboratory"
                        className="w-full px-3.5 py-2.5 text-xs font-sans bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent-gold)] focus:outline-none rounded transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-semibold">
                      {t.contact.message}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="I reviewed your computational projects and would like to discuss your inquiry hypotheses..."
                      className="w-full px-3.5 py-2.5 text-xs font-sans bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent-gold)] focus:outline-none rounded transition-colors"
                    />
                  </div>

                  {/* Submit and Copy Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] text-white text-xs font-medium uppercase tracking-wider rounded transition-all shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
                    >
                      <Send className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      <span>{t.contact.sendEmail}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-transparent hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] text-xs font-medium uppercase tracking-wider rounded transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-gold)]"
                    >
                      {copiedDraft ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{t.contact.draftCopied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                          <span>{t.contact.copyDraft}</span>
                        </>
                      )}
                    </motion.button>
                  </div>

                  {messageSent && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-sans rounded"
                    >
                      Inquiry prepared! Your system email client has been summoned with recipient {contactEmail}. If your email client didn't launch automatically, use the "Copy Draft" button above.
                    </motion.div>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
