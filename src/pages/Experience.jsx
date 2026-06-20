import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp3D, slideInLeft, scaleIn, ScrollFadeUp, ScrollSlideLeft } from '../hooks/useScrollAnimation';
import TiltCard from '../components/TiltCard';
import { Link } from 'react-router-dom';

export default function Experience() {
  const bioRef = useRef(null);
  const bioInView = useInView(bioRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="pt-32 pb-stack-lg overflow-x-hidden">
      {/* Hero Section: Biography (Keep this on load since it might be above the fold depending on scroll) */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-stack-lg overflow-hidden" ref={bioRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center perspective-container">
          <motion.div 
            className="lg:col-span-7 preserve-3d"
            variants={staggerContainer}
            initial="hidden"
            animate={bioInView ? 'visible' : 'hidden'}
          >
            <motion.span variants={slideInLeft} className="text-primary font-label-sm text-label-sm uppercase tracking-widest mb-4 block">Biography</motion.span>
            <motion.h1 variants={fadeUp3D} className="font-display-lg text-display-lg-mobile md:text-display-lg mb-stack-sm leading-none">
              Crafting the Future of <span className="text-primary">IoT & AI</span>.
            </motion.h1>
            <motion.p variants={fadeUp3D} className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">
              As an Information Technology undergraduate at Mahendra Engineering College, I specialize in bridging the gap between hardware and software through intelligent systems. My journey is defined by a rigorous pursuit of technical excellence in full-stack development, Python, and Machine Learning. I thrive on solving complex architectural challenges and building scalable, data-driven solutions for the next generation of technology.
            </motion.p>
            <motion.div variants={fadeUp3D} className="flex gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container border border-white/5">
                <span className="material-symbols-outlined text-primary">school</span>
                <span className="font-label-sm text-label-sm">B.Tech IT Graduate</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container border border-white/5">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <span className="font-label-sm text-label-sm">Award Winning Dev</span>
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="lg:col-span-5 relative group mt-8 lg:mt-0"
            variants={scaleIn}
            initial="hidden"
            animate={bioInView ? 'visible' : 'hidden'}
          >
            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 glass-card">
              <img alt="Dhanush K Portrait" className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700" src="/biography.jpg" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education & Internships Timeline */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg border-t border-white/5">
        <ScrollFadeUp className="mb-16 text-center">
          <h2 className="font-headline-xl text-headline-xl">Academic & Professional Journey</h2>
        </ScrollFadeUp>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-container-max mx-auto perspective-container">
          <ScrollSlideLeft className="md:col-span-2">
            <TiltCard className="glass-card rounded-3xl border border-primary/20 hover:border-primary/60 transition-all duration-500 group relative overflow-hidden p-0 flex flex-col h-full">
              <div className="h-56 w-full relative">
                <img src="https://campushunt.in/photogallery/Mahendra%20college%201.jpg" alt="Mahendra Engineering College" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"/>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-10">
                  <div className="p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                    <span className="material-symbols-outlined text-primary text-3xl">school</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary px-4 py-1 rounded-full bg-black/40 backdrop-blur-md border border-primary/20">2022 — 2026</span>
                </div>
              </div>
              <div className="relative z-10 p-8 pt-0 mt-2 flex-1 flex flex-col">
                <h3 className="font-headline-lg text-headline-lg mb-2 mt-auto">Mahendra Engineering College</h3>
                <p className="text-primary font-body-lg mb-6">Bachelor of Technology in Information Technology</p>
                <div className="inline-flex items-center gap-4 p-4 bg-surface-container-lowest rounded-2xl border border-white/5 w-fit">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                  <div>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest">Cumulative GPA</p>
                    <p className="font-bold text-2xl">8.22</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollSlideLeft>

          <ScrollFadeUp>
            <TiltCard className="glass-card p-8 rounded-3xl border border-primary/20 hover:border-primary/60 transition-all duration-500 group h-full">
              <div className="flex flex-col h-full justify-between">
                <div className="mb-8">
                  <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">bolt</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">Jan — Oct 2025</span>
                  <h3 className="font-headline-md text-headline-md mb-2">PulsePath</h3>
                  <p className="text-primary font-label-sm mb-4">Arou Consultancy Service</p>
                  <p className="text-on-surface-variant text-body-md">Emergency ambulance routing system built with Flutter.</p>
                </div>
                <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4"></div>
                </div>
              </div>
            </TiltCard>
          </ScrollFadeUp>

          <ScrollSlideLeft>
            <TiltCard className="glass-card p-8 rounded-3xl border border-primary/20 hover:border-primary/60 transition-all duration-500 group h-full">
              <div className="w-16 h-16 shrink-0 bg-white/5 rounded-2xl overflow-hidden p-1.5 flex items-center justify-center border border-white/10 shadow-inner mb-6">
                <img src="https://tse3.mm.bing.net/th/id/OIP.QPLXNCyyGh61nty8RXvSyQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="NoviTech Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">April — May 2024</span>
              <h3 className="font-headline-md text-headline-md mb-2">Full Stack Masterclass</h3>
              <p className="text-primary font-label-sm mb-4">NoviTech R&D Pvt Ltd</p>
              <p className="text-on-surface-variant text-body-md">Comprehensive frontend, backend, and database development.</p>
            </TiltCard>
          </ScrollSlideLeft>

          <ScrollFadeUp className="md:col-span-2">
            <TiltCard className="glass-card p-8 rounded-3xl border border-primary/20 hover:border-primary/60 transition-all duration-500 group flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="w-20 h-20 shrink-0 bg-white/5 rounded-2xl overflow-hidden p-2 flex items-center justify-center border border-white/10 shadow-inner">
                <img src="https://play-lh.googleusercontent.com/p_RR7etL6BYxBTqdE43Uu8V4rcWPHyvKuTuAPmr43vyiDhM8tLQowJD7sw5aHii4CM8" alt="Naan Mudhalvan Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">April 2023</span>
                <h3 className="font-headline-md text-headline-md mb-2">Python+ML Foundations</h3>
                <p className="text-primary font-label-sm mb-4">TNSDC – Naan Mudhalvan | STEP NITK</p>
                <p className="text-on-surface-variant text-body-md">Foundational training in Python, ML, and data visualization.</p>
              </div>
            </TiltCard>
          </ScrollFadeUp>

          <ScrollFadeUp>
            <TiltCard className="glass-card p-8 rounded-3xl border border-primary/20 hover:border-primary/60 transition-all duration-500 group h-full">
              <div className="w-16 h-16 shrink-0 bg-white/5 rounded-2xl overflow-hidden p-1.5 flex items-center justify-center border border-white/10 shadow-inner mb-6">
                <img src="data:image/webp;base64,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" alt="Mar Baselios College Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant mb-2 block">February 2023</span>
              <h3 className="font-headline-md text-headline-md mb-2">ML & Deep Learning</h3>
              <p className="text-primary font-label-sm mb-4">Mar Baselios College</p>
              <p className="text-on-surface-variant text-body-md">Built a real-time face detection tool using Python and OpenCV.</p>
            </TiltCard>
          </ScrollFadeUp>
        </div>
      </section>

      {/* Achievements Bento Grid */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg border-t border-white/5">
        <ScrollFadeUp className="flex flex-col md:flex-row justify-between items-end mb-12 gap-gutter">
          <div>
            <h2 className="font-headline-xl text-headline-xl">Honors & Recognition</h2>
            <p className="text-on-surface-variant font-body-md text-body-md mt-2">Validated excellence through competitive technical challenges.</p>
          </div>
          <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block"></div>
          <span className="material-symbols-outlined text-primary text-5xl">trophy</span>
        </ScrollFadeUp>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter perspective-container">
          <ScrollSlideLeft>
            <TiltCard as={Link} to="/project/movie-genre" className="glass-card p-8 rounded-3xl border-2 border-primary/20 hover:border-primary shadow-[0_0_30px_rgba(255,178,183,0.05)] transition-all duration-500 relative overflow-hidden group h-full block cursor-pointer">
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[12rem]">movie</span>
              </div>
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <span className="material-symbols-outlined text-primary text-3xl">military_tech</span>
                </div>
                <span className="font-label-sm text-label-sm px-4 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary uppercase">Second Prize</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg mb-4">Movie Genre Prediction</h3>
              <p className="text-on-surface-variant font-body-md mb-8 leading-relaxed">Achieved top honors for developing an NLP-driven model capable of predicting cinematic genres with 92% accuracy.</p>
              <div className="flex gap-3">
                <span className="px-4 py-1 rounded-lg bg-surface-container-lowest text-primary border border-white/5 text-xs font-bold">NLP</span>
                <span className="px-4 py-1 rounded-lg bg-surface-container-lowest text-primary border border-white/5 text-xs font-bold">PYTHON</span>
                <span className="px-4 py-1 rounded-lg bg-surface-container-lowest text-primary border border-white/5 text-xs font-bold">NLTK</span>
              </div>
            </TiltCard>
          </ScrollSlideLeft>
          
          <ScrollFadeUp>
            <TiltCard className="glass-card p-8 rounded-3xl border-2 border-primary/20 hover:border-primary shadow-[0_0_30px_rgba(255,178,183,0.05)] transition-all duration-500 relative overflow-hidden group h-full">
              <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[12rem]">emoji_events</span>
              </div>
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <span className="material-symbols-outlined text-primary text-3xl">military_tech</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-label-sm text-label-sm px-4 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary uppercase font-bold">₹10,000 Cash Prize</span>
                  <span className="text-xs text-on-surface-variant font-bold">Project Expo-2K26</span>
                </div>
              </div>
              <h3 className="font-headline-lg text-headline-lg mb-4">Smart Home Switch Board</h3>
              <p className="text-on-surface-variant font-body-md mb-8 leading-relaxed">Won a cash prize of Rs. 10,000/- for designing and implementing an innovative Smart Home Switch Board with sound control using Flutter and IoT.</p>
              <div className="flex gap-3">
                <span className="px-4 py-1 rounded-lg bg-surface-container-lowest text-primary border border-white/5 text-xs font-bold">FLUTTER</span>
                <span className="px-4 py-1 rounded-lg bg-surface-container-lowest text-primary border border-white/5 text-xs font-bold">IOT</span>
                <span className="px-4 py-1 rounded-lg bg-surface-container-lowest text-primary border border-white/5 text-xs font-bold">SMART HOME</span>
              </div>
            </TiltCard>
          </ScrollFadeUp>
        </div>
      </section>

      {/* CTA / Connect */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg">
        <ScrollFadeUp>
          <div className="glass-card p-12 rounded-3xl text-center relative overflow-hidden border-2 border-primary/10">
            <h2 className="font-display-lg text-display-lg-mobile md:text-headline-xl mb-6 relative z-10">Interested in working together?</h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg max-w-xl mx-auto mb-10 relative z-10">
              I'm currently looking for new opportunities to apply my skills in AI and Full-stack development. Let's build something remarkable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href="/resume-dhanush.pdf" download="Resume_Dhanush.pdf" className="bg-primary text-on-primary font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform glow-sm inline-block">Download Full Resume</a>
              <a className="border-2 border-primary text-primary font-bold px-8 py-4 rounded-xl hover:bg-primary/5 transition-colors inline-block" href="#contact">Get In Touch</a>
            </div>
          </div>
        </ScrollFadeUp>
      </section>
    </section>
  );
}
