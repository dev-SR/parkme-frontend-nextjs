'use client';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
type AlertDestructiveProps = {
	title?: string;
	message: string;
};
export function AlertWarn({ title = 'Error', message }: AlertDestructiveProps) {
	return (
		<Alert variant='default' className='bg-yellow-500/20 border-yellow-500'>
			<AlertCircle className='h-4 w-4' color='yellow' />
			<AlertTitle className='text-yellow-400'>{title}</AlertTitle>
			<AlertDescription className='text-yellow-200'>{message}</AlertDescription>
		</Alert>
	);
}
