'use client';
import Link from 'next/link';
import { FaSquareParking } from 'react-icons/fa6';
import { ToggleThemeMode } from './ui/extended/ToggleThemeMode';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import useSession from '@/hooks/useSession';
import { Spinner } from './ui/extended/Spinner';

const navigation = [
	{ name: 'Features', href: '#' },
	{ name: 'Pricing', href: '#' },
	{ name: 'Blog', href: '#' },
	{ name: 'About', href: '#' }
];

const Header = () => {
	const pathname = usePathname();
	const { user, isUserFetching, logout, isLoggingOut } = useSession();

	const handleSignOut = () => {
		logout();
	};

	return (
		<header
			className={cn(
				'flex h-[--header-height] shrink-0 items-center gap-2 px-4',
				pathname !== '/' && 'border-b'
			)}>
			<Link href='/' className='flex items-center gap-2 self-center font-medium'>
				<FaSquareParking className='size-8 text-primary' />
				<span className='font-bold text-lg text-foreground/70'>ParkMe Inc.</span>
			</Link>
			<div className='ml-6 grow flex items-center justify-center'>
				<div className='hidden md:flex items-center sm:gap-4 md:gap-6 lg:gap-12'>
					{pathname === '/' &&
						navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className='text-sm font-semibold leading-6 text-foreground/60'>
								{item.name}
							</Link>
						))}
				</div>
			</div>
			<div className='flex items-center gap-2'>
				{user ? (
					<div className='flex items-center gap-4'>
						<span className='text-sm font-medium text-foreground/70'>
							Welcome, {user.firstName} {user.lastName}
						</span>
						<Button size='sm' onClick={handleSignOut}>
							{isLoggingOut && <Spinner />}
							Log Out
						</Button>
					</div>
				) : (
					<Link href={'/auth/login'}>
						<Button size='sm'>Login</Button>
					</Link>
				)}
				<ToggleThemeMode />
			</div>
		</header>
	);
};

export default Header;
