
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      
      // Add delay before calling onComplete to allow exit animation
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex flex-col items-center justify-center bg-retro-film text-white transition-opacity duration-500",
      animationComplete ? "opacity-0" : "opacity-100"
    )}>
      <div className="w-full max-w-xl">
        <div className="film-strip w-full overflow-hidden bg-black py-4 mb-6">
          <div className="animate-film-slide flex">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-1/2 md:w-1/4 px-1">
                <div className="aspect-square bg-retro-amber/20 flex items-center justify-center">
                  <div className="w-full h-full bg-black/30"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center animate-slide-up">
          <h1 className="text-6xl md:text-8xl font-display text-retro-amber tracking-wide mb-2">RetroGrain</h1>
          <p className="text-retro-warmgray font-retro text-xl mb-8">Bringing back the 2000s photographic feel</p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
