"use client"

import { useState } from "react"
import Image from "next/image"
import { Picture } from "@/types/product"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ProductImageGalleryProps {
  images: Picture[]
  title: string
}

function getRelativeUrl(url: string) {
  return url.startsWith("http://localhost:3000")
    ? url.replace("http://localhost:3000", "")
    : url
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <ScrollArea className="order-2 md:order-1 h-[400px] w-[80px]">
        <div className="space-y-2 pr-4">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`w-full aspect-square relative border-2 rounded-lg overflow-hidden transition-colors ${
                selectedImage.id === image.id
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={getRelativeUrl(image.url)}
                alt={`${title} - Imagen ${image.id}`}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* Main Image with Zoom */}
      <div className="order-1 md:order-2 flex-1">
        <div
          className="relative h-[400px] w-full bg-white rounded-lg cursor-zoom-in overflow-hidden"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Base Image */}
          <Image
            src={getRelativeUrl(selectedImage.url)}
            alt={title}
            fill
            className="object-contain p-4"
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Zoomed Overlay */}
          {isZoomed && (
            <div className="absolute inset-0 pointer-events-none bg-white">
              <div
                className="absolute w-[250%] h-[250%] transition-transform duration-0"
                style={{
                  transform: `translate(-${zoomPosition.x}%, -${zoomPosition.y}%)`,
                }}
              >
                <Image
                  src={getRelativeUrl(selectedImage.url)}
                  alt={title}
                  fill
                  className="object-contain scale-[2.5]"
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          )}

          {/* Zoom Indicator */}
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
    </div>
  )
}
