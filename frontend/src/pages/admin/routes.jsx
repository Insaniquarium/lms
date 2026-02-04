import { Navigate } from "react-router";
import { RequireAuth } from "#/auth";
import { AdminLayout } from "#/layouts/AdminLayout";
import { Home } from "./Home";
import { Courses } from "./Courses";

export const adminRoutes = [
	{
		path: "/admin",
		Component: () => <RequireAuth role={["teacher", "admin"]}><AdminLayout/></RequireAuth>,
		children: [
			{ index: true, Component: () => <Navigate to="home"/> },
			{ path: "home", Component: Home },
			{ path: "courses", Component: Courses }
		]
	}
];
