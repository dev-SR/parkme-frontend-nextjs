'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { BsCheck2Circle } from 'react-icons/bs';

const CheckoutResult = () => {
	const searchParams = useSearchParams();
	const session_id = searchParams.get('session_id');

	return (
		<div className='flex justify-center mt-10'>
			<Card className='shadow-lg'>
				<CardHeader className='text-center space-y-4'>
					<CardTitle className=' flex flex-col space-y-4 items-center justify-center'>
						<BsCheck2Circle className='size-8 text-green-600' />
						<span className='font-bold text-xl'>Thank you 👌</span>
					</CardTitle>
					<CardDescription className='text-2xl font-bold flex-shrink-0'>
						You booking has been successfully completed
					</CardDescription>
				</CardHeader>
				{/* <CardContent className='space-y-4'>
					<div className='text-center'>Here's your booking details:</div>
					<div className='px-20'>
						<div className='flex justify-between gap-4'>
							<div className='font-semibold'>Address</div>
							<div>Kushtia</div>
						</div>
					</div>
				</CardContent> */}
			</Card>
		</div>
	);
};

export default CheckoutResult;
