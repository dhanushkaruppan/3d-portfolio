import '../agri-drone.css';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Background3D } from '../components/ThreeCanvas';

// ── Rotating "Scroll Down" badge (Spline wireframe-globe badge) ──────────────
function ScrollBadge({ visible }) {
  return (
    <div className="scroll-badge" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      <div className="scroll-badge-ring" />
      <div className="scroll-badge-text">
        <svg viewBox="0 0 80 80">
          <defs>
            <path id="circle-path" d="M 40,40 m -26,0 a 26,26 0 1,1 52,0 a 26,26 0 1,1 -52,0" />
          </defs>
          <text>
            <textPath href="#circle-path">SCROLL DOWN ◆ SCROLL DOWN ◆ </textPath>
          </text>
        </svg>
      </div>
      {/* Center globe icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" style={{ position: 'absolute' }}>
        <circle cx="12" cy="12" r="10" />
        <ellipse cx="12" cy="12" rx="4" ry="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
      </svg>

    </div>
  );
}

// ── Technical corner label component ────────────────────────────────────────
function CornerLabels({ activeBlock }) {
  const labels = [
    { tl: '2026', tr: '20XX', bl: 'FORM\nEARTH', br: 'TARGET\nSKY' },
    { tl: 'SCENE 01', tr: '20XX', bl: 'EDGE\nNODE', br: 'TELEMETRY\nACTIVE' },
    { tl: 'SCENE 02', tr: '20XX', bl: 'NDVI\nSCAN', br: 'CROP\nHEALTH' },
    { tl: 'SCENE 03', tr: '20XX', bl: 'PATH\nMAPPING', br: 'TERRAIN\nMODEL' },
    { tl: 'SCENE 04', tr: '20XX', bl: 'CNN\nDETECT', br: 'PEST\nALERT' },
  ];

  const current = labels[activeBlock] || labels[0];

  return (
    <div className="corner-labels">
      <div className="corner-label tl" style={{ opacity: 1, transition: 'opacity 0.6s ease' }}>
        <span>{current.tl}</span>
      </div>
      <div className="corner-label tr">
        <span>{current.tr}</span>
      </div>
      <div className="corner-label bl">
        {current.bl.split('\n').map((line, i) =>
          i === 0 ? <span key={i}>{line}</span> : <strong key={i}>{line}</strong>
        )}
      </div>
      <div className="corner-label br">
        {current.br.split('\n').map((line, i) =>
          i === 0 ? <span key={i}>{line}</span> : <strong key={i}>{line}</strong>
        )}
      </div>

    </div>
  );
}

// ── Main App Component ────────────────────────────────────────────────────────
export default function Home() {
  const [scrollFraction, setScrollFraction] = useState(0);
  const [activeBlock, setActiveBlock] = useState(0);
  const totalBlocks = 5;
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBlockClass = (index) => {
    const align = index % 2 === 0 ? 'content-block-left' : 'content-block-right';
    if (activeBlock === index) return `content-block ${align} active`;
    if (index < activeBlock) return `content-block ${align} inactive-up`;
    return `content-block ${align} inactive-down`;
  };

  return (
    <div className="agri-drone-page">
      <div style={{ position: 'fixed', top: '18px', left: '20px', zIndex: 9999 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontFamily: 'monospace', fontSize: '12px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
          ← BACK TO PORTFOLIO
        </Link>
      </div>
    <div style={{ background: '#000', minHeight: '100vh', position: 'relative' }}>
      {/* 3D WebGL Background */}
      <Background3D scrollFraction={scrollFraction} activeBlock={activeBlock} />

      {/* Technical Corner Labels (Spline signature element) */}
      <CornerLabels activeBlock={activeBlock} />

      {/* Scroll Badge */}
      <ScrollBadge visible={activeBlock === 0} />

      {/* ── Scroll-driven sticky container ───────────────────────────────── */}
      <div id="scroll-container">
        <div id="sticky-view">
          <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1440px', margin: '0 auto' }}>

            {/* ── Block 0: Hero Overview ──────────────────────────────────── */}
            <div className={getBlockClass(0)} id="content-0">
              <div className="section-tag">
                <span className="dot" />
                Autopilot Connected
              </div>
              <h1 className="headline">
                <span className="headline-gradient">Agriculture</span>
                <br />
                Drone Monitor <br />(ongoing)
              </h1>
              <p className="body-copy">
                An AI-powered autonomous drone system designed to assist farmers in monitoring crop health,
                detecting pests and diseases early, and optimizing resource usage through precision aerial sensing.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                
              </div>
            </div>

            {/* ── Block 1: Raspberry Pi & IoT ─────────────────────────────── */}
            <div className={getBlockClass(1)} id="content-1">
              <div className="block-number">01 — Hardware Layer</div>
              <div className="section-tag">
                <span className="dot" />
                Telemetry Active
              </div>
              <h1 className="headline">
                Raspberry Pi<br />
                <span className="headline-gradient">&amp; IoT Edge</span>
              </h1>
              <p className="body-copy">
                Deploying edge telemetry. The Raspberry Pi controls flight paths, triggers camera sensors,
                and streams telemetry payloads in real-time over the local network.
              </p>
              <div className="data-row">
                <span className="label">Node</span>
                <span className="value">Pi Edge v4</span>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.15)', fontSize: '10px' }}>ONLINE</span>
              </div>
            </div>

            {/* ── Block 2: Crop Health Analysis ────────────────────────────── */}
            <div className={getBlockClass(2)} id="content-2">
              <div className="block-number">02 — Spectral Analysis</div>
              <div className="section-tag">
                <span className="dot" style={{ background: '#00ff88' }} />
                <span style={{ color: '#00ff88' }}>NDVI Processing</span>
              </div>
              <h1 className="headline">
                Crop Health<br />
                <span className="headline-gradient">Analysis</span>
              </h1>
              <p className="body-copy">
                Real-time crop health monitoring using multispectral imaging. OpenCV processes light wavelength
                layers to isolate vegetation stress indexes and NDVI signatures.
              </p>
              <div className="data-row">
                <span className="label">Channel</span>
                <span className="value">Multispectral</span>
                <span className="label" style={{ marginLeft: 'auto' }}>Layer</span>
                <span className="value">Near-IR</span>
              </div>
            </div>

            {/* ── Block 3: Drone Path Mapping ──────────────────────────────── */}
            <div className={getBlockClass(3)} id="content-3">
              <div className="block-number">03 — Flight Intelligence</div>
              <div className="section-tag">
                <span className="dot" style={{ background: '#00d4ff' }} />
                <span style={{ color: '#00d4ff' }}>Path Mapping</span>
              </div>
              <h1 className="headline">
                Automated<br />
                <span className="headline-gradient">Detection</span>
              </h1>
              <p className="body-copy">
                Automated pest and disease detection with 90% accuracy using mobile convolutional neural
                networks (CNN) running directly on-board the drone's edge processor.
              </p>
              <div className="metric-container">
                <div className="metric-header">
                  <span className="metric-title">Model Inference Accuracy</span>
                  <span className="metric-value">90%</span>
                </div>
                <div className="metric-bar-track">
                  <div className="metric-bar-fill" style={{ width: '90%' }} />
                </div>
                <div className="metric-footer">
                  <span>Status: Active Scan</span>
                  <span>Pest Target: 90% Precision</span>
                </div>
              </div>
            </div>

            {/* ── Block 4: Field Outcomes ──────────────────────────────────── */}
            <div className={getBlockClass(4)} id="content-4">
              <div className="block-number">04 — Results</div>
              <div className="section-tag">
                <span className="dot" style={{ background: '#ff0060' }} />
                <span style={{ color: '#ff0060' }}>Field Outcomes</span>
              </div>
              <h1 className="headline">
                Field<br />
                <span className="headline-gradient">Outcomes</span>
              </h1>
              <p className="body-copy">
                Optimizes resources and reduces manual crop inspection times by 60%, delivering dynamic
                telemetry mapping directly to dashboards in real-time.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '340px' }}>
                {[
                  ['60%', 'Reduction in inspection time'],
                  ['90%', 'Disease detection accuracy'],
                  ['3×', 'Faster field coverage'],
                ].map(([val, label]) => (
                  <div key={label} className="data-row" style={{ gap: '20px' }}>
                    <span className="value" style={{ fontSize: '18px', fontWeight: '700', minWidth: '40px' }}>{val}</span>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
      <main className="w-full flex-grow pt-24 pb-16 relative z-20" style={{ backgroundColor: '#fffafa', boxShadow: '0 -20px 50px rgba(0,0,0,0.5)' }}>
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Intro Block Expanded for Light Theme */}
          <div className="text-xl leading-relaxed mb-16 text-gray-800 border-l-4 py-4 rounded-r-xl shadow-sm pl-8" style={{ backgroundColor: '#fff', borderColor: '#00ff88' }}>
            <p className="mb-4">
              This ongoing concept leverages the extremely compact <strong className="text-black font-bold">Raspberry Pi Zero 2 W</strong> as the core Edge Node to control flight paths and trigger multispectral camera sensors. 
            </p>
            <p>
              By capturing visual and near-infrared layers simultaneously, the AI-powered idea is to deploy lightweight convolutional neural networks directly to the edge for 90% accurate pest and disease detection without relying on cloud infrastructure.
            </p>
          </div>

          {/* Features Grid - Light Theme */}
          <h2 className="text-3xl text-gray-900 font-bold mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
            Key Hardware & Software Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-gray-800 mb-3 font-bold" style={{ color: '#00cc6a' }}>Multispectral Scanning</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Real-time crop health monitoring using multispectral imaging. OpenCV processes light wavelength layers to isolate vegetation stress indexes and generate precise NDVI signatures.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-gray-800 mb-3 font-bold" style={{ color: '#00d4ff' }}>Automated Detection (CNN)</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Automated pest and disease detection with 90% accuracy. The system runs mobile-optimized convolutional neural networks directly on-board the drone's edge processor.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-gray-800 mb-3 font-bold" style={{ color: '#00d4ff' }}>Edge IoT Telemetry</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                The embedded Raspberry Pi node functions as the autonomous brain. It streams telemetry payloads (battery life, GPS coords, and inference results) in real-time over the local network.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl text-gray-800 mb-3 font-bold" style={{ color: '#ff0060' }}>Optimized Field Outcomes</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Our approach delivers a 60% reduction in manual inspection times and enables 3x faster field coverage, mapping outcomes directly to farmer-facing dashboards.
              </p>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}
