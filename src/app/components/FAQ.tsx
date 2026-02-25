import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { Plus, Minus, Search, MessageCircle, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';
import { useLevelAssessment } from './LevelAssessmentContext';
import { useNavigate } from 'react-router';

// --- DATA TYPES ---
type CategoryId = 'genel' | 'metod' | 'surec';

interface FAQAction {
  label: string;
  url?: string;
}

interface FAQItem {
  id: number;
  category: CategoryId;
  question: string;
  answer: string;
  action?: FAQAction;
}

const categories = [
  { id: 'genel', label: 'Genel Bilgiler' },
  { id: 'metod', label: 'Eğitim Metodu' },
  { id: 'surec', label: 'Ders & Süreç' }
];

const faqs: FAQItem[] = [
  // GENEL BİLGİLER
  {
    id: 1,
    category: 'genel',
    question: 'Öğrenmek istediğim dili hiç bilmiyorum. Bu şekilde eğitimlerinize katılabilir miyim?',
    answer: 'Evet, eğitimlere katılmak için herhangi bir dil altyapısına sahip olmanız gerekmez. Dersler oldukça basit yapılarla başlayacaktır. Kendinizi öğretmeninize teslim ettiğinizde nasıl öğrendiğinizi siz de fark edeceksiniz.',
    action: { label: 'Başlangıç Programlarını İncele', url: '#programs' }
  },
  {
    id: 3,
    category: 'genel',
    question: 'Ücretsiz deneme dersine katılabilir miyim?',
    answer: 'Evet. Web sitemiz üzerinden deneme dersi formunu doldurarak ücretsiz dersimize katılabilirsiniz. Formu doldurduktan sonra size özel bir kullanıcı adı oluşturulacak ve e-posta adresinize gönderilecektir.',
    action: { label: 'Ücretsiz Deneme Dersi Al', url: '#contact' }
  },
  {
    id: 4,
    category: 'genel',
    question: 'Seviyemizi nasıl öğrenebiliriz?',
    answer: 'İlgili bağlantı üzerinden formu doldurarak yazılı sınavı hemen başlatabilir ve seviyenizi öğrenebilirsiniz. Kesin sonuç sözlü mülakat sonrası belirlenir.',
    action: { label: 'Seviye Tespit Sınavına Git', url: '#quiz' }
  },
  {
    id: 15,
    category: 'genel',
    question: 'Materyalleri nasıl temin edebilirim?',
    answer: 'Eğitim paketi satın alındıktan sonra, seviyenize uygun kitap ve materyaller sisteminize tanımlanır. Tüm kitaplara, egzersizlere ve MP3 dosyalarına çevrim içi olarak erişebilirsiniz.'
  },
  {
    id: 16,
    category: 'genel',
    question: 'Eğitim sonunda sertifika alabiliyor muyuz?',
    answer: 'Evet, eğitiminizi tamamladıktan sonra, ulaştığınız seviyeye göre dijital sertifika verilir.'
  },
  {
    id: 17,
    category: 'genel',
    question: 'Eğitim türleri arasında geçiş yapabilir miyim?',
    answer: 'Evet, birebir eğitimden grup eğitimine veya farklı bir dile geçiş yapabilirisiniz. Bu tür değişiklikler için eğitim danışmanlarımızla iletişime geçmeniz yeterlidir.'
  },

  // EĞİTİM METODU
  {
    id: 2,
    category: 'metod',
    question: 'Eğitimlerinizde Türkçe kullanılmıyor, dersleri nasıl anlayacağız?',
    answer: 'Teachera bünyesindeki tüm eğitmenler metodoloji eğitimlerine tabidir. Derslerde beden dili, illüstrasyonlar ve görsel materyaller yoğun olarak kullanılır. Bu sayede anadil kullanımından uzak durularak, dil öğreniminde sıkça karşılaşılan "öğrenme engelleri" önlenir.'
  },
  {
    id: 5,
    category: 'metod',
    question: 'Eğitimler sadece yerli konuşmacılar tarafından mı veriliyor?',
    answer: 'Hayır. Teachera bünyesindeki tüm eğitmenler native speaker olmayabilir; ancak hepsi öğrettiği dili ana dili seviyesinde konuşabilen, profesyonel, deneyimli ve metodoloji eğitimi almış öğretmenlerdir.'
  },
  {
    id: 6,
    category: 'metod',
    question: 'Eğitmenlerinizin yeterliliğinden nasıl emin olabilirim?',
    answer: 'Eğitmenlerimiz, dil öğretmenliği, metodoloji ve dil bilimi gibi alanlarda eğitim almış ve deneyim sahibidir. Ayrıca sürekli olarak bilgi ve becerilerini geliştirmek için iç eğitimlere tabidirler.'
  },
  {
    id: 7,
    category: 'metod',
    question: 'Tüm dersler konuşma üzerine mi kurulu?',
    answer: 'Teachera’da derslerin %80’i konuşma pratiğiyle geçer. Ancak bu sadece serbest sohbet değil; bilimsel ve sistematik bir yöntemle yapılandırılmış derslerdir. Okuma, yazma, anlama ve konuşma becerileri bir bütün olarak geliştirilir.'
  },

  // DERS İŞLEYİŞİ & SÜREÇ
  {
    id: 8,
    category: 'surec',
    question: 'Grup eğitiminde katılımcılar nasıl seçiliyor?',
    answer: 'Katılımcılar dil seviyeleri, yaş grupları ve aldıkları eğitim paketlerine göre gruplanır. Böylece her grup benzer ihtiyaçlara sahip bireylerden oluşur ve dersler daha verimli geçer.'
  },
  {
    id: 9,
    category: 'surec',
    question: 'Birebir eğitim paketi aldıktan sonra süreç nasıl ilerler?',
    answer: 'Eğitim danışmanlarımız, size uygun gün ve saatlere göre bir ders planı oluşturur ve eğitim hemen başlatılır.'
  },
  {
    id: 10,
    category: 'surec',
    question: 'Grup eğitim paketi aldıktan sonra süreç nasıl ilerler?',
    answer: 'Kullanıcı adınız e-posta ile size gönderilir. Şifrenizi oluşturarak sisteme giriş yaptıktan sonra yazılı seviye tespit sınavını tamamlamanız gerekir. Grup sayısı tamamlandığında dersler planlanır ve eğitim başlar.'
  },
  {
    id: 11,
    category: 'surec',
    question: 'Grup ders saatleri nasıl ayarlanır?',
    answer: 'Tüm katılımcıların uygun olduğu saatler dikkate alınarak haftada 3 gün, her gün 2 ders saati olacak şekilde planlama yapılır.'
  },
  {
    id: 12,
    category: 'surec',
    question: 'Birebir eğitimlerde ders saatleri nasıl belirlenir?',
    answer: 'Müsait olduğunuz gün ve saatlere göre esnek bir şekilde ders planlaması yapılır.'
  },
  {
    id: 13,
    category: 'surec',
    question: 'Grup dersleri ertelenebilir mi?',
    answer: 'Hayır, grup dersleri belirlenen plana göre yapılır ve ertelenemez.'
  },
  {
    id: 14,
    category: 'surec',
    question: 'Birebir derslerde erteleme mümkün mü?',
    answer: 'Evet, birebir eğitimlerde dersler en az 24 saat önceden haber verilmesi koşuluyla ertelenebilir. Ancak, aynı dersi 10 gün içinde telafi edecek şekilde yeniden planlamanız gerekir.'
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('genel');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { open: openLevelAssessment } = useLevelAssessment();
  const navigate = useNavigate();

  const filteredFAQs = useMemo(() => {
    if (searchQuery.trim() !== '') {
      return faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return faqs.filter(faq => faq.category === activeCategory);
  }, [activeCategory, searchQuery]);

  const toggleFAQ = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-20 lg:py-32 bg-[#ffffff]">
      {/* Background Decor - Wrapped in absolute overflow-hidden to prevent body scroll but allow sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4EBD1]/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#324D47]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[#E5E5E5] pb-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-12 h-[1px] bg-[#E70000]" />
              <span className="text-[#324D47] font-['Neutraface_2_Text:Demi',sans-serif] tracking-widest text-sm uppercase">
                Merak Ettikleriniz
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-['Neutraface_2_Text:Bold',sans-serif] text-[#00000B] leading-tight">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-[#484848] font-['Neutraface_2_Text:Book',sans-serif] text-lg leading-relaxed">
              Dil öğrenme yolculuğunuzla ilgili aklınıza takılan tüm soruların cevapları burada.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-auto min-w-[300px]">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#324D47]/40 group-focus-within:text-[#E70000] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Sorunuzu arayın..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-full text-[#324D47] font-['Neutraface_2_Text:Book',sans-serif] outline-none focus:border-[#324D47]/50 focus:bg-white focus:shadow-lg transition-all duration-300 placeholder:text-[#324D47]/30"
              />
            </div>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <AnimatePresence>
          {searchQuery === '' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap gap-2 mb-12"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryId)}
                  className={`
                    px-6 py-3 rounded-full relative font-['Neutraface_2_Text:Demi',sans-serif] text-sm md:text-base tracking-wide transition-all duration-300 border
                    ${activeCategory === cat.id 
                      ? 'bg-[#324D47] text-white border-[#324D47] shadow-lg shadow-[#324D47]/20' 
                      : 'bg-white text-[#324D47]/60 border-[#E5E5E5] hover:border-[#324D47]/30 hover:text-[#324D47]'}
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
          
          {/* Questions Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4 relative">
             <AnimatePresence mode="popLayout">
               {filteredFAQs.length > 0 ? (
                 <motion.div
                    key={activeCategory + searchQuery}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4"
                 >
                   {filteredFAQs.map((faq, index) => (
                     <motion.div
                       layout
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       key={faq.id}
                       className={`
                         group border rounded-2xl overflow-hidden transition-all duration-300 relative
                         ${openIndex === faq.id 
                           ? 'bg-white border-[#324D47]/20 shadow-[0_10px_30px_-10px_rgba(50,77,71,0.1)]' 
                           : 'bg-[#FDFDFD] border-[#E5E5E5] hover:border-[#324D47]/20'}
                       `}
                     >
                       <button
                         onClick={() => toggleFAQ(faq.id)}
                         className="w-full p-6 md:p-8 flex items-start md:items-center justify-between gap-6 text-left relative z-10"
                       >
                         <div className="flex gap-4 items-start">
                           <span className={`
                             flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold border shrink-0 mt-0.5 md:mt-0 transition-colors duration-300
                             ${openIndex === faq.id ? 'bg-[#324D47] border-[#324D47] text-white' : 'bg-transparent border-[#E5E5E5] text-[#324D47]/40 group-hover:border-[#324D47]/40'}
                           `}>
                             {index + 1}
                           </span>
                           <h3 className={`
                             text-lg md:text-xl font-['Neutraface_2_Text:Demi',sans-serif] transition-colors duration-300
                             ${openIndex === faq.id ? 'text-[#324D47]' : 'text-[#484848] group-hover:text-[#324D47]'}
                           `}>
                             {faq.question}
                           </h3>
                         </div>

                         <div className={`
                           w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                           ${openIndex === faq.id ? 'bg-[#F4EBD1] rotate-180' : 'bg-[#F5F5F5] group-hover:bg-[#E5E5E5]'}
                         `}>
                            {openIndex === faq.id ? (
                              <Minus size={20} className="text-[#324D47]" />
                            ) : (
                              <Plus size={20} className="text-[#324D47]/60" />
                            )}
                         </div>
                       </button>

                       <AnimatePresence>
                         {openIndex === faq.id && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: 'auto', opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                             className="overflow-hidden relative"
                           >
                             <div className="px-6 md:px-8 pb-8 pt-0 ml-12 md:ml-12 border-t border-transparent">
                               <p className="text-[#484848]/80 font-['Neutraface_2_Text:Book',sans-serif] leading-relaxed text-base md:text-lg">
                                 {faq.answer}
                               </p>

                               {/* ACTION BUTTON (User Favorite Feature) */}
                               {faq.action && (
                                  <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-6 pt-6 border-t border-[#E5E5E5] flex justify-start"
                                  >
                                    {faq.action.url === '#quiz' ? (
                                      <button
                                        onClick={openLevelAssessment}
                                        className="group/btn flex items-center gap-2 px-5 py-2.5 bg-[#324D47]/5 text-[#324D47] rounded-full font-['Neutraface_2_Text:Bold',sans-serif] text-xs md:text-sm uppercase tracking-widest hover:bg-[#324D47] hover:text-white transition-all duration-300"
                                      >
                                        <span>{faq.action.label}</span>
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                      </button>
                                    ) : (
                                      <a 
                                        href={faq.action.url}
                                        className="group/btn flex items-center gap-2 px-5 py-2.5 bg-[#324D47]/5 text-[#324D47] rounded-full font-['Neutraface_2_Text:Bold',sans-serif] text-xs md:text-sm uppercase tracking-widest hover:bg-[#324D47] hover:text-white transition-all duration-300"
                                      >
                                        <span>{faq.action.label}</span>
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                      </a>
                                    )}
                                  </motion.div>
                               )}
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </motion.div>
                   ))}
                 </motion.div>
               ) : (
                 <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20 bg-[#F9F9F9] rounded-3xl border border-dashed border-[#E5E5E5]"
                  >
                   <HelpCircle size={48} className="mx-auto text-[#E5E5E5] mb-4" />
                   <h3 className="text-xl font-['Neutraface_2_Text:Demi',sans-serif] text-[#324D47] mb-2">Sonuç Bulunamadı</h3>
                   <p className="text-[#484848]/60">"{searchQuery}" ile ilgili bir soru bulamadık.</p>
                   <button 
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-[#E70000] font-bold text-sm hover:underline"
                   >
                     Tüm soruları göster
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Contact Box Column (4 cols) - Sticky */}
          <div className="lg:col-span-4 relative h-full">
             <div className="sticky top-32">
                <div className="bg-[#324D47] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl transform transition-transform group hover:-translate-y-1 duration-500">
                   {/* Decorative Circles */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#E70000] rounded-full blur-[60px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F4EBD1] rounded-full blur-[40px] opacity-10 translate-y-1/2 -translate-x-1/2" />
                   
                   <div className="relative z-10">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-inner">
                        <MessageCircle size={28} className="text-[#F4EBD1]" />
                      </div>
                      
                      <h3 className="text-2xl font-['Neutraface_2_Text:Bold',sans-serif] mb-4">
                        Sorunuzu bulamadınız mı?
                      </h3>
                      <p className="text-[#EEEBF5]/70 font-['Neutraface_2_Text:Book',sans-serif] mb-8 leading-relaxed text-sm">
                        Eğitim danışmanlarımız aklınıza takılan tüm soruları yanıtlamak ve size özel plan oluşturmak için hazır.
                      </p>

                      <button onClick={() => navigate('/iletisim')} className="w-full py-4 bg-white text-[#324D47] rounded-xl font-['Neutraface_2_Text:Bold',sans-serif] flex items-center justify-center gap-3 hover:bg-[#F4EBD1] transition-colors group/btn shadow-lg">
                        <span>İletişime Geçin</span>
                        <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <div className="mt-6 pt-6 border-t border-white/10 text-center flex items-center justify-center gap-2 text-xs text-[#EEEBF5]/50 uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-[#E70000] animate-pulse" />
                        <span>Şimdi Çevrimiçi</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
}