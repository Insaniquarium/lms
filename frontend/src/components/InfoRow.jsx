import { Link } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";

export function CourseInfoRow({ course, link = `/courses/${course.id}` }) {
	return (
		<div className="CourseInfoRow details_list_row">
			<Link className="img" to={link} aria-label={`${course.name} image link`}><img src={course.image} alt=""/></Link>
			<div className="content">
				<Link to={link}>{course.name}</Link>
				<p>{course.description}</p>
			</div>
			{ course.progress != undefined && <CircularProgressbar value={course.progress} text={course.progress + "%"}/> }
		</div>
	);
}

// 'module' is used by node
export function ModuleInfoRow({ courseId, module, link = `/courses/${courseId}/modules/${module.id}` }) {
	const hasProgress = module.completed_when != undefined && module.started_when != undefined;
	let progressText = "";
	let progressClass = "";

	if (hasProgress) {
		if (module.completed_when) {
			progressText = "Completed";
			progressClass = "completed";
		} else if (module.started_when) {
			progressText = "Started";
			progressClass = "started";
		} else {
			progressText = "Not started";
		}
	}

	return (
		<div className="ModuleInfoRow details_list_row">
			<Link className="img" to={link} aria-label={`${module.name} image link`}><img src={module.image} alt=""/></Link>
			<div className="content">
				<Link to={link}>{module.name}</Link>
				<p>{module.description}</p>
			</div>
			{ hasProgress && <span className={`progress ${progressClass}`}>{progressText}</span> }
		</div>
	);
}
