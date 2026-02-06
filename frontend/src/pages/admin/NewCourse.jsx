import { useId } from "react";
import { useTitle } from "#/hooks";
import { ImageUploadInput } from "#/components/ImageUploadInput";
import style from "./NewCourse.module.scss";

export function NewCourse() {
	const nameId = useId();
	const descriptionId = useId();

	useTitle(() => "New Course");

	function create(formData) {

	}

	return (
		<div className={`${style.NewCourse} page`}>
			<h1>New Course</h1>
			<form action={create}>
				<div className={style.input_row}>
					<ImageUploadInput name="image" accept="image/png, image/jpeg, image/webp"/>
					<div>
						<label htmlFor={nameId}>Name:</label>
						<input type="text" name="name" id={nameId} placeholder="My Course" required/>

						<label htmlFor={descriptionId}>Description:</label>
						<textarea name="description" id={descriptionId} rows="10" placeholder="In this course, you will learn..." required></textarea>

						<p className="neutral">Course visibility is hidden by default and should be changed after creation.</p>
					</div>
				</div>

				<input type="submit" value="Create"/>
			</form>
		</div>
	);
}
