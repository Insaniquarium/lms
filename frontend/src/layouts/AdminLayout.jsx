import { Outlet } from "react-router";
import { Menu, House, Library, GraduationCap, MessageCircleQuestionMark, Settings, LogOut } from "lucide-react";
import { NavBar, TopBar, BottomBar, NavBarLink } from "#/components/NavBar";
import { BaseLayout } from "./BaseLayout";

export default function AdminLayout() {
	return (
		<BaseLayout>
			<NavBar>
				<TopBar>
					<NavBarLink to="/admin/"><House/> Home</NavBarLink>
					<NavBarLink to="/admin/courses"><Library/> Courses</NavBarLink>
					<NavBarLink to="/admin/users"><GraduationCap/> Users</NavBarLink>
				</TopBar>
				<BottomBar>
					<NavBarLink to="/admin/help"><MessageCircleQuestionMark/> Help</NavBarLink>
					<NavBarLink to="/admin/settings"><Settings/> Settings</NavBarLink>
					<NavBarLink to="/"><LogOut/> Log Out</NavBarLink>
				</BottomBar>
			</NavBar>
			<main>
				<Outlet/>
			</main>
		</BaseLayout>
	);
}
