import { Route } from "react-router";
import { RequireAuth } from "#/auth";
import StudentLayout from "#/layouts/StudentLayout";
import Home from "./Home";
import Library from "./Library";
import Course from "./Course";
import Module from "./Module";
import MyCourses from "./MyCourses";
import Help from "./Help";
import Settings from "./Settings";

export function StudentRoutes() {
	return (<>
		<Route element={<RequireAuth role="student"><StudentLayout/></RequireAuth>}>
			<Route index element={<Navigate to="/home"/>}/>
			<Route path="home" element={<Home/>}/>
			<Route path="courses">
				<Route index element={<Library/>}/>
				<Route path=":courseID" element={<Course/>}/>
				<Route path=":courseID/modules/:moduleID" element={<Module/>}/>
			</Route>
			<Route path="my-courses" element={<MyCourses/>}/>
			<Route path="help" element={<Help/>}/>
			<Route path="settings" element={<Settings/>}/>
		</Route>
	</>);
}
