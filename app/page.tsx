import Header from '@/components/app-heading';
import { BottomEffects, TopEffects } from '@/components/ui/extended/Effects';

import GoToSearchButton from '@/components/ui/extended/GoToSearchButton';

export default async function Home() {
	return (
		<>
			{/* <NavigationHelperPage currentPage='/' /> */}
			<div>
				<div className='relative isolate'>
					<Header />
					<TopEffects />
					<div className='mx-auto max-w-3xl py-16 sm:py-24 lg:py-30 '>
						<div className='hidden sm:mb-8 sm:flex sm:justify-center rollin-animation'>
							<div className='relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-foreground/30 hover:ring-foreground'>
								Announcing our next round of features.{' '}
								<a href='#' className='font-semibold text-primary'>
									<span className='absolute inset-0' aria-hidden='true' />
									Read more <span aria-hidden='true'>&rarr;</span>
								</a>
							</div>
						</div>
						<div className='text-center'>
							<h1 className='text-4xl font-bold tracking-tight max-w-2xl mx-auto sm:text-6xl focus-animation '>
								Seamless Parking, Stress-Free Life
							</h1>
							<p className='mt-6 text-lg leading-8 text-muted-foreground rollin-animation'>
								Make your life easier with ParkMe. Find parking spots quickly and efficiently. Our
								service helps you locate available parking spaces in real-time, saving you time and
								reducing stress.
							</p>
							<div className='mt-10 flex items-center justify-center gap-x-6 focus-animation '>
								<GoToSearchButton />
								<a href='#' className='text-lg font-semibold leading-6'>
									Learn more <span aria-hidden='true'>→</span>
								</a>
							</div>
						</div>
					</div>
					<BottomEffects />
				</div>
			</div>
		</>
	);
}
