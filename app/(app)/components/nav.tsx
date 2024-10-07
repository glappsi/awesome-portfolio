"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { HomeIcon, ArchiveIcon, PersonIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { filter } from 'lodash';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/ui/icon';
import { Link as TLink } from '@/actions/entities/models/link';
import { useRouter } from 'next/navigation';
import { createMessage } from '@/actions';
import { ContactButton } from './contact-form';

const DATA = {
  navbar: (profileSlug: string) => ([
    { href: "/", icon: HomeIcon, label: "home" },
    { href: `/profiles/${profileSlug}`, icon: PersonIcon, label: "profile" },
    { href: "/projects", icon: ArchiveIcon, label: "projects" },
  ]),
};

export type NavigationProps = {
  profileSlug: string;
  links: Array<TLink>
}

export const NavigationDock: React.FC<NavigationProps> = ({
  profileSlug,
  links
}) => {
  const t = useTranslations('Navigation');
  const redirects = filter(links, l => !!l.link && l.showInNavigation) as TLink[];
  const downloads = filter(links, l => !!l.download && l.showInNavigation) as TLink[];

  return (
    <TooltipProvider>
      <Dock direction="middle">
        {DATA.navbar(profileSlug).map((item) => (
          <DockIcon key={item.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  aria-label={t(item.label)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t(item.label)}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        {redirects.map(({link, title, icon, isExternal, hideOnMobile}) => (
          <DockIcon 
            key={title}
            className={cn({
              "hidden md:flex": hideOnMobile
            })}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={link!}
                  target={isExternal ? "_blank" : "_self"}
                  aria-label={title}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                  )}
                >
                  <Icon type={icon} className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <ContactButton className="hidden md:flex" onSubmit={createMessage} iconOnly />
        <Separator orientation="vertical" className="h-full" />
        {downloads.map(({download, title, icon, symbol}) => (
          <DockIcon key={title}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={download!.url}
                  download={download!.filename}
                  target='_blank'
                  aria-label={title}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-full",
                  )}
                >
                  {symbol ? symbol : <Icon type={icon} className="size-4" />}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </TooltipProvider>
  )
};

export const Navigation: React.FC<NavigationProps> = (props) => {
  const router = useRouter();
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<NavigationDock {...props}/>
					</div>

					<Link
						href="#"
            onClick={async () => {
              await scrollToTop();
              router.back()
            }}
						className="duration-200 text-zinc-300 hover:text-zinc-100"
					>
						<ArrowLeft className="w-6 h-6 " />
					</Link>
				</div>
			</div>
		</header>
	);
};

function scrollToTop() {
  return new Promise((resolve) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Listen for the scroll event to detect when scrolling stops
    const checkIfScrollingStopped = () => {
      // If user has scrolled to the top, resolve the promise
      if (window.pageYOffset === 0) {
        window.removeEventListener('scroll', checkIfScrollingStopped);
        resolve({});
      }
    };

    // Add a scroll event listener to check when scrolling ends
    window.addEventListener('scroll', checkIfScrollingStopped);
  });
}
