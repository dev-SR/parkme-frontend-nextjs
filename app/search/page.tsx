import FilterFormProvider from '@/components/location/filter/FilterFormProvider';
import MyMap from '@/components/location/map/Map';

export default function Layout() {
	return (
		<div className='container sm:px-2 mx-auto'>
			<FilterFormProvider>
				<MyMap />
			</FilterFormProvider>
		</div>
	);
}
