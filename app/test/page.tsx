'use client';

import ImagePreviews from '@/components/bookings/ImagePreviews';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import BookingFormProvider from '@/components/bookings/BookingFormProvider';
import { DateRangeBookingInfo } from '@/components/bookings/DateRangeBookingInfo';
import ParkingSpotChooser from '@/components/bookings/ParkingSpotChooser';
import VehicleTypeRadioSelect from '@/components/bookings/VehicleTypeRadioSelect';
import PricingDetails from '@/components/bookings/PricingDetails';
import DumpFromData from '@/components/bookings/DumpFromData';

const TestModal = () => {
	return (
		<Dialog open>
			<DialogTrigger>Open Dialog</DialogTrigger>
			<DialogContent
				className={
					'max-h-[calc(100dvh-2rem)] max-w-screen-sm md:max-w-screen-md overflow-y-auto overflow-x-hidden'
				}>
				<DialogHeader className='flex flex-col items-start'>
					<DialogTitle className='text-2xl'>Booking</DialogTitle>
					<DialogDescription>
						cluster.properties?.name - cluster.properties?.address
					</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col gap-4'>
					<BookingFormProvider
						defaultValues={{
							startTime: new Date(),
							endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
							parkingLotId: '0ADA6BC9-6665-49B2-A427-5AD008B51FDA'
						}}>
						<div className='flex flex-col items-center'>
							<ImagePreviews />
						</div>

						<VehicleTypeRadioSelect />
						<ParkingSpotChooser />
						<DateRangeBookingInfo />

						{/* <PhoneNumberInput />
						<VehicleNumberPalateInput />
						*/}
						<PricingDetails />
						<DumpFromData />
						<Button type='submit' className='w-full'>
							Book Now
						</Button>
					</BookingFormProvider>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TestModal;
