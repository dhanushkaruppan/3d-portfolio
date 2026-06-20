import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp3D, slideInLeft, ScrollFadeUp } from '../hooks/useScrollAnimation';
import Drone3D from '../components/Drone3D';
import TiltCard from '../components/TiltCard';
import { Link } from 'react-router-dom';
export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="pt-32 pb-stack-lg">
      {/* Hero Header */}
      <header className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg perspective-container" ref={headerRef}>
        <motion.div 
          className="max-w-3xl preserve-3d"
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <motion.span variants={slideInLeft} className="text-primary font-label-sm text-label-sm tracking-widest uppercase mb-4 block">Portfolio</motion.span>
          <motion.h1 variants={fadeUp3D} className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
            Crafting the <span className="gradient-text">Future</span> of IoT & AI.
          </motion.h1>
          <motion.p variants={fadeUp3D} className="font-body-lg text-body-lg text-on-surface-variant">
            A curated showcase of engineering explorations, from autonomous drones to generative AI applications.
          </motion.p>
        </motion.div>
      </header>

      {/* Projects Bento Grid */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 perspective-container">
          {/* Project 1: Agriculture Drone (Featured Large) */}
          <ScrollFadeUp className="md:col-span-8">
            <TiltCard as={Link} to="/project/agri-drone" className="bg-surface-container-low border border-white/5 rounded-xl overflow-hidden group glow-hover transition-all duration-500 flex flex-col md:flex-row h-full cursor-pointer">
              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden bg-black/50">
                <Drone3D />
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="bg-primary/20 text-primary border border-primary/30 font-label-sm text-label-sm px-3 py-1 rounded-full backdrop-blur-md">Ongoing</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <span className="material-symbols-outlined text-xl">precision_manufacturing</span>
                  <span className="font-label-sm text-label-sm">Robotics & IoT</span>
                </div>
                <h3 className="font-headline-xl text-headline-xl mb-4">Agriculture Drone Monitoring</h3>
                <p className="text-on-surface-variant mb-6 font-body-md text-body-md">Advanced real-time crop health assessment and terrain mapping using autonomous flight algorithms and localized data processing.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">IoT</span>
                  <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">Raspberry Pi</span>
                </div>
                <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm group-hover:gap-4 transition-all">
                  View Case Study <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </TiltCard>
          </ScrollFadeUp>

          {/* Project 2: Movie Prediction */}
          <ScrollFadeUp className="md:col-span-4" offset={['start 95%', 'start 50%']}>
            <TiltCard as={Link} to="/project/movie-genre" className="bg-surface-container-low border border-white/5 rounded-xl overflow-hidden group glow-hover transition-all duration-500 flex flex-col h-full cursor-pointer">
              <div className="h-48 overflow-hidden bg-black/50 relative">
                <img className="w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" alt="Movie Genre Classifier" src="https://raw.githubusercontent.com/dhanushkaruppan/movie-genre-classifier/main/assets/demo_01.png" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <span className="material-symbols-outlined text-xl">movie</span>
                  <span className="font-label-sm text-label-sm">Deep Learning</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg mb-4">Genre Prediction</h3>
                <p className="text-on-surface-variant mb-6 flex-grow">Deep learning model utilizing CNN architectures for automated movie genre classification based on visual metadata.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">TensorFlow</span>
                  <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">CNN</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-on-surface-variant font-label-sm text-label-sm">Status: <span className="text-on-surface">MVP</span></span>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">open_in_new</span>
                </div>
              </div>
            </TiltCard>
          </ScrollFadeUp>

          {/* Project 3: Smart Helmet */}
          <ScrollFadeUp className="md:col-span-4" offset={['start 95%', 'start 50%']}>
            <TiltCard as={Link} to="/project/smart-helmet" className="bg-surface-container-low border border-white/5 rounded-xl p-8 group glow-hover transition-all duration-500 flex flex-col h-full cursor-pointer">
              <div className="bg-surface-variant w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-primary border border-white/10">
                <span className="material-symbols-outlined text-3xl">medical_services</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg mb-4">Smart Helmet</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Accident detection and emergency response system utilizing SW-420 vibration sensors and integrated camera modules for immediate impact analysis.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">ESP32-CAM</span>
                <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">SW-420</span>
                <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">MPU6050</span>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-on-surface-variant font-label-sm text-label-sm">Status: <span className="text-on-surface">Completed</span></span>
                <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">arrow_forward</span>
              </div>
            </TiltCard>
          </ScrollFadeUp>

          {/* Project 4: Smart Home */}
          <ScrollFadeUp className="md:col-span-4" offset={['start 90%', 'start 45%']}>
            <TiltCard as={Link} to="/project/smart-home" className="bg-surface-container-low border border-white/5 rounded-xl p-8 group glow-hover transition-all duration-500 flex flex-col h-full cursor-pointer">
              <div className="bg-surface-variant w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-primary border border-white/10">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg mb-4">Smart Home Switchboard</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Custom-built ESP32 switchboard providing wireless control, physical switches, and hands-free sound control through a Flutter dashboard.</p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">ESP32</span>
                <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">Flutter</span>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-on-surface-variant font-label-sm text-label-sm">Status: <span className="text-on-surface">Stable</span></span>
                <span className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">arrow_forward</span>
              </div>
            </TiltCard>
          </ScrollFadeUp>

          {/* Project 5: Daily Dose'u */}
          <ScrollFadeUp className="md:col-span-4" offset={['start 85%', 'start 40%']}>
            <TiltCard as={Link} to="/project/daily-dose" className="bg-surface-container-low border border-white/5 rounded-xl overflow-hidden group glow-hover transition-all duration-500 flex flex-col h-full cursor-pointer">
              <div className="h-48 overflow-hidden bg-black/50 relative">
                <img className="w-full h-full object-cover grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" alt="Daily Dose'u" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDo0kNsfsQqa4VZMwXWfK6T5nKSN5GtfIr_x1qfotI-phVHopEF66WjEeS8wK5cwirZC9Dhcu7-2P7AuEIwiOZj8mCv8RVDlHxI7tns8_XCQz18WNttEz_HkzCYFOpkxFPNZq-SeghEDJlXMuxdvcpplVS706V_AMfOQvzeVk9QpPKyBh3CHZ3m8sILlbgn7xbCnGqyqFf7bndkP1iTgEbtlYLd83mgo6SE0Qz9PDT9DIMqfxRAwlmSIIzN2eGIRXwUmZ02Hry-CT0" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <span className="material-symbols-outlined text-xl">neurology</span>
                  <span className="font-label-sm text-label-sm">Generative AI</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg mb-4">Daily Dose'u</h3>
                <p className="text-on-surface-variant mb-6 flex-grow">A Flutter application that helps users learn English vocabulary daily using AI to generate memorable stories in both English and Tamil.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">Dart</span>
                  <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">Flutter</span>
                  <span className="px-3 py-1 bg-surface-variant border border-white/10 rounded font-label-sm text-label-sm text-on-surface">Gemini</span>
                </div>
              </div>
            </TiltCard>
          </ScrollFadeUp>
        </div>
      </section>
    </section>
  );
}
