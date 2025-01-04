'use client';
import { differenceInTime, getTimeUnits } from '@/lib/date-utils';
import { BookingsFormSchemaType } from '@/lib/schema';
import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { PiArrowCircleRightFill } from 'react-icons/pi';
import { EndDateTimeForm, StartDateTimeForm } from './BookingDateTime';
export interface IDateRangeBookingInfoProps {
	startTime?: string;
	endTime?: string;
}

export const DateRangeBookingInfo = () => {
	const [duration, setDuration] = useState<string | null>(null);
	const formData = useWatch<BookingsFormSchemaType>();
	const { startTime, endTime } = formData;

	useEffect(() => {
		if (!startTime || !endTime) return;
		const differenceInMilliseconds = differenceInTime({
			startTime,
			endTime
		});

		if (differenceInMilliseconds < 0) {
			setDuration('Invalid date range');
			return;
		}

		setDuration(getTimeUnits(differenceInMilliseconds).timeString);
	}, [startTime, endTime]);

	if (!startTime || !endTime) return null;

	return (
		<>
			<div className='flex items-center justify-between gap-2 my-4'>
				<StartDateTimeForm />
				<div className='flex flex-col items-center space-y-2'>
					<PiArrowCircleRightFill className='text-muted-foreground size-4' />
					<div className='-mt-1 text-xs text-center text-muted-foreground'>
						{duration ? duration : 'Select date'}
					</div>
				</div>
				<EndDateTimeForm />
			</div>
		</>
	);
};
