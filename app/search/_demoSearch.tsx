'use client';
import { FaCar, FaMotorcycle, FaTruck, FaBus, FaBicycle } from 'react-icons/fa';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { DateTimePicker } from '@/components/ui/extended/datetime-picker';
import { DualRangeSlider } from '@/components/ui/extended/DualRangeSlider';
import { useQuery } from '@tanstack/react-query';
import { Command as CommandPrimitive } from 'cmdk';
import { FiMapPin } from 'react-icons/fi'; // Importing the address icon

import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command';
import { useCallback, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/extended/loading-spinner';

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

const SearchMapDemo = () => {
	const form = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			vehicleTypes: [],
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
		<main className='w-screen p-20'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 flex flex-col mx-auto w-1/2'>
					<SmartDateTimeForm />
					<PricePerHourForm />
					<MultiSelectorCheckBox />
					<MultiSelectorCustom />
					<CityCombobox />
					<Button type='submit' disabled={!form.formState.isValid}>
						Submit
					</Button>
				</form>
			</Form>
		</main>
	);
};

const vehicleType = [
	{
		key: 'car',
		label: 'Car',
		icon: <FaCar className='size-10' />
	},
	{
		key: 'motorcycle',
		label: 'Motorcycle',
		icon: <FaMotorcycle className='size-10' />
	},
	{
		key: 'truck',
		label: 'Truck',
		icon: <FaTruck className='size-10' />
	},
	{
		key: 'bus',
		label: 'Bus',
		icon: <FaBus className='size-10' />
	},
	{
		key: 'bicycle',
		label: 'Bicycle',
		icon: <FaBicycle className='size-10' />
	}
];
const cities = [
	{ label: 'Dhaka', value: 'dhaka' },
	{ label: 'Chittagong', value: 'chittagong' },
	{ label: 'Khulna', value: 'khulna' },
	{ label: 'Rajshahi', value: 'rajshahi' }
] as const;
const MultiSelectorCheckBox = () => {
	const form = useFormContext<FormSchemaType>();
	// const watched = useWatch({
	// 	// control: form.control, //control is optional as we are inside form context
	// 	name: 'vehicleTypes'
	// });
	// console.log(watched);
	return (
		<FormField
			control={form.control}
			name='vehicleTypes'
			render={() => (
				<FormItem>
					<div className='mb-4'>
						<FormLabel className='text-base'>Select Vehicle Type</FormLabel>
						<FormDescription>Select vehicle types you want to filter</FormDescription>
					</div>
					{vehicleType.map((item) => (
						<FormField
							key={item.key}
							control={form.control}
							name='vehicleTypes'
							render={({ field }) => {
								return (
									<FormItem
										key={item.key}
										className='flex flex-row vehicleTypes-start space-x-3 space-y-0'>
										<FormControl>
											<Checkbox
												checked={field.value?.includes(item.key)}
												onCheckedChange={(checked) => {
													console.log([...field.value, item.key]);

													return checked
														? field.onChange([...field.value, item.key])
														: field.onChange(field.value?.filter((value) => value !== item.key));
												}}
											/>
										</FormControl>
										<FormLabel className='text-sm font-normal'>{item.label}</FormLabel>
									</FormItem>
								);
							}}
						/>
					))}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
const MultiSelectorCustom = () => {
	const form = useFormContext<FormSchemaType>();
	// const watched = useWatch({
	// 	// control: form.control, //control is optional as we are inside form context
	// 	name: 'vehicleTypes'
	// });
	// console.log(watched);
	return (
		<FormField
			control={form.control}
			name='vehicleTypes'
			render={() => (
				<FormItem>
					<div className='mb-4'>
						<FormLabel className='text-base'>Select Vehicle Type</FormLabel>
						<FormDescription>Select vehicle types you want to filter</FormDescription>
					</div>
					<div className='flex flex-row vehicleTypes-start'>
						{vehicleType.map((item) => (
							<FormField
								key={item.key}
								control={form.control}
								name='vehicleTypes'
								render={({ field }) => {
									return (
										<Card
											key={item.key}
											className={cn(
												'text-primary border-2 rounded-none cursor-pointer hover:bg-primary-foreground p-0',
												field.value?.includes(item.key) && ' border-primary'
											)}
											onClick={() => {
												const newItems = field.value?.includes(item.key)
													? field.value?.filter((value) => value !== item.key)
													: [...field.value, item.key];
												field.onChange(newItems);
											}}>
											<CardContent className='p-2'>{item.icon}</CardContent>
										</Card>
									);
								}}
							/>
						))}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

const SmartDateTimeForm = () => {
	const form = useFormContext<FormSchemaType>();
	return (
		<FormField
			control={form.control}
			name='start_time'
			render={({ field }) => (
				<FormItem className='flex w-72 flex-col gap-2'>
					<FormLabel htmlFor='datetime'>Date time</FormLabel>
					<FormControl>
						{/* https://shadcnui-expansions.typeart.cc/docs/dual-range-slider */}
						<DateTimePicker hourCycle={12} value={field.value} onChange={field.onChange} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

const PricePerHourForm = () => {
	const form = useFormContext<FormSchemaType>();
	return (
		<FormField
			control={form.control}
			name='price_per_hour_range'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Price per hour</FormLabel>
					<FormControl>
						<div className='pt-6'>
							{/* https://shadcnui-expansions.typeart.cc/docs/datetime-picker */}
							<DualRangeSlider
								label={(value) => value}
								value={field.value}
								onValueChange={field.onChange}
								min={0}
								max={100}
								step={1}
							/>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

const fetchCities = async (searchInput: string) => {
	const response = await fetch(`/api/mock-address?searchInput=${searchInput}`);
	return response.json();
};

const CityCombobox = () => {
	const form = useFormContext<FormSchemaType>();
	const [searchInput, setSearchInput] = useState('');
	const debouncedSearchInput = useDebounce(searchInput, 500);
	const [data, setData] = useState(cities);

	const fetchedData = useQuery({
		queryKey: ['cities', debouncedSearchInput],
		queryFn: () => fetchCities(debouncedSearchInput),
		enabled: !!debouncedSearchInput
	});
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Escape') {
			close();
		}
	};

	return (
		<FormField
			control={form.control}
			name='city'
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<FormLabel>Language</FormLabel>
					<Command className='overflow-visible'>
						<div className='flex w-full items-center justify-between rounded-lg border bg-background ring-offset-background text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
							<span className='pl-3'>
								<FiMapPin className='text-gray-500' size={20} /> {/* Icon for address */}
							</span>
							<CommandPrimitive.Input
								value={searchInput}
								onValueChange={setSearchInput}
								onBlur={close}
								onFocus={open}
								placeholder={'Enter address'}
								className='w-full p-3 rounded-lg outline-none bg-transparent pl-3 text-gray-800 placeholder-gray-400'
							/>
						</div>
						{isOpen && (
							<div className='relative animate-in fade-in-0 zoom-in-95 h-auto'>
								<CommandList>
									<div className='absolute top-1.5 z-50 w-full'>
										<CommandGroup className='relative h-auto z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md bg-background'>
											{fetchedData.isLoading ? (
												<div className='h-28 flex items-center justify-center'>
													<LoadingSpinner />
												</div>
											) : (
												<>
													{data.map((city) => (
														<CommandPrimitive.Item
															className='flex select-text flex-col cursor-pointer gap-0.5 h-max p-2 px-3 rounded-md aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground items-start'
															value={city.label}
															key={city.value}
															onSelect={() => {
																setSearchInput(city.label);
																form.setValue('city', city.value);
															}}
															onMouseDown={(e) => e.preventDefault()}>
															<div className='flex justify-between w-full'>
																{city.label}
																<Check
																	className={cn(
																		'ml-auto',
																		city.value === field.value ? 'opacity-100' : 'opacity-0'
																	)}
																/>
															</div>
														</CommandPrimitive.Item>
													))}
												</>
											)}

											<CommandEmpty>
												{/* {!fetchedData.isLoading && data.length === 0 && (
													<div className='py-4 flex items-center justify-center'>
														{searchInput === '' ? 'Please enter an address' : 'No address found'}
													</div>
												)} */}
											</CommandEmpty>
										</CommandGroup>
									</div>
								</CommandList>
							</div>
						)}
					</Command>

					<FormDescription>
						{fetchedData.isLoading && (
							<div className='flex items-center space-x-3'>
								<span>
									<LoadingSpinner className='size-4' />
								</span>
								<span>Wait till an address appears...</span>
							</div>
						)}
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default SearchMapDemo;
