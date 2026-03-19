import { Link } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";

function NullableLink(props) {
	if (props.to) {
		return <Link {...props}/>;
	} else {
		const {to, ...filteredProps} = props;
		return <span {...filteredProps}/>;
	}
}

export function CourseInfoRow({ course, link = `/courses/${course.id}` }) {
	return (
		<div className="CourseInfoRow details_list_row">
			<NullableLink className="img" to={link} aria-label={`${course.title} image link`}>
				<img src={course.image} alt=""/>
			</NullableLink>

			<div className="content">
				<NullableLink className="heading" to={link}>{course.title}</NullableLink>
				<p>{course.description}</p>
			</div>

			{ course.progress != undefined && <CircularProgressbar value={course.progress} text={course.progress + "%"}/> }
		</div>
	);
}

// 'module' is used by node
export function ModuleInfoRow({ courseId, module, link = `/courses/${courseId}/modules/${module.id}` }) {
	const hasProgress = module.completed_at != undefined && module.started_at != undefined;
	let progressText = "";
	let progressClass = "";

	if (hasProgress) {
		if (module.completed_at) {
			progressText = "Completed";
			progressClass = "completed";
		} else if (module.started_at) {
			progressText = "Started";
			progressClass = "started";
		} else {
			progressText = "Not started";
		}
	}

	return (
		<div className="ModuleInfoRow details_list_row">
			<NullableLink className="img" to={link} aria-label={`${module.title} image link`}>
				<img src={module.image} alt=""/>
			</NullableLink>

			<div className="content">
				<NullableLink className="heading" to={link}>{module.title}</NullableLink>
				<p>{module.description}</p>
			</div>

			{ hasProgress && <span className={`progress ${progressClass}`}>{progressText}</span> }
		</div>
	);
}
