'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const BookingStep = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const { id: parkingLotId } = useParams();
	const parkingSpotId = searchParams.get('spotId') || '';
	const startTime = searchParams.get('startTime') || '';
	const endTime = searchParams.get('endTime') || '';
	const vehicleType = searchParams.get('vehicleType') || '';

	if (!parkingSpotId || !startTime || !endTime || !vehicleType) {
		toast.error('Missing required parameters');
		router.push('/bookings');
	}

	return (
		<div className=''>
			<p>parkingLotId: {parkingLotId}</p>
			<p>parkingSpotId: {parkingSpotId}</p>
			<p>Start Time: {startTime}</p>
			<p>End Time: {endTime}</p>
			<p>Vehicle Type: {vehicleType}</p>
		</div>
	);
};

export default BookingStep;
