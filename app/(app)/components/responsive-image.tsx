"use client";

import { Media } from '@/actions/entities/models/media';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { omit } from 'lodash';
import { getImageProps } from 'next/image';
import { CSSProperties, useState } from 'react';

type ResponsiveSize = {
  mobile?: number | string;
  desktop?: number | string;
};

type Props = {
  media: Media;
  sizes?: string;
  width?: number | string | ResponsiveSize;
  height?: number | string | ResponsiveSize;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  withLoading?: boolean;
}

function resolveSize(size: number | string | ResponsiveSize | undefined, type: 'desktop' | 'mobile'): number | string | undefined {
  if (typeof size === 'object' && size !== null) {
    return size[type];
  }
  return size;
}

function resolveRelativeKeywords(size: number | string | undefined, oppositeSize: number | string | undefined, original: number, originalOpposite: number): number | string | undefined {
  if (size !== 'auto' || typeof oppositeSize !== 'number') {
    return size;
  }

  return original * (oppositeSize / originalOpposite);
}

export const ResponsiveImage = ({
  media,
  sizes,
  width,
  height,
  priority,
  fill,
  style,
  imageStyle,
  className,
  imageClassName,
  withLoading
}: Props) => {
  const [loaded, setLoaded] = useState(!withLoading);
  const common = { alt: media.alt, sizes }

  if (!media.mobile) {
    const desktopWidth = resolveSize(width, 'desktop');
    const desktopHeight = resolveSize(height, 'desktop');
    const desktopWidthResolved = resolveRelativeKeywords(desktopWidth, desktopHeight, media.width, media.height);
    const desktopHeightResolved = resolveRelativeKeywords(desktopWidth, desktopHeight, media.width, media.height);
    const {
      props: { srcSet: desktop, ...rest },
    } = getImageProps({
      ...common,
      ...(!fill ? {
        width: typeof desktopWidthResolved === 'number' ? desktopWidthResolved : media.width,
        height: typeof desktopHeightResolved === 'number' ? desktopHeightResolved : media.height,
      } : {}),
      src: media.url,
      priority,
      fill,
    });

    return (
      <picture className={cn('block', className)} style={style}>
        <source media="(min-width: 1024px)" srcSet={desktop} />
        <img
          alt={media.alt}
          {...omit(rest, ['width', 'height'])}
          width={desktopWidthResolved || rest.width}
          height={desktopHeightResolved || rest.height}
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

  const desktopWidth = resolveSize(width, 'desktop');
  const desktopHeight = resolveSize(height, 'desktop');
  const desktopWidthResolved = resolveRelativeKeywords(desktopWidth, desktopHeight, media.width, media.height);
  const desktopHeightResolved = resolveRelativeKeywords(desktopWidth, desktopHeight, media.width, media.height);
  const mobileWidth = resolveSize(width, 'mobile');
  const mobileHeight = resolveSize(height, 'mobile');
  const mobileWidthResolved = resolveRelativeKeywords(mobileWidth, mobileHeight, media.mobile.width, media.mobile.height);
  const mobileHeightResolved = resolveRelativeKeywords(mobileWidth, mobileHeight, media.mobile.width, media.mobile.height);
  const {
    props: { srcSet: desktop, ...desktopRest },
  } = getImageProps({
    ...common,
    ...(!fill ? {
      width: typeof desktopWidthResolved === 'number' ? desktopWidthResolved : media.width,
      height: typeof desktopHeightResolved === 'number' ? desktopHeightResolved : media.height,
    } : {}),
    src: media.url,
    priority,
    fill,
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    ...(!fill ? {
      width: typeof mobileWidthResolved === 'number' ? mobileWidthResolved : media.mobile.width,
      height: typeof mobileHeightResolved === 'number' ? mobileHeightResolved : media.mobile.height,
    } : {}),
    src: media.mobile.url,
    priority,
    fill,
  });

  return (
    <picture className={cn('block', className)} style={style}>
      <source
        width={desktopWidthResolved || desktopRest.width}
        height={desktopHeightResolved || desktopRest.height}
        media="(min-width: 1024px)"
        srcSet={desktop} />
      <source
        width={mobileWidthResolved || rest.width}
        height={mobileHeightResolved || rest.height}
        media="(max-width: 1023px)"
        srcSet={mobile} />
      <img
        alt={media.alt}
        {...omit(rest, ['width', 'height'])}
        width={mobileWidthResolved || rest.width}
        height={mobileHeightResolved || rest.height}
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