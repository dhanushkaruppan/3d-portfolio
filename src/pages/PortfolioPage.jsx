import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from './Home';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-background text-on-background overflow-x-hidden">
      <div className="relative z-10 flex flex-col min-h-screen min-h-[100dvh]">
        <Navbar />
        <div className="flex-grow">
          <Home />
          <Projects />
          <Experience />
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
}
