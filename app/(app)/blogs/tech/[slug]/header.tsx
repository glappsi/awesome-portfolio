import Link from "next/link";
import React from "react";
import { BlogWithDetails } from '@/actions/entities/models/blog';
import { Icon } from '@/components/ui/icon';

type Props = {
	blog: BlogWithDetails

	views: number;
};
export const Header: React.FC<Props> = ({ blog, views }) => {
	return (
		<header
			className="border-b-8 pt-[calc(var(--navbar-height)/2)] md:pt-0 relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
		>
			{/* <div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-white/10  border-zinc-200 lg:border-transparent"
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<span
							title="View counter for this page"
							className={`duration-200 hover:font-medium flex items-center gap-1 ${
								isIntersecting
									? " text-zinc-400 hover:text-zinc-100"
									: "text-zinc-600 hover:text-zinc-900"
							} `}
						>
							<Eye className="w-5 h-5" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(
								views,
							)}
						</span>
						<Link target="_blank" href="https://twitter.com/chronark_">
							<Twitter
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
						<Link target="_blank" href="https://github.com/chronark">
							<Github
								className={`w-6 h-6 duration-200 hover:font-medium ${
									isIntersecting
										? " text-zinc-400 hover:text-zinc-100"
										: "text-zinc-600 hover:text-zinc-900"
								} `}
							/>
						</Link>
					</div>

					<Link
						href="/blogs"
						className={`duration-200 hover:font-medium ${
							isIntersecting
								? " text-zinc-400 hover:text-zinc-100"
								: "text-zinc-600 hover:text-zinc-900"
						} `}
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div> */}
			<div className="container mx-auto relative isolate overflow-hidden py-24 sm:py-40">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
							{blog.title}
						</h1>
						{!!blog.summary && <p className="mt-6 text-lg leading-8 text-zinc-300">
							{blog.summary}
						</p>}
					</div>

					{!!blog.links?.length && <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
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
