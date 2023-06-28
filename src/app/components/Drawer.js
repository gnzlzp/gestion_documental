'use client'
import { AppBar, Box, CssBaseline, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Drawer, Button } from "@mui/material"
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function DrawerPanel({ children, titleBar, titleDrawer , listAdmin, listAgent }) {
	const drawerWidth = 240;
	const pathname = usePathname()

	const [currentList , setCurrentList] = useState([])

	const currentPathList = ()=>{
		if (pathname === '/admin') setCurrentList(listAdmin) 
		if (pathname === '/agent') setCurrentList(listAgent) 

	}

useEffect(()=>{
	currentPathList()
	console.log(currentList,listAdmin);
},[])

const handleLog = ()=>{
	localStorage.clear();
}
	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					sx={{ width: `calc(100% - ${drawerWidth}px)` }}
				>
					<Toolbar>
						<Box sx={{ fontSize: 22 }}>
							{titleBar}
						</Box>
					</Toolbar>
				</AppBar>
				<Drawer

					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
						},
					}}
					variant="permanent"
					anchor="left"
				>
					<Box sx={{ mx: "auto" , mt:2 , fontSize:"1.3rem" , fontWeight:"bold"}} >
						{titleDrawer}
					</Box>
					<Button href={'/'} startIcon={<LogoutIcon/>} onClick={handleLog}>
						Log out
					</Button>
					<Divider sx={{my:2}} />
					<List>
						{currentList?.map((text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
				{children}
			</Box>
		</>
	)
}
export default DrawerPanel