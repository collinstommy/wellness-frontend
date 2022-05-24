<script>
	import { useDeleteTodo, useEditTodo, useTodos } from './useTodo';

	const todos = useTodos();
	const editTodo = useEditTodo();
	const removeTodo = useDeleteTodo();

	const handleTodoTextChange = async ({ target }) => {
		const { value, id } = target;
		await $editTodo.mutate({ id, text: value });
	};

	const handleTodoCheckboxChange = async (id, done, text) => {
		await $editTodo.mutate({ id, done, text });
	};

	const handleDeleteTodo = async (id) => {
		await $removeTodo.mutate({ id });
	};
</script>

{#if $todos.isLoading}
	<span>Loading...</span>
{:else if $todos.error}
	<span>An error has occurred: {$todos.error}</span>
{:else}
	<ul>
		{#each $todos.data as todo (todo.id)}
			<li>
				<input
					on:change={(event) => handleTodoCheckboxChange(todo.id, event.target.checked, todo.text)}
					type="checkbox"
					checked={todo.done}
				/>
				<label for={todo.id}>
					<input
						on:change={handleTodoTextChange}
						id={todo.id}
						value={todo.text}
						class:line-through={todo.done}
					/>
				</label>
				<button on:click={() => handleDeleteTodo(todo.id)}>Delete</button>
			</li>
		{/each}
	</ul>
{/if}
