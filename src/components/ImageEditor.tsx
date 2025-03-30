
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Download, RefreshCw, Undo2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  ImageEffect, 
  FilterType, 
  filterPresets, 
  formatDateStamp, 
  generateRandomEarly2000sDate,
  applyFilterStyles
} from '@/utils/imageProcessing';

interface ImageEditorProps {
  imageUrl: string;
  onBack: () => void;
}

const ImageEditor = ({ imageUrl, onBack }: ImageEditorProps) => {
  const [currentFilter, setCurrentFilter] = useState<FilterType>('retro');
  const [effects, setEffects] = useState<ImageEffect>(filterPresets.retro);
  const [dateStamp, setDateStamp] = useState<string>(formatDateStamp(generateRandomEarly2000sDate()));
  const { toast } = useToast();

  // Apply preset filter
  const applyFilter = (filter: FilterType) => {
    setCurrentFilter(filter);
    setEffects(filterPresets[filter]);
  };

  // Update individual effect parameter
  const updateEffect = (key: keyof ImageEffect, value: number | boolean) => {
    setEffects(prev => ({
      ...prev,
      [key]: value
    }));
    // When manually adjusting, we're no longer using a preset
    if (currentFilter !== 'none') {
      setCurrentFilter('none');
    }
  };

  // Generate a new random date stamp
  const regenerateDate = () => {
    setDateStamp(formatDateStamp(generateRandomEarly2000sDate()));
  };

  // Download the processed image
  const downloadImage = () => {
    // In a real app, we would render to canvas and download
    // For this demo, just open image in new tab
    window.open(imageUrl, '_blank');
    
    toast({
      title: "Image Saved",
      description: "Your retro image has been downloaded!"
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Image Preview */}
      <div className="lg:col-span-2">
        <div className={`relative overflow-hidden rounded-md ${effects.filmBorder ? 'film-frame' : ''}`}>
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            className="w-full h-auto"
            style={{ filter: applyFilterStyles(effects) }}
          />
          
          {effects.grain > 0 && (
            <div className="noise-overlay" style={{ opacity: effects.grain }}></div>
          )}
          
          {effects.vignette && (
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
          )}
          
          {effects.dateStamp && (
            <div className="date-stamp font-retro text-lg text-white text-opacity-90">
              {dateStamp}
            </div>
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Choose Filter</h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(filterPresets).map((filter) => (
              <Button
                key={filter}
                variant={currentFilter === filter ? "default" : "outline"}
                className={currentFilter === filter ? "bg-retro-amber text-white" : ""}
                onClick={() => applyFilter(filter as FilterType)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Adjust Effects</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Brightness</label>
              <span className="text-xs text-muted-foreground">{effects.brightness.toFixed(2)}</span>
            </div>
            <Slider 
              value={[effects.brightness * 100]} 
              min={50} 
              max={150} 
              step={5} 
              onValueChange={(vals) => updateEffect('brightness', vals[0] / 100)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Contrast</label>
              <span className="text-xs text-muted-foreground">{effects.contrast.toFixed(2)}</span>
            </div>
            <Slider 
              value={[effects.contrast * 100]} 
              min={50} 
              max={150} 
              step={5} 
              onValueChange={(vals) => updateEffect('contrast', vals[0] / 100)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Saturation</label>
              <span className="text-xs text-muted-foreground">{effects.saturation.toFixed(2)}</span>
            </div>
            <Slider 
              value={[effects.saturation * 100]} 
              min={0} 
              max={150} 
              step={5} 
              onValueChange={(vals) => updateEffect('saturation', vals[0] / 100)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Sepia</label>
              <span className="text-xs text-muted-foreground">{effects.sepia.toFixed(2)}</span>
            </div>
            <Slider 
              value={[effects.sepia * 100]} 
              min={0} 
              max={100} 
              step={5} 
              onValueChange={(vals) => updateEffect('sepia', vals[0] / 100)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Grain</label>
              <span className="text-xs text-muted-foreground">{effects.grain.toFixed(2)}</span>
            </div>
            <Slider 
              value={[effects.grain * 100]} 
              min={0} 
              max={100} 
              step={5} 
              onValueChange={(vals) => updateEffect('grain', vals[0] / 100)}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Options</h3>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Vignette Effect</label>
            <Switch 
              checked={effects.vignette} 
              onCheckedChange={(checked) => updateEffect('vignette', checked)} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Date Stamp</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={regenerateDate}
                disabled={!effects.dateStamp}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Switch 
                checked={effects.dateStamp} 
                onCheckedChange={(checked) => updateEffect('dateStamp', checked)} 
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Film Border</label>
            <Switch 
              checked={effects.filmBorder} 
              onCheckedChange={(checked) => updateEffect('filmBorder', checked)} 
            />
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            <Undo2 className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            className="bg-retro-amber hover:bg-retro-amber/80 text-white"
            onClick={downloadImage}
          >
            <Download className="mr-2 h-4 w-4" />
            Save Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
