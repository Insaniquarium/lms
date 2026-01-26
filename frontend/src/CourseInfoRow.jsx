import { Link } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";

export default function CourseInfoRow({ course }) {
	return (
		<div className="CourseInfoRow details-list-row">
			<img src={course.image}/>
			<div className="content">
				<Link to="/course">{course.name}</Link>
				<p>{course.description.short}</p>
			</div>
			<CircularProgressbar value={course.progress} text={course.progress + "%"}/>
		</div>
	);
}
