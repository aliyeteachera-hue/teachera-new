import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import imgSocratesBook from "figma:asset/a19966e147653c1fee9a9f7ba65cb5ae8ce7ae7f.png";
import imgSocrates2 from "figma:asset/d0efa1d17e60c4d8b427e8eb1d1c0847176f4733.png";

export default function DeliveryOptions() {
  return (
    <section 
      id="delivery-options" 
      className="relative py-20 md:py-28 bg-[#00000B] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#324D47] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.04]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Neutraface_2_Text:Bold',sans-serif] text-[#ffffff] leading-tight mb-4">
            Online mı, Yüz Yüze mi?
          </h2>
          <p className="text-[#ffffff]/60 font-['Neutraface_2_Text:Book',sans-serif] text-lg max-w-2xl mx-auto">
            İster dünyanın herhangi bir yerinden bağlanın, ister kampüsümüzün büyülü atmosferinde yerinizi alın. 
            <span className="text-[#ffffff] block mt-1">Standart değişmez! Sahne farklı olabilir. Sistem aynı kalır.</span>
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Online */}
          <Card 
            title="ONLINE EĞİTİM"
            subtitle="“Her yerden, aynı Teachera standardı”"
            description="Evden, ofisten, yurtdışından… Nerede olursan ol, ders akışı aynı: Native Speaker eğitmenler ile Dinle → Konuş → Düzelt → Tekrar Et!"
            image={imgSocrates2}
            imageAlt="Online Education Socrates"
            accentColor="#68232E" 
            glowColor="#E70000"
            buttonText="Online Planları Gör"
            delay={0.1}
          />

          {/* Card 2: Face-to-Face */}
          <Card 
            title="YÜZ YÜZE EĞİTİM"
            subtitle="“Dil okulundan çok daha fazlası, sosyal bir yaşam alanı”"
            description="Teachera topluluğunun gücüyle network ağınızı genişletin. Kampüsümüzde kahve molaları, özel etkinlikler ve yaşayan bir sosyal ortamda dili hayatın içinde öğrenin."
            image={imgSocratesBook}
            imageAlt="Face to Face Education Socrates"
            accentColor="#324D47" 
            glowColor="#4A7067"
            buttonText="Kampüsü Keşfet"
            delay={0.2}
          />

        </div>
      </div>
    </section>
  );
}

// Robust Card Component with Fixes
function Card({ 
  title, 
  subtitle,
  description, 
  image, 
  imageAlt, 
  accentColor, 
  glowColor, 
  buttonText, 
  delay
}: {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  glowColor: string;
  buttonText: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="group relative flex flex-col justify-between w-full h-auto min-h-[600px] md:min-h-[550px] rounded-[2rem] overflow-hidden border border-[#ffffff]/5 bg-[#0f0f16]"
    >
      {/* 1. Dynamic Background Gradient */}
      <div 
        className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${accentColor}, transparent 70%)`
        }}
      />
      
      {/* 2. Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3. Glass Shine */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Content Container - Pushes content up, Z-index ensures text is clickable */}
      <div className="relative z-20 flex-shrink-0 p-8 pb-0">
        
        {/* Text Group */}
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-['Neutraface_2_Text:Bold',sans-serif] text-[#ffffff] mb-2 leading-none tracking-tight">
            {title}
          </h3>
          
          <p 
            className="font-['Neutraface_2_Text:Demi',sans-serif] text-sm md:text-base mb-4 italic leading-relaxed"
            style={{ color: glowColor }}
          >
            {subtitle}
          </p>

          <p className="text-[#ffffff]/60 font-['Neutraface_2_Text:Book',sans-serif] text-sm leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        {/* Action Button - Floating relative to content */}
        <div className="inline-block relative">
          <button className="group/btn inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 bg-[#ffffff]/5 hover:bg-[#ffffff]/10 border border-[#ffffff]/10 backdrop-blur-sm rounded-full transition-all duration-300 cursor-pointer">
            <span className="font-['Neutraface_2_Text:Demi',sans-serif] text-[#ffffff] text-xs tracking-wide">
              {buttonText}
            </span>
            <div className="w-8 h-8 rounded-full bg-[#ffffff] text-[#000000] flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-300">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
      </div>

      {/* Spacer to push image down if content is short, 
          but also serves as the container area for the image */}
      <div className="relative w-full flex-grow min-h-[300px] mt-4 flex items-end justify-center overflow-hidden">
        
        {/* Glow Behind Socrates */}
        <div 
          className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: glowColor }}
        />

        {/* Floating Socrates Image */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-full h-full flex items-end justify-center pb-0"
        >
           <img 
             src={image} 
             alt={imageAlt} 
             className="w-auto h-[90%] md:h-[95%] max-h-[320px] object-contain object-bottom drop-shadow-2xl"
           />
        </motion.div>
      </div>
    </motion.div>
  );
}