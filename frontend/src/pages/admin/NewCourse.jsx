import { useTitle } from "#/hooks";

export function NewCourse() {
	useTitle(() => "New Course");

	function create(formData) {

	}

	return (
		<div className="page">
			<h1>New Course</h1>
			<form action={create}>

			</form>
		</div>
	);
}
