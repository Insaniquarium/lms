import { useParams } from "react-router";
import { useTitle } from "#/hooks";
import { NameBox } from "#/components/NameBox";
import * as dummy from "#/dummy";
import style from "./Course.module.scss";

export function Course() {
	const {courseID} = useParams();
	const course = dummy.courses.find(c => c.id == courseID);

	useTitle(() => course.name, [course]);

	return (
		<div className={`${style.Course} page`}>
			<NameBox>
				<img src={course.image}/>
				<h1>{course.name}</h1>
			</NameBox>
		</div>
	);
}
