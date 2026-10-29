import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles,
  Eye,
  X,
} from 'lucide-react';
import { CV_DATA } from '../data/initialPortfolio';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceAndCV: React.FC = () => {
  const { profilePhoto } = usePortfolio();
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  return (
    <section id="experience" className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400 mb-2">
              <span>Profile & Credentials</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Magna Cum Laude</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Certified Paralegal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              Experience & Academic Record
            </h2>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowPdfViewer(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Preview Full CV</span>
            </button>
            <a
              href={CV_DATA.cvPdfPath}
              download="CV_JONH_PAUL_VILLAMORA.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>

        {/* Profile Card & Bio */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0 shadow-lg">
              <img
                src={profilePhoto}
                alt={CV_DATA.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {CV_DATA.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mt-1">
                  <span className="text-amber-400 font-medium">MSU-IIT Magna Cum Laude</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>Multimedia Head & Video Editor</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>Certified Paralegal (CEPL)</span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed max-w-4xl font-normal">
                {CV_DATA.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <span>📍 {CV_DATA.address}</span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span>✉️ {CV_DATA.email}</span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span>📞 {CV_DATA.phone[0]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Work Experience vs Honors & Leadership */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Column 1: Work Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-800">
              <Briefcase className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white font-display">
                Professional Experience
              </h3>
            </div>

            <div className="space-y-6">
              {CV_DATA.workExperience.map((job) => (
                <div
                  key={`${job.company}-${job.role}`}
                  className="p-5 rounded-xl bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <h4 className="text-sm font-semibold text-white">
                      {job.role}
                    </h4>
                    <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-xs text-amber-400/90 font-medium mb-2">
                    {job.company}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>

            {/* License & Certification Box */}
            <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800/80">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
                <span>Professional License</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">
                Certified Paralegal (CEPL)
              </h4>
              <p className="text-xs text-neutral-400 mb-2">
                Certified Paralegals and Legal Researchers Training Center Inc · Oct 2026 - Present
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Qualified in legal research, drafting pleadings, case documentation, and court procedures with strict confidentiality.
              </p>
            </div>
          </div>

          {/* Column 2: Honors, Awards & Creative Leadership */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-800">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white font-display">
                Honors & Academic Awards
              </h3>
            </div>

            <div className="space-y-3">
              {CV_DATA.topAwards.map((award) => (
                <div
                  key={award.award}
                  className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/80"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      {award.award}
                    </h4>
                    <span className="text-[11px] font-mono text-amber-400 tabular-nums shrink-0">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    {award.organization} — {award.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Creative Leadership & Production */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-800">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Creative Direction & Leadership
                </h3>
              </div>

              <div className="space-y-3">
                {CV_DATA.leadershipAndCreative.map((lead) => (
                  <div
                    key={`${lead.organization}-${lead.role}`}
                    className="p-4 rounded-xl bg-neutral-900 border border-neutral-800/80"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h4 className="text-xs sm:text-sm font-semibold text-white">
                        {lead.role}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400 tabular-nums shrink-0">
                        {lead.period}
                      </span>
                    </div>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                      {lead.organization}
                    </p>
                    <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                      {lead.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Modal Viewer */}
      {showPdfViewer && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="absolute inset-0" onClick={() => setShowPdfViewer(false)} />

          <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white font-display">
                    Official Curriculum Vitae · Jonh Paul U. Villamora, CEPL
                  </h3>
                  <p className="text-xs text-neutral-400">
                    PDF Document (11 pages)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={CV_DATA.cvPdfPath}
                  download="CV_JONH_PAUL_VILLAMORA.pdf"
                  className="px-3 py-1.5 text-xs font-semibold bg-amber-400 text-neutral-950 rounded-lg hover:bg-amber-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setShowPdfViewer(false)}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-neutral-950 w-full h-full">
              <iframe
                src={CV_DATA.cvPdfPath}
                title="Curriculum Vitae Preview"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
