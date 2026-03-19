import { useId } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "#/auth";
import { useTitle } from "#/hooks";
import { ImageUploadInput } from "#/components/ImageUploadInput";
import style from "./NewCourse.module.scss";

export function NewCourse() {
	const {api} = useAuth();
	const navigate = useNavigate();
	const titleId = useId();
	const descriptionId = useId();

	useTitle(() => "New Course");

	function create(formData) {
		// TODO: See comments on NewUser.jsx!
		api.createCourse(formData).then(() => navigate("../"));
	}

	return (
		<div className={`${style.NewCourse} page`}>
			<h1>New Course</h1>
			<form action={create}>
				<ImageUploadInput name="image" alt="Course image"/>
				<div>
					<label htmlFor={titleId}>Title:</label>
					<input type="text" name="title" id={titleId} placeholder="My Course" required/>

					<label htmlFor={descriptionId}>Description:</label>
					<textarea name="description" id={descriptionId} rows="10" placeholder="In this course, you will learn..." required></textarea>

					<p className="neutral">Course visibility is hidden by default and should be changed after creation.</p>

					<input type="submit" value="Create"/>
				</div>
			</form>
		</div>
	);
}
