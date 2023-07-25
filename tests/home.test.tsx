import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../app/page';

vi.mock('@clerk/nextjs', () => {
	const mockedFunctions = {
		auth: () =>
			new Promise((resolve) =>
				resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
			),
		ClerkProvider: ({ children }) => <div>{children}</div>,
		useUser: () => ({
			id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
			fullName: 'John Doe',
		}),
	};

	return mockedFunctions;
});

vi.mock('next/font/google', () => {
	return {
		Inter: () => ({ className: 'inter' }),
	};
});

test('Home page', async () => {
	render(await HomePage());
	expect(screen.getByText('AI-Powered Mood Journaling')).toBeTruthy();
});
