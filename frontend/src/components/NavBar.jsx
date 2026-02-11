import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { Menu } from "lucide-react";
import style from "./NavBar.module.scss";

export function NavBar({ children }) {
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

// I've seen some component libraries do stuff like this
NavBar.Link = (props) => {
	return <li><NavLink {...props}/></li>;
}

NavBar.Top = ({ children }) => {
	return <ul>{ children }</ul>;
}

NavBar.Bottom = ({ children }) => {
	return <ul>{ children }</ul>;
}
