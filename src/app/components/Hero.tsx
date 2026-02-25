import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect, useState, type ReactNode } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import imgHeroImage from "figma:asset/884befb1e78a75b64de1fe6d23317da411da15ba.png";
import Group1000004255 from '../../imports/Group1000004255';
import { useLevelAssessment } from './LevelAssessmentContext';
import { useFreeTrial } from './FreeTrialContext';

/* ─── Orbiting Arc Button ───────────────────────────────────────────────── */
function OrbitingArcButton({
  children,
  className = '',
  onClick,
  arcDuration = 8,
  arcColor = '#E70000',
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  arcDuration?: number;
  arcColor?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [dims, setDims] = useState({ w: 210, h: 44 });

  useEffect(() => {
    const measure = () => {
      if (btnRef.current) {
        const { width, height } = btnRef.current.getBoundingClientRect();
        if (width > 0) setDims({ w: Math.round(width), h: Math.round(height) });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (btnRef.current) ro.observe(btnRef.current);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dims;
  const r = h / 2;
  const perimeter = 2 * (w - h) + Math.PI * h;
  const svgW = w + 6;
  const svgH = h + 6;
  const rx = 3;

  // Three layered arcs: tail (long, faint) → mid → head (short, bright)
  const layers = [
    { lengthRatio: 0.32, opacity: 0.10, strokeWidth: 2.5 }, // outer glow tail
    { lengthRatio: 0.20, opacity: 0.30, strokeWidth: 1.5 }, // mid tail
    { lengthRatio: 0.10, opacity: 0.90, strokeWidth: 1.0 }, // bright head
  ];

  return (
    <motion.div
      className="relative inline-flex"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg
        className="absolute pointer-events-none"
        style={{ left: -3, top: -3, width: svgW, height: svgH, overflow: 'visible' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="arc-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#arc-glow)">
          {layers.map((layer, i) => {
            const arcLen = perimeter * layer.lengthRatio;
            const gap = perimeter - arcLen;
            return (
              <motion.rect
                key={i}
                x={rx}
                y={rx}
                width={w}
                height={h}
                rx={r}
                stroke={arcColor}
                strokeWidth={layer.strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${arcLen} ${gap}`}
                style={{ opacity: layer.opacity }}
                animate={{ strokeDashoffset: [0, -perimeter] }}
                transition={{ duration: arcDuration, repeat: Infinity, ease: 'linear' }}
              />
            );
          })}
        </g>
      </svg>

      <button ref={btnRef} className={className} onClick={onClick}>
        {children}
      </button>
    </motion.div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { open: openLevelAssessment } = useLevelAssessment();
  const { open: openFreeTrial } = useFreeTrial();

  const scrollToNext = () => {
    const element = document.getElementById('how-it-works');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-[#00000B]">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00000B]/60 via-[#324D47]/40 to-[#00000B]/60 z-10" />
        <img
          src={imgHeroImage}
          alt="Teachera Language Learning"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-4xl"
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[507px] h-auto mx-auto mb-6 sm:mb-8 px-2 sm:px-4"
            style={{ '--fill-0': '#EEEBF5' } as React.CSSProperties}
          >
            <div className="w-full aspect-[507/172]">
              <Group1000004255 />
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-2xl mx-auto mb-8 sm:mb-12 text-center"
          >
            {/* Top line */}
            <p className="text-[#EEEBF5]/80 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 font-['Neutraface_2_Text:Book',sans-serif] px-2">
              Yabancı eğitmenler ve özelleştirilmiş metodolojimizle
            </p>

            {/* Language badges */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 px-1">
              {['İngilizce', 'İspanyolca', 'Almanca', 'İtalyanca', 'Fransızca', 'Rusça'].map((lang, i) => (
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, scale: 0.7, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + i * 0.1, type: 'spring', bounce: 0.35 }}
                  className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#ffffff]/25 bg-[#ffffff]/8 backdrop-blur-sm text-[#ffffff]/80 text-xs sm:text-sm font-['Neutraface_2_Text:Book',sans-serif] hover:bg-[#ffffff]/12 hover:border-[#ffffff]/40 hover:text-[#ffffff] transition-all cursor-default"
                  whileHover={{ scale: 1.07, y: -2 }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>

            {/* "konuşarak öğren" highlight */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.75 }}
              className="inline-flex flex-col items-center gap-1"
            >
              <p className="text-[#EEEBF5]/80 text-sm sm:text-base md:text-lg font-['Neutraface_2_Text:Book',sans-serif]">
                dillerini{' '}
                <span className="relative inline-block text-[#ffffff] font-['Neutraface_2_Text:Demi',sans-serif]">
                  konuşarak öğren
                  {/* animated underline */}
                  <motion.span
                    className="absolute left-0 -bottom-px h-px w-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      transformOrigin: 'left center',
                      background: 'linear-gradient(to right, transparent, rgba(231,0,0,0.45) 20%, #E70000 50%, rgba(231,0,0,0.45) 80%, transparent)',
                    }}
                  />
                </span>
                <span className="text-[#E70000]">.</span>
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center"
          >
            {/* Primary – Transparent + Subtle Orbiting Arc */}
            <OrbitingArcButton
              arcDuration={8}
              arcColor="#324D47"
              className="group px-5 sm:px-6 py-2 sm:py-2.5 border border-[#324D47]/60 backdrop-blur-sm text-[#ffffff] rounded-full text-xs sm:text-sm font-['Neutraface_2_Text:Demi',sans-serif] hover:bg-[#324D47]/20 hover:border-[#324D47] transition-all flex items-center gap-2"
              onClick={openFreeTrial}
            >
              Ücretsiz Deneme Seansı
              <Play size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
            </OrbitingArcButton>

            {/* Secondary – Plain Transparent */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-5 sm:px-6 py-2 sm:py-2.5 border border-[#ffffff]/40 backdrop-blur-sm text-[#ffffff] rounded-full text-xs sm:text-sm font-['Neutraface_2_Text:Book',sans-serif] hover:bg-[#ffffff]/5 hover:border-[#ffffff]/60 transition-all"
              onClick={openLevelAssessment}
            >
              Seviyeni Öğren
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1.5 sm:gap-2 text-[#ffffff]/60 hover:text-[#ffffff] transition-colors group"
          >
            <span className="text-xs sm:text-sm font-['Neutraface_2_Text:Book',sans-serif] hidden sm:block">
              Deneyimi keşfetmek için kaydırın
            </span>
            <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-[#ffffff]/30 rounded-full flex items-start justify-center p-1.5 sm:p-2 group-hover:border-[#ffffff]/60 transition-colors">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-[#ffffff]/60 rounded-full"
              />
            </div>
            <ChevronDown size={20} className="sm:w-6 sm:h-6 group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom fade overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        style={{ background: 'linear-gradient(180deg, transparent 0%, transparent 50%, #00000B 100%)' }}
        className="absolute inset-0 pointer-events-none z-10"
      />
    </section>
  );
}