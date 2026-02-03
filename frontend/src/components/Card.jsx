export default function Card(props) {
	return <div {...props} className={`Card ${props.className ? props.className : ""}`}></div>;
}
