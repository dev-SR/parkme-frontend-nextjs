'use client';

import { BookingsFormSchemaType } from '@/lib/schema';
import { useFormContext, useWatch } from 'react-hook-form';

const DumpFromData = () => {
	const formData = useWatch<BookingsFormSchemaType>();
	const form = useFormContext<BookingsFormSchemaType>();
	return (
		<pre className=''>
			<div>{JSON.stringify(formData, null, 2)}</div>
			<div>{JSON.stringify(form.formState.errors, null, 2)}</div>
		</pre>
	);
};

export default DumpFromData;
