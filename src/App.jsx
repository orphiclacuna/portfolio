import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import ParticleBackground from './components/ui/ParticleBackground';
import ScrollProgress from './components/layout/ScrollProgress';
import Navigation from './components/layout/Navigation';
import HeroAboutTransition from './components/sections/HeroAboutTransition';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';

export default function App() {
    return (
        <ThemeProvider>
            <LoadingScreen />
            <ParticleBackground />
            <CustomCursor />
            <ScrollProgress />
            <Navigation />
            <main>
                <HeroAboutTransition />
                <Skills />
                <Experience />
                <Projects />
            </main>
            <Footer />
            <BackToTop />
        </ThemeProvider>
    );
}
