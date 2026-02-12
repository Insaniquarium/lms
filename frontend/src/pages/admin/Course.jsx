import { useParams } from "react-router";
import { useTitle, useApi } from "#/hooks";
import { NameBox } from "#/components/NameBox";
import style from "./Course.module.scss";

export function Course() {
	const {courseID} = useParams();
	const [course, loading] = useApi(api => api.getCourse(courseID));

	useTitle(() => course?.name ?? "Course", [course]);

	if (loading)
		return;

	return (
		<div className={`${style.Course} page`}>
			<NameBox>
				<img src={course.image}/>
				<h1>{course.name}</h1>
			</NameBox>
		</div>
	);
}
