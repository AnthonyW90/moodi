import { prisma } from '@/utils/db';
import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const validateUser = async () => {
	const user = await currentUser();

	if (!user) return;

	const foundUser = await prisma.user.findUnique({
		where: {
			clerkId: user.id,
		},
	});

	if (!foundUser) {
		await prisma.user.create({
			data: {
				clerkId: user.id,
				email: user.emailAddresses[0].emailAddress,
			},
		});
	}

	redirect('/journal');
};

const NewUserPage = async () => {
	await validateUser();
	return <div>Loading...</div>;
};

export default NewUserPage;
