"use client";

import { Media } from '@/actions/entities/models/media';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { omit } from 'lodash';
import { getImageProps } from 'next/image';
import { CSSProperties, useState } from 'react';

type Props = {
  media: Media;
  sizes?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  withLoading?: boolean;
}

export const ResponsiveImage = ({
  media,
  sizes,
  width,
  height,
  style,
  imageStyle,
  className,
  imageClassName,
  withLoading
}: Props) => {
  const [loaded, setLoaded] = useState(!withLoading);
  const common = { alt: media.alt, sizes }

  if (!media.mobile) {
    const {
      props: { srcSet: desktop, ...rest },
    } = getImageProps({
      ...common,
      width: media.width,
      height: media.height,
      src: media.url,
    });

    return (
      <picture className={cn('block', className)} style={style}>
        <source media="(min-width: 1024px)" srcSet={desktop} />
        <img
          alt={media.alt}
          {...omit(rest, ['width', 'height'])}
          width={width || rest.width}
          height={height || rest.height}
          style={imageStyle}
          className={imageClassName}
        />

        {!loaded && (
          <Skeleton
            className='absolute inset-0 m-auto size-[calc(100%-8px)]' />
        )}
      </picture>
    );
  }

  const {
    props: { srcSet: desktop, ...desktopRest },
  } = getImageProps({
    ...common,
    width: media.width,
    height: media.height,
    src: media.url,
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: media.mobile.width,
    height: media.mobile.height,
    src: media.mobile.url,
    onLoad() {

    }
  })
  return (
    <picture className={cn('block', className)} style={style}>
      <source width={desktopRest.width} height={desktopRest.height} media="(min-width: 1024px)" srcSet={desktop} />
      <source width={rest.width} height={rest.height} media="(max-width: 1023px)" srcSet={mobile} />
      <img
        alt={media.alt}
        {...omit(rest, ['width', 'height'])}
        width={width}
        height={height}
        style={imageStyle}
        className={cn(imageClassName, {
          '!border-0': !loaded
        })}
        onLoad={() => setLoaded(true)}
      />

      {!loaded && (
        <Skeleton
          className='absolute inset-0 m-auto size-[calc(100%-8px)]' />
      )}
    </picture>
  );
}