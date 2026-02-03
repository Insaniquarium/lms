import { Link } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";
import * as dummy from "#/dummy";

// This probably needs a refactor the most

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
export function ModuleInfoRow({ courseId, mod }) {
	// Once an API is implemented, this data would be included as part as the response
	const progress = dummy.moduleProgress.find(p => p.course_id == courseId && p.module_id == mod.id);
	const progressText = progress ? (progress.completed ? "Completed" : "Started") : "Not Started";
	const progressClass = progress ? (progress.completed ? "completed" : "started") : "";

	const link = `/courses/${courseId}/modules/${mod.id}`;

	return (
		<div className="ModuleInfoRow details_list_row">
			<Link className="img" to={link}><img src={mod.image}/></Link>
			<div className="content">
				<Link to={link}>{mod.name}</Link>
				<p>{mod.description}</p>
			</div>
			<span className={`progress ${progressClass}`}>{progressText}</span>
		</div>
	);
}
