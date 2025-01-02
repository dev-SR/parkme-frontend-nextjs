'use client';

import { Spinner } from '@/components/ui/extended/Spinner';
import { useParkingMarkerData } from '@/hooks/map/useParkingMarkerData';
import { FileWarning } from 'lucide-react';

const ErrorMarker = () => {
	const { isError, isFetching } = useParkingMarkerData();
	return (
		isError &&
		!isFetching && (
			<div className='py-2 px-4 rounded bg-destructive text-foreground flex gap-2 items-center'>
				<FileWarning className='size-6' />
				<span className='text-lg'>Error loading nearby parking spots...</span>
			</div>
		)
	);
};

export default ErrorMarker;
