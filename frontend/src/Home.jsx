import { Link } from "react-router";
import { Activity, GraduationCap, Award } from "lucide-react";
import { CircularProgressbar } from "react-circular-progressbar";
import * as dummy from "./dummy.js";
import style from "./Home.module.scss";

function RecentActivityCard() {
	return (
		<div className={`card ${style.RecentActivityCard}`}>
			<h2><Activity/>Recent Activity</h2>
			<ul>
				{dummy.recentActivity.map(a =>
					<li>
						<a href="#">{a.name}</a>
						<span className={a.status == "Completed" ? "success" : "neutral"}>{a.status}</span>
					</li>
				)}
			</ul>
			<div className="text-right">
				<Link to="/activity">See all activity</Link>
			</div>
		</div>
	);
}

function MyCoursesCard() {
	return (
		<div className={`card ${style.MyCoursesCard}`}>
			<h2><GraduationCap/>My Courses</h2>
			<ul>
				{dummy.myCourses.map(course =>
					<li className="details-list-row">
						<img src={course.image}/>
						<div className="content">
							<Link to="/course">{course.name}</Link>
							<p>{course.description.short}</p>
						</div>
						<CircularProgressbar value={course.progress} text={course.progress + "%"}/>
					</li>
				)}
			</ul>
			<div className="text-right">
				<Link to="/courses">See all courses</Link>
			</div>
		</div>
	);
}

function AchievementsCard() {
	return (
		<div className={`card ${style.AchievementsCard}`}>
			<h2><Award/>Achievements</h2>
		</div>
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
