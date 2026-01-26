import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./common.scss";
import MainLayout from "./MainLayout.jsx";
import Home from "./Home.jsx";
import NotFound from "./NotFound.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<MainLayout/>}>
					<Route index element={<Navigate to="/home"/>}/>
					<Route path="home" element={<Home/>}/>
				</Route>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
