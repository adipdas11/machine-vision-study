import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Layers, Camera, Brain, Scan } from 'lucide-react';
import { PresentationSlide } from '../data/slides';

interface DashboardViewProps {
  slides: PresentationSlide[];
  onStartPresentation: (startIndex: number) => void;
}

export function DashboardView({ slides, onStartPresentation }: DashboardViewProps) {
  
  const getIcon = (id: number) => {
    switch(id) {
      case 1: return Camera;
      case 2: return Layers;
      case 3: return Scan;
      case 4: return Brain;
      default: return Layers;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Hero Section */}
      <div className="bg-zinc-900 text-white pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(79,70,229,0.4),transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Study Companion
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Machine Vision <br />
              <span className="text-zinc-400">Interim Review</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mb-10">
              A comprehensive breakdown of 18 key questions grouped into 4 core themes.
            </p>
            
            <button 
              onClick={() => onStartPresentation(0)}
              className="group flex items-center gap-3 px-8 py-4 bg-white text-zinc-900 rounded-full font-semibold hover:bg-zinc-200 transition-all shadow-xl shadow-white/10"
            >
              <span className="w-8 h-8 rounded-full bg-zinc-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current" />
              </span>
              Start Presentation
            </button>
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {slides.map((slide, idx) => {
            const Icon = getIcon(slide.id);
            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => onStartPresentation(idx)}
                className="group bg-white rounded-3xl border border-zinc-200 p-8 hover:shadow-2xl hover:border-indigo-500/30 transition-all cursor-pointer flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                  <Icon className="w-48 h-48" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                      {slide.theme}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors mb-4">
                    {slide.title}
                  </h3>

                  <div className="space-y-2 mb-8">
                    {slide.blocks.map((block, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-zinc-500 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                        <span className="line-clamp-1">{block.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-sm font-bold text-indigo-600 group-hover:translate-x-2 transition-transform">
                    Explore Theme <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
