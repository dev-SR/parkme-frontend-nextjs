'use client';
import { DateTimePicker } from '@/components/ui/extended/datetime-picker';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BookingsFormSchemaType, FilterParkingsFormSchemaType } from '@/lib/schema';
import { useFormContext } from 'react-hook-form';
import { PiClockBold } from 'react-icons/pi';
import { HiArrowNarrowDown } from 'react-icons/hi';
import { PiClockClockwiseBold } from 'react-icons/pi';
export const FilterStartDateTimeForm = () => {
	const form = useFormContext<FilterParkingsFormSchemaType>();
	return (
		<FormField
			control={form.control}
			name='startTime'
			render={({ field }) => (
				<FormItem className='flex flex-col space-y-0'>
					<FormControl className='max-w-fit'>
						{/* https://shadcnui-expansions.typeart.cc/docs/dual-range-slider */}
						<DateTimePicker
							hourCycle={12}
							value={field.value}
							onChange={field.onChange}
							className='bg-card'
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
export const FilterEndDateTimeForm = () => {
	const form = useFormContext<BookingsFormSchemaType>();
	return (
		<FormField
			control={form.control}
			name='endTime'
			render={({ field }) => (
				<FormItem className='flex flex-col space-y-0'>
					<FormControl className='max-w-fit'>
						{/* https://shadcnui-expansions.typeart.cc/docs/dual-range-slider */}
						<DateTimePicker
							hourCycle={12}
							value={field.value}
							onChange={field.onChange}
							className='bg-card'
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
export const ClockIcons = () => {
	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<PiClockBold className='size-5' />
			<HiArrowNarrowDown className='size-5' />
			<PiClockClockwiseBold className='size-5' />
		</div>
	);
};
