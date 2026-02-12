import { Link } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";

export function CourseInfoRow({ course }) {
	const link = `/courses/${course.id}`;

	return (
		<div className="CourseInfoRow details_list_row">
			<Link className="img" to={link}><img src={course.image}/></Link>
			<div className="content">
				<Link to={link}>{course.name}</Link>
				<p>{course.description}</p>
			</div>
			<CircularProgressbar value={course.progress} text={course.progress + "%"}/>
		</div>
	);
}

// 'module' is used by node
export function ModuleInfoRow({ courseId, module }) {
	let progressText = "";
	let progressClass = "";
	const link = `/courses/${courseId}/modules/${module.id}`;

	if (module.completed_when) {
		progressText = "Completed";
		progressClass = "completed";
	} else if (module.started_when) {
		progressText = "Started";
		progressClass = "started";
	} else {
		progressText = "Not started";
	}

	return (
		<div className="ModuleInfoRow details_list_row">
			<Link className="img" to={link}><img src={module.image}/></Link>
			<div className="content">
				<Link to={link}>{module.name}</Link>
				<p>{module.description}</p>
			</div>
			<span className={`progress ${progressClass}`}>{progressText}</span>
		</div>
	);
}
