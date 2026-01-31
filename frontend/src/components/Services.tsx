import { motion } from 'framer-motion';
import { Server, Brain, Database, Code2, Smartphone, Cloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    icon: Server,
    title: 'Développement Backend',
    description: 'Création d\'APIs REST/GraphQL robustes et scalables avec Node.js, Express, et bases de données (MongoDB, PostgreSQL)',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Brain,
    title: 'Intelligence Artificielle',
    description: 'Développement de solutions IA (Machine Learning, Deep Learning) et intégration de modèles prédictifs dans vos applications',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Database,
    title: 'Architecture de données',
    description: 'Conception et optimisation de bases de données, migrations, et mise en place de pipelines de données efficaces',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Code2,
    title: 'Développement Full Stack',
    description: 'Création d\'applications web complètes (Frontend React/Vue + Backend) avec une architecture moderne et performante',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: Cloud,
    title: 'DevOps & Déploiement',
    description: 'Mise en place de CI/CD, containerisation Docker, et déploiement sur AWS, Azure, Railway, Vercel',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Smartphone,
    title: 'APIs & Microservices',
    description: 'Conception d\'architectures microservices, APIs sécurisées avec authentification JWT, et documentation complète',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mes{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des solutions techniques sur mesure pour donner vie à vos projets, du backend à l'intelligence artificielle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-lg ${service.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-7 h-7 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '3+', label: 'Années d\'expérience' },
            { value: '15+', label: 'Projets réalisés' },
            { value: '10+', label: 'Technologies maîtrisées' },
            { value: '100%', label: 'Clients satisfaits' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
