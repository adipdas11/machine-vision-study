import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, X, Sparkles, Loader2, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { PresentationSlide, SlideBlock } from '../data/slides';
import { generateDiagram } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface PresentationViewProps {
  slides: PresentationSlide[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

function SlideBlockView({ block, isActive }: { block: SlideBlock; isActive: boolean }) {
  const [generatedImage, setGeneratedImage] = useState<string | null>(block.generatedImageUrl || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate image when active if not already generated
  useEffect(() => {
    if (isActive && block.imagePrompt && !block.generatedImageUrl && !isGenerating && !generatedImage && !block.localImage) {
      handleGenerate();
    }
  }, [isActive]);

  const handleGenerate = async () => {
    if (!block.imagePrompt) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateDiagram(block.imagePrompt);
      setGeneratedImage(imageUrl);
      block.generatedImageUrl = imageUrl; // Cache the result
    } catch (err) {
      console.error(err);
      setError("Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-full gap-8 p-8 lg:p-12 max-w-[1600px] mx-auto items-start lg:items-center">
      {/* Left: Content */}
      <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-center py-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-zinc-900 mb-8 leading-tight">
            {block.title}
          </h2>

          {block.question && (
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm mb-8">
              <div className="text-zinc-800 text-lg font-medium leading-relaxed prose prose-zinc prose-p:my-2 prose-ul:my-2 prose-li:my-1">
                <ReactMarkdown 
                  remarkPlugins={[remarkMath]} 
                  rehypePlugins={[rehypeKatex]}
                >
                  {block.question}
                </ReactMarkdown>
              </div>
            </div>
          )}
          
          <div className="prose prose-zinc prose-xl text-zinc-600 leading-relaxed">
            <ul className="list-disc pl-6 space-y-4 marker:text-indigo-500">
              {block.points.map((point, pIdx) => (
                <li key={pIdx}>
                  <ReactMarkdown 
                    remarkPlugins={[remarkMath]} 
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      p: ({node, ...props}) => <span {...props} />
                    }}
                  >
                    {point}
                  </ReactMarkdown>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Right: Visual */}
      <div className="flex-1 w-full lg:w-1/2 h-[400px] lg:h-[600px] flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full flex-1 bg-white rounded-3xl shadow-xl border border-zinc-100 overflow-hidden relative group flex items-center justify-center p-4"
        >
          {generatedImage ? (
            <img 
              src={generatedImage} 
              alt={block.imageCaption}
              className="max-w-full max-h-full object-contain"
            />
          ) : block.localImage ? (
            <img 
              src={block.localImage} 
              alt={block.imageCaption}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          ) : (
            <img 
              src={`https://picsum.photos/seed/${block.imageKeyword}/1200/900`} 
              alt={block.imageCaption}
              className="max-w-full max-h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />
          )}

          {/* Loading Overlay */}
          {isGenerating && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm z-20">
              <div className="text-center">
                <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-indigo-600" />
                <span className="text-zinc-600 font-medium">Generating Diagram...</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Caption */}
        <div className="bg-white/90 p-4 rounded-xl border border-zinc-200 shadow-sm">
          <p className="text-zinc-600 text-sm font-medium text-center">
            {block.imageCaption}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PresentationView({ slides, currentIndex, onNext, onPrev, onClose }: PresentationViewProps) {
  const currentSlide = slides[currentIndex];
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  // Reset block index when changing themes (slides)
  useEffect(() => {
    setCurrentBlockIndex(0);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentBlockIndex < currentSlide.blocks.length - 1) {
      setCurrentBlockIndex(prev => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(prev => prev - 1);
    } else {
      onPrev();
    }
  };

  return (
    <div className="fixed inset-0 bg-zinc-50 text-zinc-900 z-50 flex flex-col">
      {/* Progress Bar */}
      <div className="h-1 bg-zinc-200 w-full">
        <motion.div 
          className="h-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentIndex * 100) + ((currentBlockIndex + 1) / currentSlide.blocks.length * 100)) / slides.length}%` 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6">
        <div>
          <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-1 block">
            {currentSlide.theme}
          </span>
          <h1 className="text-zinc-400 text-lg font-medium">
            {currentSlide.title}
          </h1>
        </div>
        <button 
          onClick={onClose}
          className="p-3 hover:bg-zinc-200 rounded-full transition-colors text-zinc-500"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${currentBlockIndex}`}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <SlideBlockView 
              block={currentSlide.blocks[currentBlockIndex]} 
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="px-8 py-6 flex justify-between items-center">
        <div className="flex gap-2">
          {currentSlide.blocks.map((_, idx) => (
            <div 
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentBlockIndex ? 'bg-zinc-800 scale-125' : 'bg-zinc-300'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0 && currentBlockIndex === 0}
            className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-white hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all text-zinc-600"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            disabled={currentIndex === slides.length - 1 && currentBlockIndex === currentSlide.blocks.length - 1}
            className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
