import FilterFormProvider from '@/components/location/filter/FilterFormProvider';
import MyMap from '@/components/location/map/Map';

export default function Layout() {
	return (
		<div className='container mx-auto'>
			<div>
				<h1 className='text-3xl font-bold py-4'>Search for Nearby Parking</h1>
			</div>
			<div className='border-2 border-border rounded-lg overflow-hidden'>
				<FilterFormProvider>
					<MyMap />
				</FilterFormProvider>
			</div>
		</div>
	);
}
