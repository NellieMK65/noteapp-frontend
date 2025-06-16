import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export const Header = () => {
	return (
		<header className="border-b px-4 md:px-6">
			<div className="flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-6">
						<h1 className="text-3xl font-bold">Notted</h1>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Button asChild variant="ghost" size="sm" className="text-sm">
						<Link to={"/login"}>Login</Link>
					</Button>
					<Button asChild size="sm" className="text-sm">
						<Link to={"/signin"}>Get Started</Link>
					</Button>
				</div>
			</div>
		</header>
	);
};
