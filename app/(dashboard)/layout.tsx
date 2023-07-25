import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/journal', label: 'Journal' },
	{ href: '/history', label: 'History' },
];

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="h-screen w-screen relative">
			<aside className="absolute w-[200px] top-0 left-0 h-full border-r border-slate-900/10">
				<div className="text-3xl font-bold text-center my-4">Moodi</div>
				<ul>
					{links.map(({ href, label }) => (
						<li key={label} className="px-2 py-6 text-xl">
							<Link href={href}>{label}</Link>
						</li>
					))}
				</ul>
			</aside>
			<div className="ml-[200px] h-full">
				<header className="h-[60px] border-b border-slate-900/10">
					<div className="h-full flex items-center justify-end px-4">
						<UserButton />
					</div>
				</header>
				<div className="h-[calc(100vh-60px)]">{children}</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
