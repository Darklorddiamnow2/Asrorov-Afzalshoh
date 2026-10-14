import React, { useState } from 'react';
import { X, Save, RotateCcw, Download, Check, User, Briefcase, Award, Sparkles, BookOpen } from 'lucide-react';
import { PortfolioData } from '../../types/portfolio';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSaveData: (updated: PortfolioData) => void;
  onResetData: () => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetData,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'achievements'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if external data changes
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handleProfileChange = (field: keyof typeof formData.profile, value: string) => {
    setFormData({
      ...formData,
      profile: {
        ...formData.profile,
        [field]: value,
      },
    });
  };

  const handleSave = () => {
    onSaveData(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `academic-portfolio-${formData.profile.name.replace(/\s+/g, '-').toLowerCase() || 'config'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl h-full bg-[var(--bg-primary)] text-[var(--text-primary)] border-l border-[var(--accent-gold)]/40 shadow-2xl flex flex-col justify-between overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
          <div>
            <h2 id="customizer-title" className="font-serif text-xl font-semibold text-[var(--text-primary)]">
              Personalize Portfolio Data
            </h2>
            <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
              Edit placeholders to reflect your real academic profile
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] px-6 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-[#B69A62] text-[#14243A] font-medium'
                : 'border-transparent text-[#14243A]/60 hover:text-[#14243A]'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#B69A62]" />
            <span>Identity & Bio</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'border-[#B69A62] text-[#14243A] font-medium'
                : 'border-transparent text-[#14243A]/60 hover:text-[#14243A]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#B69A62]" />
            <span>Projects ({formData.projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('achievements')}
            className={`py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'achievements'
                ? 'border-[#B69A62] text-[#14243A] font-medium'
                : 'border-transparent text-[#14243A]/60 hover:text-[#14243A]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#B69A62]" />
            <span>Honors</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#14243A]/70 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#14243A]/70 mb-1">
                    Monogram (Initials)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={formData.profile.monogram}
                    onChange={(e) => handleProfileChange('monogram', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#14243A]/70 mb-1">
                  Applicant Subtitle / Status
                </label>
                <input
                  type="text"
                  value={formData.profile.applicantStatus}
                  onChange={(e) => handleProfileChange('applicantStatus', e.target.value)}
                  className="w-full px-3 py-2 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#14243A]/70 mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.profile.headline}
                  onChange={(e) => handleProfileChange('headline', e.target.value)}
                  className="w-full px-3 py-2 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#14243A]/70 mb-1">
                  Lead Biography / Intellectual Focus
                </label>
                <textarea
                  rows={3}
                  value={formData.profile.leadBio}
                  onChange={(e) => handleProfileChange('leadBio', e.target.value)}
                  className="w-full px-3 py-2 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#14243A]/70 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#14243A]/70 mb-1">
                    Location / Region
                  </label>
                  <input
                    type="text"
                    value={formData.profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                  />
                </div>
              </div>

              {/* Portrait Switcher */}
              <div className="p-4 bg-[#FAF8F5] border border-[#E2DFD6] space-y-3">
                <span className="block text-xs font-mono uppercase tracking-wider text-[#B69A62] font-semibold">
                  Hero Portrait Mode
                </span>
                <div className="flex items-center gap-4 text-xs font-sans">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="portraitType"
                      checked={formData.profile.portraitType === 'typographic'}
                      onChange={() => handleProfileChange('portraitType', 'typographic')}
                    />
                    <span>Archival Typographic Insignia (Monogram)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="portraitType"
                      checked={formData.profile.portraitType === 'image'}
                      onChange={() => handleProfileChange('portraitType', 'image')}
                    />
                    <span>Custom Photograph</span>
                  </label>
                </div>

                {formData.profile.portraitType === 'image' && (
                  <div>
                    <label className="block text-[11px] font-mono text-[#14243A]/60 mb-1">
                      Direct Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/my-portrait.jpg"
                      value={formData.profile.portraitImageUrl || ''}
                      onChange={(e) => handleProfileChange('portraitImageUrl', e.target.value)}
                      className="w-full px-3 py-2 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Social URLs */}
              <div className="space-y-3">
                <span className="block text-xs font-mono uppercase tracking-wider text-[#14243A]/70">
                  Scholarly & Professional URLs
                </span>
                <div>
                  <input
                    type="text"
                    placeholder="GitHub URL"
                    value={formData.profile.githubUrl || ''}
                    onChange={(e) => handleProfileChange('githubUrl', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={formData.profile.linkedinUrl || ''}
                    onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Google Scholar / Citations URL"
                    value={formData.profile.scholarUrl || ''}
                    onChange={(e) => handleProfileChange('scholarUrl', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:border-[#B69A62] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              <p className="text-xs text-[#14243A]/70 font-sans">
                Edit existing sample projects or customize their titles, questions, and outcomes.
              </p>
              {formData.projects.map((proj, idx) => (
                <div key={proj.id} className="p-4 border border-[#E2DFD6] bg-[#FAF8F5] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#B69A62]">
                    <span>Project #{idx + 1}</span>
                    <span className="uppercase">{proj.category}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#14243A]/60 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#14243A]/60 mb-1">
                      Problem Statement
                    </label>
                    <textarea
                      rows={2}
                      value={proj.problemStatement}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].problemStatement = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#14243A]/60 mb-1">
                      Student Contribution
                    </label>
                    <textarea
                      rows={2}
                      value={proj.studentContribution}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].studentContribution = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <p className="text-xs text-[#14243A]/70 font-sans">
                Manage your verified honors, Olympiads, and academic program distinctions.
              </p>
              {formData.achievements.map((ach, idx) => (
                <div key={ach.id} className="p-4 border border-[#E2DFD6] bg-[#FAF8F5] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#B69A62]">
                    <span>Honor #{idx + 1}</span>
                    <label className="flex items-center gap-1.5 text-xs text-[#14243A] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ach.isVerified}
                        onChange={(e) => {
                          const updated = [...formData.achievements];
                          updated[idx].isVerified = e.target.checked;
                          setFormData({ ...formData, achievements: updated });
                        }}
                      />
                      <span>Verified Record</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#14243A]/60 mb-1">
                      Honor Title
                    </label>
                    <input
                      type="text"
                      value={ach.title}
                      onChange={(e) => {
                        const updated = [...formData.achievements];
                        updated[idx].title = e.target.value;
                        setFormData({ ...formData, achievements: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#14243A]/60 mb-1">
                        Awarding Body
                      </label>
                      <input
                        type="text"
                        value={ach.awardingBody}
                        onChange={(e) => {
                          const updated = [...formData.achievements];
                          updated[idx].awardingBody = e.target.value;
                          setFormData({ ...formData, achievements: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#14243A]/60 mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        value={ach.year}
                        onChange={(e) => {
                          const updated = [...formData.achievements];
                          updated[idx].year = e.target.value;
                          setFormData({ ...formData, achievements: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs font-sans bg-[#F4F1EA] border border-[#E2DFD6] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              title="Download portfolio JSON file"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-[var(--text-primary)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface)] rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span className="hidden sm:inline">Export JSON</span>
            </button>

            <button
              type="button"
              onClick={onResetData}
              title="Reset all placeholders to default curated state"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-red-500 hover:bg-red-500/10 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-mono uppercase tracking-wider text-white bg-[var(--accent-navy)] hover:bg-[var(--accent-navy-hover)] rounded transition-colors shadow-xs"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span>Apply & Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
