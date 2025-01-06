'use client';
import React, { useEffect } from 'react';
import { DirectionDown } from './Direction';
import { BsSignTurnRightFill } from 'react-icons/bs';
import { useFormContext } from 'react-hook-form';
import { BookingsFormSchemaType } from '@/lib/schema';
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { AxiosErrorType, HandleAxiosError } from '@/lib/types/error/process-axios-error';
import { ParkingSpacesRequestBody, ParkingSpacesResponse } from '@/lib/types/map/parking';
import api from '@/lib/axiosApi';
import { toast } from 'sonner';
import { Section, ParkingSpotSelection, useParkingStore } from '@/stores/bookingStore';
import ParkingSectionLoaderSkeleton from './ParkingSectionLoaderSkeleton';
import { ParkingSection } from './ParkingSection';

const transformSpots = (spots: ParkingSpacesResponse, vehicleType?: string): Section[] => {
	const sectionsMap: Record<string, ParkingSpotSelection[]> = {};

	spots.forEach((spot) => {
		const { sectionName } = spot;

		if (!sectionsMap[sectionName]) {
			sectionsMap[sectionName] = [];
		}

		sectionsMap[sectionName].push({
			...spot,
			selected: false,
			ofSelectedVehicleType: spot.vehicleType === vehicleType
		});
	});

	return (
		Object.entries(sectionsMap)
			.map(([name, spots]) => ({
				name,
				spots
			}))
			.sort((a, b) => a.name.localeCompare(b.name))
			//temp demo
			.map((section, i) => ({
				...section,
				spots: section.spots.map((spot, j) => ({
					...spot,
					isBooked: j == 0 || j == section.spots.length - 1 ? true : spot.isBooked
				}))
			}))
	);
};

const ParkingSpotChooser = () => {
	const form = useFormContext<BookingsFormSchemaType>();
	const startDate = form.watch('startTime');
	const endDate = form.watch('endTime');
	const parkingLotId = form.watch('parkingLotId');
	const vehicleType = form.watch('vehicleType');

	const { sections, setSections, toggleSelection, updateVehicleType } = useParkingStore();

	const mutation = useMutation<ParkingSpacesResponse, AxiosErrorType, ParkingSpacesRequestBody>({
		mutationFn: api.ParkingSpaces.getParkingSpaces,
		onSuccess: (data) => {
			setSections(transformSpots(data, vehicleType));
			form.setValue('parkingSpotId', '', { shouldValidate: true });
		},
		onError: (error) => {
			const err = HandleAxiosError.process(error);
			toast.error(err.message);
		}
	});
	const handleMutation = () => {
		mutation.mutate({
			parkingLotId,
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString()
		});
	};

	useEffect(() => {
		handleMutation();
	}, [startDate, endDate]);

	useEffect(() => {
		updateVehicleType(vehicleType);
	}, [vehicleType]);

	if (mutation.isPending) return <ParkingSectionLoaderSkeleton />;

	return (
		<FormField
			control={form.control}
			name='parkingSpotId'
			render={() => (
				<FormItem>
					<div className='mb-4'>
						<FormLabel className='text-base'>Select Vehicle Type</FormLabel>
						<FormMessage />
						<FormDescription>Select vehicle types you want to filter</FormDescription>
					</div>
					<div className='flex flex-row gap-5'>
						{sections.map((section, index) => (
							<>
								<ParkingSection
									key={index}
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
