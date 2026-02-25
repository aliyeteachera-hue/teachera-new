import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowUpRight, Globe, GraduationCap, Briefcase } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SubProgram {
  name: string;
  tags?: string[];
}

interface ProgramCategory {
  title: string;
  icon?: React.ReactNode;
  items?: string[];
}

interface Language {
  id: string;
  name: string;
  nativeName: string;
  image: string;
  accent: string;
  description: string;
  categories: ProgramCategory[];
}

const languages: Language[] = [
  {
    id: 'en',
    name: 'İngilizce',
    nativeName: 'English',
    // London Big Ben/Elizabeth Tower - Iconic & Historical
    image: 'https://images.unsplash.com/photo-1640460801443-866b41ace220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accent: '#E70000',
    description: 'Küresel iletişimin anahtarı.',
    categories: [
      { 
        title: 'Genel',
        icon: <Globe size={14} />,
        items: ['A1-C2', 'Konuşma Kulübü']
      },
      { 
        title: 'Akademik',
        icon: <GraduationCap size={14} />,
        items: ['IELTS', 'TOEFL', 'PTE', 'YDS']
      },
      { 
        title: 'İş Dünyası',
        icon: <Briefcase size={14} />,
        items: ['Business', 'Legal', 'Medical']
      }
    ]
  },
  {
    id: 'es',
    name: 'İspanyolca',
    nativeName: 'Español',
    // Seville Plaza de Espana - Iconic & Historical
    image: 'https://images.unsplash.com/photo-1758384891700-64c7ec4034eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accent: '#FFC400',
    description: 'Tutkunun ve sanatın dili.',
    categories: [
      { 
        title: 'Genel',
        icon: <Globe size={14} />,
        items: ['A1-C2', 'Pratik']
      },
      { 
        title: 'Sınav',
        icon: <GraduationCap size={14} />,
        items: ['DELE', 'SIELE']
      }
    ]
  },
  {
    id: 'it',
    name: 'İtalyanca',
    nativeName: 'Italiano',
    // Rome Colosseum - Iconic & Historical
    image: 'https://images.unsplash.com/photo-1610113359997-0757e2a3323d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accent: '#008C45',
    description: 'Kültür, sanat ve tarih.',
    categories: [
      { 
        title: 'Genel',
        icon: <Globe size={14} />,
        items: ['A1-C2', 'Kültür']
      },
      { 
        title: 'Akademik',
        icon: <GraduationCap size={14} />,
        items: ['CILS', 'CELI', 'Mimarlık']
      }
    ]
  },
  {
    id: 'de',
    name: 'Almanca',
    nativeName: 'Deutsch',
    // Berlin Brandenburg Gate - Iconic & Historical
    image: 'https://images.unsplash.com/photo-1631404359560-84d1f5041d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accent: '#DD0000',
    description: 'Mühendislik ve felsefe.',
    categories: [
      { 
        title: 'Genel',
        icon: <Globe size={14} />,
        items: ['A1-C1', 'Yoğun']
      },
      { 
        title: 'Sınav',
        icon: <GraduationCap size={14} />,
        items: ['Goethe', 'TestDaF', 'Telc']
      }
    ]
  },
  {
    id: 'fr',
    name: 'Fransızca',
    nativeName: 'Français',
    // Paris Eiffel Tower - Iconic & Historical
    image: 'https://images.unsplash.com/photo-1694432910044-24d3ab57fc50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accent: '#0055A4',
    description: 'Diplomasi ve estetik.',
    categories: [
      { 
        title: 'Genel',
        icon: <Globe size={14} />,
        items: ['A1-C2']
      },
      { 
        title: 'Akademik',
        icon: <GraduationCap size={14} />,
        items: ['DELF', 'DALF', 'TCF']
      }
    ]
  },
  {
    id: 'ru',
    name: 'Rusça',
    nativeName: 'Русский',
    // Moscow St Basil's - Iconic & Historical
    image: 'https://images.unsplash.com/photo-1611699123681-5dd17ffd2927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accent: '#D52B1E',
    description: 'Edebiyatın ve gücün dili.',
    categories: [
      { 
        title: 'Genel',
        icon: <Globe size={14} />,
        items: ['Pratik', 'Kiril']
      },
      { 
        title: 'İş & Sınav',
        icon: <Briefcase size={14} />,
        items: ['TORFL', 'Ticari']
      }
    ]
  }
];

export default function Programs() {
  const [activeId, setActiveId] = useState<string>('en'); // Default expanded on desktop
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track mobile scroll to update indicators
  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollPosition = container.scrollLeft;
      const cardWidth = container.clientWidth * 0.78; // 78vw estimate
      const index = Math.round(scrollPosition / cardWidth);
      setMobileIndex(Math.min(Math.max(index, 0), languages.length - 1));
    }
  };

  return (
    <section id="programs" className="relative py-24 bg-[#00000B] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#324D47] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.08]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#1a365d] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.08]" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#324D47] font-['Neutraface_2_Text:Bold',sans-serif] tracking-[0.2em] text-xs uppercase mb-3 block"
            >
              Keşfet
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-['Neutraface_2_Text:Bold',sans-serif] text-[rgba(255,255,255,1)] leading-[1.05]"
            >
              Diller ve Kültürler.<br />
              <span className="text-[rgba(255,255,255,0.4)]">Sınırları Kaldırın.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-[rgba(255,255,255,0.4)] text-sm font-['Neutraface_2_Text:Book',sans-serif]"
          >
            <span>Program detayları için kartların üzerine gelin</span>
            <ArrowUpRight size={16} />
          </motion.div>
        </div>

        {/* --- DESKTOP VIEW: Hover-Expand Accordion --- */}
        <div className="hidden lg:flex h-[600px] w-full gap-2 relative">
          {languages.map((lang) => (
            <DesktopCard 
              key={lang.id} 
              lang={lang} 
              isActive={activeId === lang.id} 
              onHover={() => setActiveId(lang.id)}
            />
          ))}
        </div>

        {/* --- MOBILE VIEW: Horizontal Snap Scroll --- */}
        <div className="lg:hidden relative -mx-6">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="relative w-full overflow-x-auto snap-x snap-mandatory flex gap-4 pb-8 px-6 custom-scrollbar-hide"
          >
            {languages.map((lang) => (
              <MobileCard key={lang.id} lang={lang} />
            ))}
            {/* Spacer to allow last card to be fully viewable/centered */}
            <div className="w-6 shrink-0" />
          </div>
          
          {/* Mobile Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-2 absolute bottom-0 w-full">
            {languages.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === mobileIndex ? 'w-6 bg-[#324D47]' : 'w-1.5 bg-[rgba(255,255,255,0.2)]'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// --- Desktop Card Component ---
function DesktopCard({ 
  lang, 
  isActive, 
  onHover 
}: { 
  lang: Language; 
  isActive: boolean; 
  onHover: () => void;
}) {
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      className={`relative h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isActive ? 'flex-[4]' : 'flex-[1]'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <ImageWithFallback 
          src={lang.image} 
          alt={lang.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-100 grayscale-0' : 'scale-125 grayscale-[80%] hover:scale-110'}`}
        />
        <div className={`absolute inset-0 bg-[rgba(0,0,0,0.6)] transition-opacity duration-500 ${isActive ? 'opacity-30' : 'opacity-70'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-end">
        
        {/* Collapsed State: Vertical Text */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h3 className="text-3xl text-[rgba(255,255,255,0.9)] font-['Neutraface_2_Text:Bold',sans-serif] tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 opacity-80">
              {lang.name}
            </h3>
          </div>
        )}

        {/* Expanded State: Full Content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-full"
            >
              {/* Header */}
              <div className="mb-6 border-l-4 pl-6" style={{ borderColor: lang.accent }}>
                <span className="text-[rgba(255,255,255,0.6)] text-sm tracking-widest uppercase font-['Neutraface_2_Text:Demi',sans-serif] mb-1 block">
                  {lang.nativeName}
                </span>
                <h3 className="text-6xl font-['Neutraface_2_Text:Bold',sans-serif] text-[rgba(255,255,255,1)] leading-none mb-2">
                  {lang.name}
                </h3>
                <p className="text-[rgba(255,255,255,0.8)] font-['Neutraface_2_Text:Book',sans-serif] text-lg max-w-md">
                  {lang.description}
                </p>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {lang.categories.map((cat, idx) => (
                  <div key={idx} className="bg-[rgba(255,255,255,0.1)] backdrop-blur-md rounded-xl p-4 border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.15)] transition-colors">
                    <div className="flex items-center gap-3 mb-2 text-[rgba(255,255,255,1)]">
                      <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.1)]">
                        {cat.icon}
                      </div>
                      <span className="font-['Neutraface_2_Text:Demi',sans-serif] text-sm">
                        {cat.title}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-1">
                      {cat.items?.map((item, i) => (
                        <span key={i} className="text-[11px] text-[rgba(255,255,255,0.6)] bg-[rgba(0,0,0,0.2)] px-2 py-0.5 rounded-md">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button className="group flex items-center gap-3 px-8 py-4 bg-[rgba(255,255,255,1)] text-[rgba(0,0,0,1)] rounded-full font-['Neutraface_2_Text:Bold',sans-serif] hover:bg-[#f0f0f0] transition-all">
                <span>Programı Keşfet</span>
                <div className="w-6 h-6 rounded-full bg-[rgba(0,0,0,1)] text-[rgba(255,255,255,1)] flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowUpRight size={12} />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- Mobile Card Component ---
function MobileCard({ lang }: { lang: Language }) {
  return (
    <div className="snap-center shrink-0 w-[78vw] h-[500px] relative rounded-[2rem] overflow-hidden bg-[#000000] shadow-lg">
      <div className="absolute inset-0">
        <ImageWithFallback 
          src={lang.image} 
          alt={lang.name} 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent" />
      </div>

      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="mb-4">
           <span className="inline-block px-3 py-1 rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-xs text-[rgba(255,255,255,0.8)] mb-3 font-['Neutraface_2_Text:Demi',sans-serif]">
             {lang.nativeName}
           </span>
           <h3 className="text-4xl font-['Neutraface_2_Text:Bold',sans-serif] text-[rgba(255,255,255,1)] leading-none mb-2">
             {lang.name}
           </h3>
           <div className="w-12 h-1 rounded-full mb-3" style={{ backgroundColor: lang.accent }} />
           <p className="text-[rgba(255,255,255,0.7)] text-sm font-['Neutraface_2_Text:Book',sans-serif] line-clamp-2">
             {lang.description}
           </p>
        </div>

        <div className="space-y-3 mb-6">
          {lang.categories.slice(0, 2).map((cat, i) => (
            <div key={i} className="flex items-center gap-3 text-[rgba(255,255,255,0.8)]">
               <span className="p-1.5 rounded-md bg-[rgba(255,255,255,0.1)]">{cat.icon}</span>
               <span className="text-sm">{cat.title}</span>
               <span className="text-xs text-[rgba(255,255,255,0.4)] ml-auto">{cat.items?.length} Seçenek</span>
            </div>
          ))}
        </div>

        <button className="w-full py-3.5 bg-[rgba(255,255,255,1)] text-[rgba(0,0,0,1)] rounded-xl font-['Neutraface_2_Text:Bold',sans-serif] text-sm flex items-center justify-center gap-2">
          İncele
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}