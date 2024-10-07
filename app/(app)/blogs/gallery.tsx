'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import clsx from 'clsx'

// Define the structure of our image objects
interface ImageItem {
  url: string
  alt: string
  width: number
  height: number
}

type Props = {
  images: ImageItem[];
  className?: string;
}

export default function Gallery({images, className}: Props) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null)

  return (
    <div className={clsx("container mx-auto", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className={`relative cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out ${
                image.height > image.width ? 'row-span-2' : ''
              }`}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onClick={() => setSelectedImage(image)}
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] max-h-[90vh] h-full">
              <div className="relative w-full h-full flex justify-center items-center">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="90vw"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}