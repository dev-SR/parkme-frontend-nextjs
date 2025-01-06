'use client';
import { cn } from '@/lib/utils';
import { ParkingSpotSelection, Section } from '@/stores/bookingStore';
import { FaCheckCircle } from 'react-icons/fa';
import { PiWarningCircle } from 'react-icons/pi';
import { TbLockSquareRoundedFilled } from 'react-icons/tb';
import { DirectionToRight } from './Direction';
import { useFormContext } from 'react-hook-form';
import { BookingsFormSchemaType } from '@/lib/schema';

type ParkingSectionProps = {
	section: Section;
	sectionIndex: number;
	toggleSelection: (sectionIndex: number, spotId: string) => void;
};
export const ParkingSection = ({ section, sectionIndex, toggleSelection }: ParkingSectionProps) => {
	const form = useFormContext<BookingsFormSchemaType>();
	const firstHalf = section.spots.slice(0, section.spots.length / 2);
	const secondHalf = section.spots.slice(section.spots.length / 2);
	const vanImageUrl = '/vehicle/van-top-view-1.png';
	const carImageUrl = '/vehicle/car-top-view-1.png';
	const truckImageUrl = '/vehicle/truck-top-view-1.png';
	const motorcycleImageUrl = '/vehicle/bike-top-view-1.png';

	return (
		<div className='flex-1'>
			<div className='flex space-x-10 pt-4 pb-8'>
				{sectionIndex === 0 && <div className='text-muted-foreground pl-6'>Entry</div>}
				<DirectionToRight count={8} />
			</div>
			<div className='grid grid-cols-2 relative'>
				<div className='absolute -top-5 left-[4.6rem]  md:left-[8.5rem] bg-green-600 z-40 text-white py-2 px-3 rounded-lg'>
					{section.name}
				</div>
				{[firstHalf, secondHalf].map((half, index) => {
					const isInFirstHalf = index === 0;
					return (
						<div className='flex flex-col '>
							{half.map((spot: ParkingSpotSelection) => (
								<div
									key={spot.id}
									className={cn(
										'h-16 px-4 border-t-[1px] border-primary/50  hover:cursor-pointer  relative',
										isInFirstHalf && 'border-r-[1px]',
										spot.selected && isInFirstHalf && ' bg-gradient-to-l from-blue-500/60',
										spot.selected && !isInFirstHalf && ' bg-gradient-to-r from-blue-500/60',
										spot.isBooked &&
											'hover:cursor-not-allowed [background-image:repeating-linear-gradient(45deg,_rgba(128,128,128,0.3)_0,_rgba(128,128,128,0.3)_10px,_rgba(64,64,64,0.5)_10px,_rgba(64,64,64,0.5)_20px)]',
										!spot.isBooked &&
											!spot.selected &&
											spot.ofSelectedVehicleType &&
											isInFirstHalf &&
											'hover:from-primary/40 bg-gradient-to-l from-primary/15',
										!spot.isBooked &&
											!spot.selected &&
											spot.ofSelectedVehicleType &&
											!isInFirstHalf &&
											'hover:from-primary/40 bg-gradient-to-r from-primary/15',
										!spot.isBooked &&
											!spot.selected &&
											!spot.ofSelectedVehicleType &&
											'hover:cursor-not-allowed [background-image:repeating-linear-gradient(45deg,_rgba(128,128,128,0.3)_0,_rgba(128,128,128,0.3)_10px,_rgba(64,64,64,0.5)_10px,_rgba(64,64,64,0.5)_20px)]'
									)}
									onClick={() => {
										form.setValue('parkingSpotId', spot.id, {
											shouldValidate: true
										});
										toggleSelection(sectionIndex, spot.id);
									}}>
									{spot.selected && (
										<div>
											<span
												className={
													'flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10  h-full w-full'
												}>
												<div className='flex items-center gap-1'>
													<FaCheckCircle className='size-4 text-white' />
													<span className='text-sm text-white'>Selected</span>
												</div>
											</span>
											<div className='text-xs text-foreground/50 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 '>
												<img
													src={
														spot.vehicleType === 'MOTORCYCLE'
															? motorcycleImageUrl
															: spot.vehicleType === 'TRUCK'
															? truckImageUrl
															: spot.vehicleType === 'VAN'
															? vanImageUrl
															: carImageUrl
													}
													alt='vehicle image'
													className={cn(
														'size-24 object-contain blur-[2px]',
														spot.vehicleType === 'CAR' && isInFirstHalf && 'rotate-90',
														spot.vehicleType === 'CAR' && !isInFirstHalf && '-rotate-90',
														spot.vehicleType === 'MOTORCYCLE' && isInFirstHalf && 'rotate-[35deg]',
														spot.vehicleType === 'MOTORCYCLE' &&
															!isInFirstHalf &&
															'-rotate-[135deg]',
														spot.vehicleType === 'VAN' && isInFirstHalf && '-rotate-90',
														spot.vehicleType === 'VAN' && !isInFirstHalf && 'rotate-90'
													)}
												/>
											</div>
										</div>
									)}
									{spot.isBooked && (
										<div>
											<span
												className={cn(
													'flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-full w-full ',
													isInFirstHalf && 'bg-gradient-to-r from-background/80',
													!isInFirstHalf && 'bg-gradient-to-l from-background/80'
												)}>
												<div className='flex items-center gap-1 -rotate-12'>
													<TbLockSquareRoundedFilled className='size-5 text-yellow-400' />
													<span className='text-yellow-400 text-sm '>Booked</span>
												</div>
											</span>
											<div className='absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 '>
												<img
													src={
														spot.vehicleType === 'MOTORCYCLE'
															? motorcycleImageUrl
															: spot.vehicleType === 'TRUCK'
															? truckImageUrl
															: spot.vehicleType === 'VAN'
															? vanImageUrl
															: carImageUrl
													}
													alt='vehicle image'
													className={cn(
														'size-24 object-contain ',
														spot.vehicleType === 'CAR' && isInFirstHalf && 'rotate-90',
														spot.vehicleType === 'CAR' && !isInFirstHalf && '-rotate-90',
														spot.vehicleType === 'MOTORCYCLE' && isInFirstHalf && 'rotate-[35deg]',
														spot.vehicleType === 'MOTORCYCLE' &&
															!isInFirstHalf &&
															'-rotate-[135deg]',
														spot.vehicleType === 'VAN' && isInFirstHalf && '-rotate-90',
														spot.vehicleType === 'VAN' && !isInFirstHalf && 'rotate-90'
													)}
												/>
											</div>
										</div>
									)}
									{!spot.selected && !spot.isBooked && (
										<div>
											<span className='text-xs text-foreground/50 absolute bottom-1 right-1 '>
												{section.name}
												{section.spots.indexOf(spot) + 1}
											</span>
											{!spot.ofSelectedVehicleType && (
												<span
													className={cn(
														'flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-full w-full',
														isInFirstHalf && 'bg-gradient-to-r from-background',
														!isInFirstHalf && 'bg-gradient-to-l from-background'
													)}>
													<div className='flex items-center gap-1 -rotate-12'>
														<PiWarningCircle className='size-5 text-card-foreground/50' />
														<span className='text-card-foreground/50 text-sm '>Not available</span>
													</div>
												</span>
											)}
											<div className='text-xs text-foreground/50 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2'>
												<img
													src={
														spot.vehicleType === 'MOTORCYCLE'
															? motorcycleImageUrl
															: spot.vehicleType === 'TRUCK'
															? truckImageUrl
															: spot.vehicleType === 'VAN'
															? vanImageUrl
															: carImageUrl
													}
													alt='vehicle image'
													className={cn(
														'size-24 object-contain ',
														spot.vehicleType === 'CAR' && isInFirstHalf && 'rotate-90',
														spot.vehicleType === 'CAR' && !isInFirstHalf && '-rotate-90',
														spot.vehicleType === 'MOTORCYCLE' && isInFirstHalf && 'rotate-[35deg]',
														spot.vehicleType === 'MOTORCYCLE' &&
															!isInFirstHalf &&
															'-rotate-[135deg]',
														spot.vehicleType === 'VAN' && isInFirstHalf && '-rotate-90',
														spot.vehicleType === 'VAN' && !isInFirstHalf && 'rotate-90'
													)}
												/>
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
};
