import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Copy } from 'lucide-react';
import { CV_DATA } from '../data/initialPortfolio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Video Editing / Post-Production',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CV_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400">
              <span>Collaboration</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Available for Hire</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              Let's create something memorable together.
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              Available for commercial video editing, social media campaign design, event trailers, and creative direction contracts.
            </p>

            <div className="space-y-4 pt-4 text-xs">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="block text-neutral-400 font-medium">Email Address</span>
                  <a
                    href={`mailto:${CV_DATA.email}`}
                    className="text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                  >
                    {CV_DATA.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 text-neutral-400 hover:text-white rounded transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-neutral-400 font-medium">Phone / WhatsApp / Telegram</span>
                  <p className="text-sm font-semibold text-white">
                    {CV_DATA.phone[0]} / {CV_DATA.phone[1]}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-neutral-400 font-medium">Location</span>
                  <p className="text-sm font-semibold text-white">
                    {CV_DATA.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Send a Project Brief
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Share your requirements, timelines, or video references.
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-neutral-950/80 rounded-xl border border-neutral-800 space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white font-display">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto">
                    Thank you, {formData.name}. Jonh Paul will review your brief and respond to {formData.email} promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'Video Editing / Post-Production',
                        message: '',
                      });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-amber-400 hover:text-white bg-neutral-900 rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Project Scope
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-700 transition-colors"
                    >
                      <option value="Video Editing / Post-Production">Video Editing / Commercial Reel</option>
                      <option value="Motion Graphics & 3D Typography">Motion Graphics & Title Sequence</option>
                      <option value="Social Media Ad Creatives">TikTok / Instagram Short-Form Creatives</option>
                      <option value="Graphic Design & Branding">Graphic Design & Brand Collateral</option>
                      <option value="Creative Direction / Event Production">Creative Direction & Event Production</option>
                      <option value="Legal Research / Paralegal Consulting">Legal Research & Paralegal Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Project Details & Timeline *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your video or design project, deliverables needed, target deadline..."
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors shadow-sm"
                  >
                    <span>Submit Project Brief</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
