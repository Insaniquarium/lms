import { Route, Navigate } from "react-router";
import { RequireAuth } from "#/auth";
import StudentLayout from "#/layouts/StudentLayout";
import Home from "./Home";
import Library from "./Library";
import Course from "./Course";
import Module from "./Module";
import MyCourses from "./MyCourses";
import Activity from "./Activity";
import Help from "./Help";
import Settings from "./Settings";

export const studentRoutes = [
	{
		Component: () => <RequireAuth role={["student", "teacher", "admin"]}><StudentLayout/></RequireAuth>,
		children: [
			{ index: true, Component: () => <Navigate to="home"/> },
			{ path: "home", Component: Home },
			{
				path: "courses",
				children: [
					{ index: true, Component: Library },
					{ path: ":courseID", Component: Course },
					{ path: ":courseID/modules/:moduleID", Component: Module }
				]
			},
			{ path: "my-courses", Component: MyCourses },
			{ path: "activity", Component: Activity },
			{ path: "help", Component: Help },
			{ path: "settings", Component: Settings }
		]
	}
];
