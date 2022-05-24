import { useMutation, useQueryClient, useQuery } from '@sveltestack/svelte-query';
import { deleteTodo, getAllTodos, TODOS_KEY, updateTodo } from '../../apis/todos';

export const useEditTodo = () => {
	const queryClient = useQueryClient();
	return useMutation(updateTodo, {
		onMutate: async (updatedTodo) => {
			await queryClient.cancelQueries(TODOS_KEY);

			const previousTodos = queryClient.getQueryData(TODOS_KEY);
			console.log({ updatedTodo });
			queryClient.setQueryData(TODOS_KEY, (todos) =>
				todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
			);
			return { previousTodos };
		},
		onError: (err, updatedTodo, context) => {
			queryClient.setQueryData(TODOS_KEY, context.previousTodo);
		},
		onSettled: () => {
			queryClient.invalidateQueries(TODOS_KEY);
		}
	});
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteTodo, {
		onMutate: async (toDelete) => {
			await queryClient.cancelQueries(TODOS_KEY);

			const previousTodos = queryClient.getQueryData(TODOS_KEY);
			queryClient.setQueryData(TODOS_KEY, (existingTodos) =>
				existingTodos.filter((todo) => todo.id !== toDelete.id)
			);

			return { previousTodos };
		},
		onError: (err, toDelete, context) => {
			queryClient.setQueryData(TODOS_KEY, context.previousTodos);
		},
		onSettled: () => {
			queryClient.invalidateQueries(TODOS_KEY);
		}
	});
};

export const useTodos = () => useQuery(TODOS_KEY, () => getAllTodos());
