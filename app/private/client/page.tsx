import NavigationHelperPage from '@/components/NavigationHelperPage';
import UserInfo from './UserInfo';

const Private = async () => {
	return (
		<div className='w-full'>
			<NavigationHelperPage currentPage='/private/client' />

			<UserInfo />
		</div>
	);
};

export default Private;
