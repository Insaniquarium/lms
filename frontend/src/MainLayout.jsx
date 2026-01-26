import { NavLink, Outlet } from "react-router";
import style from "./MainLayout.module.scss";

function NavBar() {
	return (
		<nav className={style.navbar}>
			<ul>
				<li><NavLink to="/home">Home</NavLink></li>
				<li><NavLink to="/library">Library</NavLink></li>
				<li><NavLink to="/courses">My Courses</NavLink></li>
			</ul>
			<ul>
				<li><NavLink to="/help">Help</NavLink></li>
				<li><NavLink to="/settings">Settings</NavLink></li>
			</ul>
		</nav>
	);
}

export default function MainLayout() {
	return (
		<div className={style.layout}>
			<NavBar/>
			<main>
				<div className={style.container}>
					<Outlet/>
				</div>
			</main>
		</div>
	);
}
