import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";

import { MainLayout } from "./components/layout/layout";
import { DashboardLayout } from "./components/layout/dashboard";

import LoginPage from "./pages/login";
import SignInPage from "./pages/signup";
import HomePage from "./pages/home";
import NotesPage from "./pages/notes";
import { AdminLayout } from "./components/layout/admin-layout";
import AdminPage from "./pages/admin";

const routes = createBrowserRouter([
	{
		path: "/",
		element: (
			<MainLayout>
				<HomePage />
			</MainLayout>
		),
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signin",
		element: <SignInPage />,
	},
	{
		path: "/notes",
		element: (
			<DashboardLayout>
				<NotesPage />
			</DashboardLayout>
		),
	},
	{
		path: "/account",
		element: (
			<DashboardLayout>
				<>Account page</>
			</DashboardLayout>
		),
	},
	{
		path: "/admin",
		element: (
			<AdminLayout>
				<AdminPage />
			</AdminLayout>
		),
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Toaster position="top-right" />
		<RouterProvider router={routes} />
	</StrictMode>
);
