'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DrawerPanel from "../components/Drawer"
import listAgent from "@/assets/listAgent"

export default function AgentPanel({ children }) {
	const router = useRouter();
	const [hasAccess, setHasAccess] = useState(false)

	useEffect(() => {
		const user = localStorage.getItem("accessUser")
		if (!user) return router.push('/')
		setHasAccess(true)
	}, [router])
	return (
		<>
			{!hasAccess ? <></> : <DrawerPanel titleBar={'Documentos'} titleDrawer={'Funcionario'} listAgent={listAgent} >
				{children}
			</DrawerPanel>}
		</>
	)
}