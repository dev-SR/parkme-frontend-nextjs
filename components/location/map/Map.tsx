'use client';
import { useTheme } from 'next-themes';
import { useCallback, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'; //MUST
import Map, {
	FullscreenControl,
	GeolocateControl,
	MapRef,
	NavigationControl,
	useMap,
	ViewStateChangeEvent
} from 'react-map-gl';

import { MapPanel } from './MapPanel';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import ShowParkingMarkers from './ShowParkingMarkers';
import { INITIAL_VIEW_STATE } from '@/lib/constants';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import PricePerHourSlider from '../filter/PricePerHourSlider';
import VehicleTypeMultiSelect from '../filter/VehicleTypeMultiSelect';
import AddressAutoComplete from '../filter/AddressAutoComplete';
import YourLocationMarker from './YourLocationMarker';
import { useFormContext } from 'react-hook-form';
import { FilterParkingsFormSchemaType } from '@/lib/schema';
import LoadingMarkers from './LoadingMarker';
import GetUserLocation from './GetUserLocation';
import ErrorMarker from './ErrorMarker';
import { FaLocationDot } from 'react-icons/fa6';
import { StartDateTimeForm } from '@/components/bookings/BookingDateTime';
import {
	ClockIcons,
	FilterEndDateTimeForm,
	FilterStartDateTimeForm
} from '../filter/FilterDateTime';

const MyMap = () => {
	const { theme } = useTheme();
	const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
	const form = useFormContext<FilterParkingsFormSchemaType>();

	const handleMapChange = useCallback((target: ViewStateChangeEvent['target']) => {
		const bounds = target.getBounds();
		const locationFilter = {
			ne_lat: bounds?.getNorthEast().lat || 0,
			ne_lng: bounds?.getNorthEast().lng || 0,
			sw_lat: bounds?.getSouthWest().lat || 0,
			sw_lng: bounds?.getSouthWest().lng || 0
		};

		form.setValue('bounds', locationFilter);
	}, []);

	const mapRef = useRef<MapRef>(null);

	return (
		<Map
			ref={mapRef}
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
			{...viewState}
			onMove={(evt) => setViewState(evt.viewState)}
			style={{ height: 'calc(100vh - 9rem)' }}
			// style={{ height: '100%' }}
			// scrollZoom={false}
			mapStyle={
				theme === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'
			}
			onLoad={(e) => handleMapChange(e.target)}
			onDragEnd={(e) => handleMapChange(e.target)}
			onZoomEnd={(e) => handleMapChange(e.target)}>
			{/* <GeolocateControl
				position='bottom-right'
				onGeolocate={(e) => {
					const { longitude, latitude } = e.coords;
					console.log(longitude, latitude, mapRef.current);

					mapRef.current?.easeTo({
						center: {
							lng: longitude,
							lat: latitude
						}
					});
				}}
			/> */}
			<FullscreenControl position='bottom-right' />
			<NavigationControl position='bottom-right' />

			<ShowParkingMarkers />
			<YourLocationMarker />
			<div className={`absolute space-y-2 p-2 bottom-40 right-[2px] flex flex-col items-start `}>
				<GetUserLocation />
			</div>

			<MapPanel position='right-top'>
				<Sheet>
					<SheetTrigger className='bg-primary rounded p-1 text-primary-foreground shadow-md'>
						<Filter className='size-5' />
					</SheetTrigger>
					<SheetContent className='w-[400px] sm:w-[540px]'>
						<SheetHeader className='mb-6'>
							<SheetTitle>Apply Filters</SheetTitle>
							<SheetDescription>Narrow down your search</SheetDescription>
						</SheetHeader>
						<form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
							<VehicleTypeMultiSelect />
							<PricePerHourSlider />
						</form>
					</SheetContent>
				</Sheet>
			</MapPanel>

			<div className={`absolute space-y-2 p-2 top-[2px] left-[2px] flex flex-col items-start `}>
				<AddressAutoComplete />
			</div>
			<div className={`absolute space-y-2 p-2 top-[50px] left-[2px] flex flex-col items-start `}>
				<div className='flex '>
					<div className='w-6'>
						<ClockIcons />
					</div>
					<div className='space-y-1'>
						<FilterStartDateTimeForm />
						<FilterEndDateTimeForm />
					</div>
				</div>
			</div>

			<MapPanel position='center-center'>
				<LoadingMarkers />
			</MapPanel>
			<MapPanel position='center-center'>
				<ErrorMarker />
			</MapPanel>
		</Map>
	);
};

export default MyMap;
