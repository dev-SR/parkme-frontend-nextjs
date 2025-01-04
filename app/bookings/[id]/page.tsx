'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';

const BookingStep = () => {
	const pathname = usePathname();
	const { id } = useParams();
	const searchParams = useSearchParams();
	const section = searchParams.get('section') || '';
	const spotNo = searchParams.get('spotNo') || '';
	const startTime = searchParams.get('startTime') || '';
	const endTime = searchParams.get('endTime') || '';
	const vehicleType = searchParams.get('vehicleType') || '';

	return (
		<div className=''>
			<p>parking_lot ID: {id}</p>
			<p>Section: {section}</p>
			<p>Spot No: {spotNo}</p>
			<p>Start Time: {startTime}</p>
			<p>End Time: {endTime}</p>
			<p>Vehicle Type: {vehicleType}</p>
		</div>
	);
};

export default BookingStep;
