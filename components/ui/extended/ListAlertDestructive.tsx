'use client';

import { AxiosErrorType, HandleAxiosError } from '@/lib/types/error/process-axios-error';
import { AlertDestructive } from './AlertDestructive';

const ListAlertDestructive = ({ error }: { error: AxiosErrorType }) => {
	const err = HandleAxiosError.process(error);

	return (
		<div className='space-y-4'>
			<AlertDestructive title={`Error - ${err.status}`} message={err.message} />
			{err.errors &&
				Object.keys(err.errors).map((key) => (
					<AlertDestructive key={key} title={key} message={err.errors[key].join(', ')} />
				))}
		</div>
	);
};

export default ListAlertDestructive;
