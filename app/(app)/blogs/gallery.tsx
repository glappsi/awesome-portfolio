import { Media } from '@/actions/entities/models/media';
import BlurFade from '@/components/ui/blur-fade';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { CSSProperties } from 'react';
import { ResponsiveImage } from '../components/responsive-image';

type Props = {
  images: Media[];
  className?: string;
};

export default function Gallery({ images, className }: Props) {
  return (
    <div className={clsx('mx-auto', className)}>
      <div className='grid max-w-[100vw] grid-cols-2 flex-col items-center gap-2 overflow-x-auto overflow-y-hidden bg-[hsl(var(--border))] md:grid-cols-3 md:flex-row lg:flex'>
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div
                className={cn(`relative aspect-[var(--gallery-item-aspect-ratio)] w-full max-w-full shrink-0 cursor-pointer rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl lg:h-[300px] lg:aspect-[var(--gallery-item-aspect-ratio-desktop)] lg:w-auto`, {
                  'col-span-2 md:col-span-3': (image.mobile?.width || image.width) > (image.mobile?.height || image.height),
                })}
                style={{
                  '--gallery-item-aspect-ratio': `${+(image.mobile?.width || image.width)}/${+(image.mobile?.height || image.height)}`,
                  '--gallery-item-aspect-ratio-desktop': `${+image.width}/${+image.height}`,
                } as CSSProperties}
              >
                <BlurFade
                  delay={0.25 + index * 0.05}
                  inView>
                  <ResponsiveImage
                    media={image}
                    style={{ objectFit: 'cover' }}
                    className={`transition-transform duration-300 ease-in-out hover:scale-110`}
                  />
                </BlurFade>
              </div>
            </DialogTrigger>
            <DialogContent className='h-full max-h-[95vh] max-w-[95vw] p-0 md:max-h-[90vh] md:max-w-[90vw]'>
              <BlurFade className='relative flex size-full items-center justify-center overflow-hidden' inView>
                <ResponsiveImage
                  media={image}
                  sizes='95vw'
                  style={{
                    '--gallery-item-max-width-mobile': `min(100%,${(image.mobile?.width || image.width)}px)`,
                    '--gallery-item-max-heigh-mobile': `min(100%,${(image.mobile?.height || image.height)}px)`,
                    '--gallery-item-max-width-desktop': `min(100%,${image.width}px)`,
                    '--gallery-item-max-heigh-desktop': `min(100%,${image.height}px)`,
                  } as CSSProperties}
                  className='size-auto grow'
                  imageClassName='m-auto border-8 max-w-[--gallery-item-max-width-mobile] max-h-[--gallery-item-max-width-mobile] lg:min-w-[--gallery-item-max-width-desktop] lg:min-h-[--gallery-item-max-width-desktop]'
                />
              </BlurFade>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
