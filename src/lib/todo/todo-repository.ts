import Todo from './todo'
import {SERVER_API_PATH, SERVER_BASE_URL} from "../../config/app-config";
import axios from 'axios';

export default class TodoRepository {

	async find(): Promise<Todo[]> {
		const result = await axios.get(`${SERVER_BASE_URL}${SERVER_API_PATH}/todos`);
		return result.data.map((item: Todo) => {
			return {
				id: item.id,
				description: item.description
			}
		})
	}

	async insert(todo: Todo): Promise<string> {
		const result = await axios.post(`${SERVER_BASE_URL}${SERVER_API_PATH}/todos`, {
			description: todo.description
		});
		return result.data;
	}

	async update(todo: Todo): Promise<void> {
		await axios.put(`${SERVER_BASE_URL}${SERVER_API_PATH}/todos/${todo.id}`, {
			description: todo.description
		})
	}

	async delete(id: string): Promise<void> {
		await axios.delete(`${SERVER_BASE_URL}${SERVER_API_PATH}/todos/${id}`)
	}
}
