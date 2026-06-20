import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useParallax, staggerContainer, fadeUp3D, slideInLeft, flipInX } from '../hooks/useScrollAnimation';
import TiltCard from '../components/TiltCard';
export default function Home() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-50px' });
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: '-100px' });
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });
  const { ref: parallaxRef, y: parallaxY } = useParallax(0.3);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <main>
      {/* Hero & About Combined Viewport */}
      <section className="relative min-h-screen min-h-[100dvh] lg:h-screen flex flex-col justify-center overflow-hidden bg-black pt-20" id="home">
        <div ref={heroRef} className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full h-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 pb-8 lg:pb-0">
          
          {/* Left Column: Hero Text + Executive Summary */}
          <motion.div
            className="w-full lg:w-[60%] z-20 flex flex-col justify-center h-full pt-8 lg:pt-0 preserve-3d"
            variants={staggerContainer}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
          >
            {/* Top: Hero Text */}
            <div className="mb-8 lg:mb-12">
              <motion.p variants={slideInLeft} className="text-on-surface-variant font-label-sm tracking-[0.2em] uppercase mb-3">Hello, my name is</motion.p>
              <motion.h1 variants={fadeUp3D} className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
                Dhanush <span className="text-primary">K</span>
              </motion.h1>
              <motion.h2 variants={fadeUp3D} className="text-xl md:text-2xl text-on-surface-variant font-light mb-8">
                I am a Developer Bridging Hardware &amp; Software.
              </motion.h2>
              <motion.div variants={fadeUp3D} className="flex gap-4">
                <motion.a
                  className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-[0_4px_14px_0_rgba(255,178,183,0.39)] hover:shadow-[0_6px_20px_rgba(255,178,183,0.23)] transition-all"
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.a>
                <motion.a
                  className="border border-white/20 text-on-surface px-8 py-3 rounded-full font-bold hover:bg-white/5 transition-all"
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </div>

            {/* Bottom: Executive Summary */}
            <motion.div variants={fadeUp3D}>
              <TiltCard className="lg:w-[90%] glass-card p-8 rounded-3xl">
                <div style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-3xl font-bold">About Me</h3>
                    <span className="text-primary font-bold text-sm tracking-wide">Developer <span className="text-on-surface-variant">&amp;</span> Engineer</span>
                  </div>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    I am an innovative IT graduate with a passion for pushing the boundaries of what's possible at the intersection of bits and atoms. My journey is defined by a relentless drive to solve complex real-world problems using embedded intelligence.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-primary font-bold text-sm mb-1">Embedded Logic</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Expertise in low-level programming and microcontroller orchestration.</p>
                    </div>
                    <div>
                      <h4 className="text-primary font-bold text-sm mb-1">IoT Ecosystems</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Designing scalable architectures for connected devices and sensors.</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
          
          {/* Right Column: Image — parallax only on desktop to prevent Android Chrome GPU slicing bug */}
          {isDesktop ? (
            <motion.div
              ref={parallaxRef}
              className="w-full lg:w-[45%] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 h-[400px] lg:h-full flex justify-end items-end lg:items-center pointer-events-none"
              style={{ y: parallaxY }}
            >
              <img src="/profile.png" alt="Dhanush K" className="w-full h-full object-cover object-top lg:object-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent lg:w-1/3 z-10"></div>
            </motion.div>
          ) : (
            <div className="w-full h-[420px] flex justify-center items-end pointer-events-none relative">
              <img src="/profile.png" alt="Dhanush K" className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-stack-lg relative overflow-hidden bg-white text-black" id="skills">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div ref={skillsRef} className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40, rotateX: 10 }}
            animate={skillsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="font-headline-xl text-headline-xl mb-4">The Technical Arsenal</h2>
            <p className="text-gray-600">A curated selection of technologies I wield to build digital-physical systems.</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 perspective-container"
            variants={staggerContainer}
            initial="hidden"
            animate={skillsInView ? 'visible' : 'hidden'}
          >
            {[
              { icon: 'code', name: 'Python', level: 4 },
              { icon: 'smartphone', name: 'Flutter', level: 3 },
              { icon: 'developer_board', name: 'Raspberry Pi', level: 5 },
              { icon: 'settings_input_component', name: 'ESP32', level: 4 },
              { icon: 'psychology', name: 'ML', level: 3 },
            ].map((skill) => (
              <motion.div key={skill.name} variants={flipInX}>
                <TiltCard className="glass-card-light p-8 rounded-2xl flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-primary text-3xl">{skill.icon}</span>
                  </div>
                  <h3 className="font-bold mb-2">{skill.name}</h3>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((dot) => (
                      <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= skill.level ? 'bg-primary' : 'bg-primary/30'}`}></div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-stack-lg relative overflow-hidden" id="contact-cta">
        <div ref={ctaRef} className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: 12 }}
            animate={ctaInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <TiltCard className="glass-card p-12 md:p-20 rounded-[40px] relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
              <h2 className="font-display-lg-mobile md:font-headline-xl text-display-lg-mobile md:text-headline-xl mb-6">Let's Build the Future Together</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
                Currently seeking opportunities to innovate in the Embedded &amp; AI space. Whether you have a project in mind or just want to talk tech, my inbox is always open.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <motion.a
                  className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-lg glow-button flex items-center gap-2"
                  href="mailto:dhanushkaruppan@gmail.com"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="material-symbols-outlined">send</span>
                  Start a Conversation
                </motion.a>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
