'use client'

import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, FormGroup, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Draggable from 'react-draggable';

function PaperComponent(props) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

function AddUser({ open, setOpen, rows, setRows }) {

	const [user, setUser] = useState(
		{
			id: 11,
			user_name: '',
			name: '',
			email: ''
		}
	)

	const handleAddUser = () => {
		setRows([...rows,
			user]
		)
		setOpen(false)
	}

	const handleSetUser = (event) => {
		setUser({
			...user,
			// id: Math.ceil(Math.random() * 10),
			user_name: user.name,
			[event.target.name]: event.target.value
		}
		)
	}
	return (
		<>
			<Dialog open={open} PaperComponent={PaperComponent}>
				<DialogTitle>Nuevo usuario</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Complete los siguientes campos*
					</DialogContentText>
					<TextField type="text" name="name" label={'Nombre'} onChange={handleSetUser} autoComplete="off"/>
					<TextField type="text" name="email" label={'Email'} onChange={handleSetUser} autoComplete="off"/>
					<DialogContentText>
						Acceso a:
					</DialogContentText>
					<FormGroup>
						<FormControlLabel control={<Checkbox />} label="Administrador" />
						<FormControlLabel control={<Checkbox />} label="Declaraciones" />
						<FormControlLabel control={<Checkbox />} label="Proveedores" />
						<FormControlLabel control={<Checkbox />} label="Registro" />
						<FormControlLabel control={<Checkbox />} label="Seguimiento" />
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddUser}>Crear</Button>
					<Button onClick={() => setOpen(false)}>Cancelar</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
export default AddUser