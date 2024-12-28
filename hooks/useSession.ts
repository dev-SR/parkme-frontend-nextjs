import { useQuery } from '@tanstack/react-query';

export default function useSession() {
	// const { data: session, isLoading } = useQuery({
	// 	queryKey: ['session'],
	// 	queryFn: async () => {
	// 		const response = await fetch(sessionApiRoute);
	// 		return response.json();
	// 	}
	// });
	// const { trigger: login } = useSWRMutation(sessionApiRoute, doLogin, {
	// 	// the login route already provides the updated information, no need to revalidate
	// 	revalidate: false
	// });
	// const { trigger: logout } = useSWRMutation(sessionApiRoute, doLogout);
	// const { trigger: increment } = useSWRMutation(sessionApiRoute, doIncrement);
	// return { session, logout, login, increment, isLoading };
}
