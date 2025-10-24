import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProject } from '@/hooks/useProject';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, loading, error } = useProject(id || '');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <p className="text-destructive mb-4">{error || 'Projet non trouvé'}</p>
          <Button asChild variant="outline">
            <Link to="/projets">
              <ArrowLeft className="mr-2" size={20} />
              Retour aux projets
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button asChild variant="ghost" size="sm">
              <Link to="/projets">
                <ArrowLeft className="mr-2" size={16} />
                Retour aux projets
              </Link>
            </Button>
          </motion.div>

          {/* Cover Image */}
          {project.coverImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8"
            >
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            </motion.div>
          )}

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar size={16} />
                <span>{formatDate(project.createdAt)}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {project.title}
              </h1>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <Button
                    asChild
                    variant="outline"
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={20} className="mr-2" />
                      Voir le code
                    </a>
                  </Button>
                )}
                {project.liveDemoUrl && (
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90"
                  >
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={20} className="mr-2" />
                      Démo en direct
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="prose prose-invert max-w-none"
            >
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {project.description}
                </div>
              </div>
            </motion.div>

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Date de création</h3>
                <p className="text-muted-foreground">{formatDate(project.createdAt)}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-2">Dernière mise à jour</h3>
                <p className="text-muted-foreground">{formatDate(project.updatedAt)}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
