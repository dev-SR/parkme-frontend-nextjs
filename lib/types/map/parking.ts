export type ParkingSpacesRequestBody = {
	parkingLotId: string;
	startDate: string;
	endDate: string;
};

export type ParkingSpaces = {
	id: string;
	sectionName: string;
	spotNumber: number;
	vehicleType: string;
	pricePerHour: number;
	isBooked: boolean;
};

export type ParkingSpacesResponse = ParkingSpaces[];
