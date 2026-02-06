export function NameBox(props) {
	return <div {...props} className={`NameBox ${props.className ? props.className : ""}`}></div>;
}
