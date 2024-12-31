'use client';
import { useTheme } from 'next-themes';
import { useCallback, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css'; //MUST
import Map, {
	FullscreenControl,
	GeolocateControl,
	NavigationControl,
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
import { FilterLocationFormSchemaType } from '@/lib/schema';
import LoadingMarkers from './LoadingMarkers';
import GetUserLocation from './GetUserLocation';

const MyMap = () => {
	const { theme } = useTheme();
	const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
	const form = useFormContext<FilterLocationFormSchemaType>();

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

	return (
		<Map
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
			{...viewState}
			onMove={(evt) => setViewState(evt.viewState)}
			style={{ height: 'calc(100vh - 4rem)' }}
			// scrollZoom={false}
			mapStyle={
				theme === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'
			}
			onLoad={(e) => handleMapChange(e.target)}
			onDragEnd={(e) => handleMapChange(e.target)}
			onZoomEnd={(e) => handleMapChange(e.target)}>
			<GeolocateControl position='bottom-right' />
			<FullscreenControl position='bottom-right' />
			<NavigationControl position='bottom-right' />

			<ShowParkingMarkers />
			<YourLocationMarker />
			<GetUserLocation />

			<MapPanel position='right-top'>
				<Sheet>
					<SheetTrigger className='bg-primary rounded p-1 text-primary-foreground'>
						<Filter className='size-5' />
					</SheetTrigger>
					<SheetContent className='w-[400px] sm:w-[540px]'>
						<SheetHeader className='mb-6'>
							<SheetTitle>Apply Filters</SheetTitle>
							<SheetDescription>Narrow down your search</SheetDescription>
						</SheetHeader>
						<form className='space-y-4'>
							<VehicleTypeMultiSelect />
							<PricePerHourSlider />
						</form>
					</SheetContent>
				</Sheet>
			</MapPanel>

			<MapPanel position='left-top'>
				<AddressAutoComplete />
			</MapPanel>
			<MapPanel position='center-center'>
				<LoadingMarkers />
			</MapPanel>
		</Map>
	);
};

export default MyMap;
