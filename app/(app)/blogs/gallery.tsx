import { Media } from '@/actions/entities/models/media';
import BlurFade from '@/components/ui/blur-fade';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import GridPattern from '@/components/ui/grid-pattern';
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
      <div
        className='grid max-w-[100vw] grid-cols-2 flex-col items-center gap-2 overflow-x-auto overflow-y-hidden bg-[hsl(var(--border))] md:grid-cols-3 md:flex-row lg:flex'>
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
                    imageStyle={{ objectFit: 'cover' }}
                    height={{
                      desktop: 300,
                    }}
                    width={{
                      desktop: 'auto'
                    }}
                    className={`transition-transform duration-300 ease-in-out hover:scale-110`}
                    imageClassName='w-full'
                    withLoading
                  />
                </BlurFade>
              </div>
            </DialogTrigger>
            <DialogContent className='h-full max-h-[95vh] max-w-[95vw] p-0 lg:max-h-[90vh] lg:max-w-[90vw]'>
              <GridPattern
                width={40}
                height={40}
                className='z-0'
                x={-1}
                y={-1}
              />
              <BlurFade className='flex size-full items-center justify-center' inView>
                <ResponsiveImage
                  media={image}
                  style={{
                    '--gallery-item-max-width-mobile': `min(95vw,${(image.mobile?.width || image.width)}px)`,
                    '--gallery-item-max-height-mobile': `min(95vh,${(image.mobile?.height || image.height)}px)`,
                    '--gallery-item-max-width-desktop': `min(90vh,${image.width}px)`,
                    '--gallery-item-max-height-desktop': `min(90vh,${image.height}px)`,
                    '--gallery-item-aspect-ratio': `${+(image.mobile?.width || image.width)}/${+(image.mobile?.height || image.height)}`,
                    '--gallery-item-aspect-ratio-desktop': `${+image.width}/${+image.height}`,
                  } as CSSProperties}
                  className='flex size-full max-h-[95vh] max-w-[95vw] items-center justify-center p-0 lg:max-h-[90vh] lg:max-w-[90vw]'
                  imageClassName={cn('object-contain m-auto', {
                    'w-full h-auto max-h-full': (image.mobile?.width || image.width) > (image.mobile?.height || image.height),
                    'lg:w-full lg:h-auto lg:max-h-full': (image.width) > (image.height),
                    'h-full w-auto max-w-full': (image.mobile?.width || image.width) < (image.mobile?.height || image.height),
                    'lg:h-full lg:w-auto lg:max-w-full': (image.width) < (image.height),
                  })}
                  fill
                  withLoading
                />
              </BlurFade>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
