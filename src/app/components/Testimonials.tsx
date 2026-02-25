import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star, MoveHorizontal } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "Yüksek Mimar",
    company: "Studio Arch",
    content: "Teachera ile başladığım İngilizce yolculuğumda, sadece dil bilgisi değil, aynı zamanda sektörel terminolojiye hakimiyet kazandım. Uluslararası projelerde artık çok daha özgüvenli sunumlar yapabiliyorum.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=750",
    rating: 5
  },
  {
    id: 2,
    name: "Mehmet Demir",
    role: "Yazılım Mühendisi",
    company: "TechSolutions",
    content: "Teknik dökümanları okumak ile global bir toplantıda fikirlerini savunmak arasında dağlar kadar fark var. Speaking odaklı yaklaşım tam da bu boşluğu doldurdu.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=750",
    rating: 5
  },
  {
    id: 3,
    name: "Zeynep Kaya",
    role: "Pazarlama Direktörü",
    company: "Global Brands",
    content: "Kültürel nüanslara hakim olmak hayati önem taşıyor. Teachera sadece dil öğretmiyor; o dilin kültürünü ve inceliklerini de aktarıyor. Premium hizmet anlayışını hissediyorsunuz.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=750",
    rating: 5
  },
  {
    id: 4,
    name: "Caner Öztürk",
    role: "Finans Direktörü",
    company: "Capital Finance",
    content: "Yurtdışı operasyonlarımızı yönetirken yaşadığım en büyük zorluk günlük iş konuşmalarıydı. Business English programı tam benim gibi yöneticiler için tasarlanmış.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=750",
    rating: 5
  },
  {
    id: 5,
    name: "Elif Demir",
    role: "İnsan Kaynakları",
    company: "HR Global",
    content: "Çalışanlarımızın dil gelişimini takip etmek hiç bu kadar kolay olmamıştı. Raporlama sistemleri ve kurumsal çözümleri gerçekten etkileyici.",
    avatar: "https://images.unsplash.com/photo-1598550874175-4d7112ee7f38?auto=format&fit=crop&q=80&w=600&h=750",
    rating: 5
  }
];

const partners = [
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/2048px-Tesla_Motors.svg.png" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Adobe_Corporate_Logo.png/1600px-Adobe_Corporate_Logo.png" }
];

export default function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(el.scrollLeft / maxScroll);
    }
    if (!hasScrolled && el.scrollLeft > 10) {
      setHasScrolled(true);
      setShowSwipeHint(false);
    }
  }, [hasScrolled]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Swipe hint otomatik olarak 5sn sonra kaybolur */
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#00000B] text-white relative overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-[#324D47]/5 rounded-full blur-[120px] opacity-60" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#00000B] rounded-full blur-[100px] z-10" />
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#ffffff]/10 to-transparent" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-20">
        
        {/* Header */}
        <div className="px-6 lg:px-12 mb-12 flex flex-col md:flex-row items-end justify-between gap-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
           >
              <span className="text-[#324D47] text-xs font-['Neutraface_2_Text:Demi',sans-serif] tracking-[0.2em] uppercase block mb-4">
                BAŞARI HİKAYELERİ
              </span>
              <h2 className="text-3xl md:text-5xl font-['Neutraface_2_Text:Bold',sans-serif] leading-[1.1]">
                Öğrencilerimizden <br/>
                <span className="text-[#ffffff]/40">Gerçek Deneyimler.</span>
              </h2>
           </motion.div>

           {/* Desktop Navigation */}
           <div className="hidden md:flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-[#ffffff]/10 flex items-center justify-center hover:bg-[#324D47] hover:border-[#324D47] transition-all duration-300 group"
              >
                 <ChevronLeft size={20} className="text-[#ffffff]/60 group-hover:text-white transition-colors" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-[#ffffff]/10 flex items-center justify-center hover:bg-[#324D47] hover:border-[#324D47] transition-all duration-300 group"
              >
                 <ChevronRight size={20} className="text-[#ffffff]/60 group-hover:text-white transition-colors" />
              </button>
           </div>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 px-6 lg:px-12 snap-x snap-mandatory scrollbar-hide relative"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="min-w-[85vw] md:min-w-[400px] lg:min-w-[450px] snap-center relative"
              >
                <div className="h-full bg-[#ffffff]/5 border border-[#ffffff]/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-[#ffffff]/8 transition-colors duration-300 group flex flex-col justify-between">
                   
                   <div>
                     {/* User Profile */}
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-[#ffffff]/20 group-hover:border-[#324D47] transition-colors relative">
                          <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-lg font-['Neutraface_2_Text:Bold',sans-serif] text-white">
                            {item.name}
                          </h4>
                          <p className="text-[#324D47] text-xs font-['Neutraface_2_Text:Demi',sans-serif] tracking-wide">
                            {item.role}
                          </p>
                          <p className="text-[#ffffff]/40 text-xs mt-0.5">
                            {item.company}
                          </p>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="mb-6 relative">
                       <Quote size={24} className="text-[#ffffff]/10 absolute -top-2 -left-2 transform -scale-x-100" />
                       <p className="text-[#ffffff]/80 font-['Neutraface_2_Text:Book',sans-serif] leading-relaxed relative z-10 pl-4">
                         "{item.content}"
                       </p>
                     </div>
                   </div>

                   {/* Rating */}
                   <div className="flex gap-1 pt-6 border-t border-[#ffffff]/10">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#324D47" className="text-[#324D47]" />
                      ))}
                   </div>

                </div>
              </motion.div>
            ))}
            
            {/* Spacer for right padding */}
            <div className="min-w-[1px] md:hidden relative" />
          </div>

          {/* Swipe Hint Overlay – mobilde ortada, animasyonlu */}
          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#00000B]/80 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-2.5 border border-[#ffffff]/15 shadow-lg shadow-black/30"
                >
                  <motion.div
                    animate={{ x: [0, 8, 0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <MoveHorizontal size={16} className="text-[#324D47]" />
                  </motion.div>
                  <span className="font-['Neutraface_2_Text:Demi',sans-serif] text-[12px] text-white/70 tracking-wide">
                    Kaydırarak keşfedin
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="px-6 lg:px-12 mt-4 mb-8">
          <div className="flex items-center gap-4">
            {/* Progress Bar */}
            <div className="flex-1 h-[2px] bg-[#ffffff]/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#324D47] rounded-full"
                style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            </div>
            {/* Dot Indicators */}
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => {
                const segmentProgress = scrollProgress * (testimonials.length - 1);
                const isActive = Math.abs(segmentProgress - idx) < 0.5;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const el = scrollContainerRef.current;
                      if (!el) return;
                      const maxScroll = el.scrollWidth - el.clientWidth;
                      el.scrollTo({
                        left: (idx / (testimonials.length - 1)) * maxScroll,
                        behavior: 'smooth',
                      });
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-6 h-2 bg-[#324D47]'
                        : 'w-2 h-2 bg-[#ffffff]/15 hover:bg-[#ffffff]/30'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Partners Marquee - PRESERVED */}
        <div className="border-t border-[#ffffff]/10 pt-20 mt-12 mx-6 lg:mx-12 relative">
           <div className="flex items-center justify-center mb-16">
              <h3 className="text-sm font-['Neutraface_2_Text:Demi',sans-serif] text-[#ffffff]/40 tracking-[0.3em] uppercase">
                 Eğitim Partnerlerimiz
              </h3>
           </div>

           <div className="relative w-full overflow-hidden mask-gradient-horizontal">
              {/* Left & Right Fade Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#00000B] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#00000B] to-transparent z-10 pointer-events-none" />

              <div className="flex whitespace-nowrap overflow-hidden relative">
                 <motion.div 
                   className="flex items-center gap-12 md:gap-24"
                   animate={{ x: [0, -1920] }} 
                   transition={{ 
                     repeat: Infinity, 
                     ease: "linear", 
                     duration: 40 
                   }}
                 >
                    {/* Triple the partners list to ensure smooth infinite loop */}
                    {[...partners, ...partners, ...partners].map((partner, idx) => (
                       <div
                         key={idx}
                         className="flex-shrink-0 w-24 md:w-32 h-16 opacity-30 hover:opacity-100 transition-all duration-500 cursor-pointer grayscale hover:grayscale-0 flex items-center justify-center relative"
                       >
                          <img 
                            src={partner.logo} 
                            alt={partner.name}
                            className="max-w-full max-h-full object-contain brightness-0 invert"
                          />
                       </div>
                    ))}
                 </motion.div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
