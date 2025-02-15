'use client';
import { useFormContext, useWatch } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { BookingsFormSchemaType } from '@/lib/schema';
import { differenceInTime } from '@/lib/date-utils';

export type TotalPriceType = {
	pricePerHour?: number;
};

export const useTotalPrice = ({ pricePerHour }: TotalPriceType) => {
	const { startTime, endTime } = useWatch<BookingsFormSchemaType>();

	const [parkingCharge, setParkingCharge] = useState(0);
	const [duration, setDuration] = useState(0);
	// // const [valetChargePickup, setValetChargePickup] = useState(0);
	// // const [valetChargeDropoff, setValetChargeDropoff] = useState(0);
	useEffect(() => {
		if (!startTime || !endTime) return;

		if (pricePerHour === 0 || !pricePerHour) {
			setParkingCharge(0);
			return;
		}

		const differenceInMilliseconds = differenceInTime({
			startTime: new Date(startTime),
			endTime: new Date(endTime)
		});

		if (differenceInMilliseconds < 0) {
			setParkingCharge(0);
			return;
		}

		const differenceInHours = differenceInMilliseconds / (60 * 60 * 1000);
		setDuration(differenceInHours);

		const charge = Math.floor((pricePerHour || 0) * differenceInHours);
		setParkingCharge(charge);
	}, [pricePerHour, startTime, endTime]);

	return {
		parkingCharge,
		totalPrice: parkingCharge,
		duration
	};
};
