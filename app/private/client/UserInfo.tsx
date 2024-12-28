'use client';

import api from '@/lib/axiosApi';
import apiAuth from '@/lib/axiosAuthApi';
import { useQuery } from '@tanstack/react-query';

const UserInfo = () => {
	const user = useQuery({
		queryKey: ['user'],
		queryFn: api.Auth.getProfile,
		retry: false
	});

	return (
		<div className='w-full'>
			{user.isError && <div>Error</div>}
			<pre>{JSON.stringify(user.data, null, 2)}</pre>{' '}
		</div>
	);
};

export default UserInfo;
