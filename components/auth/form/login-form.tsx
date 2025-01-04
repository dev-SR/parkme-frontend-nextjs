'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { LoginSchemaType } from '@/lib/schema';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse } from '@/lib/types/auth/login';
import { AxiosErrorType, HandleAxiosError } from '@/lib/types/error/process-axios-error';
import { LoadingSpinner } from '@/components/ui/extended/loading-spinner';
import ListAlertDestructive from '@/components/ui/extended/ListAlertDestructive';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import api from '@/lib/axiosApi';

export function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectUrlRaw = searchParams.toString().replace('redirect=', '');
	const redirectUrl = decodeURIComponent(redirectUrlRaw) || DEFAULT_LOGIN_REDIRECT;

	const form = useForm<LoginSchemaType>({
		// resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});
	const mutation = useMutation<LoginResponse, AxiosErrorType, LoginRequest>({
		mutationFn: api.Auth.login,
		onSuccess: (res) => {
			toast.success('Login successful');
			router.push(redirectUrl);
		},
		onError: (error) => {
			console.log(error);
			const err = HandleAxiosError.process(error);
			toast.error(err.message);
		}
	});
	async function onSubmit(values: LoginSchemaType) {
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
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className='grid gap-4'>
								<div className='grid gap-2'>
									<FormField
										control={form.control}
										name='email'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input type='email' placeholder='m@example.com' {...field} required />
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
												<div className='flex items-center'>
													<FormLabel>Password</FormLabel>
													<Link href='#' className='ml-auto inline-block text-sm underline'>
														Forgot your password?
													</Link>
												</div>
												<FormControl>
													<Input type='password' required {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								{mutation.isError && <ListAlertDestructive error={mutation.error} />}

								<Button type='submit' className='w-full'>
									{mutation.isPending && <LoadingSpinner />}
									Login
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className='text-center text-xs text-muted-foreground mt-4'>
				Don't have an account?{' '}
				<Link href='/auth/register' className='text-primary underline'>
					Register
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
