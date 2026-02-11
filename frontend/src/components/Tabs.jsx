 import { NavLink } from "react-router";

export function TabBar(props) {
	return <ul {...props} className={`TabBar ${props.className ? props.className : ""}`}/>;
}

// need keys to stop react complaining!
TabBar.Item = (props) => {
	return <li {...props}/>;
}

TabBar.Link = ({ to, end, children }) => {
	return <TabBar.Item><NavLink to={to} end={end}>{ children }</NavLink></TabBar.Item>;
}

export function TabContent(props) {
	return <div {...props} className={`TabContent ${props.className ? props.className : ""}`}/>;
}
