import svgPaths from '../../imports/svg-1964oew5l0';
import TeacheraLogo from '../../imports/TeacheraLogo';

export default function Footer() {
  return (
    <footer className="bg-[#00000B] text-white pt-20 pb-12 overflow-hidden relative font-['Neutraface_2_Text:Book',sans-serif]">
       {/* Background Grid Pattern */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
       />

       {/* Top Divider Line */}
       <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D0D0D0] opacity-30" />

       <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-[#ffffff]/10 pb-16 mb-12">

             {/* COL 1: BRAND INFO (4 Cols) */}
             <div className="lg:col-span-4 flex flex-col gap-8 pr-0 lg:pr-12">
                {/* Teachera Logo - White */}
                <div
                  className="w-[130px] h-[26px] relative"
                  style={{ '--fill-0': '#ffffff' } as React.CSSProperties}
                >
                  <TeacheraLogo />
                </div>

                <p className="text-[#ffffff]/80 text-[14px] leading-relaxed font-['Neutraface_2_Text:Book',sans-serif]">
                  Teachera, Avrupa standartlarına karşılık gelen bir müfredat kullanarak, İngilizce, İspanyolca, Fransızca, Almanca, İtalyanca, Rusça ve Arapça eğitimleri veren, Milli Eğitim Bakanlığına bağlı faaliyet yürüten, online ve yüz yüze eğitim veren bir dil okuludur.
                </p>

                <div className="flex flex-col gap-1 text-[#ffffff]/30 text-xs font-['Neutraface_2_Text:Demi',sans-serif]">
                   <span>© teachera ltd.şti</span>
                </div>
             </div>

             {/* COL 2: SİTE HARİTASI (2 Cols) */}
             <div className="lg:col-span-2 flex flex-col gap-5">
                <h4 className="text-[#4A7067] font-['Neutraface_2_Text:Demi',sans-serif] text-[12px] uppercase tracking-[0.15em] mb-1">
                  Site Haritası
                </h4>
                <ul className="flex flex-col gap-3.5 text-[14px] font-['Neutraface_2_Text:Demi',sans-serif]">
                   <li><a href="#home" className="text-white/80 hover:text-[#4A7067] transition-colors">Ana Sayfa</a></li>
                   <li><a href="#how-it-works" className="text-white/80 hover:text-[#4A7067] transition-colors">Metodoloji</a></li>
                   <li><a href="#delivery-options" className="text-white/80 hover:text-[#4A7067] transition-colors">Eğitim Formatları</a></li>
                   <li><a href="#programs" className="text-white/80 hover:text-[#4A7067] transition-colors">Programlar</a></li>
                   <li><a href="#academy" className="text-white/80 hover:text-[#4A7067] transition-colors">Academy</a></li>
                   <li><a href="#faq" className="text-white/80 hover:text-[#4A7067] transition-colors">S.S.S.</a></li>
                   <li><a href="/iletisim" className="text-white/80 hover:text-[#4A7067] transition-colors">İletişim</a></li>
                </ul>

                {/* Diller */}
                <div className="mt-4 pt-4 border-t border-[#ffffff]/5">
                   <h4 className="text-[#4A7067] font-['Neutraface_2_Text:Demi',sans-serif] text-[12px] uppercase tracking-[0.15em] mb-4">
                     Diller
                   </h4>
                   <ul className="flex flex-col gap-3 text-[13px] font-['Neutraface_2_Text:Book',sans-serif]">
                      <li><a href="#programs" className="text-white/60 hover:text-white transition-colors">İngilizce</a></li>
                      <li><a href="#programs" className="text-white/60 hover:text-white transition-colors">İspanyolca</a></li>
                      <li><a href="#programs" className="text-white/60 hover:text-white transition-colors">Almanca</a></li>
                      <li><a href="#programs" className="text-white/60 hover:text-white transition-colors">Fransızca</a></li>
                      <li><a href="#programs" className="text-white/60 hover:text-white transition-colors">İtalyanca</a></li>
                      <li><a href="#programs" className="text-white/60 hover:text-white transition-colors">Rusça</a></li>
                   </ul>
                </div>
             </div>

             {/* COL 3: KURUMSAl + KARİYER (3 Cols) */}
             <div className="lg:col-span-3 flex flex-col gap-5">
                <h4 className="text-[#4A7067] font-['Neutraface_2_Text:Demi',sans-serif] text-[12px] uppercase tracking-[0.15em] mb-1">
                  Kurumsal
                </h4>
                <ul className="flex flex-col gap-3.5 text-[14px] font-['Neutraface_2_Text:Demi',sans-serif]">
                   <li><a href="#" className="text-[#4A7067] hover:text-[#6A9B8F] transition-colors">İş Fırsatları</a></li>
                   <li><a href="#" className="text-[#4A7067] hover:text-[#6A9B8F] transition-colors">Müşteri Temsilcisi Ol</a></li>
                   <li><a href="#" className="text-[#4A7067] hover:text-[#6A9B8F] transition-colors">Elçi Ol</a></li>
                   <li><a href="#" className="text-white/80 hover:text-[#4A7067] transition-colors">Fiyatlar</a></li>
                </ul>

                {/* KVKK */}
                <div className="mt-4 pt-4 border-t border-[#ffffff]/5">
                   <h4 className="text-[#4A7067] font-['Neutraface_2_Text:Demi',sans-serif] text-[12px] uppercase tracking-[0.15em] mb-4">
                     Kişisel Verilerin Korunması
                   </h4>
                   <ul className="flex flex-col gap-2.5 text-[13px] text-[#ffffff]/60 font-['Neutraface_2_Text:Book',sans-serif]">
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">Gizlilik Politikası</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">Çocukların Gizlilik Politikası</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">Çerez Politikası</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">Ebeveyn Muvafakatname</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">Yurt Dışına Aktarım Açık Rıza</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">WhatsApp Açık Rıza Metni</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">Müşteri Aydınlatma Metni</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">İletişim Aydınlatma Metni</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">Çağrı Merkezi Aydınlatma Metni</a></li>
                      <li><a href="#" className="hover:text-[#4A7067] transition-colors">İlgili Kişi Başvuru Formu</a></li>
                   </ul>
                </div>
             </div>

             {/* COL 4: İLETİŞİM (3 Cols) */}
             <div className="lg:col-span-3 flex flex-col gap-8 font-['Neutraface_2_Text:Demi',sans-serif]">
                <h4 className="text-[#4A7067] font-['Neutraface_2_Text:Demi',sans-serif] text-[12px] uppercase tracking-[0.15em] mb-1">
                  İletişim
                </h4>

                {/* Phone Main */}
                <div className="relative">
                   <div className="flex items-center gap-3">
                      <div className="w-[22px] h-[22px] relative top-1">
                         <svg viewBox="0 0 21.9585 21.9561" className="w-full h-full fill-white">
                            <path clipRule="evenodd" d={svgPaths.p1f388280} fillRule="evenodd" />
                         </svg>
                      </div>
                      <a href="tel:03322368066" className="text-[26px] text-white hover:text-[#4A7067] transition-colors">0332 236 80 66</a>
                   </div>
                </div>

                {/* WhatsApp Info */}
                <div>
                   <h4 className="text-[14px] text-white/50 mb-1">Sadece yazılı iletişim</h4>
                   <a href="https://wa.me/905528674226" className="text-[20px] text-white hover:text-[#4A7067] transition-colors block">WP: +905528674226</a>
                </div>

                {/* Address */}
                <div>
                   <p className="text-[16px] text-white leading-tight">
                     KULE PLÂZA KAT: <span className="text-[22px]">26</span>
                   </p>
                   <p className="text-[16px] text-white mt-1">
                     Selçuklu – KONYA
                   </p>
                </div>

                {/* Emails */}
                <div className="space-y-5">
                   <div>
                      <h4 className="text-[13px] text-white/50 mb-1">Satış Departmanı</h4>
                      <a href="mailto:sales@teachera.com.tr" className="text-[18px] text-white hover:text-[#4A7067] transition-colors block">sales@teachera.com.tr</a>
                   </div>
                   <div>
                      <h4 className="text-[13px] text-white/50 mb-1">Medya Soruları İçin</h4>
                      <a href="mailto:media@teachera.com.tr" className="text-[18px] text-white hover:text-[#4A7067] transition-colors block">media@teachera.com.tr</a>
                   </div>
                   <div>
                      <h4 className="text-[13px] text-white/50 mb-1">Ortaklıklar için</h4>
                      <a href="mailto:partners@teachera.com.tr" className="text-[18px] text-white hover:text-[#4A7067] transition-colors block">partners@teachera.com.tr</a>
                   </div>
                </div>
             </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-['Neutraface_2_Text:Demi',sans-serif]">
             <p className="text-[#4A7067]">© Teachera 2026</p>
             
             {/* Payment Icons */}
             <div className="w-[103px] h-[16px] relative opacity-60 hover:opacity-100 transition-opacity">
               <svg viewBox="0 0 103.112 16.4881" className="w-full h-full fill-[#959595]">
                  <path d={svgPaths.p7e5800} />
                  <path d={svgPaths.p21d74e80} />
                  <path d={svgPaths.p2814c930} />
                  <path d={svgPaths.p2d6f4500} />
                  <path d={svgPaths.p16a3da00} />
                  <path d={svgPaths.p1ea01cf0} />
               </svg>
             </div>
          </div>
       </div>
    </footer>
  );
}