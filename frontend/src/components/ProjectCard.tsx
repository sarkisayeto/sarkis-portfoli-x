import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Project } from '@/lib/api';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Card className="h-full overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 group">
        {/* Cover Image */}
        {project.coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
          </div>
        )}

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <Link
              to={`/projets/${project._id}`}
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              {project.title}
            </Link>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar size={14} className="mr-1" />
              {formatDate(project.createdAt)}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground line-clamp-3">{project.description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          {project.githubUrl && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github size={16} className="mr-2" />
                Code
              </a>
            </Button>
          )}
          {project.liveDemoUrl && (
            <Button
              asChild
              variant="default"
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="mr-2" />
                Démo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
