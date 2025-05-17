import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageZoomProps {
  src: string;
  alt: string;
}

export default function ImageZoom({ src, alt }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerBounds, setContainerBounds] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerBounds(containerRef.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerBounds) return;

    const rect = containerRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="relative w-full aspect-square bg-white">
      {/* Contenedor principal de la imagen */}
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-zoom-in overflow-hidden rounded-lg"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Imagen principal */}
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-4"
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Overlay con efecto de zoom */}
        {isZoomed && (
          <div className="absolute inset-0 pointer-events-none bg-white">
            <div
              className="absolute w-[250%] h-[250%] transition-transform duration-0"
              style={{
                transform: `translate(-${position.x}%, -${position.y}%)`,
              }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain scale-[2.5]"
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* Indicador de zoom */}
        {isZoomed && (
          <div className="absolute right-4 top-4 bg-white/80 backdrop-blur-sm rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M11 8v6" />
              <path d="M8 11h6" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
} 