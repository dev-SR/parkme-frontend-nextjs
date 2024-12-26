'use client';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
type AlertDestructiveProps = {
	title?: string;
	message: string;
};
export function AlertSuccess({ title = 'Error', message }: AlertDestructiveProps) {
	return (
		<Alert variant='default' className='bg-green-600/20 border-green-500'>
			<AlertCircle className='h-4 w-4' color='green' />
			<AlertTitle className='text-green-700'>{title}</AlertTitle>
			<AlertDescription className='text-green-600'>{message}</AlertDescription>
		</Alert>
	);
}
