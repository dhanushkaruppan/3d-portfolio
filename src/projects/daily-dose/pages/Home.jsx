import '../daily-dose.css';
import React, { useState, useEffect, useRef } from 'react';
import { Background3D } from '../components/ThreeCanvas';
import { Link } from 'react-router-dom';

export default function Home() {
  const [scrollFraction, setScrollFraction] = useState(0);
  const [activeBlock, setActiveBlock] = useState(0);
  const totalBlocks = 4;
  const targetScrollFraction = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollContainer = document.getElementById('scroll-container');
      const maxScroll = scrollContainer 
        ? scrollContainer.offsetHeight - window.innerHeight 
        : document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScroll > 0 ? scrollY / maxScroll : 0;
      targetScrollFraction.current = Math.max(0, Math.min(1, fraction));
      setScrollFraction(targetScrollFraction.current);

      const rawIndex = targetScrollFraction.current * (totalBlocks - 0.5);
      const currentBlockIndex = Math.max(0, Math.min(totalBlocks - 1, Math.round(rawIndex)));
      setActiveBlock(currentBlockIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getBlockClass = (index) => {
    let alignment = index % 2 === 0 ? 'content-block-left' : 'content-block-right';
    if (activeBlock === index) return `content-block ${alignment} active`;
    if (index < activeBlock) return `content-block ${alignment} inactive-up`;
    return `content-block ${alignment} inactive-down`;
  };

  return (
    <div className="daily-dose-page font-syne">
      <div style={{ position: 'fixed', top: '18px', left: '20px', zIndex: 9999 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontFamily: 'monospace', fontSize: '12px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
          ← BACK TO PORTFOLIO
        </Link>
      </div>
      <Background3D scrollFraction={scrollFraction} />
      <div id="scroll-container">
        <div id="sticky-view">
          <div className="relative w-full h-full max-w-7xl mx-auto px-6">
            
            {/* Content Block 0 */}
            <div className={getBlockClass(0)} id="content-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full text-sm text-[#00f0ff] border-[#ff00aa]/30 mb-6 font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm text-[#ff00aa] animate-spin-slow">psychology</span>
                Generative AI Active
              </div>
              <h1 className="text-5xl md:text-7xl text-gradient mb-6 font-extrabold uppercase leading-tight">
                Daily Dose'u
              </h1>
              <p className="text-lg text-purple-200 mb-8 leading-relaxed max-w-xl font-inter">
                A cognitive Flutter application that helps users learn English vocabulary daily using AI to generate memorable, context-rich stories in both English and Tamil.
              </p>
            </div>

            {/* Content Block 1 */}
            <div className={getBlockClass(1)} id="content-1">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl text-gradient mb-6 font-extrabold flex items-center gap-3 uppercase">
                  <span className="text-[#ff00aa] text-xl bg-[#ff00aa]/10 px-2 py-1 rounded">01</span> Generative Core
                </h1>
                <p className="text-lg text-purple-200 leading-relaxed font-inter">
                  Integrated with the Gemini API, the app takes a daily English word and autonomously crafts an engaging short story around it, ensuring cognitive retention.
                </p>
                <div className="inline-flex items-center gap-3 bg-black/30 px-4 py-3 rounded-lg border border-[#ff00aa]/20 backdrop-blur-md">
                  <span className="material-symbols-outlined text-sm text-[#ff00aa]">auto_awesome</span>
                  <span className="text-white font-bold">LLM Engine</span>
                  <span className="text-sm text-[#00f0ff] bg-purple-900/50 px-2 py-1 rounded">Gemini Pro</span>
                </div>
              </div>
            </div>

            {/* Content Block 2 */}
            <div className={getBlockClass(2)} id="content-2">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl text-gradient mb-6 font-extrabold flex items-center gap-3 uppercase">
                  <span className="text-[#00f0ff] text-xl bg-[#00f0ff]/10 px-2 py-1 rounded">02</span> Bilingual Context
                </h1>
                <p className="text-lg text-purple-200 leading-relaxed font-inter">
                  Linguistics research shows that bilingual bridging increases retention. The generated stories are presented in both English and localized Tamil seamlessly.
                </p>
                <div className="inline-flex items-center gap-4 bg-black/30 px-4 py-3 rounded-lg border border-[#00f0ff]/20 backdrop-blur-md">
                  <span className="material-symbols-outlined text-[#00f0ff]">translate</span>
                  <span className="text-white font-bold">Localization</span>
                  <span className="text-sm text-[#ff00aa]">Dynamic Render</span>
                </div>
              </div>
            </div>

            {/* Content Block 3 */}
            <div className={getBlockClass(3)} id="content-3">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl text-gradient mb-6 font-extrabold flex items-center gap-3 uppercase">
                  <span className="text-[#aa00ff] text-xl bg-[#aa00ff]/10 px-2 py-1 rounded">03</span> Flutter UI
                </h1>
                <p className="text-lg text-purple-200 leading-relaxed font-inter">
                  A buttery smooth, cross-platform mobile interface built from scratch in Dart, featuring custom animations and a minimalist reading experience.
                </p>
                <div className="bg-black/30 p-6 rounded-lg border border-[#aa00ff]/20 max-w-md backdrop-blur-md">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-white font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#aa00ff]">phone_iphone</span> Target OS
                    </span>
                    <span className="text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 rounded text-sm">iOS & Android</span>
                  </div>
                  <div className="w-full h-2 bg-purple-900/50 rounded-full overflow-hidden mt-2">
                    <div className="w-full h-full bg-gradient-to-r from-[#00f0ff] to-[#ff00aa]"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <main className="bg-white w-full flex-grow pt-24 pb-16 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] text-gray-800 font-inter">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-xl leading-relaxed mb-16 border-l-4 border-[#aa00ff] pl-8 py-4 bg-purple-50 rounded-r-xl shadow-sm">
            <p className="mb-4 text-purple-900">
              <strong className="font-syne font-bold text-2xl">Daily Dose'u</strong> is a modern educational tool designed to combat the "forgetting curve" in language acquisition.
            </p>
            <p className="text-purple-800">
              Rote memorization often fails because words lack emotional or narrative context. By dynamically generating highly engaging short stories tailored to a specific vocabulary word—and translating the narrative directly into Tamil—users build strong neural associations.
            </p>
          </div>

          <h2 className="font-syne text-3xl text-gray-900 font-extrabold mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ff00aa] text-3xl">psychology</span> Technical Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-xl hover:border-[#aa00ff]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 border border-purple-200">
                <span className="material-symbols-outlined text-[#aa00ff]">flutter</span>
              </div>
              <h3 className="font-syne text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#aa00ff] transition-colors">Flutter & Dart</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                The entire frontend is built on the Flutter framework, ensuring high-performance 60fps rendering, complex gesture handling, and a unified codebase for both mobile platforms.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100 hover:shadow-xl hover:border-[#ff00aa]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center mb-4 border border-pink-200">
                <span className="material-symbols-outlined text-[#ff00aa]">api</span>
              </div>
              <h3 className="font-syne text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#ff00aa] transition-colors">Gemini API Integration</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Utilizes Google's Gemini LLM to procedurally generate narrative content on the fly. Prompt engineering ensures the stories are culturally relevant and syntactically correct.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-cyan-100 hover:shadow-xl hover:border-[#00f0ff]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mb-4 border border-cyan-200">
                <span className="material-symbols-outlined text-[#00f0ff]">storage</span>
              </div>
              <h3 className="font-syne text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#00f0ff] transition-colors">Local Persistence</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Uses local database solutions (like Hive or SQLite) to cache generated stories, allowing users to review their past vocabulary words completely offline.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-purple-100 hover:shadow-xl hover:border-[#aa00ff]/40 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 border border-purple-200">
                <span className="material-symbols-outlined text-[#aa00ff]">translate</span>
              </div>
              <h3 className="font-syne text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#aa00ff] transition-colors">Bilingual Mapping</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                A custom text rendering engine seamlessly switches between English and Tamil scripts without breaking typography layouts or paragraph spacing.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
