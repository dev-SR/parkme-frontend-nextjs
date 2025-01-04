'use client';
import { DateTimePicker } from '@/components/ui/extended/datetime-picker';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { BookingsFormSchemaType } from '@/lib/schema';
import { useFormContext } from 'react-hook-form';

export const StartDateTimeForm = () => {
	const form = useFormContext<BookingsFormSchemaType>();
	return (
		<FormField
			control={form.control}
			name='startTime'
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<FormLabel htmlFor='startTime'>Start DateTime</FormLabel>
					<FormControl className='max-w-fit'>
						{/* https://shadcnui-expansions.typeart.cc/docs/dual-range-slider */}
						<DateTimePicker hourCycle={12} value={field.value} onChange={field.onChange} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
export const EndDateTimeForm = () => {
	const form = useFormContext<BookingsFormSchemaType>();
	return (
		<FormField
			control={form.control}
			name='endTime'
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<FormLabel htmlFor='endTime' className='text-right'>
						Start DateTime
					</FormLabel>
					<FormControl className='max-w-fit'>
						{/* https://shadcnui-expansions.typeart.cc/docs/dual-range-slider */}
						<DateTimePicker hourCycle={12} value={field.value} onChange={field.onChange} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
