import '../movie-genre.css';
import React, { useState, useEffect, useRef } from 'react';
import { Background3D } from '../components/ThreeCanvas';
import { Link } from 'react-router-dom';

export default function Home() {
  const [scrollFraction, setScrollFraction] = useState(0);
  const [activeBlock, setActiveBlock] = useState(0);
  const totalBlocks = 5;
  const targetScrollFraction = useRef(0);
  const projectWebsiteUrl = "#";
  const githubRepoUrl = "https://github.com/dhanushkaruppan/movie-genre-classifier";

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
    <div className="movie-genre-page">
      <div style={{ position: 'fixed', top: '18px', left: '20px', zIndex: 9999 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontFamily: 'monospace', fontSize: '12px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>
          ← BACK TO PORTFOLIO
        </Link>
      </div>
      <Background3D scrollFraction={scrollFraction} activeBlock={activeBlock} />
      <div id="scroll-container">
        <div id="sticky-view">
          <div className="relative w-full h-full max-w-container-max mx-auto px-margin-desktop">
            {/* Content Block 0 */}
            <div className={getBlockClass(0)} id="content-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel rounded-full font-code-sm text-code-sm text-primary-fixed-dim border-primary-fixed-dim/30 mb-6 hover:bg-primary-fixed-dim/10 transition-colors">
                <span className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></span>
                SYSTEM ACTIVE
              </div>
              <h1 className="movie-font-display-lg text-display-lg text-gradient mb-6 transition-all duration-500 hover:tracking-widest">
                MOVIE GENRE CLASSIFIER
              </h1>
              <p className="movie-font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed max-w-xl transition-all duration-300 hover:text-white">
                A fully mapped machine learning workflow analyzing high-dimensional visual features from movie posters to predict multi-label genres in real-time.
              </p>
            </div>

            {/* Content Block 1 */}
            <div className={getBlockClass(1)} id="content-1">
              <div className="space-y-6">
                <h1 className="movie-font-display-lg text-display-lg text-gradient mb-6 transition-all duration-500 hover:tracking-widest flex items-center gap-3">
                  <span className="text-primary-fixed-dim font-code-sm text-xl bg-primary-fixed-dim/10 px-2 py-1 rounded">01</span> DATA INGEST
                </h1>
                <p className="movie-font-body-lg text-body-lg text-on-surface-variant leading-relaxed hover:text-white transition-colors duration-300">
                  Raw image data is streamed into the pipeline. Each poster is paired with multi-label genre tags to form the ground truth for training.
                </p>
                <div className="inline-flex items-center gap-3 bg-surface-container-highest/50 px-4 py-3 rounded-lg border border-white/5 hover:border-primary-fixed-dim/30 transition-colors">
                  <span className="material-symbols-outlined text-sm text-primary-fixed-dim">data_object</span>
                  <span className="font-label-md text-label-md text-on-surface">Input Tensor</span>
                  <span className="font-code-sm text-code-sm text-primary-fixed-dim bg-surface px-2 py-1 rounded">[224, 224, 3]</span>
                </div>
              </div>
            </div>

            {/* Content Block 2 */}
            <div className={getBlockClass(2)} id="content-2">
              <div className="space-y-6">
                <h1 className="movie-font-display-lg text-display-lg text-gradient mb-6 transition-all duration-500 hover:tracking-widest flex items-center gap-3">
                  <span className="text-secondary-fixed-dim font-code-sm text-xl bg-secondary-fixed-dim/10 px-2 py-1 rounded">02</span> PREPROCESSING
                </h1>
                <p className="movie-font-body-lg text-body-lg text-on-surface-variant leading-relaxed hover:text-white transition-colors duration-300">
                  Images undergo rigorous normalization. RGB values are scaled, and feature extraction isolates critical visual patterns.
                </p>
                <div className="inline-flex items-center gap-4 bg-surface-container-highest/50 px-4 py-3 rounded-lg border border-white/5 hover:border-secondary-fixed-dim/30 transition-colors">
                  <span className="material-symbols-outlined text-secondary-fixed-dim">palette</span>
                  <span className="font-label-md text-label-md text-white">RGB Normalization</span>
                  <span className="font-code-sm text-code-sm text-secondary-fixed-dim">Zero mean, unit variance</span>
                </div>
              </div>
            </div>

            {/* Content Block 3 */}
            <div className={getBlockClass(3)} id="content-3">
              <div className="space-y-6">
                <h1 className="movie-font-display-lg text-display-lg text-gradient mb-6 transition-all duration-500 hover:tracking-widest flex items-center gap-3">
                  <span className="text-primary-fixed font-code-sm text-xl bg-primary-fixed/10 px-2 py-1 rounded">03</span> CNN TRAINING
                </h1>
                <p className="movie-font-body-lg text-body-lg text-on-surface-variant leading-relaxed hover:text-white transition-colors duration-300">
                  Deep convolutional layers extract hierarchical features. The architecture leverages VGG16 backbones fine-tuned for genre classification.
                </p>
                <div className="bg-surface-container-highest/50 p-6 rounded-lg border border-white/5 max-w-md">
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-label-md text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary-fixed animate-spin" style={{ animationDuration: '4s' }}>model_training</span> Training Progress
                    </span>
                    <span className="font-code-sm text-primary-fixed bg-primary-fixed/10 px-2 py-1 rounded">75%</span>
                  </div>
                  <div className="w-full h-2 bg-surface rounded-full overflow-hidden mt-2 relative">
                    <div className="w-[75%] h-full bg-primary-fixed shadow-[0_0_10px_rgba(125,244,255,0.8)] relative">
                      <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4 font-code-sm text-on-surface-variant border-t border-white/5 pt-4">
                    <span>EPOCH <span className="text-white">75/100</span></span>
                    <span>LOSS: <span className="text-primary-fixed">0.024</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Block 4 */}
            <div className={getBlockClass(4)} id="content-4">
              <div className="space-y-6">
                <h1 className="movie-font-display-lg text-display-lg text-gradient mb-6 transition-all duration-500 hover:tracking-widest flex items-center gap-3">
                  <span className="text-white font-code-sm text-xl bg-white/10 px-2 py-1 rounded">04</span> EVALUATION
                </h1>
                <p className="movie-font-body-lg text-body-lg text-on-surface-variant leading-relaxed hover:text-white transition-colors duration-300">
                  Final inference metrics mapped across multi-label classes. System achieves high precision on distinct genre boundaries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  
                  <a href={githubRepoUrl} className="btn-glow bg-surface-container-high border border-primary-fixed-dim/30 text-primary-fixed-dim font-label-md text-label-md px-6 py-4 rounded-lg hover:bg-primary-fixed-dim/10 transition-all flex-1 flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-sm">code</span> GitHub Repo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="bg-[#fffafa] w-full flex-grow pt-24 pb-16 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Intro Block Expanded for Light Theme */}
          <div className="font-space-grotesk text-xl leading-relaxed mb-16 text-gray-800 border-l-4 border-[#b026ff] pl-8 py-4 bg-white rounded-r-xl shadow-sm">
            <p className="mb-4">
              This project leverages a sophisticated transfer-learning approach using <strong className="text-black font-bold">EfficientNetV2S</strong> combined with a custom classification head. 
            </p>
            <p>
              It also features a custom automated data collection script using Selenium to scrape high-resolution posters directly from IMDb.
            </p>
          </div>

          {/* Features Grid - Light Theme */}
          <h2 className="font-orbitron text-3xl text-gray-900 font-bold mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00f0ff] text-3xl">star</span> Key Architecture Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#00f0ff]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mb-4 border border-cyan-100">
                <span className="material-symbols-outlined text-[#00f0ff]">travel_explore</span>
              </div>
              <h3 className="font-orbitron text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#00f0ff] transition-colors">Automated Data Scraping</h3>
              <p className="font-space-grotesk text-base text-gray-600 leading-relaxed">
                Includes a robust Selenium script to autonomously navigate IMDb and extract high-resolution posters without duplicates, creating a highly accurate ground truth dataset from scratch.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#b026ff]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 border border-purple-100">
                <span className="material-symbols-outlined text-[#b026ff]">account_tree</span>
              </div>
              <h3 className="font-orbitron text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#b026ff] transition-colors">State-of-the-Art Model</h3>
              <p className="font-space-grotesk text-base text-gray-600 leading-relaxed">
                Utilizes the powerful <strong>EfficientNetV2S</strong> (pre-trained on ImageNet) to extract high-level visual features efficiently from dense, complex movie poster images.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#00f0ff]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center mb-4 border border-cyan-100">
                <span className="material-symbols-outlined text-[#00f0ff]">psychology</span>
              </div>
              <h3 className="font-orbitron text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#00f0ff] transition-colors">Robust Training Pipeline</h3>
              <p className="font-space-grotesk text-base text-gray-600 leading-relaxed">
                Engineered with mixed precision training for speed, automatic class weighting to resolve dataset imbalances, and a custom WarmUpCosineDecay Learning Rate schedule for optimal convergence.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#b026ff]/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4 border border-purple-100">
                <span className="material-symbols-outlined text-[#b026ff]">visibility</span>
              </div>
              <h3 className="font-orbitron text-2xl text-gray-800 mb-3 font-bold group-hover:text-[#b026ff] transition-colors">TTA & Grad-CAM</h3>
              <p className="font-space-grotesk text-base text-gray-600 leading-relaxed">
                Employs Test-Time Augmentation (TTA) during inference for highly robust predictions across varying visual conditions. Features built-in Grad-CAM heatmaps to interpret and validate model decisions.
              </p>
            </div>
          </div>

          {/* Workflow - Light Theme */}
          <h2 className="font-orbitron text-3xl text-gray-900 font-bold mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#b026ff] text-3xl">model_training</span> Training & Inference Workflow
          </h2>
          <div className="space-y-10 mb-20 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-[#00f0ff] before:to-[#b026ff]">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#00f0ff] text-white font-bold z-10 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                1
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-xl shadow-sm border border-cyan-100 ml-4 md:ml-0 hover:shadow-md transition-shadow">
                <h3 className="font-orbitron text-xl text-gray-800 mb-2 font-bold">Data Collection</h3>
                <p className="font-space-grotesk text-sm text-gray-600 leading-relaxed">Custom built scraper logic downloads posters into a directory, enabling large-scale, automated dataset building across thousands of IMDB pages.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-[#b026ff] text-white font-bold z-10 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                2
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-xl shadow-sm border border-purple-100 ml-4 md:ml-0 hover:shadow-md transition-shadow">
                <h3 className="font-orbitron text-xl text-gray-800 mb-2 font-bold">Model Fine-tuning</h3>
                <p className="font-space-grotesk text-sm text-gray-600 leading-relaxed">The model is fine-tuned leveraging the EfficientNetV2S backbone. Training handles class imbalances dynamically and outputs detailed Grad-CAM heatmaps for interpretable AI validation.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gray-900 text-white font-bold z-10 shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                3
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-xl shadow-sm border border-gray-200 ml-4 md:ml-0 hover:shadow-md transition-shadow">
                <h3 className="font-orbitron text-xl text-gray-800 mb-2 font-bold">Predictive Inference</h3>
                <p className="font-space-grotesk text-sm text-gray-600 leading-relaxed">Evaluation is performed using Test-Time Augmentation (TTA) to ensure confident predictions even with cropped, modified, or poorly-lit movie posters.</p>
              </div>
            </div>

          </div>

          {/* Screenshots & Visualizations - Light Theme */}
          <h2 className="font-orbitron text-3xl text-gray-900 font-bold mb-8 border-b border-gray-200 pb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00f0ff] text-3xl">image</span> Visualizations & Results
          </h2>
          
          <div className="space-y-16 mb-16">
            <div>
              <h3 className="font-orbitron text-xl text-gray-800 mb-2 font-bold tracking-wide">Movie Posters & Grad-CAM Output</h3>
              <p className="font-space-grotesk text-gray-600 mb-6">Original poster images overlaid with class activation maps showing neural network focus regions.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group">
                  <img src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/demo_01.png" alt="Demo 1" className="w-full h-auto rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group">
                  <img src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/demo_02.png" alt="Demo 2" className="w-full h-auto rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group">
                  <img src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/demo_03.png" alt="Demo 3" className="w-full h-auto rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group">
                  <img src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/demo_04.png" alt="Demo 4" className="w-full h-auto rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-orbitron text-xl text-gray-800 mb-2 font-bold tracking-wide">Performance & Analysis Plots</h3>
              <p className="font-space-grotesk text-gray-600 mb-6">Training history and confusion matrices analyzing model performance.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group">
                  <img src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/plot_01.png" alt="Plot 1" className="w-full h-auto rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group">
                  <img src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/plot_02.png" alt="Plot 2" className="w-full h-auto rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group">
                  <img src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/plot_03.png" alt="Plot 3" className="w-full h-auto rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group">
                  <img src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/plot_04.png" alt="Plot 4" className="w-full h-auto rounded-lg group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-24 pt-12 border-t border-gray-200">
            <a href="https://github.com/dhanushkaruppan/movie-genre-classifier" className="inline-flex items-center gap-3 bg-gray-900 border border-gray-800 text-white px-10 py-5 rounded-2xl hover:bg-[#b026ff] transition-all duration-300 font-bold tracking-widest uppercase shadow-md hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] font-orbitron text-lg">
              <span className="material-symbols-outlined text-2xl">stars</span> Explore GitHub Repository
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
