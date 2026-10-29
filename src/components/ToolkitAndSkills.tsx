import React from 'react';
import { Film, Palette, Sparkles, Scale, Languages, Layers } from 'lucide-react';

export const ToolkitAndSkills: React.FC = () => {
  const skillClusters = [
    {
      category: 'Video Editing & Motion',
      icon: Film,
      skills: [
        'Adobe Premiere Pro',
        'Adobe After Effects',
        'DaVinci Resolve',
        'CapCut Desktop & Mobile',
        'Kinetic Typography',
        'Color Grading & Scopes',
        'Beat-Matched Pacing',
        'Audio Sweetening',
      ],
      description: 'Technical proficiency with industry suites crafting narrative flow and engagement.',
    },
    {
      category: 'Graphic Design & Branding',
      icon: Palette,
      skills: [
        'Adobe Photoshop',
        'Canva Pro',
        'Desktop Publishing',
        'Print Materials & Signs',
        'Amazon Ads & Social Creatives',
        'Event Posters & Risograph',
        'Brand Style Guides',
        'Photo Manipulation',
      ],
      description: 'High-converting commercial visual design for e-commerce, arts, and advocacy.',
    },
    {
      category: 'Creative Direction & Events',
      icon: Sparkles,
      skills: [
        'Stage Production Concepts',
        'Photoshoot Direction',
        'Drag Superstar Management',
        'Theme Curation',
        'Multidisciplinary Coordination',
        'Performance Logistics',
      ],
      description: '3 consecutive seasons directing university-scale performance art spectacles.',
    },
    {
      category: 'Legal & Academic Research',
      icon: Scale,
      skills: [
        'Certified Paralegal (CEPL)',
        'Legal Research & Writing',
        'Drafting of Pleadings',
        'Case & Document Management',
        'Critical Discourse Analysis',
        'Literary & Media Criticism',
      ],
      description: 'Dual competence merging rigorous analytical inquiry with creative communication.',
    },
  ];

  return (
    <section id="skills" className="py-20 border-b border-neutral-900 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-amber-400 mb-2">
            <span>Core Competencies</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Software Suites</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Methodologies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
            Toolkit & Capabilities
          </h2>
          <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
            A versatile creative arsenal tested across commercial e-commerce, collegiate theater productions, radio broadcasting, and legal research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillClusters.map((cluster) => {
            const Icon = cluster.icon;
            return (
              <div
                key={cluster.category}
                className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-amber-400 mb-4 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 font-display">
                    {cluster.category}
                  </h3>

                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                    {cluster.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-neutral-800">
                    {cluster.skills.map((skill) => (
                      <div
                        key={skill}
                        className="text-xs text-neutral-200 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-amber-400" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Languages Strip */}
        <div className="mt-8 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium text-white">Languages:</span>
            <span>Cebuano (Native)</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Filipino (Fluent)</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>English (Fluent)</span>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
            <span>Basic HTML Coding</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Microsoft Office Suite</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Audio Mastering</span>
          </div>
        </div>
      </div>
    </section>
  );
};
