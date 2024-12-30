'use client';
import { useFormContext } from 'react-hook-form';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Command as CommandPrimitive } from 'cmdk';
import { FiMapPin } from 'react-icons/fi'; // Importing the address icon

import { Check } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { Command, CommandEmpty, CommandGroup, CommandList } from '@/components/ui/command';
import { useCallback, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/extended/loading-spinner';
import { FilterLocationFormSchemaType } from '@/lib/schema';

const fetchCities = async (searchInput: string) => {
	const response = await fetch(`/api/mock-address?searchInput=${searchInput}`);
	return response.json();
};
const cities = [
	{ label: 'Dhaka', value: 'dhaka' },
	{ label: 'Chittagong', value: 'chittagong' },
	{ label: 'Khulna', value: 'khulna' },
	{ label: 'Rajshahi', value: 'rajshahi' }
] as const;

const AddressAutoComplete = () => {
	const form = useFormContext<FilterLocationFormSchemaType>();
	const [searchInput, setSearchInput] = useState('');
	const debouncedSearchInput = useDebounce(searchInput, 500);
	const [data, setData] = useState(cities);

	const fetchedData = useQuery({
		queryKey: ['cities', debouncedSearchInput],
		queryFn: () => fetchCities(debouncedSearchInput),
		enabled: !!debouncedSearchInput && searchInput !== 'Your Location'
	});
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	console.log(searchInput);

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
					<FormLabel className='text-base'>Find Location</FormLabel>
					<FormDescription>Enter the address you want to get parkings at</FormDescription>
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
								className='w-full p-3 rounded-lg outline-none bg-transparent pl-3 '
							/>
						</div>
						{isOpen ? (
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
						) : (
							<CommandList />
						)}
					</Command>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default AddressAutoComplete;
