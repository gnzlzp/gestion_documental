'use client'

import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, FormGroup, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

function AddDocument({ open, setOpen, rows, setRows }) {

	const [user, setUser] = useState(
		{
			id: 1,
			user_name: 'Willi',
			name: 'Willinton Otalvaro',
			email: 'willi.admin@notaria.com'
		}
	)

	const handleAddDocument = () => {
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
			<Dialog open={open}>
				<DialogTitle>Nuevo documento</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Complete los siguientes campos*
					</DialogContentText>
					<Box sx={{display:'flex', flexDirection:'column' , justifyContent:'space-around'  }}>
					<TextField type="text" name="title" label={'Título'} onChange={handleSetUser} autoComplete="off"/>
					<TextField type="text" name="doc" label={'Documento'} onChange={handleSetUser} autoComplete="off"/>
					<TextField type="text" name="area" label={'Area'} onChange={handleSetUser} autoComplete="off"/>
					<TextField name="writing" label={'Escritura'} onChange={handleSetUser} multiline minRows={6} fullWidth autoComplete="off"/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddDocument}>Crear</Button>
					<Button onClick={() => setOpen(false)}>Cancelar</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default AddDocument