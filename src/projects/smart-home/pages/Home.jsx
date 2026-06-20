import '../smart-home.css';
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
    <div className="smart-home-page">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel rounded-full text-sm text-[#00d4ff] border-[#00d4ff]/30 mb-6 uppercase tracking-widest font-bold">
                <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse"></span>
                System Online
              </div>
              <h1 className="text-5xl md:text-7xl text-gradient mb-6 transition-all duration-500 font-extrabold uppercase">
                Smart Home
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl transition-all duration-300">
                A custom-built ESP32 switchboard providing wireless control, physical switches, and hands-free sound control through a dedicated Flutter dashboard.
              </p>
            </div>

            {/* Content Block 1 */}
            <div className={getBlockClass(1)} id="content-1">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl text-gradient mb-6 font-extrabold flex items-center gap-3 uppercase">
                  <span className="text-[#00d4ff] text-xl bg-[#00d4ff]/10 px-2 py-1 rounded">01</span> Hardware Node
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed">
                  Powered by the ESP32 microcontroller, the physical switchboard manages multiple high-voltage relays. It bridges physical toggle switches with IoT cloud commands.
                </p>
                <div className="inline-flex items-center gap-3 bg-black/40 px-4 py-3 rounded-lg border border-[#00d4ff]/20">
                  <span className="material-symbols-outlined text-sm text-[#00d4ff]">memory</span>
                  <span className="text-white font-bold">Relay Hub</span>
                  <span className="text-sm text-[#00d4ff] bg-gray-900 px-2 py-1 rounded">ESP32 MCU</span>
                </div>
              </div>
            </div>

            {/* Content Block 2 */}
            <div className={getBlockClass(2)} id="content-2">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl text-gradient mb-6 font-extrabold flex items-center gap-3 uppercase">
                  <span className="text-[#00d4ff] text-xl bg-[#00d4ff]/10 px-2 py-1 rounded">02</span> Flutter Dashboard
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed">
                  A beautiful, cross-platform mobile application built with Flutter allows real-time state monitoring and control from anywhere in the world over WebSockets.
                </p>
                <div className="inline-flex items-center gap-4 bg-black/40 px-4 py-3 rounded-lg border border-[#00d4ff]/20">
                  <span className="material-symbols-outlined text-[#00d4ff]">smartphone</span>
                  <span className="text-white font-bold">Mobile UI</span>
                  <span className="text-sm text-[#00d4ff]">10ms Latency</span>
                </div>
              </div>
            </div>

            {/* Content Block 3 */}
            <div className={getBlockClass(3)} id="content-3">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl text-gradient mb-6 font-extrabold flex items-center gap-3 uppercase">
                  <span className="text-[#00d4ff] text-xl bg-[#00d4ff]/10 px-2 py-1 rounded">03</span> Sound Control
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed">
                  Integrated acoustic sensors allow for clap-to-toggle or specific noise-frequency recognition, creating a truly hands-free environment when your phone is out of reach.
                </p>
                <div className="bg-black/40 p-6 rounded-lg border border-[#00d4ff]/20 max-w-md">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-white font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#00d4ff]">mic</span> Acoustic Sensor
                    </span>
                    <span className="text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-1 rounded text-sm">LISTENING</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2">
                    <div className="w-1/3 h-full bg-[#00d4ff] animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <main className="bg-[#f0f8ff] w-full flex-grow pt-24 pb-16 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] text-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-xl leading-relaxed mb-16 border-l-4 border-[#00d4ff] pl-8 py-4 bg-white rounded-r-xl shadow-sm">
            <p className="mb-4">
              The Smart Home Switchboard aims to bridge the gap between legacy home electrical systems and modern IoT standards.
            </p>
            <p>
              Rather than completely replacing standard wall switches, this ESP32-based node sits behind the panel, intercepting physical toggles and syncing their state instantly with a remote cloud database managed by a custom Flutter application.
            </p>
          </div>

          <h2 className="text-3xl text-gray-900 font-extrabold mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00d4ff] text-3xl">hub</span> System Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50 hover:shadow-lg hover:border-[#00d4ff]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
                <span className="material-symbols-outlined text-[#00d4ff]">router</span>
              </div>
              <h3 className="text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#00d4ff] transition-colors">ESP32 Core</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Connects to the home Wi-Fi and subscribes to MQTT topics for instant, bidirectional communication with the mobile app.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50 hover:shadow-lg hover:border-[#00d4ff]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
                <span className="material-symbols-outlined text-[#00d4ff]">power</span>
              </div>
              <h3 className="text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#00d4ff] transition-colors">Relay Modules</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Opto-isolated relays safely control 220V AC currents, allowing standard home appliances to be triggered by the 3.3V logic of the ESP32.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50 hover:shadow-lg hover:border-[#00d4ff]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
                <span className="material-symbols-outlined text-[#00d4ff]">flutter</span>
              </div>
              <h3 className="text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#00d4ff] transition-colors">Flutter UI</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                A material-design inspired dashboard built with Flutter that provides real-time state feedback. If a user flips a physical switch, the app updates instantly.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-50 hover:shadow-lg hover:border-[#00d4ff]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
                <span className="material-symbols-outlined text-[#00d4ff]">hearing</span>
              </div>
              <h3 className="text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#00d4ff] transition-colors">Acoustic Logic</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                An analog sound sensor measures decibel spikes. A debouncing algorithm ensures that only deliberate, loud claps trigger the main room lighting.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
