import { ColDef, DataGrid, RowsProp } from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'
import Todo from '../../lib/todo/todo'
import TodoRepository from '../../lib/todo/todo-repository'

const client = new TodoRepository()

const columns: ColDef[] = [{ field: 'description', headerName: 'Description', width: 300 }]

export default function TodoList() {
	const [rows, setRows] = useState([] as RowsProp)

	useEffect(() => {
		const fetchData = async () => {
			const todos: Todo[] = await client.find()
			const result: RowsProp = todos.map((todo: Todo) => {
				return { id: todo.id, description: todo.description }
			})
			setRows(result)
		}
		fetchData()
	}, [])

	return (
		<div style={{ height: 300, width: '100%' }}>
			<DataGrid rows={rows} columns={columns} />
		</div>
	)
}
