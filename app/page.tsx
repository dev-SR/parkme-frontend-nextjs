import Header from '@/components/app-heading';
import NavigationHelperPage from '@/components/NavigationHelperPage';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const navigation = [
	{ name: 'Product', href: '#' },
	{ name: 'Features', href: '#' },
	{ name: 'Marketplace', href: '#' },
	{ name: 'Company', href: '#' }
];

export default async function Home() {
	return (
		<>
			{/* <NavigationHelperPage currentPage='/' /> */}
			<div>
				<div className='relative isolate'>
					<Header />
					<div
						className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
						aria-hidden='true'>
						<div
							className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ff82] to-[#09c990] dark:from-[#039b05] dark:to-[#065f10] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]'
							style={{
								clipPath:
									'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
							}}
						/>
					</div>
					<div className='mx-auto max-w-3xl py-16 sm:py-24 lg:py-30'>
						<div className='hidden sm:mb-8 sm:flex sm:justify-center'>
							<div className='relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-foreground/30 hover:ring-foreground'>
								Announcing our next round of features.{' '}
								<a href='#' className='font-semibold text-primary'>
									<span className='absolute inset-0' aria-hidden='true' />
									Read more <span aria-hidden='true'>&rarr;</span>
								</a>
							</div>
						</div>
						<div className='text-center'>
							<h1 className='text-4xl font-bold tracking-tight max-w-2xl mx-auto sm:text-6xl'>
								Seamless Parking, Stress-Free Life
							</h1>
							<p className='mt-6 text-lg leading-8 text-muted-foreground'>
								Make your life easier with ParkMe. Find parking spots quickly and efficiently. Our
								service helps you locate available parking spaces in real-time, saving you time and
								reducing stress.
							</p>
							<div className='mt-10 flex items-center justify-center gap-x-6'>
								<Link href='/search'>
									<Button size={'lg'} className='rounded-full'>
										<span className='text-lg font-semibold leading-6'>Find spots nearby</span>
									</Button>
								</Link>
								<a href='#' className='text-lg font-semibold leading-6'>
									Learn more <span aria-hidden='true'>→</span>
								</a>
							</div>
						</div>
					</div>
					<div
						className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-35rem)]'
						aria-hidden='true'>
						<div
							className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#b9ff80] to-[#93fc89] dark:from-[#027634] dark:to-[#0b8944] opacity-30 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]'
							style={{
								clipPath:
									'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
