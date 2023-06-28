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

	let initialUser = {
		id: Math.random(1 * 10),
		user_name: '',
		name: '',
		email: '',
		administracion: false,
		declaraciones: false,
		proveedores: false,
		registros: false,
		seguimiento: false,
	}

	const [user, setUser] = useState({ ...initialUser })

	const handleAddUser = () => {

		if (!user.name || !user.email) return alert('Debe completar todos los campos')
		
		setRows([...rows, user])
		setOpen(false)
		setUser({ ...initialUser })

	}

	const handleSetUser = (event) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === 'checkbox' ? checked : value;
		console.log(name, newValue);
		setUser((prevUser) => ({
			...prevUser,
			[name]: newValue,
		}));
	};

	const handleClose = () => {
		setOpen(false)
		setUser({ ...initialUser })
	}

	return (
		<>
			<Dialog open={open} PaperComponent={PaperComponent}>
				<DialogTitle>Nuevo usuario</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Complete los siguientes campos*
					</DialogContentText>
					<TextField type="text" name="name" label={'Nombre'} onChange={handleSetUser} autoComplete="off" />
					<TextField type="text" name="email" label={'Email'} onChange={handleSetUser} autoComplete="off" />
					<DialogContentText>
						Acceso a:
					</DialogContentText>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={user.administracion}
									onChange={handleSetUser}
									name="administracion" />}
							label="Administrador" />
						<FormControlLabel
							control={
								<Checkbox
									checked={user.declaraciones}
									onChange={handleSetUser}
									name="declaraciones" />}
							label="Declaraciones" />
						<FormControlLabel
							control={
								<Checkbox
									checked={user.proveedores}
									onChange={handleSetUser}
									name="proveedores" />}
							label="Proveedores" />
						<FormControlLabel
							control={
								<Checkbox
									checked={user.registros}
									onChange={handleSetUser}
									name="registros" />}
							label="Registro" />
						<FormControlLabel
							control={
								<Checkbox
									checked={user.seguimiento}
									onChange={handleSetUser}
									name="seguimiento" />}
							label="Seguimiento" />
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddUser}>Crear</Button>
					<Button onClick={handleClose}>Cancelar</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
export default AddUser