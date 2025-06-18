import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const { pathname } = useLocation();

	useEffect(() => {
		const session = localStorage.getItem("session");

		if (session) {
			setIsLoggedIn(true);
		}
	}, [pathname]);

	return (
		<header className="border-b px-4 md:px-6">
			<div className="flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-6">
						<h1 className="text-3xl font-bold">Notted</h1>
					</div>
				</div>

				<div className="flex items-center gap-2">
					{isLoggedIn ? (
						<Button asChild size="sm">
							<Link to="/notes">Dashboard</Link>
						</Button>
					) : (
						<>
							<Button asChild variant="ghost" size="sm" className="text-sm">
								<Link to={"/login"}>Login</Link>
							</Button>
							<Button asChild size="sm" className="text-sm">
								<Link to={"/signin"}>Get Started</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</header>
	);
};
