'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

import { BookingsFormSchemaType, BookingsFormSchema } from '@/lib/schema';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useBookingDetailsStore } from '@/stores/bookingDetailsStore';
import { Button } from '../ui/button';

const BookingFormProvider = ({
	children,
	defaultValues
}: {
	children: ReactNode;
	defaultValues?: Partial<BookingsFormSchemaType>;
}) => {
	const form = useForm<BookingsFormSchemaType>({
		resolver: zodResolver(BookingsFormSchema),
		defaultValues: {
			...defaultValues,
			vehicleType: 'CAR'
		},
		mode: 'onChange'
	});
	const router = useRouter();
	const { setBookingDetails } = useBookingDetailsStore();

	function onSubmit(data: BookingsFormSchemaType) {
		const {
			parkingLotId,
			parkingSpotId,
			startTime,
			endTime,
			vehicleType,
			totalPrice,
			duration,
			pricePerHour,
			parkingAddress
		} = data;

		setBookingDetails({
			parkingLotId,
			parkingSpotId,
			vehicleType,
			startTime: startTime.toISOString(),
			endTime: endTime.toISOString(),
			duration: duration || 0,
			totalPrice: totalPrice || 0,
			pricePerHour: pricePerHour || 0,
			parkingAddress: parkingAddress || ''
		});

		router.push(`/bookings/${parkingLotId}`);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				{children}
				<Button type='submit' className='w-full' disabled={!form.formState.isValid}>
					Book Now
				</Button>
			</form>
		</Form>
	);
};

export default BookingFormProvider;
