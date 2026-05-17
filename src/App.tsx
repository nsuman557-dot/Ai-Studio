import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Library, 
  Calendar, 
  Users, 
  User, 
  Bell, 
  Play, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Compass,
  Mic2,
  Volume2
} from 'lucide-react';
import { ANIME_DATA } from './data';
import { motion, AnimatePresence } from 'motion/react';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`group flex flex-col items-center gap-1 cursor-pointer py-4 transition-all ${active ? 'text-white' : 'text-zinc-500 hover:text-white'}`}>
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-zinc-900 border border-zinc-800' : 'group-hover:bg-zinc-800/50'}`}>
      <Icon size={20} />
    </div>
    <span className="text-[10px] font-medium tracking-widest uppercase">{label}</span>
  </div>
);

const SectionHeader = ({ title, showViewAll = true, showArrows = false }: { title: string, showViewAll?: boolean, showArrows?: boolean }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-3">
      <span className="text-zinc-700 font-mono text-xs tracking-tighter">//</span>
      <h2 className="text-white font-bold tracking-[0.2em] uppercase text-[10px]">{title}</h2>
    </div>
    <div className="flex items-center gap-4">
      {showViewAll && (
        <button className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors text-[8px] font-bold tracking-widest uppercase group">
          View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </button>
      )}
      {showArrows && (
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-600 transition-all">
            <ChevronLeft size={12} />
          </button>
          <button className="w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600 hover:text-white hover:border-zinc-600 transition-all">
            <ChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  </div>
);

// Rectangular Card (16:9) - Implements the "Continue Watching" style from image
interface RectCardProps {
  item: any;
  showProgress?: boolean;
  index?: number;
}

const RectCard = ({ item, showProgress = false, index }: RectCardProps) => (
  <div className="group cursor-pointer shrink-0 w-[230px] flex flex-col">
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="relative aspect-video bg-zinc-900 overflow-hidden brutalist-border"
    >
      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      
      {index !== undefined && (
        <div className="absolute top-0 left-0 bg-zinc-950/80 backdrop-blur-sm px-2 py-1 text-[8px] font-mono text-white border-r border-b border-zinc-800">
          {String(index + 1).padStart(2, '0')}
        </div>
      )}

      {/* Geomatric Accent */}
      <div className="absolute top-2 right-2 opacity-40 group-hover:opacity-80 transition-opacity">
        <div className="flex gap-1">
           <div className="w-1 h-1 bg-white/40" />
           <div className="w-2 h-2 border-r border-t border-white" />
        </div>
      </div>
      
      <div className="absolute bottom-3 left-3 right-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-black text-[9px] tracking-widest uppercase truncate">{item.title}</h3>
        <p className="text-zinc-600 text-[8px] font-bold tracking-tight uppercase mt-[2px]">{item.episode}</p>
        
        {showProgress && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-zinc-900 truncate">
              <div className="h-full bg-zinc-600 group-hover:bg-white transition-all duration-500" style={{ width: `${item.progress}%` }} />
            </div>
            <span className="text-zinc-700 text-[8px] font-mono">{item.progress}%</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
        <div className="w-6 h-6 border border-white/40 flex items-center justify-center bg-black/20">
          <Play size={10} className="fill-white text-white ml-[1px]" />
        </div>
      </div>
    </motion.div>
  </div>
);

// Poster Card (2:3)
interface LanguageCardProps {
  item: any;
}

const LanguageCard = ({ item }: LanguageCardProps) => (
  <div className="group cursor-pointer shrink-0 w-[220px] flex flex-col">
    <motion.div 
      whileHover={{ scale: 1.01 }}
      className="relative aspect-video bg-zinc-950 overflow-hidden brutalist-border"
    >
      <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      
      {/* DUB Badge */}
      <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-sm border border-zinc-800 flex items-center gap-1">
        <Mic2 size={7} className="text-white fill-white" />
        <span className="text-[7px] text-white font-black tracking-widest uppercase">DUB</span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-black text-[9px] tracking-widest uppercase truncate">{item.title}</h3>
        <div className="flex items-center gap-2 mt-[2px]">
           <Volume2 size={8} className="text-zinc-500" />
           <p className="text-zinc-600 text-[7px] font-bold tracking-[0.2em] uppercase truncate">TAMIL • HINDI • TELUGU</p>
        </div>
      </div>
    </motion.div>
  </div>
);

// Poster Card (2:3)
interface PosterCardProps {
  item: any;
  index?: number;
}

const PosterCard = ({ item, index }: PosterCardProps) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="relative group cursor-pointer shrink-0 w-40 aspect-[2/3] bg-zinc-900 overflow-hidden brutalist-border"
  >
    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    
    {index !== undefined && (
      <div className="absolute top-0 left-0 bg-zinc-950 px-2 py-1 text-[8px] font-mono text-zinc-500 border-r border-b border-zinc-800">
        {String(index + 1).padStart(2, '0')}
      </div>
    )}

    <div className="absolute bottom-3 left-3 right-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
      <h3 className="text-white font-black text-[9px] tracking-widest uppercase mb-[2px] line-clamp-1">{item.title}</h3>
      <p className="text-zinc-600 text-[8px] font-bold tracking-tight uppercase">{item.episode}</p>
    </div>
    
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
      <div className="w-8 h-8 border border-white flex items-center justify-center">
        <Play size={12} className="fill-white text-white ml-[2px]" />
      </div>
    </div>
  </motion.div>
);

const GenreCard = ({ genre }: { genre: any }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className="relative group cursor-pointer shrink-0 w-40 aspect-[2/3] bg-zinc-950 overflow-hidden brutalist-border"
  >
    <img src={genre.image} alt={genre.name} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 opacity-40 group-hover:opacity-100 transition-all duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
    
    {/* Geometric Accents from the image */}
    <div className="absolute top-3 left-3 opacity-30 group-hover:opacity-60 transition-opacity">
       <div className="w-2 h-2 border-l border-t border-white" />
    </div>
    <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity">
       <div className="w-3 h-3 border-r border-t border-white" />
       <div className="mt-1 w-1 h-1 bg-white ml-auto" />
    </div>
    <div className="absolute bottom-3 right-3 opacity-30 group-hover:opacity-60 transition-opacity flex flex-col items-center">
       <div className="w-3 h-[1px] bg-white rotate-45 origin-center" />
       <div className="w-3 h-[1px] bg-white -rotate-45 origin-center -mt-[1px]" />
    </div>

    <div className="absolute inset-0 p-4 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
      <h3 className="text-white font-black text-[12px] tracking-[0.2em] uppercase leading-none">{genre.name}</h3>
      <p className="text-zinc-600 font-bold text-[8px] tracking-widest mt-1 uppercase">{genre.kanji}</p>
      
      <div className="mt-6 flex flex-col items-start leading-[1] gap-[1px]">
        <span className="text-[10px] font-mono text-zinc-400 tracking-tighter">{genre.count}+</span>
        <span className="text-[7px] font-black text-zinc-700 tracking-[0.4em] uppercase">Series</span>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroData = ANIME_DATA.slider[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % ANIME_DATA.slider.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + ANIME_DATA.slider.length) % ANIME_DATA.slider.length);

  return (
    <div className="flex h-screen w-full bg-brand-black overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-24 h-full border-r border-brand-border flex flex-col items-center py-8 z-50 bg-brand-black shrink-0">
        <div className="mb-12">
          <h1 className="text-white font-black text-xl tracking-tighter">VOID.</h1>
          <p className="text-[8px] text-zinc-500 font-medium tracking-widest leading-tight uppercase text-center mt-1">アニメのすべて</p>
        </div>

        <nav className="flex-1 w-full space-y-1">
          <SidebarItem icon={Home} label="Home" active />
          <SidebarItem icon={Compass} label="Explore" />
          <SidebarItem icon={Library} label="Collection" />
          <SidebarItem icon={Calendar} label="Schedule" />
          <SidebarItem icon={Users} label="Community" />
          <SidebarItem icon={User} label="Profile" />
        </nav>

        <div className="mt-auto">
          <div className="rotate-180 [writing-mode:vertical-lr] text-zinc-800 font-bold text-[8px] tracking-[0.4em] uppercase">
            Scroll to explore
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-brand-black hide-scrollbar">
        {/* Header Overlay */}
        <header className="absolute top-0 left-0 right-0 h-20 flex items-center justify-end px-12 z-40 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-6">
            <div className="relative group flex items-center">
              <Search className="absolute left-3 text-zinc-600 group-focus-within:text-white transition-colors z-10" size={14} />
              <input 
                type="text" 
                placeholder="Search anime, characters, studios..."
                className="w-64 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-full h-9 pl-9 pr-4 text-[10px] font-medium tracking-wide transition-all outline-none focus:border-zinc-700 placeholder:text-zinc-800"
              />
            </div>

            <button className="text-white hover:opacity-80 transition-all flex items-center justify-center">
              <Bell size={18} />
            </button>
            
            <div className="w-9 h-9 border border-zinc-800 p-[2px] overflow-hidden rounded-full bg-zinc-950">
               <img src="https://kottke.org/cdn-cgi/image/format=auto,fit=scale-down,width=1200,metadata=none//plus/misc/images/ai-faces-01.jpg" className="w-full h-full object-cover grayscale rounded-full" />
            </div>
          </div>
        </header>

        {/* Hero Slider */}
        <section className="relative h-[80vh] w-full bg-black overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img src={heroData.backdrop_path} className="w-full h-full object-cover grayscale opacity-40 scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 flex items-center px-24">
            <div className="max-w-2xl mt-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-zinc-700 font-mono text-xs tracking-tighter">//</span>
                <span className="text-zinc-600 text-[9px] font-bold tracking-[0.4em] uppercase">Featured Series</span>
              </div>
              
              <h2 className="text-white text-7xl font-black tracking-tighter mb-4 uppercase">
                {heroData.title}
              </h2>
              
              <div className="text-zinc-500 font-mono text-[9px] tracking-[0.2em] uppercase mb-8 flex items-center gap-6">
                 {heroData.episode_info}
              </div>

              <p className="text-zinc-500 text-xs leading-relaxed tracking-tight max-w-lg mb-10 line-clamp-3">
                {heroData.overview}
              </p>

              <div className="flex items-center gap-4">
                <button className="px-7 h-11 bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 hover:bg-zinc-200 transition-colors">
                  Watch Now <Play size={12} className="fill-black" />
                </button>
                <button className="px-7 h-11 border border-zinc-800 text-white font-black text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 hover:bg-zinc-900 transition-colors">
                  <Plus size={14} /> My List
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-12 left-24 flex items-center gap-12">
             <div className="flex items-center gap-4 text-white font-mono text-[9px] tracking-widest">
               <span>{String(currentSlide + 1).padStart(2, '0')}</span>
               <div className="w-32 h-[1px] bg-zinc-900 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSlide + 1) / ANIME_DATA.slider.length) * 100}%` }}
                    className="absolute inset-y-0 left-0 bg-white" 
                  />
               </div>
               <span className="text-zinc-800">{String(ANIME_DATA.slider.length).padStart(2, '0')}</span>
             </div>
             <div className="flex items-center gap-3">
                <button onClick={prevSlide} className="w-9 h-9 border border-zinc-800 flex items-center justify-center text-zinc-700 hover:text-white hover:border-zinc-700 transition-all">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextSlide} className="w-9 h-9 border border-zinc-800 flex items-center justify-center text-zinc-700 hover:text-white hover:border-zinc-700 transition-all">
                  <ChevronRight size={16} />
                </button>
             </div>
          </div>

          <div className="absolute bottom-12 right-16 flex flex-col items-end">
            <span className="text-zinc-800 font-mono text-[8px] tracking-widest uppercase mb-1">VOID.SYSTEM</span>
            <div className="flex gap-[2px]">
              <div className="w-[1px] h-2 bg-zinc-900" />
              <div className="w-[1px] h-3 bg-zinc-800" />
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="px-12 py-6 space-y-6 pb-32">
          
          {/* Continue Watching */}
          <section>
            <SectionHeader title="Continue Watching" showArrows />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.continueWatching.map((item, idx) => (
                <RectCard key={item.id} item={item} index={idx} showProgress />
              ))}
            </div>
          </section>

          {/* Trending */}
          <section>
            <SectionHeader title="Trending Now" showViewAll />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.trending.map((item, idx) => (
                <PosterCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </section>

          {/* Explore by Genre */}
          <section>
            <SectionHeader title="Explore by Genre" showViewAll />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.genres.map((genre) => (
                <GenreCard key={genre.name} genre={genre} />
              ))}
            </div>
          </section>

          {/* Language Dubs (Rectangular) */}
          <section>
            <SectionHeader title="Hindi Dubbed" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.languages.hindi.map((item) => (
                <LanguageCard key={item.animeId} item={item} />
              ))}
            </div>
          </section>
          
          <section>
            <SectionHeader title="Telugu Dubbed" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.languages.telugu.map((item) => (
                <LanguageCard key={item.animeId} item={item} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Tamil Dubbed" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.languages.tamil.map((item) => (
                <LanguageCard key={item.animeId} item={item} />
              ))}
            </div>
          </section>

          {/* Latest Episodes */}
          <section>
            <SectionHeader title="Latest Episodes" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.latestEpisodes.map((item) => (
                <PosterCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Top Airing */}
          <section>
            <SectionHeader title="Top Airing" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.topAiring.map((item) => (
                <PosterCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Most Popular */}
          <section>
            <SectionHeader title="Most Popular" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.mostPopular.map((item) => (
                <PosterCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Most Favorite */}
          <section>
            <SectionHeader title="Most Favourite" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.mostFavorite.map((item) => (
                <PosterCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Latest Completed */}
          <section>
            <SectionHeader title="Latest Completed" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.latestCompleted.map((item) => (
                <PosterCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Upcoming */}
          <section>
            <SectionHeader title="Upcoming" />
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {ANIME_DATA.upcoming.map((item) => (
                <PosterCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* Footer Card */}
          <footer className="p-12 brutalist-border bg-zinc-950 flex items-start gap-24 relative overflow-hidden mt-8">
            <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
              <svg width="400" height="400" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" />
                <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="space-y-6 max-w-xs shrink-0 relative z-10">
              <h2 className="text-white font-black text-3xl tracking-tighter">VOID.</h2>
              <p className="text-zinc-600 text-[11px] leading-relaxed tracking-tight">
                Animes of the future are here. VOID system provides a brutalist, high-performance interface for the modern anime enthusiast. Original experience, now remastered.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-12 flex-1 relative z-10">
              <div>
                <h5 className="text-[9px] text-zinc-800 font-bold tracking-[0.4em] uppercase mb-6 whitespace-nowrap">Navigation</h5>
                <ul className="space-y-3">
                  {['Home', 'Explore', 'Collection', 'Schedule'].map(item => (
                    <li key={item} className="text-zinc-600 hover:text-white transition-colors text-[11px] font-medium cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-[9px] text-zinc-800 font-bold tracking-[0.4em] uppercase mb-6 whitespace-nowrap">Support</h5>
                <ul className="space-y-3">
                  {['Help Center', 'Contact Us', 'Privacy Policy'].map(item => (
                    <li key={item} className="text-zinc-600 hover:text-white transition-colors text-[11px] font-medium cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="text-[9px] text-zinc-800 font-bold tracking-[0.4em] uppercase mb-6 whitespace-nowrap">Connect</h5>
                <ul className="space-y-3">
                  {['Discord', 'Instagram', 'Twitter'].map(item => (
                    <li key={item} className="text-zinc-600 hover:text-white transition-colors text-[11px] font-medium cursor-pointer">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="min-w-[200px]">
                <h5 className="text-[9px] text-zinc-800 font-bold tracking-[0.4em] uppercase mb-6 whitespace-nowrap">Newsletter</h5>
                <div className="relative">
                  <input type="email" placeholder="Your email" className="w-full bg-transparent border-b border-zinc-900 h-10 pr-10 text-[11px] text-white outline-none focus:border-zinc-700 transition-colors" />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
