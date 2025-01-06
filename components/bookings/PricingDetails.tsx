'use client';

import { useTotalPrice } from '@/hooks/pricing';
import { Separator } from '../ui/separator';
import { useParkingStore } from '@/stores/bookingStore';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { BookingsFormSchemaType } from '@/lib/schema';

const PricingDetails = () => {
	const { getSelectedPricePerHour } = useParkingStore(); // Access the store function
	const pricePerHour = getSelectedPricePerHour(); // Get the selected price per hour
	// Use a custom hook or logic to calculate pricing details
	const form = useFormContext<BookingsFormSchemaType>();
	const { parkingCharge, totalPrice, duration } = useTotalPrice({ pricePerHour });
	useEffect(() => {
		form.setValue('totalPrice', parkingCharge);
		form.setValue('pricePerHour', pricePerHour);
		form.setValue('duration', duration);
	}, [pricePerHour, parkingCharge, duration]);

	return (
		<>
			<Separator />
			<div className='flex flex-col space-y-4'>
				<div className='flex justify-between'>
					<div className='text-sm text-muted-foreground'>Price per hour</div>
					<div className='text-sm '>৳{pricePerHour}</div>
				</div>
				<Separator />
				<div className='flex justify-between'>
					<div className='text-sm text-muted-foreground'>Parking Charge</div>
					<div className='text-sm '>৳{parkingCharge}</div>
				</div>
				<Separator />
				<div className='flex justify-between'>
					<div className='text-sm font-semibold'>Total Pricing</div>
					<div className='text-sm font-semibold '>৳{totalPrice}</div>
				</div>
			</div>
		</>
	);
};

export default PricingDetails;
