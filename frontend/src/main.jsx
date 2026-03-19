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
import { ErrorFallback, NotFound } from "#/pages/Errors";
import { ErrorBoundary } from "#/components/ErrorBoundary";

const router = createBrowserRouter([
	{ path: "/login", Component: Login },
	...studentRoutes,
	...adminRoutes,
	{ path: "*", Component: NotFound }
]);

// You're probably getting double the API requests in dev builds because of strict mode
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ErrorBoundary fallback={<ErrorFallback/>}>
			<AuthProvider>
				<RouterProvider router={router}/>
			</AuthProvider>
		</ErrorBoundary>
	</StrictMode>
);
