import { Link } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";

export default function CourseInfoRow({ course }) {
	return (
		<div className="CourseInfoRow details_list_row">
			<img src={course.image}/>
			<div className="content">
				<Link to="/courses/0">{course.name}</Link>
				<p>{course.description}</p>
			</div>
			<CircularProgressbar value={course.progress} text={course.progress + "%"}/>
		</div>
	);
}
