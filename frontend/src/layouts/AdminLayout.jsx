import { Outlet } from "react-router";
import { Menu, House, Library, Users, Settings, LogOut } from "lucide-react";
import { NavBar, TopBar, BottomBar, NavBarLink } from "#/components/NavBar";
import { BaseLayout } from "./BaseLayout";

export function AdminLayout() {
	return (
		<BaseLayout>
			<NavBar>
				<TopBar>
					<NavBarLink to="/admin/home"><House/> Home</NavBarLink>
					<NavBarLink to="/admin/courses"><Library/> Courses</NavBarLink>
					<NavBarLink to="/admin/users"><Users/> Users</NavBarLink>
				</TopBar>
				<BottomBar>
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
