import { Navigate } from "react-router";
import { RequireAuth } from "#/auth";
import { AdminLayout } from "#/layouts/AdminLayout";
import { Home } from "./Home";
import { Courses } from "./Courses";
import { NewCourse } from "./NewCourse";
import { Course } from "./Course";
import { Users } from "./Users";
import { NewUser } from "./NewUser";
import { User } from "./User";
import { Settings } from "./Settings";

export const adminRoutes = [
	{
		path: "/admin",
		Component: () => <RequireAuth role={["teacher", "admin"]}><AdminLayout/></RequireAuth>,
		children: [
			{ index: true, Component: () => <Navigate to="home"/> },
			{ path: "home", Component: Home },
			{
				path: "courses",
				children: [
					{ index: true, Component: Courses },
					{ path: "new", Component: NewCourse },
					{ path: ":courseID", Component: Course },
				]
			},
			{
				path: "users",
				children: [
					{ index: true, Component: Users },
					{ path: "new", Component: NewUser },
					{ path: ":userID", Component: User }
				]
			},
			{ path: "settings", Component: Settings }
		]
	}
];
