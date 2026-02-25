import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Linkedin, Twitter, Facebook, Globe, ArrowRight, User, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import imgRectangle279 from "figma:asset/884befb1e78a75b64de1fe6d23317da411da15ba.png";
import TeacheraLogo from '../../imports/TeacheraLogo';
import { useFreeTrial } from './FreeTrialContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentSection: string;
}

const menuItems = [
  { id: 'about', label: 'Biz Kimiz?', href: '#about' },
  { id: 'methodology', label: 'Metodoloji', href: '#methodology' },
  { id: 'prices', label: 'Fiyatlar', href: '#delivery-options' },
  { id: 'programs', label: 'Eğitimlerimiz', href: '#programs' },
  { id: 'corporate', label: 'Kurumsal Teklif', href: '#corporate' },
  { id: 'academy', label: 'Teachera Academy', href: '#academy', highlight: true },
  { id: 'contact', label: 'İletişim', href: '/iletisim', isRoute: true },
];

export default function MobileMenu({ isOpen, onClose, currentSection }: MobileMenuProps) {
  const navigate = useNavigate();
  const { open: openFreeTrial } = useFreeTrial();
  
  const handleLinkClick = (item: typeof menuItems[0]) => {
    if ((item as any).isRoute) {
      onClose();
      navigate(item.href);
      return;
    }
    const element = document.getElementById(item.href.replace('#', ''));
    if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed inset-0 z-[55] bg-[#00000B] overflow-hidden"
        >
          {/* BACKGROUND IMAGE & OVERLAY */}
          <div className="absolute inset-0 z-0 pointer-events-none">
             <motion.img 
               initial={{ scale: 1.1, opacity: 0 }}
               animate={{ scale: 1, opacity: 0.2 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               src={imgRectangle279} 
               alt="Background" 
               className="w-full h-full object-cover grayscale mix-blend-luminosity"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#00000B] via-[#00000B]/95 to-[#00000B]/90" />
          </div>

          {/* CONTENT CONTAINER */}
          <div className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col pt-32 lg:pt-0">
            
            {/* Close Button - Always visible on top */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-6 lg:right-12 md:top-8 z-[60] w-12 h-12 flex items-center justify-center rounded-full bg-[#324D47] hover:bg-[#3d5e56] text-white shadow-[0_0_20px_rgba(50,77,71,0.4)] transition-all duration-300"
              aria-label="Close menu"
            >
              <X size={24} />
            </motion.button>

            <div className="flex flex-col lg:grid lg:grid-cols-12 h-full pb-12 lg:pt-40 lg:pb-32">
               
               {/* LEFT SIDE: INFO (Desktop Only) */}
               <div className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full border-r border-[#ffffff]/10 pr-16 relative">
                  
                  {/* Decorative Line */}
                  <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ffffff]/10 to-transparent" />

                  {/* Top: Branding */}
                  <div>
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 mb-8"
                     >
                        <span className="w-8 h-[1px] bg-[#E70000]" />
                        <span className="text-[#E70000] text-xs font-['Neutraface_2_Text:Demi',sans-serif] tracking-[0.2em] uppercase">
                           Premium Language Education
                        </span>
                     </motion.div>
                     
                     <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl font-['Neutraface_2_Text:Bold',sans-serif] text-white leading-[1.1]"
                     >
                        Dünyanın kapılarını<br/>
                        <span className="text-[#ffffff]/40">dil ile arala.</span>
                     </motion.h2>
                  </div>

                  {/* Bottom: Social & Contact */}
                  <div className="space-y-10 mt-20">
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-4"
                     >
                        {[Instagram, Linkedin, Twitter, Facebook, Globe].map((Icon, i) => (
                           <a key={i} href="#" className="w-12 h-12 rounded-full border border-[#ffffff]/10 hover:border-[#324D47] hover:bg-[#324D47] flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 group">
                              <Icon size={20} className="group-hover:scale-110 transition-transform" />
                           </a>
                        ))}
                     </motion.div>

                     <div className="text-[#ffffff]/50 text-sm font-['Neutraface_2_Text:Book',sans-serif] leading-relaxed tracking-wide">
                        <p className="mb-2">Kule Plaza Kat: 26, Selçuklu – KONYA</p>
                        <p>+90 552 867 42 26  •  info@teachera.com.tr</p>
                     </div>
                  </div>
               </div>

               {/* RIGHT SIDE / MOBILE CONTENT */}
               <div className="lg:col-span-7 flex flex-col justify-between h-full lg:justify-start lg:pl-24 lg:pt-4 overflow-y-auto no-scrollbar">
                  
                  {/* Mobile Branding (Visible only on mobile) */}
                  <div className="lg:hidden mb-8">
                     <motion.p 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.2 }}
                       className="text-[#E70000] text-[10px] font-['Neutraface_2_Text:Demi',sans-serif] tracking-[0.3em] uppercase mb-2"
                     >
                       Premium Education
                     </motion.p>
                     <motion.h3
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 }}
                       className="text-2xl font-['Neutraface_2_Text:Bold',sans-serif] text-white leading-tight"
                     >
                       Menü
                     </motion.h3>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-4 lg:gap-6 w-full">
                     {menuItems.map((item, index) => (
                        <motion.button
                           key={item.id}
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.2 + (index * 0.05), ease: "easeOut" }}
                           onClick={() => handleLinkClick(item)}
                           className="group relative flex items-center justify-between py-2 transition-all duration-500"
                        >
                           <div className="flex items-center gap-4 lg:gap-6">
                              <span className={`
                                 text-xs lg:text-sm font-['Neutraface_2_Text:Demi',sans-serif] text-[#ffffff]/20 w-5 lg:w-6 group-hover:text-[#324D47] transition-colors
                              `}>
                                 0{index + 1}
                              </span>
                              
                              <span className={`
                                 text-2xl md:text-4xl font-['Neutraface_2_Text:Book',sans-serif] tracking-tight transition-all duration-300 text-left
                                 ${item.highlight ? 'text-[#E70000]' : 'text-[#ffffff]/80 group-hover:text-white group-hover:translate-x-2'}
                              `}>
                                 {item.id === 'academy' ? (
                                   <span className="inline-flex items-center gap-2 md:gap-3">
                                     <span 
                                       className="relative w-[100px] h-[20px] md:w-[140px] md:h-[28px] inline-block align-middle"
                                       style={{ '--fill-0': '#E70000' } as React.CSSProperties}
                                     >
                                       <TeacheraLogo />
                                     </span>
                                     <span>Academy</span>
                                   </span>
                                 ) : (
                                   item.label
                                 )}
                              </span>
                           </div>

                           <div className={`
                              hidden lg:flex w-12 h-12 rounded-full border border-[#ffffff]/10 items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 group-hover:border-[#324D47]
                           `}>
                              <ArrowRight size={20} className="text-[#324D47]" />
                           </div>
                        </motion.button>
                     ))}
                  </nav>

                  {/* Mobile Footer & Actions */}
                  <div className="lg:hidden mt-8 border-t border-[#ffffff]/10 pt-6">
                     {/* Mobile Login Button - Moved here from Header */}
                     <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => {
                          onClose();
                          openFreeTrial();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 mb-4 bg-[#324D47] hover:bg-[#3d5e56] text-white border border-[#324D47] rounded-xl font-['Neutraface_2_Text:Demi',sans-serif] text-sm transition-all duration-300"
                     >
                        <span>ÜCRETSİZ DENEME SEANSI</span>
                     </motion.button>
                     <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        onClick={() => {
                          onClose();
                          navigate('/giris');
                        }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 mb-8 bg-[#ffffff]/5 hover:bg-[#324D47] text-white border border-[#ffffff]/10 rounded-xl font-['Neutraface_2_Text:Demi',sans-serif] text-sm transition-all duration-300 group"
                     >
                        <User size={18} className="text-[#324D47] group-hover:text-white transition-colors" />
                        <span>GİRİŞ YAP</span>
                     </motion.button>

                     <div className="flex flex-col items-center gap-6">
                        <p className="text-[#ffffff]/40 text-xs font-['Neutraface_2_Text:Book',sans-serif] text-center tracking-wide">
                           Kule Plaza Kat: 26, Selçuklu – KONYA
                        </p>
                        <div className="flex justify-center gap-6">
                           {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                              <a key={i} href="#" className="text-white/40 hover:text-[#324D47] transition-colors p-2">
                                 <Icon size={20} />
                              </a>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}