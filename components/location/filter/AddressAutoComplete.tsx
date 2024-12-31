'use client';
import { useFormContext, useWatch } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { CommandLoading, Command as CommandPrimitive } from 'cmdk';

import { Check } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { Command, CommandEmpty, CommandGroup, CommandList } from '@/components/ui/command';
import { useCallback, useState } from 'react';
import { FilterLocationFormSchemaType } from '@/lib/schema';
import { LuMapPin } from 'react-icons/lu';
import { Spinner } from '@/components/ui/extended/Spinner';
import mapApi from '@/lib/mapboxApi';
import { toast } from 'sonner';
import { SearchBoxSuggestions } from '@/lib/types/map/search';
import { useMap } from 'react-map-gl';

const AddressAutoComplete = () => {
	const form = useFormContext<FilterLocationFormSchemaType>();
	const formData = useWatch<FilterLocationFormSchemaType>();

	const [searchInput, setSearchInput] = useState('');
	const debouncedSearchInput = useDebounce(searchInput, 1000);
	const [allowedToFetch, setAllowedToFetch] = useState(true); // to prevent fetching after item is selected
	const [retrievingGeoCode, setRetrievingGeoCode] = useState(''); // prevent fetching after item is selected

	const fetchedData = useQuery({
		queryKey: ['address', allowedToFetch, debouncedSearchInput],
		queryFn: () => mapApi.Search.getSuggestions(debouncedSearchInput),
		enabled: allowedToFetch && !!debouncedSearchInput,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false
	});
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const mapRef = useMap();

	const handleOnSelect = async (loc: SearchBoxSuggestions) => {
		setRetrievingGeoCode(loc.mapbox_id);

		try {
			const geocode = await mapApi.Search.retrieveGeocode(loc.mapbox_id);
			form.setValue('address', {
				label: loc.name,
				mapboxId: loc.mapbox_id,
				coordinates: {
					latitude: geocode.latitude,
					longitude: geocode.longitude
				}
			});

			mapRef.current?.easeTo({
				center: [geocode.longitude, geocode.latitude],
				zoom: 13,
				duration: 0.2,
				animate: true
			});
		} catch (error) {
			toast.error('An unexpected error occurred. Please try again later');
		}
		setRetrievingGeoCode('');

		setAllowedToFetch(false); //stop fetching after item is selected
		setSearchInput(loc.name);
	};

	return (
		<Command
			className='overflow-visible'
			shouldFilter={false} // MUST
		>
			<div className='flex w-full items-center justify-between rounded border bg-card ring-offset-background text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
				<span className='pl-3'>
					<LuMapPin className='size-4' />
				</span>
				<CommandPrimitive.Input
					value={searchInput}
					onValueChange={(value) => {
						setAllowedToFetch(true);
						setSearchInput(value);
					}}
					onBlur={close}
					onFocus={open}
					placeholder={'Enter address'}
					className='w-full p-3 outline-none bg-transparent pl-3 '
				/>
			</div>
			{isOpen ? (
				<div className='relative animate-in fade-in-0 zoom-in-95 h-auto'>
					<CommandList>
						{fetchedData.isFetching && (
							<div className='absolute top-1.5 z-50 w-full'>
								<CommandLoading className='sticky'>
									<div className='h-28 flex items-center justify-center bg-background'>
										<Spinner size='medium' />
									</div>
								</CommandLoading>
							</div>
						)}{' '}
						{!fetchedData.isFetching && fetchedData.data?.length === 0 && (
							<div className='absolute top-1.5 z-50 w-full'>
								<CommandEmpty className='bg-background'>
									<div className='py-4 flex items-center justify-center text-foreground'>
										{searchInput === '' ? 'Please enter an address' : 'No address found'}
									</div>
								</CommandEmpty>
							</div>
						)}
						{fetchedData.data && (
							<div className='absolute top-1.5 z-50 w-full'>
								<CommandGroup className='relative h-auto z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md bg-background'>
									{fetchedData.data?.map((loc) => (
										<CommandPrimitive.Item
											className='flex select-text flex-col cursor-pointer gap-0.5 h-max p-2 px-3 rounded-md aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent  items-start'
											value={loc.mapbox_id}
											key={loc.mapbox_id}
											onSelect={() => {
												handleOnSelect(loc);
											}}
											onMouseDown={(e) => e.preventDefault()}>
											<div className='flex justify-between w-full'>
												<div>
													{retrievingGeoCode && loc.mapbox_id === retrievingGeoCode && (
														<Spinner size='small' className='mr-2' />
													)}
												</div>
												<div className='flex flex-col flex-1 '>
													<p className='font-semibold text-xs'>{loc.name}</p>
													<p className='text-xs text-muted-foreground'>{loc.place_formatted}</p>
												</div>
												<Check
													className={cn(
														'ml-auto',
														loc.mapbox_id === formData.address?.mapboxId
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
											</div>
										</CommandPrimitive.Item>
									))}
								</CommandGroup>
							</div>
						)}
					</CommandList>
				</div>
			) : (
				<div />
			)}
		</Command>
	);
};

export default AddressAutoComplete;
