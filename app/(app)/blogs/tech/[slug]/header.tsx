import Link from "next/link";
import React from "react";
import { BlogWithDetails } from '@/actions/entities/models/blog';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
	blog?: BlogWithDetails
  hideBorder?: boolean;
};
export const Header: React.FC<Props> = ({ blog, hideBorder }) => {
	return (
		<header
			className={cn("border-b-8 pt-[calc(var(--navbar-height)/2)] md:pt-0 relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black", {
        'md:border-b-0': hideBorder
      })}
		>
			<div className="container mx-auto relative isolate overflow-hidden py-24 md:pt-32 md:pb-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						{!!blog ? <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{blog.title}
						</h1> : <Skeleton className="max-w-full w-[500px] h-[120px] rounded" />}
						{!!blog ? (!!blog.summary && <p className="mt-6 text-lg leading-8 text-zinc-300">
							{blog.summary}
						</p>) : <Skeleton className="max-w-full w-[600px] h-[128px] rounded" />}
					</div>

					{!!blog && !!blog.links?.length && <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
						<div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
							{blog.links.map((link) => (
								link.link ? <Link target="_blank" key={link.title} href={link.link}>
									<Icon type={link.icon} className="size-4" /> {link.title} <span aria-hidden="true">&rarr;</span>
								</Link>
                : <Link target="_blank" key={link.title} href={link.download!.url} download={link.download!.filename}>
                  <Icon type={link.icon} className="size-4" /> {link.title} <span aria-hidden="true">&darr;</span>
                </Link>
							))}
						</div>
					</div>}
				</div>
			</div>
		</header>
	);
};
