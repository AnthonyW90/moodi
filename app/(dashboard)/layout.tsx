import { UserButton } from '@clerk/nextjs';
import { PropsWithChildren } from 'react';

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className="h-screen w-screen relative">
			<aside className="absolute w-[200px] top-0 left-0 h-full border-r border-slate-900/10">
				Moodi
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
