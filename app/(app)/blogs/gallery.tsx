import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import clsx from 'clsx';
import Image from 'next/image';

// Define the structure of our image objects
interface ImageItem {
  url: string;
  alt: string;
  width: number;
  height: number;
}

type Props = {
  images: ImageItem[];
  className?: string;
};

export default function Gallery({ images, className }: Props) {
  return (
    <div className={clsx('mx-auto', className)}>
      <div className='flex max-w-[100vw] flex-col items-center gap-2 overflow-x-auto overflow-y-auto bg-[hsl(var(--border))] md:flex-row'>
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div
                className={`relative shrink-0 cursor-pointer rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl md:h-[300px]`}
                style={{
                  aspectRatio: `${+image.width}/${+image.height}`,
                }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  style={{ objectFit: 'cover' }}
                  sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                  className={`transition-transform duration-300 ease-in-out hover:scale-110`}
                />
              </div>
            </DialogTrigger>
            <DialogContent className='h-full max-h-[95vh] max-w-[95vw] p-0 md:max-h-[90vh] md:max-w-[90vw]'>
              <div className='relative flex size-full items-center justify-center overflow-hidden'>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes='90vw'
                  style={{
                    maxWidth: `min(100%,${image.width}px)`,
                    maxHeight: `min(100%,${image.height}px)`,
                  }}
                  className={`grow w-auto h-auto`}
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
