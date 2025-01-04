'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { DirectionDown, DirectionToRight } from './Direction';
import { FaCheckCircle } from 'react-icons/fa';
import { TbLockSquareRoundedFilled } from 'react-icons/tb';
import { BsSignTurnRightFill } from 'react-icons/bs';
import { useFormContext } from 'react-hook-form';
import { BookingsFormSchemaType } from '@/lib/schema';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
type ParkingSpot = {
	id: number;
	available: boolean;
	selected: boolean;
};

type Section = {
	name: string;
	spots: ParkingSpot[];
};

type ParkingSectionProps = {
	section: Section;
	sectionIndex: number;
	toggleSelection: (sectionIndex: number, spotIndex: number) => void;
};

const ParkingSection = ({ section, sectionIndex, toggleSelection }: ParkingSectionProps) => {
	return (
		<div>
			<div className='flex space-x-10 pt-4 pb-8'>
				{sectionIndex === 0 && <div className='text-muted-foreground pl-6'>Entry</div>}
				<DirectionToRight count={8} />
			</div>
			<div className='grid grid-cols-2 relative'>
				<div className='absolute -top-5 left-[4.6rem]  md:left-[8.5rem] bg-green-600 z-40 text-white py-2 px-3 rounded-lg'>
					{section.name}
				</div>
				<div className='flex flex-col '>
					{section.spots.slice(0, section.spots.length / 2).map((spot: any) => (
						<div
							key={spot.id}
							className={cn(
								'h-16 px-4 border-r-[1px] border-t-[1px] border-primary/50  hover:cursor-pointer  relative',
								spot.available &&
									!spot.selected &&
									'hover:from-primary/40 bg-gradient-to-l from-primary/15',
								spot.selected && ' bg-gradient-to-l from-blue-500/20',
								!spot.available &&
									'hover:cursor-not-allowed [background-image:repeating-linear-gradient(45deg,_rgba(128,128,128,0.3)_0,_rgba(128,128,128,0.3)_10px,_rgba(64,64,64,0.5)_10px,_rgba(64,64,64,0.5)_20px)]'
							)}
							onClick={() => {
								toggleSelection(sectionIndex, spot.id);
							}}>
							{spot.selected && (
								<span
									className={
										'flex text-xs items-center justify-center gap-2 py-2 px-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 '
									}>
									<FaCheckCircle />
									Selected
								</span>
							)}
							{!spot.selected && spot.available && (
								<span>
									<span className='text-xs text-foreground/50 absolute bottom-1 right-1 '>
										{section.name}
										{spot.id}
									</span>
									<span className='text-xs text-foreground/50 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2'>
										Available
									</span>
								</span>
							)}
							{!spot.available && (
								<div className='flex items-center gap-4 -translate-y-[0.5rem]'>
									<TbLockSquareRoundedFilled className='text-muted-foreground/70 size-7' />
									<img
										src='/cars/car-top-view-red.png'
										alt='car'
										className={cn('size-20 object-contain rotate-90 filter grayscale')}
									/>
								</div>
							)}
						</div>
					))}
				</div>
				<div className='flex flex-col '>
					{section.spots.slice(section.spots.length / 2, section.spots.length).map((spot: any) => (
						<div
							key={spot.id}
							className={cn(
								'h-16 px-4 border-t-[1px] border-primary/50  hover:cursor-pointer  relative',
								spot.available &&
									!spot.selected &&
									'hover:from-primary/40 bg-gradient-to-r from-primary/15',
								spot.selected && ' bg-gradient-to-l from-blue-500/20',
								!spot.available &&
									'hover:cursor-not-allowed [background-image:repeating-linear-gradient(45deg,_rgba(128,128,128,0.3)_0,_rgba(128,128,128,0.3)_10px,_rgba(64,64,64,0.5)_10px,_rgba(64,64,64,0.5)_20px)]'
							)}
							onClick={() => toggleSelection(sectionIndex, spot.id)}>
							{spot.selected && (
								<span
									className={
										'flex text-xs items-center justify-center gap-2 py-2 px-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 '
									}>
									<FaCheckCircle />
									Selected
								</span>
							)}
							{!spot.selected && spot.available && (
								<span>
									<span className='text-xs text-foreground/50 absolute bottom-1 right-1 '>
										{section.name}
										{spot.id}
									</span>
									<span className='text-xs text-foreground/50 absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2'>
										Available
									</span>
								</span>
							)}
							{!spot.available && (
								<div className='flex items-center gap-4 -translate-y-[0.5rem]'>
									<TbLockSquareRoundedFilled className='text-muted-foreground/70 size-7' />
									<img
										src='/cars/car-top-view-red.png'
										alt='car'
										className={cn('size-20 object-contain rotate-90 filter grayscale')}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const ParkingSpotChooser = () => {
	const form = useFormContext<BookingsFormSchemaType>();
	const [sections, setSections] = useState([
		{
			name: 'A',
			spots: [
				{ id: 1, available: true, selected: false },
				{ id: 2, available: true, selected: false },
				{ id: 3, available: false, selected: false },
				{ id: 4, available: true, selected: false },
				{ id: 5, available: true, selected: false },
				{ id: 6, available: true, selected: false },
				{ id: 7, available: false, selected: false },
				{ id: 8, available: true, selected: false }
			]
		},
		{
			name: 'B',
			spots: [
				{ id: 1, available: false, selected: false },
				{ id: 2, available: true, selected: false },
				{ id: 3, available: true, selected: false },
				{ id: 4, available: false, selected: false },
				{ id: 5, available: true, selected: false },
				{ id: 6, available: true, selected: false },
				{ id: 7, available: false, selected: false },
				{ id: 8, available: true, selected: false }
			]
		}
	]);

	const toggleSelection = (sectionIndex: number, spotId: number) => {
		form.setValue('spotNo', spotId, { shouldValidate: true });
		form.setValue('section', sections[sectionIndex].name as 'A' | 'B', { shouldValidate: true });

		setSections((prevSections) => {
			return prevSections.map((section, sIndex) => {
				if (sIndex === sectionIndex) {
					return {
						...section,
						spots: section.spots.map((spot) => ({
							...spot,
							selected: spot.id === spotId && spot.available ? true : false
						}))
					};
				}
				return {
					...section,
					spots: section.spots.map((spot) => ({
						...spot,
						selected: false
					}))
				};
			});
		});
	};

	return (
		<FormField
			control={form.control}
			name='section'
			render={() => (
				<FormItem>
					<div className='mb-4'>
						<FormLabel className='text-base'>Select Vehicle Type</FormLabel>
						<FormMessage />
						<FormDescription>Select vehicle types you want to filter</FormDescription>
					</div>
					<div className='flex flex-row justify-center gap-5'>
						{sections.map((section, index) => (
							<>
								<ParkingSection
									key={section.name}
									section={section}
									sectionIndex={index}
									toggleSelection={toggleSelection}
								/>
								{sections.length - 1 !== index && (
									<div className='space-y-10 pt-6 px-4'>
										<span className=''>
											<BsSignTurnRightFill className='size-7 rotate-90 text-primary' />
										</span>
										<DirectionDown />
										<span className='py-8'></span>
										<DirectionDown />
									</div>
								)}
							</>
						))}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default ParkingSpotChooser;
