import DrawerPanel from "../components/Drawer"
import listAgent from "@/assets/listAgent"

export default function AgentPanel({ children }) {
	return (
		<DrawerPanel titleBar={'Documentos'} titleDrawer={'Funcionario'} listAgent={listAgent} >
			{children}
		</DrawerPanel>
	)
}