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
}
