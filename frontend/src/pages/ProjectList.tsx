import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectGrid from '@/components/ProjectGrid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/hooks/useProjects';

const ProjectList = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const { data, loading, error } = useProjects(page, 20);

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    if (!data?.data) return [];
    const techs = new Set<string>();
    data.data.forEach((project) => {
      project.technologies.forEach((tech) => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [data]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (!data?.data) return [];
    return data.data.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTech = !selectedTech || project.technologies.includes(selectedTech);
      return matchesSearch && matchesTech;
    });
  }, [data, searchQuery, selectedTech]);

  const totalPages = data ? Math.ceil(data.meta.total / data.meta.limit) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mes{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Projets
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez l'ensemble de mes réalisations en développement backend et intelligence artificielle
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-6"
          >
            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Rechercher un projet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Technology Filter */}
            {allTechnologies.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-center">Filtrer par technologie:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge
                    variant={selectedTech === null ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedTech(null)}
                  >
                    Toutes
                  </Badge>
                  {allTechnologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant={selectedTech === tech ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setSelectedTech(tech)}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Results */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">{error}</p>
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ProjectGrid projects={filteredProjects} />
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center gap-2 mt-12"
                >
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Précédent
                  </Button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Suivant
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectList;
