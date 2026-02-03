import { useState, useEffect } from "react";
import { NavLink, Link, Outlet, useLocation } from "react-router";
import { Menu, House, Library, GraduationCap, MessageCircleQuestionMark, Settings, LogOut } from "lucide-react";
import style from "./Layout.module.scss";

function NavBarLink(props) {
	return <li><NavLink {...props}/></li>;
}

function TopBar({ children }) {
	return <ul>{ children }</ul>;
}

function BottomBar({ children }) {
	return <ul>{ children }</ul>;
}

function NavBar({ children }) {
	const [showLinks, setShowLinks] = useState(false);
	const location = useLocation();

	/**
	 * Storing our own state is a bit redundant, because we could just use the DOM's
	 * classList toggle method to avoid storing anything. This way is the more React
	 * way to do it though
	 */
	function handleMobileMenuClick() {
		setShowLinks(!showLinks);
	}

	// Hide mobile navbar whenever link has been pressed
	useEffect(() => {
		setShowLinks(false);
	}, [location]);

	return (
		<nav className={style.NavBar}>
			<div className={style.top}>
				<button onClick={handleMobileMenuClick}><Menu/></button>
				<Link to="/home"><img src="/logo.png"/></Link>
			</div>

			<div className={`${style.links} ${showLinks ? style.active : ""}`}>
				{ children }
			</div>
		</nav>
	);
}

export function StudentLayout() {
	return (
		<div className={style.StudentLayout}>
			<NavBar>
				<TopBar>
					<NavBarLink to="/home"><House/> Home</NavBarLink>
					<NavBarLink to="/courses"><Library/> Library</NavBarLink>
					<NavBarLink to="/my-courses"><GraduationCap/> My Courses</NavBarLink>
				</TopBar>
				<BottomBar>
					<NavBarLink to="/help"><MessageCircleQuestionMark/> Help</NavBarLink>
					<NavBarLink to="/settings"><Settings/> Settings</NavBarLink>
					<NavBarLink to="/"><LogOut/> Log Out</NavBarLink>					
				</BottomBar>
			</NavBar>
			<main>
				<Outlet/>
			</main>
		</div>
	);
}

export function AdminLayout() {
	return (
		<div className={style.StudentLayout}>
			<NavBar>
				<TopBar>
					<NavBarLink to="/admin/"><House/> Home</NavBarLink>
					<NavBarLink to="/admin/courses"><Library/> Courses</NavBarLink>
					<NavBarLink to="/admin/users"><GraduationCap/> Users</NavBarLink>
				</TopBar>
				<BottomBar>
					<NavBarLink to="/help"><MessageCircleQuestionMark/> Help</NavBarLink>
					<NavBarLink to="/settings"><Settings/> Settings</NavBarLink>
					<NavBarLink to="/"><LogOut/> Log Out</NavBarLink>					
				</BottomBar>
			</NavBar>
			<main>
				<Outlet/>
			</main>
		</div>
	);	
}
