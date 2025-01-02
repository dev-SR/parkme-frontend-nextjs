import FilterFormProvider from '@/components/location/filter/FilterFormProvider';
import MyMap from '@/components/location/map/Map';
import { BottomEffects, TopEffects } from '@/components/ui/extended/Effects';

export default function Layout() {
	return (
		<div className='container mx-auto relative isolate'>
			<TopEffects />
			<div>
				<h1 className='text-2xl font-bold py-3 motion-preset-typewriter '>
					Search for Nearby Parking
				</h1>
			</div>
			<div className='border-2 border-border shadow rounded-lg overflow-hidden'>
				<FilterFormProvider>
					<MyMap />
				</FilterFormProvider>
			</div>
			<BottomEffects />
		</div>
	);
}
