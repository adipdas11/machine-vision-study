import React, { useState } from 'react';
import { DashboardView } from './components/DashboardView';
import { PresentationView } from './components/PresentationView';
import { slides } from './data/slides';

export default function App() {
  const [mode, setMode] = useState<'dashboard' | 'presentation'>('dashboard');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const startPresentation = (index: number) => {
    setCurrentSlideIndex(index);
    setMode('presentation');
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {mode === 'dashboard' ? (
        <DashboardView 
          slides={slides} 
          onStartPresentation={startPresentation} 
        />
      ) : (
        <PresentationView 
          slides={slides}
          currentIndex={currentSlideIndex}
          onNext={nextSlide}
          onPrev={prevSlide}
          onClose={() => setMode('dashboard')}
        />
      )}
    </div>
  );
}
