import { useParams, Outlet, Link, useNavigate } from "react-router";
import { useAuth } from "#/auth";
import { useTitle, useApi } from "#/hooks";
import { formatDate } from "#/utils";
import { NameBox } from "#/components/NameBox";
import { TabBar, TabContent } from "#/components/Tabs";
import { ImageUploadInput } from "#/components/ImageUploadInput";
import { ModuleInfoRow } from "#/components/InfoRow";
import style from "./Course.module.scss";

export function Course() {
	const {courseID} = useParams();
	const [course, req] = useApi(api => api.getCourse(courseID));

	useTitle(() => course?.title ?? "Course", [course]);

	if (req.pending) return;
	if (req.error) throw req.error;

	return (
		<div className={`${style.Course} page`}>
			<NameBox>
				<img src={course.image} alt=""/>
				<h1>{course.title}</h1>
			</NameBox>

			<TabBar>
				<TabBar.Link to="info">Info</TabBar.Link>
				<TabBar.Link to="modules">Modules</TabBar.Link>
				<TabBar.Link to="enrolments">Enrolments</TabBar.Link>
			</TabBar>
			<TabContent>
				<Outlet/> {/* course and req.refetch as context? */}
			</TabContent>
		</div>
	);
}

Course.Info = function () {
	const { courseID } = useParams();
	const [course, req] = useApi(api => api.getCourse(courseID));

	if (req.pending) return;
	if (req.error) throw req.error;

	function modify(formData) {

	}

	return (
		<div className={style.Course_Info}>
			<p><b>Created</b>: {formatDate(course.created_at)}</p>

			<form action={modify} className={style.FormCommon}>
				<ImageUploadInput name="image" alt="Course image" defaultUrl={course.image}/>

				<div>
					<label>
						Title:
						<input type="text" name="title" placeholder="My Course" defaultValue={course.title} required/>
					</label>

					<label>
						Description:
						<textarea name="description" rows="10" placeholder="In this course, you will learn..." defaultValue={course.description} required></textarea>
					</label>

					{/* I could make this a checkbox now that publicity is just a boolean */}
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
	const [modules, req] = useApi(api => api.getCourseModules(courseID));

	if (req.pending) return;
	if (req.error) throw req.error;

	return (
		<div className={style.Course_Modules}>
			<div className={style.top}>
				<Link to="new" className="button">New Module</Link>
			</div>
			<ul>
				{modules.map(module =>
					<li key={module.id}>
						<ModuleInfoRow courseId={courseID} module={module} link={`${module.id}`}/>
					</li>
				)}
			</ul>
		</div>
	);
}

function ModuleForm({ module, action, children }) {
	return (
		<form action={action} className={style.FormCommon}>
			<ImageUploadInput name="image" alt="Module image" defaultUrl={module?.image}/>

			<div>
				<label>
					Title:
					<input type="text" name="title" placeholder="My Module" defaultValue={module?.title} required/>
				</label>

				<label>
					Description:
					<textarea name="description" rows="10" placeholder="In this module, we cover..." defaultValue={module?.description} required></textarea>
				</label>

				<label>
					Content URL:
					<input type="url" name="content_url" placeholder="https://example.com/my-module-content" defaultValue={module?.content_url} required/>
				</label>

				{children}
			</div>
		</form>
	);
}

Course.NewModule = function () {
	const { api } = useAuth();
	const { courseID } = useParams();
	const navigate = useNavigate();

	function create(formData) {
		// TODO: See comments on NewUser.jsx!
		api.createCourseModule(courseID, formData).then(() => navigate("../"));
	}

	return (
		<div className={style.Course_NewModule}>
			<h2>New Module</h2>
			<ModuleForm action={create}>
				<input type="submit" value="Create"/>
			</ModuleForm>
		</div>
	);
}

Course.Module = function () {
	const { courseID, moduleID } = useParams();
	const [module, req] = useApi(api => api.getCourseModule(courseID, moduleID));

	if (req.pending) return;
	if (req.error) throw req.error;

	function modify(formData) {

	}

	return (
		<div className={style.Course_Module}>
			{/* There could be another tab system here as to see stuff like statistics on completion */}
			<ModuleForm module={module} action={modify}>
				<div className={style.button_row}>
					<input type="submit" value="Modify"/>
					<button type="button" className={style.delete}>Delete</button>
				</div>
			</ModuleForm>
		</div>
	);
}

Course.Enrolments = function () {
	const { courseID } = useParams();
	const [enrolments, req] = useApi(api => api.getCourseEnrolments(courseID));

	if (req.pending) return;
	if (req.error) throw req.error;

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
