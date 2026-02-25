import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, User, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import TeacheraLogo from '../../imports/TeacheraLogo';
import { useLevelAssessment } from './LevelAssessmentContext';
import { useFreeTrial } from './FreeTrialContext';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  currentSection: string;
}

export default function Navigation({ isMenuOpen, setIsMenuOpen, currentSection }: NavigationProps) {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { open: openLevelAssessment } = useLevelAssessment();
  const { open: openFreeTrial } = useFreeTrial();

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 11, 0)', 'rgba(0, 0, 11, 0.95)']
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ['blur(0px)', 'blur(20px)']
  );

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-[#ffffff]/0"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-28 transition-all duration-300">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 cursor-pointer relative z-50"
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/');
              } else {
                scrollToSection('home');
              }
            }}
          >
             <div className="w-[100px] sm:w-[120px] md:w-[150px] aspect-[146/29]">
                <TeacheraLogo />
             </div>
          </motion.div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            
            {/* Desktop: Quick Links */}
            <div className="hidden md:flex items-center gap-6">
               <button onClick={() => openFreeTrial()} className="text-[#EEEBF5] text-sm font-['Neutraface_2_Text:Demi',sans-serif] hover:text-[#324D47] transition-colors tracking-widest uppercase">
                 Ücretsiz Deneme Seansı
               </button>
               <button onClick={() => openLevelAssessment()} className="text-[#EEEBF5] text-sm font-['Neutraface_2_Text:Demi',sans-serif] hover:text-[#324D47] transition-colors tracking-widest uppercase">
                 Seviye Tespit
               </button>
            </div>

            <div className="w-[1px] h-8 bg-[#ffffff]/20 hidden md:block" />

            {/* Mobile: Level Assessment Button (Visible only on mobile) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => openLevelAssessment()}
              className="md:hidden px-3 sm:px-4 py-1.5 sm:py-2 bg-[#324D47] text-white text-[9px] sm:text-[10px] font-['Neutraface_2_Text:Demi',sans-serif] tracking-widest uppercase rounded-full hover:bg-[#3d5e56] transition-colors shadow-[0_0_10px_rgba(50,77,71,0.3)] whitespace-nowrap"
            >
              Seviye Tespit
            </motion.button>

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate('/giris')}
              className={`
                hidden md:flex items-center gap-2 px-6 py-2.5 
                ${location.pathname === '/giris' 
                  ? 'bg-[#324D47] text-white border border-[#324D47]'
                  : 'bg-[#ffffff]/5 hover:bg-[#ffffff]/10 text-[#ffffff] border border-[#ffffff]/10'
                }
                rounded-full font-['Neutraface_2_Text:Demi',sans-serif] text-sm
                transition-all duration-300 backdrop-blur-sm group
              `}
            >
              <User size={16} className="text-[#324D47] group-hover:text-white transition-colors" />
              <span>Giriş Yap</span>
            </motion.button>

            {/* Menu Toggle - ALWAYS VISIBLE (Premium Feel) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`relative z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#324D47] hover:bg-[#3d5e56] text-white shadow-[0_0_20px_rgba(50,77,71,0.4)] transition-all duration-300 group ${isMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-[5px]"
                  >
                    {/* Custom Hamburger Icon for uniqueness */}
                    <span className="w-5 h-[2px] bg-white rounded-full group-hover:w-6 transition-all" />
                    <span className="w-5 h-[2px] bg-white rounded-full" />
                    <span className="w-5 h-[2px] bg-white rounded-full group-hover:w-4 transition-all" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}