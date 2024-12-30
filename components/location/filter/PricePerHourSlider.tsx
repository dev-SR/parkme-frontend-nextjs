'use client';

import { DualRangeSlider } from '@/components/ui/extended/DualRangeSlider';
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription
} from '@/components/ui/form';
import { FilterLocationFormSchemaType } from '@/lib/schema';
import { useFormContext } from 'react-hook-form';

const PricePerHourSlider = () => {
	const form = useFormContext<FilterLocationFormSchemaType>();
	return (
		<FormField
			control={form.control}
			name='price_per_hour_range'
			render={({ field }) => (
				<FormItem>
					<FormLabel className='text-base'>Select Vehicle Type</FormLabel>
					<FormDescription>Select vehicle types you want to filter</FormDescription>
					<FormControl>
						<div className='pt-8'>
							{/* https://shadcnui-expansions.typeart.cc/docs/datetime-picker */}
							<DualRangeSlider
								label={(value) => <span>{value}৳</span>}
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

export default PricePerHourSlider;
