'use client';
import { useState } from 'react';
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
import { LoadingSpinner } from '@/components/ui/extended/loading-spinner';
import { AlertDestructive } from '@/components//ui/extended/AlertDestructive';
import { toast } from 'sonner';
import { useServerAction } from 'zsa-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RegisterSchemaType, RegisterSchema } from '@/lib/schema';

export function RegisterForm() {
	const router = useRouter();

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			password: ''
		}
	});
	// const action = useServerAction(loginAction, {
	// 	onSuccess({ data: { success } }) {
	// 		toast.success(success);
	// 		router.push(DEFAULT_LOGIN_REDIRECT);
	// 		router.refresh();
	// 	},
	// 	onError({ err: { message } }) {
	// 		toast.error(message);
	// 	}
	// });
	async function onSubmit(values: RegisterSchemaType) {
		// await action.execute(values);
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
										name='first_name'
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
										name='last_name'
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

								{/* {action.isError && <AlertDestructive message={action.error.message} />} */}

								<Button
									type='submit'
									className='w-full'
									onClick={() => {
										// action.reset();
									}}>
									{/* {action.isPending && buttonClicked == 'credentials' && <LoadingSpinner />} */}
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
