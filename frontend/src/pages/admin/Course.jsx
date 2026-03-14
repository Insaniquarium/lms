import { useParams, Outlet, Link } from "react-router";
import { useTitle, useApi } from "#/hooks";
import { formatDate } from "#/utils";
import { NameBox } from "#/components/NameBox";
import { TabBar, TabContent } from "#/components/Tabs";
import { ImageUploadInput } from "#/components/ImageUploadInput";
import { ModuleInfoRow } from "#/components/InfoRow";
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
	const { courseID } = useParams();
	const [course, loading] = useApi(api => api.getCourse(courseID));

	if (loading)
		return;

	function modify(formData) {

	}

	return (
		<div className={style.Course_Info}>
			<p><b>Created</b>: {formatDate(course.created * 1000)}</p>

			<form action={modify}>
				<ImageUploadInput name="image" accept="image/png, image/jpeg, image/webp" alt="Course image" defaultUrl={course.image}/>

				<div>
					<label>
						Name:
						<input type="text" name="name" placeholder="My Course" defaultValue={course.name} required/>
					</label>

					<label>
						Description:
						<textarea name="description" rows="10" placeholder="In this course, you will learn..." defaultValue={course.description} required></textarea>
					</label>

					<label>
						Visibility:
						<select name="visibility" defaultValue={course.visibility}>
							<option value="public">Public</option>
							<option value="private">Private</option>
						</select>
					</label>

					<input type="submit" value="Modify"/>
				</div>
			</form>
		</div>
	);
}

Course.Modules = function () {
	const { courseID } = useParams();
	const [course, loading] = useApi(api => api.getCourse(courseID)); // TODO: getCourseModules

	if (loading)
		return;

	return (
		<div className={style.Course_Modules}>
			<div className={style.top}>
				<Link to="new" className="button">New Module</Link>
			</div>
			<ul>
				{course.modules.map(module =>
					<li key={module.id}>
						<ModuleInfoRow courseId={courseID} module={module}/>
					</li>
				)}
			</ul>
		</div>
	);
}

Course.NewModule = function () {
	function create(formData) {

	}

	return (
		<div className={style.Course_NewModule}>
			<h2>New Module</h2>
			<form action={create}>
				<ImageUploadInput name="image" accept="image/png, image/jpeg, image/webp" alt="Module image"/>
				<div>
					<label>
						Name:
						<input type="text" name="name" placeholder="My Module" required/>
					</label>

					<label>
						Description:
						<textarea name="description" rows="10" placeholder="In this module, we cover..." required></textarea>
					</label>

					<label>
						Content URL:
						<input type="url" name="content-url" placeholder="https://example.com/my-module-content" required/>
					</label>

					<input type="submit" value="Create"/>
				</div>
			</form>
		</div>
	);
}

Course.Enrolments = function () {
	const { courseID } = useParams();
	const [enrolments, loading] = useApi(api => api.getCourseEnrolments(courseID));

	if (loading)
		return;

	return (
		<div className={style.Course_Enrolments}>
			<table>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Enroled At</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>
		</div>
	);
}
