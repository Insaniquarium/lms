export function Card(props) {
	return <div {...props} className={`Card ${props.className ? props.className : ""}`}/>;
}
