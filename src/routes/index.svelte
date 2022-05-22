<script>
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
	import App from '../scene/app.svelte';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<App />
</QueryClientProvider>
