import * as Icons from '@radix-ui/react-icons';

export type IconType = keyof typeof Icons;

export const IconKeys = Object.keys(Icons).filter(
  (key): key is IconType => key in Icons,
);

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export type VariableIconProps = IconProps & {
  type: IconType;
};

export const Icon = ({ type, ...props }: VariableIconProps) => {
  const IconComp = Icons[type];

  return <IconComp {...props} />;
};

export default Icons;
