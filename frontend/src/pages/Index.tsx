import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ProjectGrid from '@/components/ProjectGrid';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';

const Index = () => {
  const { data, loading } = useProjects(1, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <Hero />
        <About />
        <Services />
        
        {/* Projects Preview Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
                Projets{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  récents
                </span>
              </h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Découvrez une sélection de mes projets récents combinant backend robuste et intelligence artificielle
              </p>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
              ) : data ? (
                <>
                  <ProjectGrid projects={data.data} />
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-primary/50 hover:bg-primary/10"
                    >
                      <Link to="/projets">
                        Voir tous les projets
                        <ArrowRight className="ml-2" size={20} />
                      </Link>
                    </Button>
                  </motion.div>
                </>
              ) : (
                <p className="text-center text-muted-foreground">
                  Aucun projet disponible pour le moment
                </p>
              )}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Travaillons{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ensemble
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Vous avez un projet en tête ? N'hésitez pas à me contacter pour discuter de vos besoins
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                <Link to="/contact">
                  Me contacter
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
