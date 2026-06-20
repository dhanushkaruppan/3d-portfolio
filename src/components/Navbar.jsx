import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.3, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [8, 20]);

  useEffect(() => {
    const sections = ['home', 'projects', 'experience', 'contact'];
    const handleScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 border-b border-white/10"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(10, 10, 10, ${v})`),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
        WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <motion.a
          className="font-headline-lg text-headline-lg font-extrabold tracking-tighter text-primary"
          href="#home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dhanush K
        </motion.a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={`font-label-sm text-label-sm transition-all duration-300 relative ${
                activeSection === link.id
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              href={`#${link.id}`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  layoutId="activeNav"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          <motion.a
            href="/resume-dhanush.pdf"
            download="Resume_Dhanush.pdf"
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm glow-button inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Resume
          </motion.a>
        </div>
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </motion.nav>
  );
}
