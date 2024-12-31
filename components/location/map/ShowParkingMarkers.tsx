'use client';
import useSupercluster from 'use-supercluster';
import { Marker, useMap } from 'react-map-gl';
import { INITIAL_VIEW_STATE } from '@/lib/constants';
import { useParkingMarkerData } from '@/hooks/map/useParkingMarkerData';
import { toast } from 'sonner';
import { FaSquareParking } from 'react-icons/fa6';

const ShowParkingMarkers = () => {
	const mapRef = useMap();
	const bounds = mapRef.current ? mapRef.current.getBounds()?.toArray().flat() : null;

	const { data, isFetching } = useParkingMarkerData();

	const points = data
		? data.map((district) => ({
				type: 'Feature',
				properties: { cluster: false, ...district },
				geometry: {
					type: 'Point',
					coordinates: [parseFloat(district.lon), parseFloat(district.lat)]
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

	if (clusters.length === 0) return <div />;

	return clusters.map((cluster, i) => {
		const [longitude, latitude] = cluster.geometry.coordinates;
		const isCluster = cluster.properties?.cluster;
		const pointCount = cluster.properties?.point_count;
		// console.log(cluster.id);

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
							width: `${10 + (pointCount / 7) * 20}px`,
							height: `${10 + (pointCount / 7) * 20}px`
						}}
						className='flex items-center justify-center rounded-full bg-primary text-accent-foreground text-lg font-semibold p-4 hover:cursor-pointer'>
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
				className='cursor-pointer'
				onClick={(e) => {
					// If we let the click event propagates to the map, it will immediately close the popup
					// with `closeOnClick: true`
					e.originalEvent.stopPropagation();
					toast.info(JSON.stringify(cluster.properties));
				}}>
				<FaSquareParking className='size-7 text-primary' />
			</Marker>
		);
	});
};

export default ShowParkingMarkers;
