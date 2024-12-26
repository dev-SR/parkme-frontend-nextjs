import { LoadingSpinner } from '@/components/ui/extended/loading-spinner';

const Loading = async () => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<LoadingSpinner />
		</div>
	);
};

export default Loading;
