'use client';

import { Spinner } from '@/components/ui/extended/Spinner';
import { useParkingMarkerData } from '@/hooks/map/useParkingMarkerData';

const LoadingMarker = () => {
	const { isFetching } = useParkingMarkerData();
	return (
		isFetching && (
			<div className='py-2 px-4 rounded bg-background text-foreground flex gap-2 items-center'>
				<Spinner size='small' />
				<span className='text-lg'>Loading nearby parking spots...</span>
			</div>
		)
	);
};

export default LoadingMarker;
