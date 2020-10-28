import {
	Button,
	Card,
	CardActions,
	CardContent,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Todo from '../../lib/todo/todo'

const useStyles = makeStyles({
	pos: {
		marginBottom: 12,
	},
	root: {
		margin: '6px',
		minWidth: 275,
	},
	title: {
		fontSize: 14,
	},
})

export interface TodoDetailParams {
	todo: Todo
	onConfirm: (
		todo: Todo
	) => ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

export default function TodoDetail(params: TodoDetailParams) {
	const classes = useStyles()
	const [data, setData] = useState(params.todo)
	const [originalData, setOriginalData] = useState(params.todo)

	useEffect(() => {
		setData(params.todo)
		setOriginalData(params.todo)
	}, [params.todo])

	const handleChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleCancel = () => {
		setData(originalData)
	}

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom={true}>
					Task Detail
				</Typography>
				<TextField
					id="id"
					label="Id"
					value={data.id}
					fullWidth={true}
					onChange={handleChange}
					name="id"
				/>
				<TextField
					id="description"
					label="Description"
					value={data.description}
					fullWidth={true}
					onChange={handleChange}
					name="description"
				/>
			</CardContent>
			<CardActions>
				<Button size="small" onClick={params.onConfirm(data)}>
					Confirm
				</Button>
				<Button size="small" onClick={handleCancel}>
					Cancel
				</Button>
			</CardActions>
		</Card>
	)
}
