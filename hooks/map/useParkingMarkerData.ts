'use client';
import api from '@/lib/axiosApi';
import { DistrictGeocodeType } from '@/lib/geo-data/districts';
import { FilterLocationFormSchemaType } from '@/lib/schema';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useWatch } from 'react-hook-form';

// const fetchFilteredData = async (filters: FilterLocationFormSchemaType) => {
// 	const response = await fetch('/api/search', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(filters)
// 	});
// 	if (!response.ok) {
// 		throw new Error('Error fetching data');
// 	}
// 	return (await response.json()) as DistrictGeocodeType[];
// };

export const useParkingMarkerData = () => {
	const formData = useWatch<FilterLocationFormSchemaType>();
	const debouncedFormData = useDebounce(formData, 500);

	return useQuery({
		queryKey: ['filteredData', debouncedFormData],
		/* 
        To refetch data with new parameters in React Query, just include those parameters in the `queryKey`. When the `queryKey` changes—e.g., due to updated client state—React Query will automatically refetch. This eliminates the need for manual triggers or complex effects.
       
        Think of the `queryKey` as a dependency array—React Query refetches whenever it detects a change in the key.

            https://tkdodo.eu/blog/effective-react-query-keys
            https://tkdodo.eu/blog/practical-react-query#treat-the-query-key-like-a-dependency-array
            
        */
		queryFn: () =>
			api.ParkingLots.getNearbyParkingLots({
				vehicleTypes: formData.vehicleTypes!,
				pricePerHourRange: formData.price_per_hour_range!,
				bounds: {
					neLat: formData.bounds?.ne_lat!,
					neLng: formData.bounds?.ne_lng!,
					swLat: formData.bounds?.sw_lat!,
					swLng: formData.bounds?.sw_lng!
				}
			}),
		enabled: !!formData.bounds,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
		retry: 0
	});
};
