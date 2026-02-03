import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "react-circular-progressbar/dist/styles.css";
import "#/common.scss";
import "#/components/components.scss";
import { AuthProvider } from "#/auth";
import { StudentRoutes } from "#/pages/student/routes";
/*import { AdminRoutes } from "#/pages/admin/routes";*/
import Login from "#/pages/Login";
import NotFound from "#/pages/NotFound";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="login" element={<Login/>}/>
					<StudentRoutes/>
					{/*<AdminRoutes/>*/}
					<Route path="*" element={<NotFound/>}/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
