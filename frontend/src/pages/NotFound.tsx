import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          404
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold">Page non trouvée</h1>
        
        <p className="text-muted-foreground text-lg">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/">
              <Home className="mr-2" size={20} />
              Retour à l'accueil
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/projets">
              <ArrowLeft className="mr-2" size={20} />
              Voir les projets
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
