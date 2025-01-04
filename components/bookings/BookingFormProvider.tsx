'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

import { BookingsFormSchemaType, BookingsFormSchema } from '@/lib/schema';
import { ReactNode } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const BookingFormProvider = ({
	children,
	defaultValues
}: {
	children: ReactNode;
	defaultValues?: Partial<BookingsFormSchemaType>;
}) => {
	const form = useForm<BookingsFormSchemaType>({
		resolver: zodResolver(BookingsFormSchema),
		defaultValues: {
			...defaultValues,
			vehicleType: 'CAR'
		},
		mode: 'onChange'
	});
	const router = useRouter();

	function onSubmit(data: BookingsFormSchemaType) {
		const section = data.section;
		const spotNo = data.spotNo;
		const parkingLotId = data.parkingLotId;
		const startTime = data.startTime;
		const endTime = data.endTime;
		const vehicleType = data.vehicleType;
		toast(
			<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
				<code className='text-white'>{JSON.stringify(data, null, 2)}</code>
			</pre>
		);

		router.push(
			`/bookings/${parkingLotId}?section=${section}&spotNo=${spotNo}&startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}&vehicleType=${vehicleType}`
		);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				{children}
			</form>
		</Form>
	);
};

export default BookingFormProvider;
