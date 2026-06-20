export default function Footer() {
  return (
    <footer className="w-full py-stack-lg bg-surface-container-lowest border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <span className="font-headline-md text-headline-md font-bold text-on-surface">Dhanush K</span>
          <p className="text-on-surface-variant font-label-sm text-label-sm max-w-xs">&copy; 2026 Dhanush K. Built for the future of IoT &amp; AI.</p>
        </div>
        <div className="flex gap-8 mt-6 md:mt-0">
          <a className="text-on-surface-variant hover:text-primary hover:scale-110 transition-all duration-300 font-label-sm text-label-sm" href="https://github.com/dhanushkaruppan" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="text-on-surface-variant hover:text-primary hover:scale-110 transition-all duration-300 font-label-sm text-label-sm" href="https://www.linkedin.com/in/dhanushkaruppan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-on-surface-variant hover:text-primary hover:scale-110 transition-all duration-300 font-label-sm text-label-sm" href="mailto:dhanushkaruppan@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
