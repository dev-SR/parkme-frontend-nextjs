import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';

import { Roboto } from 'next/font/google';
import NavBar from '@/components/Nav/NavBar';

const roboto = Roboto({
	weight: '400',
	subsets: ['latin'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'ParkMe',
	description:
		'Make your life easier with ParkMe. Find parking spots quickly and efficiently. Our app helps you locate available parking spaces in real-time, saving you time and reducing stress.'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={roboto.className}>
			<body>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<NavBar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
