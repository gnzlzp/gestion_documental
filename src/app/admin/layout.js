'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DrawerPanel from "../components/Drawer"
import listAdmin from "@/assets/listAdmin"
import listAgent from "@/assets/listAgent"

export default function AdminPanel({ children }) {
	const router = useRouter();
	const [hasAccess, setHasAccess] = useState(false)

	useEffect(() => {
		const admin = localStorage.getItem("accessAdmin")
		if (!admin) return router.push('/')
		setHasAccess(true)
	}, [])


	return (
		<>
			{!hasAccess ? <></> : <DrawerPanel titleBar={'Permiso de usuarios'} titleDrawer={'Administrador'} listAdmin={listAdmin} listAgent={listAgent}>
				{children}
			</DrawerPanel>}
		</>
	)
}