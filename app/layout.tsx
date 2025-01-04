import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';

import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/providers/react-query';
import ToasterWithTheme from '@/components/ui/extended/ToasterTheme';

const font = Inter({
	weight: '400',
	subsets: ['latin'],
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'ParkMe',
	description:
		'Make your life easier with ParkMe. Find parking spots quickly and efficiently. Our app helps you locate available parking spaces in real-time, saving you time and reducing stress.'
};
const HEADER_HEIGHT = '4rem';

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={font.className}>
			<body
				className='overflow-hidden'
				style={
					{
						'--header-height': HEADER_HEIGHT
					} as React.CSSProperties
				}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<ToasterWithTheme />
					<ReactQueryProvider>{children}</ReactQueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
