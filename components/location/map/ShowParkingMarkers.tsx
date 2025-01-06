'use client';
import useSupercluster from 'use-supercluster';
import { Marker, useMap } from 'react-map-gl';
import { INITIAL_VIEW_STATE } from '@/lib/constants';
import { useParkingMarkerData } from '@/hooks/map/useParkingMarkerData';
import { FaSquareParking } from 'react-icons/fa6';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import ImagePreviews from '@/components/bookings/ImagePreviews';
import BookingFormProvider from '@/components/bookings/BookingFormProvider';
import { DateRangeBookingInfo } from '@/components/bookings/DateRangeBookingInfo';
import ParkingSpotChooser from '@/components/bookings/ParkingSpotChooser';
import VehicleTypeRadioSelect from '@/components/bookings/VehicleTypeRadioSelect';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParkingLotsDto } from '@/lib/types/map/search';
import PricingDetails from '@/components/bookings/PricingDetails';
import { BookingsFormSchemaType } from '@/lib/schema';
import { useWatch } from 'react-hook-form';

const ShowParkingMarkers = () => {
	const filterFormData = useWatch<BookingsFormSchemaType>();

	const mapRef = useMap();
	const bounds = mapRef.current ? mapRef.current.getBounds()?.toArray().flat() : null;

	const { data, isError } = useParkingMarkerData();

	const points = data
		? data.map((lots) => ({
				type: 'Feature',
				properties: { cluster: false, ...lots },
				geometry: {
					type: 'Point',
					coordinates: [lots.longitude, lots.latitude]
				}
		  }))
		: [];

	const { clusters, supercluster } = useSupercluster({
		points: points as any,
		bounds: bounds as any,
		zoom: mapRef.current?.getZoom() ?? INITIAL_VIEW_STATE.zoom,
		options: { radius: 75, maxZoom: 20 }
		//     disableRefresh: isFetching
	});

	// if (clusters.length === 0) return <div />;

	return clusters.map((cluster, i) => {
		const [longitude, latitude] = cluster.geometry.coordinates;
		const isCluster = cluster.properties?.cluster;
		const pointCount = cluster.properties?.point_count;
		// console.log(cluster.id);
		const parkingSpotData = cluster.properties as ParkingLotsDto;

		if (isCluster) {
			return (
				<Marker
					key={cluster.id}
					longitude={longitude}
					latitude={latitude}
					onClick={() => {
						const expandedZoom = supercluster
							? Math.min(supercluster.getClusterExpansionZoom(Number(cluster.id)), 20)
							: INITIAL_VIEW_STATE.zoom;

						mapRef.current?.flyTo({
							center: [longitude, latitude],
							zoom: expandedZoom,
							speed: 0.2,
							animate: true
						});
					}}>
					<div
						style={{
							width: `${30 + (pointCount / 7) * 20}px`,
							height: `${30 + (pointCount / 7) * 20}px`
						}}
						className='flex items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold p-4 hover:cursor-pointers hadow-md'>
						{pointCount}
					</div>
				</Marker>
			);
		}

		return (
			<Dialog>
				<DialogTrigger>
					<Marker
						anchor='bottom'
						key={i}
						longitude={longitude}
						latitude={latitude}
						className='cursor-pointer shadow-md'>
						<FaSquareParking className='size-7 text-primary ' />
					</Marker>
				</DialogTrigger>
				<DialogContent
					className={
						'max-h-[calc(100dvh-2rem)] max-w-screen-sm md:max-w-screen-md overflow-y-auto overflow-x-hidden'
					}>
					<DialogHeader className='flex flex-col items-start'>
						<DialogTitle className='text-2xl'>Booking</DialogTitle>
						<DialogDescription className='flex items-center'>
							{cluster.properties?.name} - {cluster.properties?.address}
							<Badge variant={'secondary'} className='ml-2'>
								Verified
							</Badge>
						</DialogDescription>
					</DialogHeader>
					<div className='flex flex-col gap-4'>
						<BookingFormProvider
							defaultValues={{
								startTime: filterFormData.startTime || new Date(),
								endTime: filterFormData.endTime || new Date(new Date().getTime() + 60 * 60 * 1000),
								parkingLotId: parkingSpotData.id,
								totalPrice: 0,
								pricePerHour: 0,
								parkingAddress: parkingSpotData.address
							}}>
							<div className='flex flex-col items-center'>
								<ImagePreviews />
							</div>
							<ParkingSpotChooser />
							<VehicleTypeRadioSelect />
							<DateRangeBookingInfo />
							<PricingDetails />
						</BookingFormProvider>
					</div>
				</DialogContent>
			</Dialog>
		);
	});
};

export default ShowParkingMarkers;
