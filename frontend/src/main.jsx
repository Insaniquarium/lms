import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "react-circular-progressbar/dist/styles.css";
import "./common.scss";
import "./components.scss";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Library from "./Library";
import Course from "./Course";
import MyCourses from "./MyCourses";
import NotFound from "./NotFound";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout/>}>
					<Route index element={<Navigate to="/home"/>}/>
					<Route path="home" element={<Home/>}/>
					<Route path="courses">
						<Route index element={<Library/>}/>
						<Route path=":id" element={<Course/>}/>
					</Route>
					<Route path="my-courses" element={<MyCourses/>}/>
				</Route>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
