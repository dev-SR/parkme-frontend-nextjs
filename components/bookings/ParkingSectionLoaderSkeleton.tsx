'use client';

import { BsSignTurnRightFill } from 'react-icons/bs';
import { Skeleton } from '../ui/skeleton';
import { DirectionDown, DirectionToRight } from './Direction';
import { FormItem, FormLabel, FormMessage, FormDescription } from '../ui/form';

type ParkingSectionProps = {
	sectionIndex: number;
};

export const SectionSkeleton = ({ sectionIndex }: ParkingSectionProps) => {
	return (
		<div className='flex-1'>
			<div className='flex space-x-10 pt-4 pb-8'>
				{sectionIndex === 0 && <div className='text-muted-foreground pl-6'>Entry</div>}
				<DirectionToRight count={8} />
			</div>
			<div className='grid grid-cols-2 relative gap-4'>
				<Skeleton className=' h-16 rounded-md' />
				<Skeleton className=' h-16 rounded-md' />
				<Skeleton className=' h-16 rounded-md' />
				<Skeleton className=' h-16 rounded-md' />
				<Skeleton className=' h-16 rounded-md' />
				<Skeleton className=' h-16 rounded-md' />
			</div>
		</div>
	);
};

const ParkingSectionLoaderSkeleton = () => {
	return (
		<FormItem>
			<div className='mb-4'>
				<FormLabel className='text-base'>Select Vehicle Type</FormLabel>
				<FormMessage />
				<FormDescription>Select vehicle types you want to filter</FormDescription>
			</div>
			<div className='flex flex-row gap-5'>
				<SectionSkeleton sectionIndex={0} />
				<div className='space-y-10 pt-6 px-4'>
					<span className=''>
						<BsSignTurnRightFill className='size-7 rotate-90 text-primary' />
					</span>
					<DirectionDown />
					<span className='py-8'></span>
					<DirectionDown />
				</div>
				<SectionSkeleton sectionIndex={1} />
			</div>
		</FormItem>
	);
};

export default ParkingSectionLoaderSkeleton;
