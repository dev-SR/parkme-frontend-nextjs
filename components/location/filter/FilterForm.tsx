'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

import { useDebounce } from '@uidotdev/usehooks';
import AddressAutoComplete from './AddressAutoComplete';
import VehicleTypeMultiSelect from './VehicleTypeMultiSelect';
import PricePerHourSlider from './PricePerHourSlider';

const fetchFilteredData = async (filters: FormSchemaType) => {
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
	return response.json();
};
const FormSchema = z.object({
	city: z.string(),
	vehicleTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'You have to select at least one item.'
	}),
	start_time: z.date(),
	price_per_hour_range: z.array(z.number())
});
type FormSchemaType = z.infer<typeof FormSchema>;

const FilterForm = () => {
	const form = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			vehicleTypes: ['car'],
			start_time: new Date(),
			price_per_hour_range: [0, 100]
		}
	});

	function onSubmit(data: FormSchemaType) {
		toast(
			<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
				<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
			</pre>
		);
	}
	// Watch form fields for changes
	const vehicleTypes = useWatch({ control: form.control, name: 'vehicleTypes' });
	const watchedStartTime = useWatch({ control: form.control, name: 'start_time' });
	const watchedPriceRange = useWatch({ control: form.control, name: 'price_per_hour_range' });
	const watchedCity = useWatch({ control: form.control, name: 'city' });

	const debouncedVehicleTypes = useDebounce(vehicleTypes, 500);
	const debouncedStartTime = useDebounce(watchedStartTime, 500);
	const debouncedPriceRange = useDebounce(watchedPriceRange, 500);
	const debouncedCity = useDebounce(watchedCity, 500);

	// React Query to fetch data based on filters
	const {
		data: filteredData,
		refetch,
		isFetching
	} = useQuery({
		queryKey: [
			'filteredData',
			debouncedVehicleTypes,
			debouncedStartTime,
			debouncedPriceRange,
			debouncedCity
		],
		/* 
        To refetch data with new parameters in React Query, just include those parameters in the `queryKey`. When the `queryKey` changes—e.g., due to updated client state—React Query will automatically refetch. This eliminates the need for manual triggers or complex effects.
       
        Think of the `queryKey` as a dependency array—React Query refetches whenever it detects a change in the key.

            https://tkdodo.eu/blog/effective-react-query-keys
            https://tkdodo.eu/blog/practical-react-query#treat-the-query-key-like-a-dependency-array
            
        */
		queryFn: () =>
			fetchFilteredData({
				vehicleTypes: vehicleTypes,
				start_time: watchedStartTime,
				price_per_hour_range: watchedPriceRange,
				city: watchedCity
			}),
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
		placeholderData: true
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 flex flex-col '>
				<AddressAutoComplete />
				<VehicleTypeMultiSelect />
				<PricePerHourSlider />
			</form>
		</Form>
	);
};

export default FilterForm;
