import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';

export default async function Home() {
	const { userId } = await auth();

	let href = userId ? '/journal' : '/new-user';

	return (
		<div className="text-white w-screen h-screen bg-slate-900">
			<div className="max-w-[600px] mx-auto w-full h-full flex justify-center items-center flex-col sm:flex-row gap-8">
				<Image
					className="mix-blend-lighten"
					src="/moodi-bg.png"
					width={1024}
					height={1024}
					alt=""
				/>
				<div className="w-full max-w-[600px] mx-auto">
					<h1 className="text-6xl mb-4">AI-Powered Mood Journaling</h1>
					<p className="text-2xl text-white/60 mb-4">
						Go beyond just words. Let Moodi interpret the underlying moods and
						emotions behind each of your entries.
					</p>
					<div>
						<Link href={href}>
							<button className="bg-fuchsia-700 px-4 py-2 rounded-lg text-xl tracking-tighter">
								get started
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
