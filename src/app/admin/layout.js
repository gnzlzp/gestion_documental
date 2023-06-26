import DrawerPanel from "../components/Drawer"
import listAdmin from "@/assets/listAdmin"

export default function AdminPanel({ children }) {
	return (
		<DrawerPanel titleBar={'Permiso de usuarios'} titleDrawer={'Administrador'} listAdmin={listAdmin}>
			{children}
		</DrawerPanel>
	)
}