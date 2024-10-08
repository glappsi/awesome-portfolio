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
  return (
    <div className={clsx("mx-auto", className)}>
      <div className="flex flex-col items-center md:flex-row gap-[0.5rem] bg-[hsl(var(--border))] overflow-auto max-w-[100vw]">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div 
                className={`md:h-[300px] shrink-0 relative cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out`}
                style={{
                  aspectRatio: `${+image.width}/${+image.height}`
                }}>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={`transition-transform duration-300 ease-in-out hover:scale-110`}
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] max-h-[95vh] md:max-w-[90vw] md:max-h-[90vh] h-full p-0 md:p-6">
              <div className="md:overflow-hidden relative w-full h-full flex justify-center items-center">
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="90vw"
                  className="max-h-full max-w-full"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}