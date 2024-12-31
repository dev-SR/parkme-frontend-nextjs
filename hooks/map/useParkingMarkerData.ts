'use client';
import { DistrictGeocodeType } from '@/lib/geo-data/districts';
import { FilterLocationFormSchemaType } from '@/lib/schema';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useWatch } from 'react-hook-form';

const fetchFilteredData = async (filters: FilterLocationFormSchemaType) => {
	const response = await fetch('/api/search', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(filters)
	});
	if (!response.ok) {
		throw new Error('Error fetching data');
	}
	return (await response.json()) as DistrictGeocodeType[];
};

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
			fetchFilteredData({
				vehicleTypes: formData.vehicleTypes!,
				price_per_hour_range: formData.price_per_hour_range!,
				address: {
					label: formData.address?.label,
					mapboxId: formData.address?.mapboxId,
					coordinates: {
						latitude: formData.address?.coordinates?.latitude!,
						longitude: formData.address?.coordinates?.longitude!
					}
				}
			}),
		enabled: !!formData.address?.coordinates?.longitude,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false
	});
};
