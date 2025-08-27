import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-luxury bg-clip-text text-transparent">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Oops! Page not found</p>
          <Button variant="hero" onClick={() => window.location.href = "/"}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
