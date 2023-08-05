'use client';

import Sidebar from '@/components/Sidebar';
import { UserButton } from '@clerk/nextjs';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { PropsWithChildren, useState } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div className="h-screen w-screen relative">
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<div className="ml-0 md:ml-[200px] h-full">
				<header className="h-[60px] border-b border-slate-900/10">
					<div className="h-full flex items-center justify-between md:justify-end px-4">
						<button
							type="button"
							className="md:hidden -m-2.5 p-2.5 text-gray-700"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open Sidebar</span>
							<Bars3Icon className="h-6 w-6" aria-hidden="true" />
						</button>
						<UserButton />
					</div>
				</header>
				<div className="h-[calc(100vh-60px)]">{children}</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
