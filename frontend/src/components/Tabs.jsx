import { NavLink } from "react-router";

export function TabBar(props) {
	return <ul {...props} className={`TabBar ${props.className ? props.className : ""}`}/>;
}

export function TabBarItem(props) {
	return <li {...props}/>;
}

export function TabBarLink({ to, end, children }) {
	return <TabBarItem><NavLink to={to} end={end}>{ children }</NavLink></TabBarItem>;
}
