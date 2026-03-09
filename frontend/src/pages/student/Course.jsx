import { useParams } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";
import { useAuth } from "#/auth";
import { useTitle, useApi } from "#/hooks";
import { NameBox } from "#/components/NameBox";
import { Card } from "#/components/Card";
import { ModuleInfoRow } from "#/components/InfoRow";
import style from "./Course.module.scss";

export default function Course() {
	const {courseID} = useParams();
	const {id} = useAuth();
	const [course, loading] = useApi(api => api.getUserCourse(id, courseID)); // should be different depending on if user is enroled or not

	useTitle(() => course?.name ?? "Course", [course]);

	if (loading)
		return;

	return (
		<div className={`${style.Course} page`}>
			<NameBox>
				<img src={course.image} alt=""/>
				<h1>{course.name}</h1>
				<CircularProgressbar value={course.progress} text={course.progress + "%"}/> {/* should not be shown if user not enroled */}
			</NameBox>

			<div className="heading_section text_section">
				<h2>About</h2>
				{course.description}
			</div>

			<div className={`heading_section ${style.modules_section}`}>
				<h2>Modules</h2>
				<p>There are <b>{course.modules.length}</b> modules in this course.</p>
				<ul>
					{course.modules.map(m =>
						<li key={`${course.id}:${m.id}`}>
							<Card><ModuleInfoRow courseId={course.id} module={m}/></Card>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}
