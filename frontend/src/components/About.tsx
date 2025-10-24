import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const technologies = [
    'Node.js',
    'Python',
    'TensorFlow',
    'Docker',
    'MongoDB',
    'PostgreSQL',
    'Express',
    'FastAPI',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-8"
          >
            À propos de{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              moi
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="prose prose-invert max-w-none mb-12"
          >
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Développeur passionné avec une expertise en développement backend et en intelligence artificielle, 
              je crée des solutions robustes et évolutives. Mon expérience couvre la conception d'APIs RESTful, 
              l'implémentation de modèles de machine learning, et l'optimisation des performances système. 
              Je m'efforce de combiner les meilleures pratiques du génie logiciel avec les dernières avancées en IA 
              pour développer des applications innovantes et efficaces.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-semibold text-center mb-6">Stack Technique</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-card hover:bg-primary/10 border border-primary/20 transition-colors cursor-default"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
