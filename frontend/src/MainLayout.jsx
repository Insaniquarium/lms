import { NavLink, Outlet } from "react-router";
import { House, Library, GraduationCap, MessageCircleQuestionMark, Settings } from "lucide-react";
import style from "./MainLayout.module.scss";

const topLinks = [
	["/home", <House/>, "Home"],
	["/library", <Library/>, "Library"],
	["/courses", <GraduationCap/>, "My Courses"]
];

const bottomLinks = [
	["/help", <MessageCircleQuestionMark/>, "Help"],
	["/settings", <Settings/>, "Settings"]
];

function NavBarLink({ data }) {
	return <NavLink to={data[0]}>{data[1]}<span>{data[2]}</span></NavLink>;
}

function NavBar() {
	return (
		<nav className={style.navbar}>
			<ul>
				{ topLinks.map(l => <li key={l[0]}><NavBarLink data={l}/></li>) }
			</ul>
			<ul>
				{ bottomLinks.map(l => <li key={l[0]}><NavBarLink data={l}/></li>) }
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
