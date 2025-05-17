import { useState } from 'react';
import Image from 'next/image';
import { Picture } from '@/types/product';
import ImageZoom from './ImageZoom';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ImageGalleryProps {
  pictures: Picture[];
  title: string;
}

export default function ImageGallery({ pictures, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(pictures[0]);

  return (
    <div className="grid grid-cols-[100px_1fr] gap-4">
      {/* Miniaturas con scroll */}
      <ScrollArea className="h-[500px]">
        <div className="space-y-2 pr-4">
          {pictures.map((picture) => (
            <button
              key={picture.id}
              onClick={() => setSelectedImage(picture)}
              className={`w-full aspect-square relative border-2 rounded-lg overflow-hidden transition-colors ${
                selectedImage.id === picture.id
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={picture.url}
                alt={`${title} - Imagen ${picture.id}`}
                fill
                className="object-contain p-1"
                sizes="100px"
              />
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Imagen principal con zoom */}
      <div className="relative">
        <ImageZoom src={selectedImage.url} alt={title} />
      </div>
    </div>
  );
} 