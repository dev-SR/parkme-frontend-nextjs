'use client';

import { Button } from '@/components/ui/button';
import { FilterLocationFormSchemaType } from '@/lib/schema';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { useMap } from 'react-map-gl';
import { toast } from 'sonner';

const GetUserLocation: React.FC = () => {
	const form = useFormContext<FilterLocationFormSchemaType>();
	// const [geocode, setGeocode] = React.useState<{ latitude: number; longitude: number } | undefined>(
	// 	undefined
	// );

	const mapRef = useMap();
	const handleGetLocation = () => {
		if (!navigator.geolocation) {
			toast.warning('Geolocation is not supported by this browser.');
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				// setGeocode({ latitude, longitude });
				form.setValue('address', {
					label: 'USER LOCATION',
					mapboxId: '',
					coordinates: {
						latitude: latitude,
						longitude: longitude
					}
				});

				mapRef.current?.easeTo({
					center: {
						lat: latitude,
						lng: longitude
					},
					zoom: 13
				});
			},
			(error) => {
				toast.error('Error getting location');
			}
		);
	};

	useEffect(() => {
		handleGetLocation();
	}, []);

	return (
		<Button className='rounded p-0  size-[29px]' onClick={handleGetLocation}>
			<FaLocationCrosshairs className='' />
		</Button>
	);
};

export default GetUserLocation;
