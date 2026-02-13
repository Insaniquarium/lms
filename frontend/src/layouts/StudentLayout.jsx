import { Outlet } from "react-router";
import { House, Library, GraduationCap, MessageCircleQuestionMark, Settings, LogOut } from "lucide-react";
import { NavBar } from "#/components/NavBar";
import { BaseLayout } from "./BaseLayout";

export default function StudentLayout() {
	return (
		<BaseLayout>
			<NavBar>
				<NavBar.Top>
					<NavBar.Link to="/home"><House/> Home</NavBar.Link>
					<NavBar.Link to="/courses" end><Library/> Library</NavBar.Link>
					<NavBar.Link to="/my-courses"><GraduationCap/> My Courses</NavBar.Link>
				</NavBar.Top>
				<NavBar.Bottom>
					{/*<NavBar.Link to="/help"><MessageCircleQuestionMark/> Help</NavBar.Link>*/}
					<NavBar.Link to="/settings"><Settings/> Settings</NavBar.Link>
					<NavBar.Link to="/"><LogOut/> Log Out</NavBar.Link>
				</NavBar.Bottom>
			</NavBar>
			<main>
				<Outlet/>
			</main>
		</BaseLayout>
	);
}
