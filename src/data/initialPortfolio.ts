import { PortfolioItem } from '../utils/mediaUtils';

// Reference generated high-res visual assets
import heroCinematic from '../assets/images/hero_editor_cinematic_1793289734271.jpg';
import motionGraphicsStill from '../assets/images/project_motion_graphics_1793289712610.jpg';
import posterEventStill from '../assets/images/project_poster_event_1793289713920.jpg';
import brandSocialStill from '../assets/images/project_brand_social_1793289714472.jpg';
import portraitDirector from '../assets/images/portrait_creative_director_1793289714186.jpg';

export { heroCinematic, motionGraphicsStill, posterEventStill, brandSocialStill, portraitDirector };

export const INITIAL_VIDEOS: PortfolioItem[] = [
  {
    id: 'vid-1',
    type: 'video',
    title: 'MSU-IIT Drag Superstar Season 4 — Official Cinematic Teaser',
    category: 'Event & Teasers',
    client: 'KASAMA MSU-IIT',
    year: '2026',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    description:
      'High-energy promotional trailer conceptualized and edited as Chairperson & Creative Director. Featuring dynamic speed ramping, beat-synchronized cuts, and custom neon title typography.',
    mediaUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm',
    thumbnailUrl: heroCinematic,
    aspectRatio: '16:9',
    duration: '1:12',
    featured: true,
  },
  {
    id: 'vid-2',
    type: 'video',
    title: 'Velora Beauty E-Commerce Product Launch Reel',
    category: 'Commercial & Ads',
    client: 'UPSERA / Amazon USA',
    year: '2025',
    tools: ['CapCut', 'Premiere Pro', 'Photoshop'],
    description:
      'High-converting short-form commercial ad tailored for TikTok and Instagram Reels. Engineered to maximize viewer retention with seamless swipe transitions, punch-in text callouts, and vibrant color grading.',
    mediaUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    thumbnailUrl: brandSocialStill,
    aspectRatio: '9:16',
    duration: '0:38',
    featured: true,
  },
  {
    id: 'vid-3',
    type: 'video',
    title: 'Dynamic 3D Kinetic Typography & Motion Title Sequence',
    category: 'Motion Graphics',
    client: 'Creative Studio Showreel',
    year: '2025',
    tools: ['After Effects', 'Premiere Pro'],
    description:
      'Avant-garde kinetic typography exploration featuring 3D letterform distortion, chromatic aberration, and holographic glass texture rendering for high-impact film intros.',
    mediaUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.480p.vp9.webm',
    thumbnailUrl: motionGraphicsStill,
    aspectRatio: '16:9',
    duration: '1:45',
    featured: true,
  },
  {
    id: 'vid-4',
    type: 'video',
    title: 'Salindunong International Research Colloquium Mini-Doc',
    category: 'Documentary & Recaps',
    client: 'International Research Conference',
    year: '2025',
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    description:
      'Documentary conference highlights and academic delegate spotlight. Subtle documentary pacing with balanced multi-mic audio mastering, clean lower-thirds, and cinematic B-roll storytelling.',
    mediaUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.480p.vp9.webm',
    thumbnailUrl: heroCinematic,
    aspectRatio: '16:9',
    duration: '2:30',
    featured: false,
  },
  {
    id: 'vid-5',
    type: 'video',
    title: 'Youth for Safety: Digital Rights & Protection Campaign',
    category: 'Short-Form Reels',
    client: 'Youth for Safety Iligan',
    year: '2024',
    tools: ['CapCut', 'Premiere Pro'],
    description:
      'Fast-paced advocacy educational reel raising awareness on digital safety and child protection (OSAEC). Features kinetic subtitles, motion infographics, and dynamic sound design.',
    mediaUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
    thumbnailUrl: posterEventStill,
    aspectRatio: '9:16',
    duration: '0:54',
    featured: false,
  },
  {
    id: 'vid-6',
    type: 'video',
    title: 'Friends Radio 96.7 FMR — On-Air Studio Broadcast Segment',
    category: 'Broadcast & Media',
    client: 'Friends Radio 96.7 FMR',
    year: '2025',
    tools: ['Premiere Pro', 'Audition'],
    description:
      'Broadcast-ready studio news report and guest interview compilation produced during media station internship, demonstrating bilingual journalistic storytelling and crisp broadcast audio.',
    mediaUrl: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.480p.vp9.webm',
    thumbnailUrl: heroCinematic,
    aspectRatio: '16:9',
    duration: '1:50',
    featured: false,
  },
];

export const INITIAL_GRAPHICS: PortfolioItem[] = [
  {
    id: 'gfx-1',
    type: 'graphic',
    title: 'Youth Rising Arts & Performance Festival 2024 Poster',
    category: 'Posters & Events',
    client: 'Arts & Literary Guild',
    year: '2024',
    tools: ['Photoshop', 'Canva'],
    description:
      'Award-winning risograph-inspired poster celebrating youth dance, theater, and music. Features bold distressed typography, dynamic color blocking, and textured screenprint grain.',
    mediaUrl: posterEventStill,
    thumbnailUrl: posterEventStill,
    aspectRatio: '4:3',
    featured: true,
  },
  {
    id: 'gfx-2',
    type: 'graphic',
    title: 'Velora Beauty — Amazon Ads & Digital Campaign Suite',
    category: 'Social Media & E-Commerce',
    client: 'Amazon / UPSERA',
    year: '2022',
    tools: ['Photoshop', 'Canva'],
    description:
      'High-converting commercial visual system created during tenure as Graphic Designer for Amazon USA client, boosting click-through rate through clean typography and product-focused layouts.',
    mediaUrl: brandSocialStill,
    thumbnailUrl: brandSocialStill,
    aspectRatio: '4:3',
    featured: true,
  },
  {
    id: 'gfx-3',
    type: 'graphic',
    title: 'Dynamic 3D Typography & Motion Still Artwork',
    category: 'Motion Design',
    client: 'Editorial Exploration',
    year: '2025',
    tools: ['After Effects', 'Photoshop'],
    description:
      'High-impact iridescent 3D letterform sculpture crafted for digital title sequences and creative direction portfolio showcase.',
    mediaUrl: motionGraphicsStill,
    thumbnailUrl: motionGraphicsStill,
    aspectRatio: '16:9',
    featured: true,
  },
  {
    id: 'gfx-4',
    type: 'graphic',
    title: 'MSU-IIT Drag Superstar Season 3 & 4 Stage Visual Identity',
    category: 'Brand Identity',
    client: 'KASAMA MSU-IIT',
    year: '2025',
    tools: ['Photoshop', 'Canva', 'Premiere Pro'],
    description:
      'Complete creative direction including stage backdrops, contestant motion cards, VIP badges, and social media announcements celebrating collegiate performance arts.',
    mediaUrl: posterEventStill,
    thumbnailUrl: posterEventStill,
    aspectRatio: '4:3',
    featured: false,
  },
  {
    id: 'gfx-5',
    type: 'graphic',
    title: 'ILAW Shared Community Human Rights & Health Collateral',
    category: 'Print & Advocacy',
    client: 'ILAW Shared Community',
    year: '2024',
    tools: ['Photoshop', 'Canva'],
    description:
      'Comprehensive print collateral including brochures, banners, and infographic handouts for civic engagement, HIV awareness, and community health literacy.',
    mediaUrl: brandSocialStill,
    thumbnailUrl: brandSocialStill,
    aspectRatio: '4:3',
    featured: false,
  },
  {
    id: 'gfx-6',
    type: 'graphic',
    title: 'CASS Days Radiobroadcasting & Desktop Publishing Layout',
    category: 'Editorial & Print',
    client: 'College of Arts and Social Sciences',
    year: '2023',
    tools: ['Photoshop', 'InDesign', 'Canva'],
    description:
      'Award-winning desktop publishing and publication layout for collegiate literary competition, blending structured grid systems with modern editorial elegance.',
    mediaUrl: posterEventStill,
    thumbnailUrl: posterEventStill,
    aspectRatio: '4:3',
    featured: false,
  },
];

export const CV_DATA = {
  name: 'JONH PAUL U. VILLAMORA, CEPL',
  title: 'Multimedia Specialist · Video Editor · Certified Paralegal',
  phone: ['+639362495461', '+639603125725'],
  email: 'jonhpaul.villamora24@gmail.com',
  address: 'Prk. 15 Tibanga, Iligan City, 9200, Philippines',
  cvPdfPath: '/assets/aistudio/CV_JONH_PAUL_VILLAMORA_1b2afe3f.pdf',
  summary:
    'A Certified Paralegal and Magna Cum Laude graduate with extensive technical proficiency in video editing, motion graphics, graphic design, and creative direction. Combines narrative storytelling, technical precision across Premiere Pro, After Effects, and DaVinci Resolve, with strong organizational and analytical leadership.',
  education: [
    {
      degree: 'Batsilyer Ng Sining Sa Panitikan (BA Filipino Literature)',
      institution: 'Mindanao State University – Iligan Institute of Technology',
      period: 'Aug 2022 – July 2026',
      honors: 'Graduated Magna Cum Laude · Gawad Chancellor’s Award for Academic Excellence',
    },
    {
      degree: 'Senior High School (STEM - Science, Technology, Engineering, Mathematics)',
      institution: 'La Salle Academy',
      period: 'Sept 2020 – July 2022',
      honors: 'Supreme Student Government STEM Vice Governor',
    },
    {
      degree: 'Junior High School',
      institution: 'La Salle Academy',
      period: 'June 2016 – March 2020',
      honors: 'Student Council Representative · DSPC 2019 Radiobroadcasting 4th Runner Up',
    },
  ],
  certifications: [
    {
      title: 'Certified Paralegal (CEPL)',
      issuer: 'Certified Paralegals and Legal Researchers Training Center Inc',
      period: 'Oct 2026 to Present',
      details:
        'Passed certification examination and formal training in legal research, drafting pleadings, case and document management, court procedures, and professional ethics.',
    },
  ],
  workExperience: [
    {
      role: 'Virtual Assistant',
      company: 'Growth OFA, USA',
      period: 'Sept 2024 to Present',
      description:
        'Timely customer communications, chat multitasking during high-traffic intervals, and weekly cross-team process optimization.',
    },
    {
      role: 'Intern, Department of Filipino at Panitikan',
      company: 'Mindanao State University – Iligan Institute of Technology',
      period: 'Sept 2025 to Dec 2025',
      description:
        'Taught Ecocriticism (Ekokritisismo at Pagpapahalaga sa Kalikasan) for undergraduate cohorts, developed curriculum modules, quizzes, and multimedia lecture aids.',
    },
    {
      role: 'Intern, Department of Filipino',
      company: 'Iligan City East National High School',
      period: 'Nov 2025 to Dec 2025',
      description:
        'Instructed Senior High debate and effective communication courses, coaching students on presentation delivery and argumentative discourse.',
    },
    {
      role: 'Intern, Radio Station',
      company: 'Friends Radio 96.7 FMR, Iligan City',
      period: 'Sept 2025 to Nov 2025',
      description:
        'Wrote and delivered news segments for live on-air broadcasting, conducted on-site interviews, and performed audio production fact-checking.',
    },
    {
      role: 'Graphic Designer',
      company: 'Amazon / UPSERA, USA',
      period: 'Sept 2021 to April 2022',
      description:
        'Conceptualized and delivered creative designs for e-commerce print materials, brochures, signs, and high-engagement social media advertising campaigns.',
    },
    {
      role: 'English as Secondary Language Teacher (ESL)',
      company: 'Native Camp, Iligan City',
      period: 'June 2022 to Oct 2022',
      description:
        'Delivered daily 1-on-1 English language and grammar instruction to international students.',
    },
  ],
  topAwards: [
    {
      award: 'Gawad Chancellor’s Award for Academic Excellence',
      year: '2026',
      organization: 'MSU-IIT',
      description: 'Prestigious university-wide recognition for highest academic achievement.',
    },
    {
      award: 'Magna Cum Laude',
      year: '2026',
      organization: 'MSU-IIT',
      description: 'Graduated with high Latin Honors in BA Arts and Literature.',
    },
    {
      award: 'Special Citation for International Paper Presentation',
      year: '2026',
      organization: 'International Research Conference',
      description: 'Presented peer-reviewed research on media representation and cultural studies.',
    },
    {
      award: 'Department Best Thesis Nominee',
      year: '2026',
      organization: 'Department of Filipino at Panitikan, MSU-IIT',
      description: 'Nominated for outstanding research thesis under Asst. Prof. Loi Vincent Deriada.',
    },
    {
      award: 'Best Research Paper & Best Presenter',
      year: '2024',
      organization: 'Sukit-Sukit Research Colloquium',
      description: 'Dual honors for research presentation on queer spatial discourse in Iligan City.',
    },
    {
      award: 'Kasama Leadership & Service Awards',
      year: '2023 – 2026',
      organization: 'University Student Council',
      description: 'Consecutive annual leadership awards for major campus initiatives and advocacy.',
    },
    {
      award: 'Ilaw Shared Community Gold & Silver Medal Awards',
      year: '2022 – 2024',
      organization: 'Non-Government Organization',
      description: 'Distinguished volunteer and community service honors for health advocacy and media leadership.',
    },
  ],
  leadershipAndCreative: [
    {
      role: 'Chairperson & Creative Director (Seasons 2, 3, and 4)',
      organization: 'KASAMA MSU-IIT Drag Superstar',
      period: '2023 – 2026',
      description:
        'Headed overall event production, creative theme direction, marketing videos, stage design, and photoshoots for the premier university performance arts festival.',
    },
    {
      role: 'Senior Officer & Agency Head for Multimedia',
      organization: 'ILAW Shared Community',
      period: '2019 – Present',
      description:
        'Led multimedia campaigns, youth SRHR initiatives, community outreach visual design, and regional event documentation.',
    },
    {
      role: 'Multimedia Head & Secretary',
      organization: 'Youth for Safety Iligan',
      period: '2023 – 2026',
      description:
        'Directed public information campaigns, social video assets, and advocacy materials on digital child safety.',
    },
    {
      role: 'Cabinet Secretary / Associate Secretary',
      organization: 'Kataastaasang Sangguniang ng mga Mag-aaral (KASAMA)',
      period: '2022 – 2026',
      description:
        'Coordinated campus-wide community extension services, environmental, and student affairs programs.',
    },
  ],
  publicationsAndLectures: [
    {
      title: 'SA GITNA NG MELODIYA AT MISOHINIYA: Ang Representasyon ng Babae sa mga Awitin ng NOPETSALLOWED',
      event: '1st Conference on Interdisciplinary Social Sciences and Humanities & 15th CASS Colloquium',
      year: '2026',
      type: 'Publication & Paper Presentation',
    },
    {
      title: 'The Flames of Poverty: The Role of Sex Education in the Lives of Children in India',
      event: 'Salindunong 2025: 3rd International Conference on Filipino Language & Literature',
      year: '2025',
      type: 'International Paper Presentation',
    },
    {
      title: 'Shantay, You Stay or Sashay Away: Ang Espasyong Queer sa Iligan City',
      event: 'Sukit-Sukit Research Conference (Awarded Best Paper & Best Presenter)',
      year: '2024',
      type: 'Keynote & Presentation',
    },
  ],
};
