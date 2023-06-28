'use client'

import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, FormGroup, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

function AddDocument({ open, setOpen, rows, setRows }) {

	const [doc, setDoc] = useState(
		{
			id: '',
			title: '',
			doc: '',
			area:'',
			writing:''
		}
	)

	const handleAddDocument = () => {
		setRows([...rows, doc])
		return setOpen(false)
	}

	const handleSetDoc = (event) => {
		setDoc({
			...doc,
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
					<TextField type="text" name="title" label={'Título'} onChange={handleSetDoc} autoComplete="off"/>
					<TextField type="text" name="doc" label={'Documento'} onChange={handleSetDoc} autoComplete="off"/>
					<TextField type="text" name="area" label={'Area'} onChange={handleSetDoc} autoComplete="off"/>
					<TextField name="writing" label={'Escritura'} onChange={handleSetDoc} multiline minRows={6} fullWidth autoComplete="off"/>
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