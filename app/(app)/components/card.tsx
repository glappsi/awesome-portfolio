"use client";
import clsx from 'clsx';
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";

import { MouseEventHandler, PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren & {className?: string, background?: React.ReactNode, onClick?: () => void}> = ({ children, className, background, onClick }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div
			onMouseMove={onMouseMove}
      onClick={onClick}
			className={clsx(className, 'overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600')}
		>
      {!!background && <div className="opacity-25 absolute top-0 left-0 right-0 bottom-0 z-0">{background}</div>}
			<div className="pointer-events-none">
				<div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
				<motion.div
					className="absolute inset-0 z-10  bg-gradient-to-br opacity-100  via-zinc-100/10  transition duration-1000 group-hover:opacity-50 "
					style={style}
				/>
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
					style={style}
				/>
			</div>

      <article>
			  {children}
      </article>
		</div>
	);
};

export const CardHeadline: React.FC<PropsWithChildren & {className?: string}> = ({ children, className }) => {
  return (<h2
    className={clsx(className, 'mb-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display')}
  >
    {children}
  </h2>);
}

export const CardDescription: React.FC<PropsWithChildren & {className?: string}> = ({ children, className }) => {
  return (<p className={clsx(className, 'mb-4 leading-6 duration-150 text-zinc-400 group-hover:text-zinc-300')}>
    {children}
  </p>);
}