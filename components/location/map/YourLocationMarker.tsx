'use client';

import { FilterParkingsFormSchemaType } from '@/lib/schema';
import { useWatch } from 'react-hook-form';
import { Marker } from 'react-map-gl';
import { RiUserLocationFill } from 'react-icons/ri';

const YourLocationMarker = () => {
	const formData = useWatch<FilterParkingsFormSchemaType>();

	return (
		formData.address?.coordinates &&
		formData.address.label !== 'YOUR LOCATION' && (
			<Marker
				anchor='bottom'
				longitude={formData.address.coordinates.longitude!}
				latitude={formData.address.coordinates.latitude!}
				onClick={(e) => {
					// If we let the click event propagates to the map, it will immediately close the popup
					// with `closeOnClick: true`
					e.originalEvent.stopPropagation();
				}}>
				<div className='size-8 text-blue-400 relative flex'>
					<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>

					<RiUserLocationFill className='size-8' />
				</div>
			</Marker>
		)
	);
};
export default YourLocationMarker;
