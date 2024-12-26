'use client';
import { Toaster } from '@/components/ui/sonner';
import { useTheme } from 'next-themes';

const ToasterWithTheme = () => {
	const { theme } = useTheme();

	return (
		<Toaster richColors closeButton expand={false} theme={theme === 'dark' ? 'dark' : 'light'} />
	);
};

export default ToasterWithTheme;
