import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ImageUploader from '@/components/ImageUploader';
import { updateProject } from '@/lib/api';
import { validateProjectForm } from '@/lib/validators';
import { useProject } from '@/hooks/useProject';
import { toast } from 'sonner';

const AdminProjectEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, loading: fetching } = useProject(id || '');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubUrl: '',
    liveDemoUrl: '',
    coverImage: '',
  });

  useEffect(() => {
    if (project) {
      const techs = Array.isArray((project as any).technologies)
        ? ((project as any).technologies as string[])
        : [];
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: techs.join(', '),
        githubUrl: project.githubUrl || '',
        liveDemoUrl: project.liveDemoUrl || '',
        coverImage: project.coverImage || '',
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    // Parse technologies
    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // Validate
    const errors = validateProjectForm({
      title: formData.title,
      description: formData.description,
      technologies: techArray,
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error.message));
      return;
    }

    setLoading(true);
    try {
      await updateProject(id, {
        title: formData.title,
        description: formData.description,
        technologies: techArray,
        githubUrl: formData.githubUrl || undefined,
        liveDemoUrl: formData.liveDemoUrl || undefined,
        coverImage: formData.coverImage || undefined,
      });
      toast.success('Projet mis à jour avec succès');
      navigate('/admin/projets');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">Projet non trouvé</p>
          <Button asChild>
            <Link to="/admin/projets">Retour</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/projets">
              <ArrowLeft className="mr-2" size={16} />
              Retour
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-8">Modifier le projet</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Mon projet incroyable"
                required
                maxLength={200}
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description détaillée du projet..."
                required
                maxLength={5000}
                rows={8}
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground text-right">
                {(formData.description || '').length} / 5000 caractères
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies * (séparées par des virgules)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Node.js, MongoDB, Docker"
                required
                disabled={loading}
              />
            </div>

            {/* GitHub URL */}
            <div className="space-y-2">
              <Label htmlFor="githubUrl">URL GitHub (optionnel)</Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repo"
                disabled={loading}
              />
            </div>

            {/* Live Demo URL */}
            <div className="space-y-2">
              <Label htmlFor="liveDemoUrl">URL de la démo (optionnel)</Label>
              <Input
                id="liveDemoUrl"
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                placeholder="https://demo.example.com"
                disabled={loading}
              />
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Label>Image de couverture (optionnel)</Label>
              <ImageUploader
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <Save className="mr-2" size={20} />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/projets')}
                disabled={loading}
              >
                Annuler
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminProjectEdit;
