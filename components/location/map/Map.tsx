'use client';
import { useTheme } from 'next-themes';
import Map, { FullscreenControl } from 'react-map-gl';
const MyMap = () => {
	const { theme } = useTheme();

	return (
		<div className=''>
			<Map
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
				initialViewState={{
					longitude: 90.42,
					latitude: 23.739,
					zoom: 12
				}}
				style={{ width: '100vw', height: '100vh' }}
				mapStyle={
					theme === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'
				}>
				<FullscreenControl />
			</Map>
		</div>
	);
};

export default MyMap;
