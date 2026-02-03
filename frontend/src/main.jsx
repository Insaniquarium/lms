import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "react-circular-progressbar/dist/styles.css";
import "#/common.scss";
import "#/components/components.scss";
import { AuthProvider } from "#/auth";
import { studentRoutes } from "#/pages/student/routes";
import { adminRoutes } from "#/pages/admin/routes";
import Login from "#/pages/Login";
import NotFound from "#/pages/NotFound";

const router = createBrowserRouter([
	{ path: "/login", Component: Login },
	...studentRoutes,
	...adminRoutes,
	{ path: "*", Component: NotFound }
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router}/>
		</AuthProvider>
	</StrictMode>
);
