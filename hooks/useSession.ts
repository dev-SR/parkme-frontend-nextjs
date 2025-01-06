import api from '@/lib/axiosApi';
import { useUserStore } from '@/stores/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function useSession() {
	const { user, setUser, clearUser } = useUserStore();

	const query = useQuery({
		queryKey: ['session'],
		queryFn: api.Auth.getProfile,
		enabled: !user,
		retry: false,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false
	});

	useEffect(() => {
		if (query.data) {
			if (!user) {
				setUser(query.data);
			}
		}
	}, [query.data, setUser]);

	const logoutMutate = useMutation({
		mutationFn: api.Auth.logout,
		onSuccess: () => {
			clearUser();
		}
	});

	return {
		user,
		setUser,
		clearUser,
		logout: logoutMutate.mutate,
		isUserFetching: query.isLoading,
		isLoggingOut: logoutMutate.isPending
	};
}
