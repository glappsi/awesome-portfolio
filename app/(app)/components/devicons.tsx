import 'devicon/devicon.min.css';
import clsx from 'clsx';

type Props = {
  icons: string[];
  variant?: 'gray' | 'colored';
  withWordmark?: boolean;
  className?: string
}

export const Devicons: React.FC<Props> = ({ icons, variant, withWordmark, className }) => {
  return icons.map((i) => (<i
    key={i}
    className={clsx({
      [`devicon-${i}-plain`]: !withWordmark,
      [`devicon-${i}-plain-wordmark`]: withWordmark,
      'colored': variant === 'colored'
    }, className)}
  />));
}