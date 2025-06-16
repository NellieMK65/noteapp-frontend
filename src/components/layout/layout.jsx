import { Header } from "./header";

export const MainLayout = ({ children }) => {
	return (
		<main className="h-screen">
			<Header />
			<div className="p-3">{children}</div>
		</main>
	);
};
