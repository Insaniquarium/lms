import { Link } from "react-router";
import { Activity, GraduationCap, Award } from "lucide-react";
import { useAuth } from "#/auth";
import { useTitle, useApi } from "#/hooks";
import { Card } from "#/components/Card";
import { CourseInfoRow } from "#/components/InfoRow";
import style from "./Home.module.scss";

function RecentActivityCard() {
	const {id} = useAuth();
	const [activity, loading, error] = useApi(api => api.getUserActivity(id));

	if (loading) return;
	if (error) throw error;

	function formatStatus(activityData) {
		if (activityData.completed_when)
			return ["Completed", "success"];
		else if (activityData.started_when)
			return ["Started", "neutral"];
		else
			return ["Not started", "neutral"];
	}

	return (
		<Card className={style.RecentActivityCard}>
			<h2><Activity/>Recent Activity</h2>
			<ul>
				{activity.map(a => {
					const [statusText, statusClass] = formatStatus(a);

					return (
						<li key={`${a.course}:${a.module}`}>
							<Link to={`/courses/${a.course}/modules/${a.module}`}>{a.module_title}</Link>
							<span className={statusClass}>{statusText}</span>
						</li>
					);
				})}
			</ul>
			<div className="text_right">
				<Link to="/activity">See all activity</Link>
			</div>
		</Card>
	);
}

function MyCoursesCard() {
	const {id} = useAuth();
	const [courses, loading, error] = useApi(api => api.getUserCourses(id));

	if (loading) return;
	if (error) throw error;

	return (
		<Card className={style.MyCoursesCard}>
			<h2><GraduationCap/>My Courses</h2>
			<ul>
				{courses.map(course =>
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
	const {id} = useAuth();
	const [user, loading, error] = useApi(api => api.getUser(id));

	useTitle(() => "Home");

	if (loading) return;
	if (error) throw error;

	return (
		<div className={`${style.Home} page`}>
			<h1>Welcome back, {user.first_name}!</h1>
			<RecentActivityCard/>
			<MyCoursesCard/>
			<AchievementsCard/>
		</div>
	);
}
