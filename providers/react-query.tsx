'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function ReactQueryProvider({ children }: React.PropsWithChildren) {
	const [client] = useState(new QueryClient());

	return (
		<QueryClientProvider client={client}>
			<ReactQueryDevtools />
			{children}
		</QueryClientProvider>
	);
}

export default ReactQueryProvider;
