import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router";
import * as Lucide from "lucide-react";
import style from "./MainLayout.module.scss";

const topLinks = [
	["/home", <Lucide.House/>, "Home"],
	["/courses", <Lucide.Library/>, "Library", { end: true }], // misleading otherwise
	["/my-courses", <Lucide.GraduationCap/>, "My Courses"]
];

const bottomLinks = [
	["/help", <Lucide.MessageCircleQuestionMark/>, "Help"],
	["/settings", <Lucide.Settings/>, "Settings"],
	["/", <Lucide.LogOut/>, "Log Out"]
];

function NavBarLink({ data }) {
	return <NavLink to={data[0]} {...data[3]}>{data[1]}<span>{data[2]}</span></NavLink>;
}

function NavBar() {
	const [showLinks, setShowLinks] = useState(false);

	/**
	 * Storing our own state is a bit redundant, because we could just use the DOM's
	 * classList toggle method to avoid storing anything. This way is the more React
	 * way to do it though
	 */
	function handleMobileMenuClick() {
		setShowLinks(!showLinks);
	}

	return (
		<nav className={style.NavBar}>
			<div className={style.top}>
				<button onClick={handleMobileMenuClick}><Lucide.Menu/></button>
				<Link to="/home"><img src="/logo.png"/></Link>
			</div>

			<div className={`${style.links} ${showLinks ? style.active : ""}`}>
				<ul>
					{ topLinks.map(l => <li key={l[0]}><NavBarLink data={l}/></li>) }
				</ul>
				<ul>
					{ bottomLinks.map(l => <li key={l[0]}><NavBarLink data={l}/></li>) }
				</ul>
			</div>
		</nav>
	);
}

export default function MainLayout() {
	return (
		<div className={style.MainLayout}>
			<NavBar/>
			<main>
				<div className={style.container}>
					<Outlet/>
				</div>
			</main>
		</div>
	);
}
