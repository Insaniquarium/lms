import { useId } from "react";
import { useTitle } from "#/hooks";
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
					<div>
						<img src=""/>
					</div>
					<div>
						<label htmlFor={nameId}>Name:</label>
						<input type="text" name="name" id={nameId} placeholder="My Course"/>

						<label htmlFor={descriptionId}>Description:</label>
						<textarea name="description" id={descriptionId} rows="10" placeholder="In this course, you will learn..."></textarea>

						<p className="neutral">Course visibility is hidden by default and should be changed after creation.</p>
					</div>
				</div>

				<input type="submit" value="Create"/>
			</form>
		</div>
	);
}
