import { getCurrentUser } from '@/actions/getCurrentUser';
import NavigationHelperPage from '@/components/NavigationHelperPage';

const Private = async () => {
	const session = await getCurrentUser();

	return (
		<div className='w-full'>
			<NavigationHelperPage currentPage='/private/server' />
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>
	);
};

export default Private;
