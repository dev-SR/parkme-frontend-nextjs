'use client';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RegisterSchemaType, RegisterSchema } from '@/lib/schema';
import { RegisterRequest, RegisterResponse } from '@/lib/types/auth/login';
import { AxiosErrorType, HandleAxiosError } from '@/lib/types/error/process-axios-error';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '@/lib/axiosApi';
import { LOGIN_PATH } from '@/routes';
import ListAlertDestructive from '@/components/ui/extended/ListAlertDestructive';
import { LoadingSpinner } from '@/components/ui/extended/loading-spinner';

export function RegisterForm() {
	const router = useRouter();

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		}
	});
	const mutation = useMutation<RegisterResponse, AxiosErrorType, RegisterRequest>({
		mutationFn: api.Auth.register,
		onSuccess: (res) => {
			toast.success('🎉Congrats!🎉 You have successfully registered.');
			router.push(LOGIN_PATH);
		},
		onError: (error) => {
			// console.log(error);
			const err = HandleAxiosError.process(error);
			toast.error(err.message);
		}
	});
	async function onSubmit(values: RegisterSchemaType) {
		mutation.mutate(values);
	}

	return (
		<div className='space-y-4'>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Welcome back</CardTitle>
					<CardDescription>Login with your Email and Password</CardDescription>
				</CardHeader>

				<CardContent>
					{mutation.isError && <ListAlertDestructive error={mutation.error} />}

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='firstName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name</FormLabel>
												<FormControl>
													<Input type='text' placeholder='Jhon' {...field} required />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='lastName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input type='text' placeholder='Doe' required {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input type='email' placeholder='email@exmple.com' required {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='password'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input type='password' required {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<Button type='submit' className='w-full'>
									{mutation.isPending && <LoadingSpinner />}
									Register
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className='text-center text-xs text-muted-foreground mt-4'>
				Do you have an account?{' '}
				<Link href='/auth/login' className='text-primary underline'>
					Sign In
				</Link>{' '}
				instead.
			</div>
			<div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  '>
				By clicking continue, you agree to our <a href='#'>Terms of Service</a> and{' '}
				<a href='#'>Privacy Policy</a>.
			</div>
		</div>
	);
}
