
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-10 py-6 text-center border-t">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} RetroGrain - Early 2000s Photo Effect Generator
        </p>
        <div className="flex justify-center mt-2 gap-2 text-sm text-muted-foreground">
          <a href="#" className="hover:text-retro-amber transition-colors">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:text-retro-amber transition-colors">Terms</a>
          <span>•</span>
          <a 
            href="#" 
            className="inline-flex items-center hover:text-retro-amber transition-colors"
          >
            <Github className="h-3 w-3 mr-1" />
            <span>Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
