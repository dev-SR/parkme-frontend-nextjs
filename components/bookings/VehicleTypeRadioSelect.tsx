'use client';
import { FaCar, FaMotorcycle, FaTruck, FaBus, FaBicycle } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

import { BookingsFormSchemaType, FilterLocationFormSchemaType } from '@/lib/schema';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const vehicleType = [
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
		value: 'BUS',
		icon: <FaBus className='size-8' />
	},
	{
		value: 'BICYCLE',
		icon: <FaBicycle className='size-8' />
	}
];

const VehicleTypeRadioSelect = () => {
	const form = useFormContext<BookingsFormSchemaType>();
	// const watched = useWatch({
	// 	// control: form.control, //control is optional as we are inside form context
	// 	name: 'vehicleTypes'
	// });
	// console.log(watched);
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
						{vehicleType.map((item) => (
							<FormField
								key={item.value}
								control={form.control}
								name='vehicleType'
								render={({ field }) => {
									return (
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className='flex flex-col space-y-1'>
											<FormItem className='flex items-center space-x-3 space-y-0'>
												<FormLabel className='font-normal'>
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger>
																<Card
																	key={item.value}
																	className={cn(
																		'text-primary border-2 rounded-none cursor-pointer hover:bg-accent p-0',
																		field.value?.includes(item.value) && ' border-primary'
																	)}
																	onClick={() => {
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
										</RadioGroup>
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

export default VehicleTypeRadioSelect;
/* 


										
										
*/
