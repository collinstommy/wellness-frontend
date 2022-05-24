<script>
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	});
</script>

<div class="flex p-4">
	<nav class="flex flex-col pr-4">
		<a href="/todos">Todos</a>
		<a href="/journal">Journal</a>
	</nav>
	<QueryClientProvider client={queryClient}>
		<slot />
	</QueryClientProvider>
</div>
