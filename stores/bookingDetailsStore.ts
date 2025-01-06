import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type BookingDetails = {
	parkingLotId: string;
	parkingSpotId: string;
	startTime: string;
	endTime: string;
	vehicleType: string;
	pricePerHour: number;
	totalPrice: number;
	duration: number;
	parkingAddress: string;
};

type BookingDetailsStore = {
	bookingDetails: BookingDetails | null;
	setBookingDetails: (details: BookingDetails) => void;
	clearBookingDetails: () => void;
};

export const useBookingDetailsStore = create(
	devtools(
		immer<BookingDetailsStore>((set) => ({
			bookingDetails: null,
			setBookingDetails: (details) =>
				set(() => ({
					bookingDetails: details
				})),
			clearBookingDetails: () =>
				set(() => ({
					bookingDetails: null
				}))
		}))
	)
);
