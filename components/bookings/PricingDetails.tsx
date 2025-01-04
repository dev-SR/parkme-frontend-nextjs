'use client';

import { useTotalPrice } from '@/hooks/pricing';
import { Separator } from '../ui/separator';

const PricingDetails = () => {
	const pricing = useTotalPrice({ pricePerHour: 10 });

	return (
		<>
			<Separator />
			<div className='flex flex-col space-y-4'>
				<div className='flex justify-between'>
					<div className='text-sm text-muted-foreground'>Price per hour</div>
					<div className='text-sm '>$10</div>
				</div>
				<Separator />
				<div className='flex justify-between'>
					<div className='text-sm text-muted-foreground'>Parking Charge</div>
					<div className='text-sm '>${pricing.parkingCharge}</div>
				</div>
				<Separator />
				<div className='flex justify-between'>
					<div className='text-sm font-semibold'>Total Pricing</div>
					<div className='text-sm font-semibold '>${pricing.parkingCharge}</div>
				</div>
			</div>
		</>
	);
};

export default PricingDetails;
