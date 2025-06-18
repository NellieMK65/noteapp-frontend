import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";

import { MainLayout } from "./components/layout/layout";

import LoginPage from "./pages/login";
import SignInPage from "./pages/signup";
import HomePage from "./pages/home";

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
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Toaster position="top-right" />
		<RouterProvider router={routes} />
	</StrictMode>
);
