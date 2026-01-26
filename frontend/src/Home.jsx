import { Link } from "react-router";
import * as dummy from "./dummy.js";
import style from "./Home.module.scss";

function RecentActivityCard() {
	return (
		<div className={`card ${style.RecentActivityCard}`}>
			<h2>Recent Activity</h2>
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
			<h2>My Courses</h2>
		</div>
	);
}

function AchievementsCard() {
	return (
		<div className={`card ${style.AchievementsCard}`}>
			<h2>Achievements</h2>
		</div>
	);
}

export default function Home() {
	return (
		<div className={style.home}>
			<h1>Welcome back, Joseph!</h1>
			<RecentActivityCard/>
			<MyCoursesCard/>
			<AchievementsCard/>
		</div>
	);
}
