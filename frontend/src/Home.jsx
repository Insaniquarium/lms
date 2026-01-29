import { Link } from "react-router";
import { Activity, GraduationCap, Award } from "lucide-react";
import * as dummy from "./dummy";
import Card from "./Card";
import { CourseInfoRow } from "./InfoRow";
import style from "./Home.module.scss";

function RecentActivityCard() {
	return (
		<Card className={style.RecentActivityCard}>
			<h2><Activity/>Recent Activity</h2>
			<ul>
				{dummy.recentActivity.map(a =>
					<li>
						<Link to={`/courses/${a.course_id}/modules/${a.module_id}`}>{a.name}</Link>
						<span className={a.status == "Completed" ? "success" : "neutral"}>{a.status}</span>
					</li>
				)}
			</ul>
			<div className="text_right">
				<Link to="/activity">See all activity</Link>
			</div>
		</Card>
	);
}

function MyCoursesCard() {
	return (
		<Card className={style.MyCoursesCard}>
			<h2><GraduationCap/>My Courses</h2>
			<ul>
				{dummy.myCourses.map(course => <li><CourseInfoRow course={course}/></li> )}
			</ul>
			<div className="text_right">
				<Link to="/my-courses">See all courses</Link>
			</div>
		</Card>
	);
}

function AchievementsCard() {
	return (
		<Card className={style.AchievementsCard}>
			<h2><Award/>Achievements</h2>
		</Card>
	);
}

export default function Home() {
	return (
		<div className={style.Home}>
			<h1>Welcome back, Joseph!</h1>
			<RecentActivityCard/>
			<MyCoursesCard/>
			<AchievementsCard/>
		</div>
	);
}
