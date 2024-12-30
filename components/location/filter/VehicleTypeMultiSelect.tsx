'use client';
import { FaCar, FaMotorcycle, FaTruck, FaBus, FaBicycle } from 'react-icons/fa';
import { useFormContext } from 'react-hook-form';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

import { FilterLocationFormSchemaType } from '@/lib/schema';

const vehicleType = [
	{
		key: 'car',
		label: 'Car',
		icon: <FaCar className='size-8' />
	},
	{
		key: 'motorcycle',
		label: 'Motorcycle',
		icon: <FaMotorcycle className='size-8' />
	},
	{
		key: 'truck',
		label: 'Truck',
		icon: <FaTruck className='size-8' />
	},
	{
		key: 'bus',
		label: 'Bus',
		icon: <FaBus className='size-8' />
	},
	{
		key: 'bicycle',
		label: 'Bicycle',
		icon: <FaBicycle className='size-8' />
	}
];

const VehicleTypeMultiSelect = () => {
	const form = useFormContext<FilterLocationFormSchemaType>();
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

export default VehicleTypeMultiSelect;
