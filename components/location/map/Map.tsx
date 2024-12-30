'use client';
import { DistrictGeocode } from '@/lib/geo-data/districts';
import { useTheme } from 'next-themes';
import { useMemo, useRef, useState } from 'react';
import { LuMapPin } from 'react-icons/lu';
import 'mapbox-gl/dist/mapbox-gl.css'; //MUST
import Map, {
	FullscreenControl,
	GeoJSONSource,
	GeolocateControl,
	MapRef,
	Marker,
	NavigationControl,
	Popup,
	ScaleControl
} from 'react-map-gl';
import { BBox, GeoJsonProperties } from 'geojson';
import useSupercluster from 'use-supercluster';
import Supercluster, { PointFeature } from 'supercluster';

const MyMap = () => {
	const { theme } = useTheme();
	const [viewState, setViewState] = useState({
		longitude: 90.42,
		latitude: 23.739,
		zoom: 12
	});
	const [popupInfo, setPopupInfo] = useState<any>(null);
	const mapRef = useRef<MapRef>(null);

	const bounds = mapRef.current ? mapRef.current.getMap().getBounds()?.toArray().flat() : null;
	const points = DistrictGeocode.map((district) => ({
		type: 'Feature',
		properties: { cluster: false, ...district },
		geometry: {
			type: 'Point',
			coordinates: [parseFloat(district.lon), parseFloat(district.lat)]
		}
	}));

	const { clusters, supercluster } = useSupercluster({
		points: points as any,
		bounds: bounds as any,
		zoom: viewState.zoom,
		options: { radius: 75, maxZoom: 20 }
		//     disableRefresh: isFetching
	});

	return (
		<Map
			ref={mapRef}
			{...viewState}
			onMove={(evt) => setViewState(evt.viewState)}
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
			style={{ width: '90vw', height: '80vh' }}
			mapStyle={
				theme === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'
			}>
			<GeolocateControl position='top-left' />
			<FullscreenControl position='top-left' />
			<NavigationControl position='top-left' />

			{clusters.map((cluster, i) => {
				const [longitude, latitude] = cluster.geometry.coordinates;
				const isCluster = cluster.properties?.cluster;
				const pointCount = cluster.properties?.point_count;

				if (isCluster) {
					return (
						<Marker key={cluster.id} longitude={longitude} latitude={latitude}>
							<div
								style={{
									width: `${10 + (pointCount / 11) * 10}px`,
									height: `${10 + (pointCount / 11) * 10}px`
								}}
								className='flex items-center justify-center rounded-full bg-primary text-foreground text-lg font-semibold p-4 hover:cursor-pointer'
								onClick={() => {
									const expandedZoom = supercluster
										? Math.min(supercluster.getClusterExpansionZoom(Number(cluster.id)), 20)
										: viewState.zoom;

									mapRef.current?.easeTo({
										center: [longitude, latitude],
										zoom: expandedZoom,
										duration: 300
									});
								}}>
								{pointCount}
							</div>
						</Marker>
					);
				}

				return (
					<Marker
						anchor='bottom'
						key={cluster.properties?.id}
						longitude={longitude}
						latitude={latitude}
						onClick={(e) => {
							// If we let the click event propagates to the map, it will immediately close the popup
							// with `closeOnClick: true`
							e.originalEvent.stopPropagation();
							setPopupInfo(cluster.properties);
						}}>
						<LuMapPin className='text-primary size-8' />
					</Marker>
				);
			})}

			{popupInfo && (
				<Popup
					anchor='top'
					longitude={Number(popupInfo.lon)}
					latitude={Number(popupInfo.lat)}
					onClose={() => setPopupInfo(null)}
					className='bg-background text-foreground'>
					<div>
						<h3>{popupInfo.name}</h3>
					</div>
				</Popup>
			)}
		</Map>
	);
};

export default MyMap;
