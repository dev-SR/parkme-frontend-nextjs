'use client';

import { PhoneNumberInput, VehicleNumberPalateInput } from '@/components/bookings/BookingsInputs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/extended/loading-spinner';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import useSession from '@/hooks/useSession';
import api from '@/lib/axiosApi';
import { formatDate2 } from '@/lib/date-utils';
import { PayNowPartialFormSchema, PayNowPartialFormSchemaType } from '@/lib/schema';
import { LoginResponse, LoginRequest } from '@/lib/types/auth/login';
import { AxiosErrorType, HandleAxiosError } from '@/lib/types/error/process-axios-error';
import { useBookingDetailsStore } from '@/stores/bookingDetailsStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaArrowRightLong, FaCar, FaMotorcycle, FaTruck, FaVanShuttle } from 'react-icons/fa6';
import { toast } from 'sonner';
const vehicleTypes = [
	{
		value: 'CAR',
		icon: <FaCar className='size-6 text-primary' />
	},
	{
		value: 'MOTORCYCLE',
		icon: <FaMotorcycle className='size-6 text-primary' />
	},
	{
		value: 'TRUCK',
		icon: <FaTruck className='size-6 text-primary' />
	},
	{
		value: 'VAN',
		icon: <FaVanShuttle className='size-6 text-primary' />
	}
];
const BookingPaymentSummary = () => {
	const router = useRouter();
	const { id: parkingLotId } = useParams();
	const { bookingDetails, clearBookingDetails } = useBookingDetailsStore();
	const { user } = useSession();

	const form = useForm<PayNowPartialFormSchemaType>({
		resolver: zodResolver(PayNowPartialFormSchema),
		defaultValues: {
			phoneNumber: '',
			vehicleNumber: ''
		}
	});

	const mutation = useMutation<LoginResponse, AxiosErrorType, LoginRequest>({
		mutationFn: api.Auth.login,
		onSuccess: (res) => {
			router.push('checkoutsession');
			clearBookingDetails();
		},
		onError: (error) => {
			console.log(error);
			const err = HandleAxiosError.process(error);
			toast.error(err.message);
		}
	});
	async function onSubmit(values: PayNowPartialFormSchemaType) {
		// mutation.mutate(values);
		const bookingData = {
			...bookingDetails,
			phoneNumber: values.phoneNumber,
			vehicleNumber: values.vehicleNumber
		};

		toast.info(JSON.stringify(bookingData, null, 2));
	}
	if (!user) {
		console.log('User not found');
		router.push('/auth/login');
	}
	if (!bookingDetails || bookingDetails.parkingLotId !== parkingLotId) {
		clearBookingDetails();
		router.push('/bookings');
	}
	return (
		<div className='space-y-4 flex min-h-svh  mx-auto flex-col mt-6 relative w-4/5 sm:w-3/5 md:sm:w-2/5'>
			<Card className='p-0'>
				<CardHeader className='px-0'>
					<CardTitle className='text-xl text-center'>Booking Summary</CardTitle>
					<CardDescription className='space-y-4'>
						<div className='flex items-center justify-center'>
							{bookingDetails?.vehicleType &&
								vehicleTypes.find((item) => item.value === bookingDetails.vehicleType)?.icon}
						</div>
						<div className='bg-background flex justify-between py-2 px-6'>
							<div className='space-y-1'>
								<div className='text-muted-foreground flex items-center gap-2'>
									<FaArrowRightLong />
									Entrance
								</div>
								<div className='text-base font-bold text-foreground'>
									{bookingDetails?.startTime && formatDate2(bookingDetails.startTime)}
								</div>
							</div>
							<Separator orientation='vertical' className='h-12' />

							<div className='space-y-1'>
								<div className='text-muted-foreground flex items-center gap-2'>
									Exit
									<FaArrowRightLong />
								</div>
								<div className='text-base font-bold text-foreground'>
									{bookingDetails?.endTime && formatDate2(bookingDetails.endTime)}
								</div>
							</div>
						</div>

						<div className='text-base text-foreground font-bold pl-6'>
							<span className='text-muted-foreground'>Address: </span>{' '}
							{bookingDetails?.parkingAddress}
						</div>
						<div className='m-2 p-6 space-y-4 rounded-xl bg-background/40 ring-1 ring-primary/30'>
							<div className=' flex justify-between'>
								<div className='text-foreground font-bold'>Hourly Rate</div>
								<div className='text-foreground font-bold'>৳{bookingDetails?.pricePerHour}</div>
							</div>
							<Separator />
							<div className='flex justify-between'>
								<div className='font-bold text-base text-primary'>
									{Math.ceil(bookingDetails?.duration || 0)} Hours
								</div>
								<div className='font-bold text-base text-primary'>
									৳{bookingDetails?.totalPrice}
								</div>
							</div>
						</div>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='grid gap-4'>
								<PhoneNumberInput />
								<VehicleNumberPalateInput />
								<Button type='submit' className='w-full'>
									{mutation.isPending && <LoadingSpinner />}
									Pay Now <span className='font-bold'>৳{bookingDetails?.totalPrice}</span>
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default BookingPaymentSummary;
/* 
<div className='flex min-h-svh  mx-auto flex-col items-center justify-center bg-muted p-6 md:p-10'>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<Link href='/' className='flex items-center gap-2 self-center font-medium'>
					<div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
						<FaSquareParking className='size-4' />
					</div>
					ParkMe Inc.
				</Link>
				<LoginForm />
			</div>
		</div>

*/
