import axios from 'axios';

const HOST = 'http://localhost:4000';

export const TODOS_KEY = 'allTodos';

export const getAllTodos = async () => {
	const { data } = await axios(`${HOST}/todos`);
	return data;
};

export const updateTodo = async ({ id, text, done }) => {
	const { data } = await axios.put(`${HOST}/todos/${id}`, { text, done });
	return data;
};

export const deleteTodo = async ({ id }) => {
	const { data } = await axios.delete(`${HOST}/todos/${id}`);
	return data;
};
