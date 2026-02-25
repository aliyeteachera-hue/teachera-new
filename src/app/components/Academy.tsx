import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ArrowRight, Clock, ChevronRight, Sparkles, TrendingUp, BookOpen, User, Calendar, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import TeacheraLogo from '../../imports/TeacheraLogo';

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  author: string;
  date: string;
  featured?: boolean;
}

const articles: Article[] = [
  // DİL ÖĞRENİMİ (GENEL)
  {
    id: 1,
    category: 'genel',
    title: 'Çeviri Hastalığı: Biliyorum Ama Konuşamıyorum',
    excerpt: 'Dil öğrenme sürecinde, teknik ve gramer bilgisine hâkim olsanız bile anlama ve konuşma becerilerinizi geliştiremeyişinizi anlamlandıramıyor olabilirsiniz.',
    image: 'https://images.unsplash.com/photo-1725190216145-ea1455fd9914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '5 dk',
    author: 'Teachera Uzman Ekibi',
    date: '12 Eki',
    featured: true
  },
  {
    id: 2,
    category: 'genel',
    title: 'Motor Beceri mi? Mantıksal Bilgi Edinimi mi?',
    excerpt: 'Dil öğrenmenin temel amacı iletişim kurabilmektir. Ancak çoğu sistem dili bir "matematik problemi" gibi öğretir.',
    image: 'https://images.unsplash.com/photo-1725399633872-32ba508b0607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '7 dk',
    author: 'Dr. Elena Rossi',
    date: '10 Eki'
  },
  {
    id: 10,
    category: 'genel',
    title: 'Dil Öğreniminde Yapay Zeka Devrimi',
    excerpt: 'Yapay zeka araçları dil öğrenimini nasıl kişiselleştiriyor ve hızlandırıyor? Yeni nesil öğrenme araçlarını keşfedin.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '4 dk',
    author: 'Teknoloji Ekibi',
    date: '08 Eki'
  },
  
  // İNGİLİZCE
  {
    id: 3,
    category: 'ingilizce',
    title: 'Business English: Küresel Pazarda Yerinizi Alın',
    excerpt: 'Profesyonel hayatta İngilizce sadece bir dil değil, bir yetkinliktir. Toplantılarda ve sunumlarda kullanabileceğiniz kilit stratejiler.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '4 dk',
    author: 'James Wilson',
    date: '15 Eki',
    featured: true
  },
  {
    id: 4,
    category: 'ingilizce',
    title: 'IELTS & TOEFL Sınav Stratejileri',
    excerpt: 'Akademik sınavlara hazırlanırken yapılan en yaygın hatalar ve yüksek skor için "Time Management" taktikleri.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '6 dk',
    author: 'Sarah Jenkins',
    date: '14 Eki'
  },
  {
    id: 11,
    category: 'ingilizce',
    title: 'İngilizce Deyimler ve Atasözleri',
    excerpt: 'Native speaker gibi konuşmak için bilmeniz gereken en popüler 50 İngilizce deyim ve kullanım alanları.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '5 dk',
    author: 'John Smith',
    date: '11 Eki'
  },

  // ALMANCA
  {
    id: 5,
    category: 'almanca',
    title: 'Alman Mühendisliği ve Dilin Yapısı',
    excerpt: 'Almanca, kuralların ve netliğin dilidir. Mühendislik ve teknik alanlarda kariyer hedefleyenler için temel terminoloji rehberi.',
    image: 'https://images.unsplash.com/photo-1517457210348-703079e57d4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '5 dk',
    author: 'Hans Müller',
    date: '13 Eki',
    featured: true
  },

  // İSPANYOLCA
  {
    id: 6,
    category: 'ispanyolca',
    title: 'Ritmi Yakalayın: Hızlı İspanyolca',
    excerpt: 'İspanyolca, dünyanın en hızlı konuşulan dillerinden biridir. Duyduğunu anlama ve bu hıza ayak uydurma egzersizleri.',
    image: 'https://images.unsplash.com/photo-1547990196-80517909c0aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '4 dk',
    author: 'Maria Garcia',
    date: '09 Eki',
    featured: true
  },

   // FRANSIZCA
   {
    id: 7,
    category: 'fransizca',
    title: 'Sanatın Dili: Paris Sokaklarında Gezinti',
    excerpt: 'Fransızca telaffuzunun incelikleri ve günlük hayatta kullanılan, ders kitaplarında bulamayacağınız deyimler.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '5 dk',
    author: 'Sophie Martin',
    date: '07 Eki',
    featured: true
  },

  // İTALYANCA
  {
    id: 8,
    category: 'italyanca',
    title: 'La Dolce Vita: Jestler ve Mimikler',
    excerpt: 'İtalyanca konuşurken ellerinizi nasıl kullanmalısınız? Sözsüz iletişimin İtalyan kültüründeki hayati önemi.',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '4 dk',
    author: 'Marco Rossi',
    date: '06 Eki',
    featured: true
  },

   // RUSÇA
   {
    id: 9,
    category: 'rusca',
    title: 'Kiril Alfabesi: Korkulan Engeli Aşmak',
    excerpt: 'Rusça öğrenmeye başlarken gözünüzü korkutan alfabe aslında en kolay kısımdır. 2 saatte okumayı öğrenme tekniği.',
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    readTime: '6 dk',
    author: 'Ivan Petrov',
    date: '05 Eki',
    featured: true
  }
];

const categories = [
  { id: 'genel', label: 'DİL ÖĞRENİMİ' },
  { id: 'ingilizce', label: 'İNGİLİZCE' },
  { id: 'almanca', label: 'ALMANCA' },
  { id: 'ispanyolca', label: 'İSPANYOLCA' },
  { id: 'fransizca', label: 'FRANSIZCA' },
  { id: 'italyanca', label: 'İTALYANCA' },
  { id: 'rusca', label: 'RUSÇA' },
];

export default function Academy() {
  const [activeCategory, setActiveCategory] = useState('genel');
  const ref = useRef(null);
  
  const filteredArticles = articles.filter(article => article.category === activeCategory);
  const sortedArticles = [...filteredArticles].sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
  
  const featuredArticle = sortedArticles[0];
  const gridArticles = sortedArticles.slice(1);

  return (
    <section id="academy" ref={ref} className="relative bg-[#F4EBD1] min-h-screen font-sans">
      
      {/* 
        HEADER SECTION 
        Teachera Logo + Academy Lockup
      */}
      <div className="bg-[#324D47] relative pt-20 pb-32 lg:pb-40 overflow-hidden rounded-b-[40px] lg:rounded-b-[60px] shadow-2xl z-10">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E70000] rounded-full mix-blend-multiply filter blur-[180px] opacity-15 animate-pulse pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
             {/* Top Navigation / Brand Area */}
             <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#ffffff]/10 pb-8">
               
               <div className="flex items-center gap-4 md:gap-8 h-12">
                 {/* 
                    LOGO LOCKUP 
                    Explicit dimensions added to ensure the logo renders. 
                    The SVG inside TeacheraLogo is absolute/size-full, so parent must have size.
                 */}
                 <div 
                    className="w-[146px] h-[29px] md:w-[180px] md:h-[36px] relative" 
                    style={{ '--fill-0': '#ffffff' } as React.CSSProperties}
                 >
                   <TeacheraLogo />
                 </div>
                 
                 {/* Vertical Divider */}
                 <div className="hidden md:block h-full w-[1px] bg-[#ffffff]/30" />
                 
                 {/* Academy Text */}
                 <h1 className="text-3xl md:text-4xl font-['Neutraface_2_Text:Bold',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-[#E70000] to-[#FF8A80] tracking-widest uppercase leading-none mt-1">
                   ACADEMY
                 </h1>
               </div>

               {/* Right Side Badge */}
               <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#ffffff]/5 backdrop-blur-md border border-[#ffffff]/10 rounded-full">
                  <Sparkles size={14} className="text-[#E70000]" />
                  <span className="text-[10px] text-[#ffffff]/90 font-['Neutraface_2_Text:Demi',sans-serif] uppercase tracking-widest">
                    Premium Dil Eğitim Platformu
                  </span>
               </div>
             </div>

             <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <p className="text-[#EEEBF5]/80 text-lg md:text-xl font-['Neutraface_2_Text:Book',sans-serif] max-w-2xl leading-relaxed">
                  Dil öğrenimi, sadece kelime ezberlemek değil; yeni bir düşünce yapısı kazanmaktır. 
                  <span className="text-[#E70000] ml-1 font-['Neutraface_2_Text:Demi',sans-serif]">Teachera Academy</span> ile kültürel kodları çözün.
                </p>
                
                {/* Mobile Badge */}
                <div className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#ffffff]/5 backdrop-blur-md border border-[#ffffff]/10 rounded-full self-start">
                  <Sparkles size={14} className="text-[#E70000]" />
                  <span className="text-[10px] text-[#ffffff]/90 font-['Neutraface_2_Text:Demi',sans-serif] uppercase tracking-widest">
                    Premium İçerik
                  </span>
               </div>
             </div>
          </motion.div>

        </div>
      </div>

      {/* 
        CONTENT AREA
        Floating Tabs + Grid Layout
      */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-20 -mt-20 pb-24">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#ffffff] p-1.5 rounded-full shadow-xl shadow-[#324D47]/10 border border-[#324D47]/5 overflow-x-auto custom-scrollbar-hide max-w-full">
            <div className="flex items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    relative px-6 py-3 rounded-full text-xs md:text-sm font-['Neutraface_2_Text:Demi',sans-serif] tracking-wide transition-all duration-300 whitespace-nowrap z-10
                    ${activeCategory === cat.id ? 'text-[#ffffff]' : 'text-[#324D47]/60 hover:text-[#324D47] hover:bg-[#324D47]/5'}
                  `}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeAcademyTab"
                      className="absolute inset-0 bg-[#324D47] rounded-full shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-10"
          >
            
            {/* FEATURED HERO ARTICLE */}
            {featuredArticle && (
              <div className="w-full group cursor-pointer relative">
                <div className="relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden shadow-2xl shadow-[#324D47]/20 bg-black transition-all duration-500 hover:shadow-[#324D47]/30">
                  <ImageWithFallback
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00000B] via-[#00000B]/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-3/4 flex flex-col items-start gap-4">
                    <span className="px-3 py-1 bg-[#E70000] text-white text-[10px] font-bold tracking-widest uppercase rounded-md mb-2 shadow-lg backdrop-blur-md bg-opacity-90">
                      Editörün Seçimi
                    </span>
                    <h2 className="text-3xl md:text-5xl font-['Neutraface_2_Text:Bold',sans-serif] text-white leading-[1.1] drop-shadow-lg">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-[#EEEBF5]/90 text-sm md:text-lg line-clamp-2 max-w-2xl font-['Neutraface_2_Text:Book',sans-serif] shadow-black drop-shadow-md">
                      {featuredArticle.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-6 text-[#EEEBF5] text-xs mt-4 font-['Neutraface_2_Text:Demi',sans-serif] uppercase tracking-wider">
                       <div className="flex items-center gap-2">
                         <User size={14} className="text-[#E70000]" />
                         <span>{featuredArticle.author}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <Clock size={14} className="text-[#E70000]" />
                         <span>{featuredArticle.readTime}</span>
                       </div>
                    </div>
                  </div>

                  <div className="absolute top-8 right-8 hidden md:flex">
                     <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#E70000] group-hover:border-[#E70000] group-hover:rotate-45 transition-all duration-300 shadow-xl">
                        <ArrowUpRight size={24} />
                     </div>
                  </div>
                </div>
              </div>
            )}

            {/* ARTICLES GRID (Refined Minimal Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {gridArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 border border-[#324D47]/5 hover:-translate-y-2 cursor-pointer h-full"
                >
                  {/* Card Image Area */}
                  <div className="h-48 overflow-hidden relative">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-4 left-4">
                       <span className="bg-white/95 backdrop-blur-md text-[#324D47] text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
                          {categories.find(c => c.id === article.category)?.label}
                       </span>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="flex flex-col flex-1 p-6 relative">
                    {/* Date & Time */}
                    <div className="flex items-center gap-3 text-[10px] text-[#324D47]/40 font-bold uppercase tracking-widest mb-3">
                       <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                       <span className="w-1 h-1 rounded-full bg-[#324D47]/20" />
                       <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-['Neutraface_2_Text:Bold',sans-serif] text-[#324D47] leading-tight mb-3 group-hover:text-[#E70000] transition-colors">
                      {article.title}
                    </h3>
                    
                    <p className="text-[#324D47]/60 text-sm line-clamp-3 leading-relaxed font-['Neutraface_2_Text:Book',sans-serif] mb-6 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between border-t border-[#324D47]/10 pt-4 mt-auto">
                       <span className="text-xs text-[#324D47]/50 font-bold flex items-center gap-2">
                         <div className="w-5 h-5 rounded-full bg-[#324D47]/10 flex items-center justify-center">
                            <User size={10} />
                         </div>
                         {article.author}
                       </span>
                       
                       <span className="text-[#E70000] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                         <ArrowRight size={16} />
                       </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More Button */}
            {filteredArticles.length > 0 && (
               <div className="flex justify-center mt-8">
                 <button className="group relative px-8 py-3 bg-white border border-[#324D47]/10 rounded-full text-[#324D47] text-xs font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#324D47]/30">
                   <span className="relative z-10 group-hover:text-[#E70000] transition-colors">Daha Fazla Göster</span>
                 </button>
               </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}