import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { AppSidebar } from "../app-sidebar";
import { NavActions } from "../nav-actions";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminLayout = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	// run only once after the page loads
	// useEffect(() => {}, []);

	// runs everytime the state/props changes
	// useEffect(() => {});

	// runs once after page load and every time the dependancy changes
	useEffect(() => {
		// retrieve session from localstorage
		const session = localStorage.getItem("session");

		// if the session does not exist
		if (!session) {
			// we take the user to login page
			navigate("/login");
		}

		const token = jwtDecode(session);

		if (token.role != "admin") {
			// we take the user to login page
			navigate("/notes");
		}
	}, [pathname]); // the pathname dependancy ensures the logic/check runs on every page

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-14 shrink-0 items-center gap-2">
					<div className="flex flex-1 items-center gap-2 px-3">
						<SidebarTrigger />
					</div>
					{/* <div className="ml-auto px-3">
                        <NavActions />
                    </div> */}
				</header>
				<div className="flex flex-1 flex-col gap-4 px-4 py-10">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
};
