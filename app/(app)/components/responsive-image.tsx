import { Media } from '@/actions/entities/models/media';
import { cn } from '@/lib/utils';
import { getImageProps } from 'next/image';
import { CSSProperties } from 'react';

type Props = {
  media: Media;
  sizes?: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  style?: CSSProperties;
}

export const ResponsiveImage = ({
  media,
  sizes,
  width,
  height,
  style,
  className,
  imageClassName
}: Props) => {
  const common = { alt: media.alt, sizes }

  if (!media.mobile) {
    const {
      props: { srcSet: desktop, ...rest },
    } = getImageProps({
      ...common,
      width: width || media.width,
      height: height || media.height,
      src: media.url,
    });

    return (
      <picture className={cn('block', className)}>
        <source media="(min-width: 1000px)" srcSet={desktop} />
        <img
          alt={media.alt}
          {...rest}
          style={{ ...(style || {}) }}
          className={imageClassName}
        />
      </picture>
    );
  }

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    width: width || media.width,
    height: height || media.height,
    src: media.url,
  });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    width: width || media.mobile.width,
    height: height || media.mobile.height,
    src: media.mobile.url,
  })

  return (
    <picture className={cn('block', className)}>
      <source media="(min-width: 1000px)" srcSet={desktop} />
      <source media="(min-width: 500px)" srcSet={mobile} />
      <img
        alt={media.alt}
        {...rest}
        style={{ ...(style || {}) }}
        className={imageClassName}
      />
    </picture>
  );
}