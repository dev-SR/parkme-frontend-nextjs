import { map, z } from 'zod';
import { isEndTimeValid, isStartTimeValid } from './utils';
import { p, section } from 'motion/react-client';

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

export const FilterParkingsFormSchema = z
	.object({
		address: z.object({
			label: z.string().optional(),
			mapboxId: z.string().optional(),
			coordinates: z
				.object({
					latitude: z.number(),
					longitude: z.number()
				})
				.optional()
		}),
		bounds: z
			.object({
				ne_lat: z.number(),
				ne_lng: z.number(),
				sw_lat: z.number(),
				sw_lng: z.number()
			})
			.optional(),
		vehicleTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: 'You have to select at least one item.'
		}),
		price_per_hour_range: z.array(z.number()),
		startTime: z.date({
			required_error: 'Start time is required'
		}),
		endTime: z.date({
			required_error: 'Start time is required'
		})
	})
	.refine(({ startTime }) => isStartTimeValid(new Date(startTime)), {
		message: 'Start time should be greater than current time',
		path: ['startTime']
	})
	.refine(({ endTime, startTime }) => isEndTimeValid({ endTime, startTime }), {
		message: 'End time should be greater than start time',
		path: ['endTime']
	});

export const BookingsFormSchema = z
	.object({
		parkingLotId: z.string(),
		section: z.enum(['A', 'B'], {
			required_error: 'Section is required'
		}),
		spotNo: z.coerce.number(),
		startTime: z.date({
			required_error: 'Start time is required'
		}),
		endTime: z.date({
			required_error: 'Start time is required'
		}),
		// vehicleNumber: z.string().min(5, { message: 'Vehicle number is required' }),
		// phoneNumber: z.string().length(13, { message: 'Invalid phone number' }),
		vehicleType: z.enum(['CAR', 'MOTORCYCLE', 'TRUCK', 'BUS', 'BICYCLE'], {
			required_error: 'Vehicle type is required'
		})
		// valet: formSchemaValet.optional()
	})
	.refine(({ startTime }) => isStartTimeValid(startTime), {
		message: 'Start time should be greater than current time',
		path: ['startTime']
	})
	.refine(({ endTime, startTime }) => isEndTimeValid({ endTime, startTime }), {
		message: 'End time should be greater than start time',
		path: ['endTime']
	});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type FilterParkingsFormSchemaType = z.infer<typeof FilterParkingsFormSchema>;
export type BookingsFormSchemaType = z.infer<typeof BookingsFormSchema>;
