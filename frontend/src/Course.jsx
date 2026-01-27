import { Link } from "react-router";
import { CircularProgressbar } from "react-circular-progressbar";
import Card from "./Card";
import { ModuleInfoRow } from "./InfoRow";
import * as dummy from "./dummy";
import style from "./Course.module.scss";

export default function Course() {
	const course = dummy.courses[0];
	const progress = dummy.myCourses.find(c => c.id == course.id)?.progress;

	return (
		<div className={style.Course}>
			<div className={style.name_box}>
				<h1>{course.name}</h1>
				<CircularProgressbar value={progress} text={progress + "%"}/>
			</div>

			<div className="heading_section text_section">
				<h2>About</h2>
				{course.description}
			</div>

			<div className={`heading_section ${style.modules_section}`}>
				<h2>Modules</h2>
				<p>There are <b>{course.modules.length}</b> modules in this course.</p>
				<ul>
					{course.modules.map(m => <li><Card><ModuleInfoRow courseId={course.id} mod={m}/></Card></li> )}
				</ul>
			</div>
		</div>
	);
}
