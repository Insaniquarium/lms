import { Outlet } from "react-router";
import { House, Library, GraduationCap, MessageCircleQuestionMark, Settings, LogOut } from "lucide-react";
import { NavBar, TopBar, BottomBar, NavBarLink } from "#/components/NavBar";
import { BaseLayout } from "./BaseLayout";

export default function StudentLayout() {
	return (
		<BaseLayout>
			<NavBar>
				<TopBar>
					<NavBarLink to="/home"><House/> Home</NavBarLink>
					<NavBarLink to="/courses" end><Library/> Library</NavBarLink>
					<NavBarLink to="/my-courses"><GraduationCap/> My Courses</NavBarLink>
				</TopBar>
				<BottomBar>
					<NavBarLink to="/help"><MessageCircleQuestionMark/> Help</NavBarLink>
					<NavBarLink to="/settings"><Settings/> Settings</NavBarLink>
					<NavBarLink to="/"><LogOut/> Log Out</NavBarLink>
				</BottomBar>
			</NavBar>
			<main>
				<Outlet/>
			</main>
		</BaseLayout>
	);
}
