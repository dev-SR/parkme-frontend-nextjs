'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';

import { FilterLocationFormSchemaType, FilterLocationFormSchema } from '@/lib/schema';
import { ReactNode } from 'react';

const FilterFormProvider = ({ children }: { children: ReactNode }) => {
	const form = useForm<FilterLocationFormSchemaType>({
		resolver: zodResolver(FilterLocationFormSchema),
		defaultValues: {
			vehicleTypes: ['CAR'],
			price_per_hour_range: [100, 500],
			address: { label: undefined, mapboxId: undefined, coordinates: undefined }
		}
	});
	return <Form {...form}>{children}</Form>;
};

export default FilterFormProvider;
