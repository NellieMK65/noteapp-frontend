import React from "react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function NavSecondary({ ...props }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		// delete session in local storage
		localStorage.removeItem("session");

		// redirect user to login
		navigate("/login");
	};

	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="hover:text-destructive hover:cursor-pointer"
							onClick={() => handleLogout()}
						>
							<div>
								<Trash2 />
								<span>Logout</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
