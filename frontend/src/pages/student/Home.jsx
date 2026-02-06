import { Link } from "react-router";
import { Activity, GraduationCap, Award } from "lucide-react";
import { useTitle } from "#/hooks";
import { Card } from "#/components/Card";
import { CourseInfoRow } from "#/components/InfoRow";
import * as dummy from "#/dummy";
import style from "./Home.module.scss";

function RecentActivityCard() {
	return (
		<Card className={style.RecentActivityCard}>
			<h2><Activity/>Recent Activity</h2>
			<ul>
				{dummy.recentActivity.map(a =>
					<li key={`${a.course_id}:${a.module_id}`}>
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
				{dummy.myCourses.map(course =>
					<li key={course.id}>
						<CourseInfoRow course={course}/>
					</li>
				)}
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
	useTitle(() => "Home");

	return (
		<div className={`${style.Home} page`}>
			<h1>Welcome back, Joseph!</h1>
			<RecentActivityCard/>
			<MyCoursesCard/>
			<AchievementsCard/>
		</div>
	);
}
