import { map, z } from 'zod';
import { isEndTimeValid, isStartTimeValid } from './utils';
import { p, section } from 'motion/react-client';

export const LoginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters')
});
export const RegisterSchema = z.object({
	firstName: z.string().min(2, 'First name must be at least 2 characters'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters'),
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 8 characters')
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
		parkingSpotId: z.string().min(5, { message: 'Parking spot is required' }),
		startTime: z.date({
			required_error: 'Start time is required'
		}),
		endTime: z.date({
			required_error: 'Start time is required'
		}),
		vehicleType: z.enum(['CAR', 'MOTORCYCLE', 'TRUCK', 'VAN', 'BICYCLE'], {
			required_error: 'Vehicle type is required'
		}),
		pricePerHour: z.number().optional(),
		duration: z.number().optional(),
		totalPrice: z.number().optional(),
		parkingAddress: z.string().optional()
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

export const PayNowPartialFormSchema = z.object({
	vehicleNumber: z.string().min(5, { message: 'Vehicle number is required' }),
	phoneNumber: z.string().length(14, { message: 'Invalid phone number' })
});

export const CreateCheckoutSessionSchema = z.object({
	parkingSpotId: z.string().nonempty('Parking spot ID is required.'),
	startTime: z.string().nonempty('Start time is required.'),
	endTime: z.string().nonempty('End time is required.'),
	phoneNumber: z
		.string()
		.nonempty('Phone number is required.')
		.regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format.'),
	vehicleNumber: z.string().nonempty('Vehicle number is required.')
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type FilterParkingsFormSchemaType = z.infer<typeof FilterParkingsFormSchema>;
export type BookingsFormSchemaType = z.infer<typeof BookingsFormSchema>;
export type PayNowPartialFormSchemaType = z.infer<typeof PayNowPartialFormSchema>;
export type CreateCheckoutSessionReqBody = z.infer<typeof CreateCheckoutSessionSchema>;
