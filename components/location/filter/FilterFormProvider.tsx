'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

import { FilterParkingsFormSchemaType, FilterParkingsFormSchema } from '@/lib/schema';
import { ReactNode } from 'react';

const FilterFormProvider = ({ children }: { children: ReactNode }) => {
	const form = useForm<FilterParkingsFormSchemaType>({
		resolver: zodResolver(FilterParkingsFormSchema),
		defaultValues: {
			vehicleTypes: ['CAR'],
			price_per_hour_range: [100, 500],
			address: { label: undefined, mapboxId: undefined, coordinates: undefined },
			bounds: undefined,
			startTime: new Date(new Date().getTime() + 60 * 60 * 1000),
			endTime: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)
		},
		mode: 'onChange'
	});
	return <Form {...form}>{children}</Form>;
};

export default FilterFormProvider;
