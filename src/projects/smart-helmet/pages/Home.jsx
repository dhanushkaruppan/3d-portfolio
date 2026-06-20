import '../smart-helmet.css';
import React, { useState, useEffect, useRef } from 'react';
import { Background3D } from '../components/ThreeCanvas';
import { Link } from 'react-router-dom';

export default function Home() {
  const [scrollFraction, setScrollFraction] = useState(0);
  const [activeBlock, setActiveBlock] = useState(0);
  const totalBlocks = 5;
  const targetScrollFraction = useRef(0);
  const githubRepoUrl = "#";

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
    <div className="smart-helmet-page">
      <div style={{ position: 'fixed', top: '18px', left: '20px', zIndex: 9999 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontFamily: 'monospace', fontSize: '12px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
          ← BACK TO PORTFOLIO
        </Link>
      </div>
      <Background3D scrollFraction={scrollFraction} activeBlock={activeBlock} />
      <div id="scroll-container">
        <div id="sticky-view">
          <div className="relative w-full h-full max-w-7xl mx-auto px-6">
            {/* Content Block 0 */}
            <div className={getBlockClass(0)} id="content-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel rounded-full font-space-grotesk text-sm text-[#ff7a00] border-[#ff7a00]/30 mb-6 animate-pulse-emergency">
                <span className="w-2 h-2 rounded-full bg-[#ff2a2a] animate-pulse"></span>
                EMERGENCY SYSTEM ACTIVE
              </div>
              <h1 className="font-orbitron text-5xl md:text-7xl text-gradient mb-6 transition-all duration-500 hover:tracking-widest uppercase">
                Smart Helmet
              </h1>
              <p className="font-space-grotesk text-lg text-gray-300 mb-8 leading-relaxed max-w-xl transition-all duration-300 hover:text-white">
                An advanced accident detection and emergency response system utilizing SW-420 vibration sensors, MPU6050 accelerometers, and integrated camera modules for immediate impact analysis.
              </p>
            </div>

            {/* Content Block 1 */}
            <div className={getBlockClass(1)} id="content-1">
              <div className="space-y-6">
                <h1 className="font-orbitron text-4xl md:text-5xl text-gradient mb-6 transition-all duration-500 hover:tracking-widest flex items-center gap-3">
                  <span className="text-[#ff7a00] font-orbitron text-xl bg-[#ff7a00]/10 px-2 py-1 rounded">01</span> IMPACT DETECTION
                </h1>
                <p className="font-space-grotesk text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                  Continuous telemetry monitoring via the MPU6050 6-axis accelerometer and gyroscope. Instantly detects abnormal velocity changes and critical G-force impacts.
                </p>
                <div className="inline-flex items-center gap-3 bg-black/50 px-4 py-3 rounded-lg border border-white/5 hover:border-[#ff7a00]/30 transition-colors">
                  <span className="material-symbols-outlined text-sm text-[#ff7a00]">sensors</span>
                  <span className="font-space-grotesk text-white">Sensor Node</span>
                  <span className="font-space-grotesk text-sm text-[#ff7a00] bg-gray-900 px-2 py-1 rounded">MPU6050 & SW-420</span>
                </div>
              </div>
            </div>

            {/* Content Block 2 */}
            <div className={getBlockClass(2)} id="content-2">
              <div className="space-y-6">
                <h1 className="font-orbitron text-4xl md:text-5xl text-gradient mb-6 transition-all duration-500 hover:tracking-widest flex items-center gap-3">
                  <span className="text-[#ff2a2a] font-orbitron text-xl bg-[#ff2a2a]/10 px-2 py-1 rounded">02</span> VISUAL TELEMETRY
                </h1>
                <p className="font-space-grotesk text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                  Upon impact detection, the ESP32-CAM module automatically captures visual data of the surroundings and uploads it over Wi-Fi to a secure emergency server.
                </p>
                <div className="inline-flex items-center gap-4 bg-black/50 px-4 py-3 rounded-lg border border-white/5 hover:border-[#ff2a2a]/30 transition-colors">
                  <span className="material-symbols-outlined text-[#ff2a2a]">photo_camera</span>
                  <span className="font-space-grotesk text-white">Visual Capture</span>
                  <span className="font-space-grotesk text-sm text-[#ff2a2a]">Active on Trigger</span>
                </div>
              </div>
            </div>

            {/* Content Block 3 */}
            <div className={getBlockClass(3)} id="content-3">
              <div className="space-y-6">
                <h1 className="font-orbitron text-4xl md:text-5xl text-gradient mb-6 transition-all duration-500 hover:tracking-widest flex items-center gap-3">
                  <span className="text-[#ff7a00] font-orbitron text-xl bg-[#ff7a00]/10 px-2 py-1 rounded">03</span> GPS ROUTING
                </h1>
                <p className="font-space-grotesk text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                  Exact longitudinal and latitudinal coordinates are parsed via a dedicated GPS module. The system constructs an emergency distress payload within milliseconds.
                </p>
                <div className="bg-black/50 p-6 rounded-lg border border-white/5 max-w-md">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-space-grotesk text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ff7a00] animate-pulse">satellite_alt</span> Satellite Lock
                    </span>
                    <span className="font-space-grotesk text-[#ff7a00] bg-[#ff7a00]/10 px-2 py-1 rounded">FIXED</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2 relative">
                    <div className="w-full h-full bg-[#ff7a00] shadow-[0_0_10px_rgba(255,122,0,0.8)] relative"></div>
                  </div>
                  <div className="flex justify-between mt-4 font-space-grotesk text-sm text-gray-400 border-t border-white/5 pt-4">
                    <span>STATUS: <span className="text-white">Transmitting</span></span>
                    <span>LAT/LONG: <span className="text-[#ff7a00]">Synced</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Block 4 */}
            <div className={getBlockClass(4)} id="content-4">
              <div className="space-y-6">
                <h1 className="font-orbitron text-4xl md:text-5xl text-gradient mb-6 transition-all duration-500 hover:tracking-widest flex items-center gap-3">
                  <span className="text-white font-orbitron text-xl bg-white/10 px-2 py-1 rounded">04</span> EMERGENCY DISPATCH
                </h1>
                <p className="font-space-grotesk text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                  Distress signals with GPS coordinates and impact force analytics are sent directly to emergency contacts and nearby medical dispatch units.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <div className="btn-glow bg-[#1a0505] border border-[#ff2a2a]/30 text-[#ff2a2a] font-space-grotesk px-6 py-4 rounded-lg flex-1 flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-sm">cell_tower</span> Signal Broadcasted
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="bg-[#fffafa] w-full flex-grow pt-24 pb-16 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="font-space-grotesk text-xl leading-relaxed mb-16 text-gray-800 border-l-4 border-[#ff2a2a] pl-8 py-4 bg-white rounded-r-xl shadow-sm">
            <p className="mb-4">
              The Smart Helmet project was engineered to drastically reduce emergency response times for two-wheeler accidents by creating an autonomous IoT distress beacon.
            </p>
            <p>
              By combining an ESP32-CAM, an MPU6050 accelerometer, and SW-420 vibration sensors, the helmet acts as an edge-computing node capable of deciding when an impact is severe enough to warrant dispatching medical teams.
            </p>
          </div>

          <h2 className="font-orbitron text-3xl text-gray-900 font-bold mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ff7a00] text-3xl">hardware</span> Hardware Architecture
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#ff7a00]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 border border-orange-100">
                <span className="material-symbols-outlined text-[#ff7a00]">memory</span>
              </div>
              <h3 className="font-orbitron text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#ff7a00] transition-colors">ESP32-CAM Microcontroller</h3>
              <p className="font-space-grotesk text-base text-gray-600 leading-relaxed">
                Acts as the central processing unit and visual telemetry node. It captures images on impact and handles Wi-Fi/Bluetooth communications to broadcast distress payloads.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#ff2a2a]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
                <span className="material-symbols-outlined text-[#ff2a2a]">speed</span>
              </div>
              <h3 className="font-orbitron text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#ff2a2a] transition-colors">MPU6050 Accelerometer</h3>
              <p className="font-space-grotesk text-base text-gray-600 leading-relaxed">
                A 6-axis motion tracking device that continuously monitors G-forces. Rapid deceleration spikes trigger the primary accident logic gates.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#ff7a00]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-4 border border-orange-100">
                <span className="material-symbols-outlined text-[#ff7a00]">vibration</span>
              </div>
              <h3 className="font-orbitron text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#ff7a00] transition-colors">SW-420 Vibration Sensor</h3>
              <p className="font-space-grotesk text-base text-gray-600 leading-relaxed">
                Used in tandem with the accelerometer to differentiate between a dropped helmet and an actual collision by measuring the frequency and intensity of surface vibrations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#ff2a2a]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
                <span className="material-symbols-outlined text-[#ff2a2a]">location_on</span>
              </div>
              <h3 className="font-orbitron text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#ff2a2a] transition-colors">GPS Telemetry Module</h3>
              <p className="font-space-grotesk text-base text-gray-600 leading-relaxed">
                Ensures exact spatial coordinates are locked instantly and attached to the outgoing emergency distress payload, directing ambulances to the precise location.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
