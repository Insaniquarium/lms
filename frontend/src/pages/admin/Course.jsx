import { useParams, Outlet } from "react-router";
import { useTitle, useApi } from "#/hooks";
import { NameBox } from "#/components/NameBox";
import { TabBar, TabContent } from "#/components/Tabs";
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
				<img src={course.image} alt=""/>
				<h1>{course.name}</h1>
			</NameBox>

			<TabBar>
				<TabBar.Link to="info">Info</TabBar.Link>
				<TabBar.Link to="modules">Modules</TabBar.Link>
				<TabBar.Link to="enrolments">Enrolments</TabBar.Link>
			</TabBar>
			<TabContent>
				<Outlet/>
			</TabContent>
		</div>
	);
}

Course.Info = function () {
	return <p>info</p>;
}

Course.Modules = function () {
	return <p>modules</p>;
}

Course.Enrolments = function () {
	return <p>enrolments</p>;
}
