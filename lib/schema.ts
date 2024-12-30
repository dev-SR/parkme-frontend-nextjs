import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});
export const RegisterSchema = z.object({
	first_name: z.string().min(2, 'First name must be at least 2 characters'),
	last_name: z.string().min(2, 'Last name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters')
	// re_password: z.string().min(8, 'Re password must be at least 8 characters')
});

export const FilterLocationFormSchema = z.object({
	city: z.string(),
	vehicleTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
		message: 'You have to select at least one item.'
	}),
	start_time: z.date(),
	price_per_hour_range: z.array(z.number())
});

export type FilterLocationFormSchemaType = z.infer<typeof FilterLocationFormSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
