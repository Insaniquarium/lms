import { Link } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";

// This probably needs a refactor the most

export function CourseInfoRow({ course }) {
	return (
		<div className="CourseInfoRow details_list_row">
			<img src={course.image}/>
			<div className="content">
				<Link to={`/courses/${course.id}`}>{course.name}</Link>
				<p>{course.description}</p>
			</div>
			<CircularProgressbar value={course.progress} text={course.progress + "%"}/>
		</div>
	);
}

// 'module' is used by node
export function ModuleInfoRow({ courseId, mod }) {
	return (
		<div className="ModuleInfoRow details_list_row">
			<img src={mod.image}/>
			<div className="content">
				<Link to={`/courses/${courseId}/modules/${mod.id}`}>{mod.name}</Link>
				<p>{mod.description}</p>
			</div>
		</div>
	);
}
