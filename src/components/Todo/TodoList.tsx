import { Button } from '@material-ui/core'
import {
	ColDef,
	DataGrid,
	RowSelectedParams,
	RowsProp,
	ValueFormatterParams,
} from '@material-ui/data-grid'
import React, { useEffect, useState } from 'react'
import Todo from '../../lib/todo/todo'
import TodoRepository from '../../lib/todo/todo-repository'
import TodoDetail from './TodoDetail'

export default function TodoList() {
	const client = new TodoRepository()
	const [rows, setRows] = useState([] as RowsProp)
	const [selectedRow, setSelectedRow] = useState({ id: '', description: '' } as Todo)

	const columns: ColDef[] = [
		{
			field: 'description',
			headerName: 'Description',
			width: 450,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			renderCell: (params: ValueFormatterParams) => (
				<div>
					<Button
						variant="contained"
						color="secondary"
						style={{ margin: '2px' }}
						onClick={onDelete}
					>
						Delete
					</Button>
				</div>
			),
			sortable: false,
			width: 200,
		},
	]

	useEffect(() => {
		const fetchData = async () => {
			const todos: Todo[] = await client.find()
			const result: RowsProp = todos.map((todo: Todo) => {
				return {
					id: todo.id,
					description: todo.description,
				}
			})
			setRows(result)
		}
		fetchData()
	}, [])

	const onRowSelect = (params: RowSelectedParams) => setSelectedRow(params.data as Todo)

	const onConfirm = (todo: Todo) => {
		return (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => console.log(todo)
	}

	const onAdd = () => setSelectedRow({ id: '', description: '' } as Todo )

	const onDelete = () => console.log(selectedRow)

	return (
		<div style={{ height: 600, width: '100%' }}>
			<TodoDetail todo={selectedRow} onConfirm={onConfirm} />

			<hr style={{ margin: '15px 0' }} />

			<Button variant="contained" color="primary" onClick={onAdd}>
				Add New Todo
			</Button>

			<hr style={{ margin: '15px 0' }} />

			<DataGrid rows={rows} columns={columns} onRowSelected={onRowSelect} />
		</div>
	)
}
