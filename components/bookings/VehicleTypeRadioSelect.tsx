'use client';
import { FaCar, FaMotorcycle, FaTruck, FaBus, FaBicycle } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

import { BookingsFormSchemaType } from '@/lib/schema';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useParkingStore } from '@/stores/bookingStore';
import { useEffect } from 'react';
import { FaVanShuttle } from 'react-icons/fa6';

const vehicleTypes = [
	{
		value: 'CAR',
		icon: <FaCar className='size-8' />
	},
	{
		value: 'MOTORCYCLE',
		icon: <FaMotorcycle className='size-8' />
	},
	{
		value: 'TRUCK',
		icon: <FaTruck className='size-8' />
	},
	{
		value: 'VAN',
		icon: <FaVanShuttle className='size-8' />
	}
];

const VehicleTypeRadioSelect = () => {
	const form = useFormContext<BookingsFormSchemaType>();
	const { getUniqueVehicleTypes } = useParkingStore();

	// Fetch the unique vehicle types from the store
	const uniqueVehicleTypes = getUniqueVehicleTypes();

	// Filter the vehicleType array to only include unique vehicle types
	const filteredVehicleTypes = uniqueVehicleTypes.length
		? vehicleTypes.filter((item) => uniqueVehicleTypes.includes(item.value))
		: vehicleTypes;

	useEffect(() => {
		form.setValue(
			'vehicleType',
			filteredVehicleTypes[0].value as BookingsFormSchemaType['vehicleType']
		);
	}, []);

	return (
		<FormField
			control={form.control}
			name='vehicleType'
			render={() => (
				<FormItem>
					<div className='mb-4'>
						<FormLabel className='text-base'>Select Vehicle Type</FormLabel>
						<FormDescription>Select vehicle types you want to filter</FormDescription>
					</div>
					<div className='flex flex-row vehicleTypes-start'>
						{filteredVehicleTypes.map((item) => (
							<FormField
								key={item.value}
								control={form.control}
								name='vehicleType'
								render={({ field }) => (
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormLabel className='font-normal'>
											<TooltipProvider>
												<Tooltip defaultOpen={false}>
													<TooltipTrigger>
														<Card
															key={item.value}
															className={cn(
																'text-primary border-2 rounded-none cursor-pointer hover:bg-accent p-0',
																field.value?.includes(item.value) && 'border-primary'
															)}
															onClick={(e) => {
																e.preventDefault();
																field.onChange(item.value);
															}}>
															<CardContent className='p-2'>{item.icon}</CardContent>
														</Card>
													</TooltipTrigger>
													<TooltipContent>{item.value}</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</FormLabel>
									</FormItem>
								)}
							/>
						))}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default VehicleTypeRadioSelect;
