import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp3D, ScrollFadeUp, ScrollSlideLeft } from '../hooks/useScrollAnimation';
import TiltCard from '../components/TiltCard';

export default function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'AI Workflow Automation',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Web3Forms API endpoint
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // ⚠️ REPLACE THIS KEY WITH YOUR OWN FROM https://web3forms.com/
        access_key: "1c9f4e31-ac17-4573-9140-f748849c3f7b",
        name: formData.name,
        email: formData.email,
        subject: `Portfolio Inquiry: ${formData.subject}`,
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: 'AI Workflow Automation', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } else {
      setIsSubmitting(false);
      alert("Something went wrong! Please try again later.");
    }
  };

  return (
    <section id="contact" className="pt-32 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="mb-stack-lg text-center md:text-left perspective-container" ref={headerRef}>
        <motion.div
          className="preserve-3d"
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
        >
          <motion.h1 variants={fadeUp3D} className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-stack-sm">
            Let's Build the <span className="text-primary">Future</span>.
          </motion.h1>
          <motion.p variants={fadeUp3D} className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl">
            Ready to collaborate on cutting-edge AI deployments or intricate IoT ecosystems? Reach out and let's turn concepts into scalable architectures.
          </motion.p>
        </motion.div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start perspective-container">
        {/* Left: Contact Info & Tech Stack */}
        <div className="lg:col-span-5 space-y-stack-md">
          <ScrollSlideLeft>
            <TiltCard className="glass-card p-8 rounded-xl space-y-6">
              <h3 className="font-headline-lg text-headline-lg text-primary">Connect Directly</h3>
              <div className="space-y-4">
                <a className="flex items-center gap-4 group transition-all duration-300" href="mailto:dhanushkaruppan@gmail.com">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-inner">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Email</p>
                    <p className="font-body-md text-body-md text-on-surface">dhanushkaruppan@gmail.com</p>
                  </div>
                </a>
                <a className="flex items-center gap-4 group transition-all duration-300" href="tel:+919361271851">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-inner">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Phone</p>
                    <p className="font-body-md text-body-md text-on-surface">+91 9361271851</p>
                  </div>
                </a>
              </div>
              <hr className="border-white/5" />
              <div className="flex gap-4">
                <a className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container text-on-surface-variant hover:text-primary hover:glow-sm transition-all duration-300 shadow-inner" href="https://www.linkedin.com/in/dhanushkaruppan/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <span className="material-symbols-outlined">work</span>
                </a>
                <a className="w-12 h-12 flex items-center justify-center rounded-lg bg-surface-container text-on-surface-variant hover:text-primary hover:glow-sm transition-all duration-300 shadow-inner" href="https://github.com/dhanushkaruppan" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <span className="material-symbols-outlined">code</span>
                </a>
              </div>
            </TiltCard>
          </ScrollSlideLeft>

          {/* Agentic Workflows / Tech Stack Section */}
          <ScrollSlideLeft>
            <TiltCard className="glass-card p-8 rounded-xl">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase tracking-widest">Tech Stack & Tools</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-label-sm text-label-sm">React</span>
                <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-label-sm text-label-sm">Python</span>
                <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-label-sm text-label-sm">PyTorch</span>
                <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-label-sm text-label-sm">Node.js</span>
                <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-label-sm text-label-sm">AWS IoT</span>
                <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-label-sm text-label-sm">Docker</span>
                <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-label-sm text-label-sm">Embedded C</span>
                <span className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary font-label-sm text-label-sm">Vercel</span>
              </div>
            </TiltCard>
          </ScrollSlideLeft>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <ScrollFadeUp>
            <TiltCard as="form" className="glass-card p-8 md:p-10 rounded-xl space-y-6 relative overflow-hidden" onSubmit={handleSubmit}>
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="name">Full Name</label>
                  <input required value={formData.name} onChange={handleChange} className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-on-surface-variant/30 shadow-inner" id="name" placeholder="John Doe" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="email">Email Address</label>
                  <input required value={formData.email} onChange={handleChange} className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-on-surface-variant/30 shadow-inner" id="email" placeholder="john@example.com" type="email" />
                </div>
              </div>
              <div className="space-y-2 relative z-10">
                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="subject">Inquiry Type</label>
                <select value={formData.subject} onChange={handleChange} className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface shadow-inner" id="subject">
                  <option>AI Workflow Automation</option>
                  <option>IoT System Architecture</option>
                  <option>Full Stack Development</option>
                  <option>General Collaboration</option>
                </select>
              </div>
              <div className="space-y-2 relative z-10">
                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="message">Message</label>
                <textarea required value={formData.message} onChange={handleChange} className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-on-surface placeholder:text-on-surface-variant/30 resize-none shadow-inner" id="message" placeholder="Tell me about your project..." rows="6"></textarea>
              </div>
              <motion.button 
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full md:w-auto font-headline-lg text-body-md py-4 px-12 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 relative z-10 ${
                  submitStatus === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-primary-container text-on-primary-container glow-sm hover:scale-105 active:scale-95'
                }`}
                type="submit"
              >
                {isSubmitting ? (
                  <>Sending... <span className="material-symbols-outlined animate-spin">sync</span></>
                ) : submitStatus === 'success' ? (
                  <>Message Sent! <span className="material-symbols-outlined">check_circle</span></>
                ) : (
                  <>Send Message <span className="material-symbols-outlined">send</span></>
                )}
              </motion.button>
            </TiltCard>
          </ScrollFadeUp>
        </div>
      </div>
    </section>
  );
}
