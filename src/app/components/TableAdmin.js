'use client'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Button, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import AddUser from './AddUser';
import AddDocument from './AddDocument';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';


function Table() {
	const [selectedItemId, setSelectedItemId] = useState(null);

	
	const handleDelete = (id)=>{
		setSelectedItemId(id);
	}
	const pathname = usePathname()

	const [dataUser, setDataUser] = useState([])

	async function getUsers() {
		const res = await fetch('https://jsonplaceholder.typicode.com/users')
		// The return value is *not* serialized
		// You can return Date, Map, Set, etc.

		// Recommendation: handle errors
		if (!res.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data')
		}
		const data = await res.json()

		const mappedData = await data.map((user) => ({
			id: user.id,
			user_name: user.username,
			name: user.name,
			email: user.email,
		}));

		setDataUser(mappedData);
		setRows(mappedData);

	}

	const [rows, setRows] = useState([])

	const columns = [
		{ field: 'id', headerName: 'ID', width: 50 },
		{ field: 'user_name', headerName: 'Username', width: 150 },
		{ field: 'name', headerName: 'Nombre', width: 150 },
		{ field: 'email', headerName: 'Email', width: 150 },
		{ field: 'administracion', headerName: 'Administracion', width: 150, type: 'boolean', editable: true },
		{ field: 'declaraciones', headerName: 'Declaraciones', width: 150, type: 'boolean', editable: true },
		{ field: 'proveedores', headerName: 'Proveedores', width: 150, type: 'boolean', editable: true },
		{ field: 'registros', headerName: 'Registro', width: 150, type: 'boolean', editable: true },
		{ field: 'seguimiento', headerName: 'Seguimiento', width: 150, type: 'boolean', editable: true },
		{
			field: 'administrador', headerName: 'Acción', width: 150, type: 'actions',
			getActions: (params) => [
				<GridActionsCellItem
					key={1}
					icon={<DeleteIcon />}
					label="Borrar Usuario"
					onClick={() => handleDelete(params.row.id)}
					showInMenu
				/>,
				<GridActionsCellItem
					key={2}
					icon={<EditIcon />}
					label="Editar Usuario"
					showInMenu
				/>,
				<GridActionsCellItem
					key={3}
					icon={<FileOpenIcon />}
					label="Ver Documentos"
					showInMenu
				/>,
			]
		},
	];

	const [open, setOpen] = useState(false)

	useEffect(() => {
		getUsers()
		setRows([...dataUser])
	}, [])

	useEffect(() => {
		if (selectedItemId) {
			// Filtra los elementos de la fila para eliminar el seleccionado
			const updatedRows = rows.filter((row) => row.id !== selectedItemId);
			setRows(updatedRows);
			setSelectedItemId(null); // Reinicia el estado selectedItemId
		}
	}, [selectedItemId, rows]);
	

	return (
		<Box sx={{ mt: 10 }}>
			{pathname === '/admin' &&
				<Fab variant={"extended"} color="primary" aria-label="add" onClick={() => setOpen(true)}>
					<AddIcon />
					Agregar funcionario
				</Fab>
			}
			{pathname === '/agent' &&
				<Fab variant={"extended"} color="primary" aria-label="add" onClick={() => setOpen(true)}>
					<AddIcon />
					Agregar documento
				</Fab>
			}
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 20,
						},
					},
				}}
				pageSizeOptions={[15]}
				checkboxSelection
				disableRowSelectionOnClick
			>
			</DataGrid>
			{pathname === '/admin' && <AddUser open={open} setOpen={setOpen} rows={rows} setRows={setRows} />}
			{pathname === '/agent' && <AddDocument open={open} setOpen={setOpen} rows={rows} setRows={setRows} />}
		</Box>
	)
}
export default Table