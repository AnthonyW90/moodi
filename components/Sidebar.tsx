'use client';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/journal', label: 'Journal' },
	{ href: '/history', label: 'History' },
];

const SidebarLinks = () => {
	return (
		<>
			<div className="text-3xl font-bold text-center my-4">Moodi</div>
			<ul>
				{links.map(({ href, label }) => (
					<li key={label} className="px-2 py-6 text-xl">
						<Link href={href}>{label}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

type SidebarProps = {
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	return (
		<>
			{/* mobile sidebar */}
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog as="div" onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-900/80" />
					</Transition.Child>
					<div className="fixed inset-0 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute left-full top-0 flex w-16 justify-center pt-5">
										<button
											type="button"
											className="-m-2.5 p-2.5"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<XMarkIcon
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</button>
									</div>
								</Transition.Child>
								<aside className="absolute w-[200px] top-0 left-0 h-full bg-white">
									<SidebarLinks />
								</aside>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			{/* desktop sidebar */}
			<aside className="hidden md:block absolute w-[200px] top-0 left-0 h-full border-r border-slate-900/10">
				<SidebarLinks />
			</aside>
		</>
	);
};

export default Sidebar;
