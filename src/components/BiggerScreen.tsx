import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useTheme } from '../contexts/ThemeContext';

export function BiggerScreen() {
  const { theme } = useTheme();

  const cardBg = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900';
  const textMuted = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="p-6 flex flex-col items-center justify-center h-full w-full">
      <Card className={`rounded-xl shadow-lg ${cardBg} max-w-md w-full`}>
        <CardHeader>
          <CardTitle className="text-center text-xl">Screen Too Small</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className={`${textMuted} mb-4`}>
            Your screen is too small for the full dashboard. Please use a larger screen or rotate your device.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
