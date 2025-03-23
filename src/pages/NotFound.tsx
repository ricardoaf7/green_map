
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { FileX, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Página Não Encontrada</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 animate-fade-in">
        <div className="glass-panel-lg p-8 max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <FileX className="h-10 w-10 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! Página não encontrada
          </p>
          
          <p className="text-muted-foreground mb-6">
            A página "{location.pathname}" não existe ou foi removida.
          </p>
          
          <Link to="/">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Retornar ao Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
