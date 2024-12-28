import { useQuery } from '@tanstack/react-query';
import { User } from '../types/auth/user';

export const useGetUser = () => {
	return useQuery<User, Error>({
		queryKey: ['user'],
		queryFn: async () => {
			const response = await fetch('/api/auth/current-user');
			if (!response.ok) {
				console.log(response.statusText);
			}
			return response.json();
		}
	});
};
