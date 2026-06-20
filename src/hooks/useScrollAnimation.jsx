import { useRef } from 'react';
import { useScroll, useTransform, useInView, useSpring, motion } from 'framer-motion';

/**
 * Hook for scroll-linked 3D animations.
 * Returns motion values for opacity, translateY, rotateX, scale tied to scroll.
 */
export function useScrollReveal({ offset = ['start 90%', 'start 20%'] } = {}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // 0 to 1 as it enters the viewport
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const rawRotateY = useTransform(scrollYProgress, [0, 1], [15, 0]);

  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 100, damping: 30 });

  return { ref, opacity, y, scale, rotateX, rotateY, scrollYProgress };
}

/**
 * Component that scrubs opacity, y, and rotateX based on scroll
 */
export function ScrollFadeUp({ children, className = '', offset = ['start 90%', 'start 40%'] }) {
  const { ref, opacity, y, rotateX, scale } = useScrollReveal({ offset });
  return (
    <motion.div ref={ref} className={className} style={{ opacity, y, rotateX, scale }}>
      {children}
    </motion.div>
  );
}

/**
 * Component that scrubs slide-in from left
 */
export function ScrollSlideLeft({ children, className = '', offset = ['start 90%', 'start 40%'] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [-100, 0]), { stiffness: 100, damping: 30 });
  const opacity = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 100, damping: 30 });
  
  return (
    <motion.div ref={ref} className={className} style={{ opacity, x }}>
      {children}
    </motion.div>
  );
}

/**
 * Hook for parallax effect — element moves at a different rate than scroll.
 */
export function useParallax(speed = 0.5) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });
  return { ref, y };
}

// Keeping the variants for the hero section, since it's above the fold and needs to play on load
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const fadeUp3D = {
  hidden: { opacity: 0, y: 60, rotateX: 15, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -80, rotateY: 8 },
  visible: {
    opacity: 1, x: 0, rotateY: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const flipInX = {
  hidden: { opacity: 0, rotateX: 90, y: 40 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

