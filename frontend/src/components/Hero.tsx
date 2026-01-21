import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';

const Hero = () => {
  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBanner}
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Animated Glow */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, hsl(199 89% 61% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, hsl(199 89% 61% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, hsl(199 89% 61% / 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Profile Image with Animated Glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: 'var(--gradient-glow)' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <img
              src="/sarkis.png"
              alt="Sarkis EKPINDA"
              className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-primary/30"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                Sarkis EKPINDA
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Développeur Web Backend & Intelligence Artificielle
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Passionné par la création de solutions backend robustes et l'intégration de l'IA dans des applications innovantes
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/50"
            >
              <a href="/cv.pdf" download>
                <Download className="mr-2" size={20} />
                Télécharger le CV
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToProjects}
              className="border-primary/50 hover:bg-primary/10"
            >
              Voir mes projets
              <ChevronDown className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-primary/50" size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
