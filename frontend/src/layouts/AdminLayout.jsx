import { useNavigate, Outlet } from "react-router";
import { House, Library, Users, Settings, LogOut } from "lucide-react";
import { NavBar } from "#/components/NavBar";
import { useAuth } from "#/auth";
import { BaseLayout } from "./BaseLayout";

export function AdminLayout() {
	const auth = useAuth();
	const navigate = useNavigate();

	// TODO: Likewise, see StudentLayout.jsx
	function logOut() {
		auth.logout();
		navigate("/");
	}

	return (
		<BaseLayout>
			<NavBar>
				<NavBar.Top>
					<NavBar.Link to="/admin/home"><House/> Home</NavBar.Link>
					<NavBar.Link to="/admin/courses"><Library/> Courses</NavBar.Link>
					<NavBar.Link to="/admin/users"><Users/> Users</NavBar.Link>
				</NavBar.Top>
				<NavBar.Bottom>
					{/*<NavBar.Link to="/admin/settings"><Settings/> Settings</NavBar.Link>*/}
					<NavBar.Button onClick={logOut}><LogOut/> Log Out</NavBar.Button>
				</NavBar.Bottom>
			</NavBar>
			<main>
				<Outlet/>
			</main>
		</BaseLayout>
	);
}
