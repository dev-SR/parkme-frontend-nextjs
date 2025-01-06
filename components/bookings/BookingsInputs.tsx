'use client';

import { useForm, useFormContext } from 'react-hook-form';

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {  PayNowPartialFormSchemaType } from '@/lib/schema';
import { PhoneInput } from '@/components/ui/extended/phone-input';

export function PhoneNumberInput() {
	const form = useFormContext<PayNowPartialFormSchemaType>();

	return (
		<FormField
			control={form.control}
			name='phoneNumber'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Enter your phone number</FormLabel>
					<FormControl>
						<PhoneInput placeholder='Enter your phone number' defaultCountry='BD' {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
export function VehicleNumberPalateInput() {
	const form = useFormContext<PayNowPartialFormSchemaType>();

	return (
		<FormField
			control={form.control}
			name='vehicleNumber'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Enter your vehicle number</FormLabel>
					<FormControl>
						<Input
							placeholder='XX-XXXX'
							type='text'
							value={field.value?.toUpperCase()}
							onChange={field.onChange}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
