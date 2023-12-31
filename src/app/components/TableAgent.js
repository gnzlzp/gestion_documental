'use client'
import { DataGrid, GridActionsCellItem, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Button, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import AddUser from './AddUser';
import AddDocument from './AddDocument';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';

function Table() {

	const [selectedItemId, setSelectedItemId] = useState(null);

	const handleDelete = (id) => {
		setSelectedItemId(id);
	}


	

	const pathname = usePathname()

	const [dataDoc, setDataDoc] = useState([])

	async function getUsers() {
		const res = await fetch('https://jsonplaceholder.typicode.com/comments')
		// The return value is *not* serialized
		// You can return Date, Map, Set, etc.

		// Recommendation: handle errors
		if (!res.ok) {
			// This will activate the closest `error.js` Error Boundary
			throw new Error('Failed to fetch data')
		}
		const data = await res.json()

		const mappedData = await data.map((doc, index) => ({
			id: index,
			title: '',
			doc: doc.email,
			name: doc.name,
			writing: doc.body,
		}));

		setDataDoc(mappedData);
		setRows(mappedData);

	}

	const [rows, setRows] = useState([])

	const columns = [
		{ field: 'id', headerName: 'ID', width: 50 },
		{ field: 'title', headerName: 'Titulo', width: 150 },
		{ field: 'doc', headerName: 'Documento', width: 150 },
		{ field: 'area', headerName: 'Area', width: 150 },
		{ field: 'writing', headerName: 'Escritura', width: 150 },
		{ field: 'generate', headerName: 'Generar documento', width: 150 },
		{
			field: 'action', headerName: 'Acción', width: 150, type: 'actions',
			getActions: (params) => [
				<GridActionsCellItem
					key={1}
					icon={<DeleteIcon />}
					label="Borrar documento"
					onClick={() => handleDelete(params.row.id)}
					showInMenu
				/>,
				<GridActionsCellItem
					key={2}
					icon={<EditIcon />}
					label="Editar documento"
					showInMenu
				/>,<GridActionsCellItem
				key={2}
				icon={<FileOpenIcon />}
				label="Abrir documento"
				showInMenu
			/>,
			]
		},
	];

	const [open, setOpen] = useState(false)

	useEffect(() => {
		getUsers()
		setRows([...dataDoc])
	}, [])

	useEffect(() => {
		if (selectedItemId) {
			// Filtra los elementos de la fila para eliminar el seleccionado
			const updatedRows = rows.filter((row) => row.id !== selectedItemId);
			setRows(updatedRows);
			setSelectedItemId(null); // Reinicia el estado selectedItemId
		}
	}, [selectedItemId, rows])

	return (
		<Box sx={{ mt: 10 ,padding: 2, width: '100%'}}>
			{pathname === '/admin' &&
				<Fab variant={"extended"} color="primary" aria-label="add" onClick={() => setOpen(true)} sx={{marginBottom:2}}>
					<AddIcon />
					Agregar funcionario
				</Fab>
			}
			{pathname === '/agent' &&
				<Fab variant={"extended"} color="primary" aria-label="add" onClick={() => setOpen(true)} sx={{marginBottom:2}}>
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
							pageSize: 15,
						},
					},
				}}
				pageSizeOptions={[10]}
				disableRowSelectionOnClick
			>
			</DataGrid>
			{pathname === '/admin' && <AddUser open={open} setOpen={setOpen} rows={rows} setRows={setRows} />}
			{pathname === '/agent' && <AddDocument open={open} setOpen={setOpen} rows={rows} setRows={setRows} />}
		</Box>
	)
}
export default Table