
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { useLazyImage } from '@/utils/animations';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  
  // Mock gallery data - in a real app this would come from a database
  const galleryImages = [
    {
      id: 1,
      url: '',
      alt: 'Engagement photo 1',
      category: 'engagement'
    },
    {
      id: 2,
      url: '',
      alt: 'Engagement photo 2',
      category: 'engagement'
    },
    {
      id: 3,
      url: '',
      alt: 'Engagement photo 3',
      category: 'engagement'
    },
    {
      id: 4,
      url: '',
      alt: 'Pre-wedding photo 1',
      category: 'pre-wedding'
    },
    {
      id: 5,
      url: '',
      alt: 'Pre-wedding photo 2',
      category: 'pre-wedding'
    },
    {
      id: 6,
      url: '',
      alt: 'Pre-wedding photo 3',
      category: 'pre-wedding'
    },
  ];
  
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredImages = filter 
    ? galleryImages.filter(img => img.category === filter)
    : galleryImages;
    
  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
  };
  
  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (selectedImage === null) return;
    
    const totalImages = filteredImages.length;
    if (direction === 'next') {
      setSelectedImage((selectedImage + 1) % totalImages);
    } else {
      setSelectedImage((selectedImage - 1 + totalImages) % totalImages);
    }
  };
  
  const GalleryImage: React.FC<{
    src: string;
    alt: string;
    onClick: () => void;
    index: number;
  }> = ({ src, alt, onClick, index }) => {
    const { isLoaded, currentSrc } = useLazyImage(src);
    
    return (
      <AnimatedSection 
        animation="fade-in" 
        delay={100 * index}
        className="aspect-square overflow-hidden rounded-md cursor-pointer hover:shadow-lg transition-all duration-300 group"
      >
        <div className="relative h-full" onClick={onClick}>
          <img
            src={currentSrc}
            alt={alt}
            className={cn(
              "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
              isLoaded ? "blur-0" : "blur-md"
            )}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
        </div>
      </AnimatedSection>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Header */}
        <section className="py-20 bg-wedding-secondary/30">
          <div className="container max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center" animation="fade-in">
              <h1 className="font-serif text-5xl text-wedding-dark mb-4">Our Gallery</h1>
              <div className="w-16 h-0.5 bg-wedding-primary mx-auto mb-8"></div>
              <p className="text-wedding-muted max-w-3xl mx-auto">
                Browse through our collection of photos capturing our journey together. We'll add more pictures after the wedding!
              </p>
            </AnimatedSection>
          </div>
        </section>
        
        {/* Gallery */}
        <section className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-6">
            {/* Filters */}
            <AnimatedSection className="mb-12" animation="fade-in">
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setFilter(null)}
                  className={cn(
                    "px-6 py-2 rounded-full transition-all text-sm",
                    filter === null
                      ? "bg-wedding-primary text-white"
                      : "bg-wedding-secondary/50 text-wedding-dark hover:bg-wedding-secondary"
                  )}
                >
                  All Photos
                </button>
                <button
                  onClick={() => setFilter('engagement')}
                  className={cn(
                    "px-6 py-2 rounded-full transition-all text-sm",
                    filter === 'engagement'
                      ? "bg-wedding-primary text-white"
                      : "bg-wedding-secondary/50 text-wedding-dark hover:bg-wedding-secondary"
                  )}
                >
                  Engagement
                </button>
                <button
                  onClick={() => setFilter('pre-wedding')}
                  className={cn(
                    "px-6 py-2 rounded-full transition-all text-sm",
                    filter === 'pre-wedding'
                      ? "bg-wedding-primary text-white"
                      : "bg-wedding-secondary/50 text-wedding-dark hover:bg-wedding-secondary"
                  )}
                >
                  Pre-Wedding
                </button>
              </div>
            </AnimatedSection>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <GalleryImage
                  key={image.id}
                  src={image.url}
                  alt={image.alt}
                  onClick={() => openLightbox(index)}
                  index={index}
                />
              ))}
            </div>
            
            {/* Empty state */}
            {filteredImages.length === 0 && (
              <AnimatedSection className="text-center py-12" animation="fade-in">
                <p className="text-wedding-muted">No photos found in this category.</p>
              </AnimatedSection>
            )}
          </div>
        </section>
        
        {/* Coming Soon */}
        <section className="py-16 bg-wedding-secondary/20">
          <div className="container max-w-5xl mx-auto px-6">
            <AnimatedSection className="text-center" animation="fade-in">
              <h2 className="font-serif text-3xl text-wedding-dark mb-4">Wedding Day Photos Coming Soon</h2>
              <div className="w-12 h-0.5 bg-wedding-primary mx-auto mb-6"></div>
              <p className="text-wedding-muted max-w-3xl mx-auto">
                After our wedding, we'll update this gallery with photos from our special day. Check back soon!
              </p>
            </AnimatedSection>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl w-full p-0 bg-transparent border-0 shadow-none">
          {selectedImage !== null && filteredImages[selectedImage] && (
            <div className="relative bg-black rounded-lg overflow-hidden">
              <div className="absolute top-4 right-4 z-20">
                <button 
                  onClick={closeLightbox}
                  className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex justify-between items-center absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-20 px-4">
                <button 
                  onClick={() => navigateLightbox('prev')}
                  className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => navigateLightbox('next')}
                  className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="relative aspect-[16/9] md:aspect-auto md:h-[80vh]">
                <img
                  src={filteredImages[selectedImage].url}
                  alt={filteredImages[selectedImage].alt}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
