'use client'

import { cn } from '@/lib/utils'
import { Image } from '@prisma/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NextImage from 'next/image'
import React, { useState } from 'react'

const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_DOWNLOAD_URL!
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!

interface ImageSliderProps {
  images: Image[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="group relative">
      {currentIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 ml-4 hidden size-8 -translate-y-1/2 transform cursor-pointer rounded-full bg-gray-200 px-2 drop-shadow group-hover:block"
          onClick={handlePreviousImage}
        >
          <ChevronLeft className="size-4" />
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          className="absolute right-0 top-1/2 mr-4 hidden size-8 -translate-y-1/2 transform cursor-pointer rounded-full bg-gray-200 px-2 drop-shadow group-hover:block"
          onClick={handleNextImage}
        >
          <ChevronRight className="size-4" />
        </button>
      )}
      <NextImage
        src={
          `${cloudinaryUrl}/${cloudName}/image/upload/${images?.[currentIndex]?.path}` ||
          'https://static-00.iconduck.com/assets.00/no-image-icon-512x512-lfoanl0w.png'
        }
        alt={`Image ${currentIndex + 1}`}
        width={0}
        height={0}
        sizes="100vw"
        className="aspect-square h-auto w-full rounded-xl object-cover"
      />
      <div className="absolute bottom-0 left-1/2 mb-3 flex -translate-x-1/2 justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={cn('mx-[3px] size-1.5 rounded-full bg-white', {
              'opacity-60': index !== currentIndex,
            })}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
