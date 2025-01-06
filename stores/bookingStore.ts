import { ParkingSpaces } from '@/lib/types/map/parking';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

export type ParkingSpotSelection = {
	selected: boolean;
	ofSelectedVehicleType: boolean;
} & ParkingSpaces;

export type Section = {
	name: string;
	spots: ParkingSpotSelection[];
};

export type ParkingStore = {
	sections: Section[];
	setSections: (sections: Section[]) => void;
	toggleSelection: (sectionIndex: number, spotId: string) => void;
	updateVehicleType: (vehicleType: string) => void;
	getSelectedPricePerHour: () => number;
	getUniqueVehicleTypes: () => string[];
};

export const useParkingStore = create(
	devtools(
		immer<ParkingStore>((set, get) => ({
			sections: [],
			setSections: (sections) => {
				set((state) => {
					state.sections = sections;
				});
			},
			toggleSelection: (sectionIndex, spotId) => {
				set((state) => {
					state.sections = state.sections.map((section, sIndex) => {
						if (sIndex === sectionIndex) {
							return {
								...section,
								spots: section.spots.map((spot) => ({
									...spot,
									selected: spot.id === spotId && !spot.isBooked ? true : false
								}))
							};
						}
						return {
							...section,
							spots: section.spots.map((spot) => ({
								...spot,
								selected: false
							}))
						};
					});
				});
			},
			updateVehicleType: (vehicleType) => {
				set((state) => {
					state.sections = state.sections.map((section) => ({
						...section,
						spots: section.spots.map((spot) => ({
							...spot,
							ofSelectedVehicleType: spot.vehicleType === vehicleType
						}))
					}));
				});
			},

			getUniqueVehicleTypes: () => {
				const sections = get().sections;
				const vehicleTypes = new Set<string>();
				sections.forEach((section) => {
					section.spots.forEach((spot) => {
						vehicleTypes.add(spot.vehicleType);
					});
				});
				return Array.from(vehicleTypes);
			},
			getSelectedPricePerHour: () => {
				const sections = get().sections;
				for (const section of sections) {
					for (const spot of section.spots) {
						if (spot.selected) {
							return spot.pricePerHour;
						}
					}
				}
				return 0; // Return null if no spot is selected
			}
		}))
	)
);
