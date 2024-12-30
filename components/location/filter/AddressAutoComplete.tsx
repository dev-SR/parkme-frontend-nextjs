'use client';
import { useFormContext } from 'react-hook-form';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { CommandLoading, Command as CommandPrimitive } from 'cmdk';
import { FiMapPin } from 'react-icons/fi'; // Importing the address icon

import { Check, Loader2 } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandList
} from '@/components/ui/command';
import { useCallback, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/extended/loading-spinner';
import { FilterLocationFormSchemaType } from '@/lib/schema';
import { LuMapPin } from 'react-icons/lu';
import { Spinner } from '@/components/ui/extended/Spinner';
import { Popover, PopoverContent } from '@/components/ui/popover';

type City = {
	value: string;
	label: string;
};
const fetchCities = async (searchInput: string) => {
	const response = await fetch(`/api/mock-address?searchInput=${searchInput}`);
	return (await response.json()) as City[];
};

const AddressAutoComplete = () => {
	const form = useFormContext<FilterLocationFormSchemaType>();
	const [searchInput, setSearchInput] = useState('');
	const debouncedSearchInput = useDebounce(searchInput, 500);
	const [allowedToFetch, setAllowedToFetch] = useState(true); // prevent fetching after item is selected

	const fetchedData = useQuery({
		queryKey: ['cities', allowedToFetch, debouncedSearchInput],
		queryFn: () => fetchCities(debouncedSearchInput),
		enabled: allowedToFetch && !!debouncedSearchInput
	});
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Escape') {
			close();
		}
	};
	// console.log();

	return (
		<FormField
			control={form.control}
			name='city'
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<FormLabel className='text-base'>Find Location</FormLabel>
					<FormDescription>Enter the address you want to get parkings at</FormDescription>
					<Command className='overflow-visible'>
						<div className='flex w-full items-center justify-between rounded-lg border bg-background ring-offset-background text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
							<span className='pl-3'>
								<LuMapPin className='size-4' />
							</span>
							<CommandPrimitive.Input
								value={searchInput}
								onValueChange={(value) => {
									setAllowedToFetch(true);
									setSearchInput(value);
								}}
								// onBlur={close}
								onFocus={open}
								placeholder={'Enter address'}
								className='w-full p-3 rounded-lg outline-none bg-transparent pl-3 '
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
												{fetchedData.data?.map((city) => (
													<CommandPrimitive.Item
														className='flex select-text flex-col cursor-pointer gap-0.5 h-max p-2 px-3 rounded-md aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground items-start'
														value={city.label}
														key={city.value}
														onSelect={() => {
															setAllowedToFetch(false);
															setSearchInput(city.label);
															form.setValue('city', city.value);
															fetchedData.refetch({});
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
											</CommandGroup>
										</div>
									)}
								</CommandList>
							</div>
						) : (
							<div />
						)}
					</Command>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default AddressAutoComplete;
