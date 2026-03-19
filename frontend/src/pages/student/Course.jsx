import { useState } from "react";
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
	const {api, id} = useAuth();
	const [enroled, setEnroled] = useState(false);

	const [course, loading, error] = useApi(async api => {
		// TODO: What happens to the error if getUserCourses throws though?
		if ((await api.getUserCourses(id)).find(c => c.id == courseID)) {
			setEnroled(true);
			return await api.getUserCourse(id, courseID);
		} else {
			setEnroled(false);
			return await api.getCourse(courseID);
		}
	}, [courseID]);

	useTitle(() => course?.title ?? "Course", [course]);

	if (loading) return;
	if (error) throw error;

	function enrol() {
		api.createCourseEnrolment(course.id, id); // Error if failed to enrol?
	}

	return (
		<div className={`${style.Course} page`}>
			<NameBox>
				<img src={course.image} alt=""/>
				<h1>{course.title}</h1>
				{enroled ?
					<CircularProgressbar value={course.progress} text={course.progress + "%"}/> :
					<button onClick={enrol}>Enrol</button>
				}
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
							<Card><ModuleInfoRow courseId={course.id} module={m} link={enroled ? undefined : ""}/></Card>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
}
