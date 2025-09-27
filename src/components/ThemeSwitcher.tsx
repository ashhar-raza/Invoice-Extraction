import React from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Badge } from './ui/badge';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Choose Theme</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Select a color theme for your dashboard
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`relative p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                  theme === themeOption.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className={`w-full h-8 rounded-md mb-2 ${themeOption.preview}`} />
                <div className="text-sm font-medium mb-1">{themeOption.name}</div>
                {theme === themeOption.id && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center">
                      <Check className="h-3 w-3" />
                    </Badge>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground">
              Theme preference is saved locally and will persist across sessions.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}