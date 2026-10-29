import React from 'react';
import { BookOpen, UserCheck, HeartHandshake, Mail, Phone } from 'lucide-react';
import { CV_DATA } from '../data/initialPortfolio';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400">
              <span>Biographical Narrative</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display text-balance">
              Where literary depth meets cinematic execution.
            </h2>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-normal">
              <p>
                My creative path started at the intersection of language, human advocacy, and visual media. As a Magna Cum Laude graduate in Filipino Literature from MSU-IIT and a Certified Paralegal, I approach video editing and graphic design with rare narrative discipline: every cut, color curve, and title card serves a clear emotional and intellectual purpose.
              </p>
              <p>
                Over the past 5 years, I have directed creative campaigns for university spectacles like <em>MSU-IIT Drag Superstar</em> (serving 3 consecutive seasons as Chairperson), designed high-converting advertising suites for Amazon USA clients at UPSERA, and produced radiobroadcast segments for Friends Radio 96.7 FMR.
              </p>
              <p>
                Whether pacing a 30-second vertical social ad, directing an expansive multi-camera stage teaser, or designing an advocacy campaign for community health, I combine artistic intuition with deadline reliability and meticulous detail.
              </p>
            </div>

            {/* Academic Presentations & Colloquia */}
            <div className="pt-4">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">
                Keynote Lectures & Conference Papers
              </h3>
              <div className="space-y-2.5">
                {CV_DATA.publicationsAndLectures.map((pub) => (
                  <div
                    key={pub.title}
                    className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs"
                  >
                    <p className="font-semibold text-neutral-200">{pub.title}</p>
                    <p className="text-neutral-400 mt-0.5">
                      {pub.event} · <span className="font-mono text-amber-400">{pub.year}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Academic References & Contact snapshot */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800/80">
              <h3 className="text-base font-bold text-white mb-4 font-display flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Academic & Professional References</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="pb-3 border-b border-neutral-800">
                  <p className="font-semibold text-white">Asst. Prof. Loi Vincent C. Deriada, MA</p>
                  <p className="text-neutral-400">Departamento ng Filipino at Panitikan · MSU-IIT</p>
                  <a
                    href="mailto:loivincent.deriada@g.msuiit.edu.ph"
                    className="text-amber-400 hover:underline mt-0.5 inline-block"
                  >
                    loivincent.deriada@g.msuiit.edu.ph
                  </a>
                </div>

                <div className="pb-3 border-b border-neutral-800">
                  <p className="font-semibold text-white">Orlie B. Basalo, MSc, RCh, RChT</p>
                  <p className="text-neutral-400">Department of Chemistry · MSU-IIT / MSU - MAIN</p>
                  <a
                    href="mailto:orlie.basalo@g.msuiit.edu.ph"
                    className="text-amber-400 hover:underline mt-0.5 inline-block"
                  >
                    orlie.basalo@g.msuiit.edu.ph
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-white">Asst. Prof. Dadine Kristine Ann Vacalares, MA</p>
                  <p className="text-neutral-400">Departamento ng Filipino at Panitikan · MSU-IIT</p>
                  <a
                    href="mailto:dadine.vacalares@g.msuiit.edu.ph"
                    className="text-amber-400 hover:underline mt-0.5 inline-block"
                  >
                    dadine.vacalares@g.msuiit.edu.ph
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
              <h3 className="text-sm font-semibold text-white mb-3">
                Direct Inquiries
              </h3>
              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${CV_DATA.email}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {CV_DATA.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{CV_DATA.phone[0]} / {CV_DATA.phone[1]}</span>
                </div>
                <div className="pt-2 text-neutral-400">
                  <span>Based in Iligan City, Philippines · Open to worldwide remote contracts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
