
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import ImageUploader from '@/components/ImageUploader';
import ImageEditor from '@/components/ImageEditor';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [contentVisible, setContentVisible] = useState(false);

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Add a small delay before showing content
    setTimeout(() => setContentVisible(true), 100);
  };

  // Handle image selection
  const handleImageSelected = (_file: File, dataUrl: string) => {
    setUploadedImage(dataUrl);
  };

  // Handle back button in editor
  const handleBack = () => {
    setUploadedImage(null);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <div className={cn(
        "min-h-screen flex flex-col opacity-0 transition-opacity duration-500",
        contentVisible && "opacity-100"
      )}>
        <header className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-display text-retro-amber tracking-wider">
                  RetroGrain
                </h1>
                <p className="text-muted-foreground font-retro">
                  Turn modern photos into nostalgic 2000s memories
                </p>
              </div>

              <div className="film-strip h-12 w-40 md:w-60 overflow-hidden">
                <div className="h-full bg-black"></div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 py-10">
          <div className="container mx-auto px-4">
            {!uploadedImage ? (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-medium mb-2">Bring Back the Early 2000s Vibe</h2>
                  <p className="text-muted-foreground">
                    Upload your photo and transform it with film grain, light leaks, 
                    and nostalgic date stamps reminiscent of the early digital era.
                  </p>
                </div>
                
                <ImageUploader onImageSelected={handleImageSelected} />
              </div>
            ) : (
              <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Customize Your Retro Effect</h2>
                <ImageEditor imageUrl={uploadedImage} onBack={handleBack} />
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
