import { useNavigate, Outlet } from "react-router";
import { House, Library, GraduationCap, MessageCircleQuestionMark, Settings, LogOut } from "lucide-react";
import { NavBar } from "#/components/NavBar";
import { useAuth } from "#/auth";
import { BaseLayout } from "./BaseLayout";

export default function StudentLayout() {
	const auth = useAuth();
	const navigate = useNavigate();

	/**
	 * TODO: We need a way to, after having logged out like this, to always go
	 * to the home page after logging in. The <Navigate> in RequireAuth
	 * currently causes the page after log in to be the one the log out button
	 * was pressed.
	 */
	function logOut() {
		auth.logout();
		navigate("/");
	}

	return (
		<BaseLayout>
			<NavBar>
				<NavBar.Top>
					<NavBar.Link to="/home"><House/> Home</NavBar.Link>
					<NavBar.Link to="/courses" end><Library/> Library</NavBar.Link>
					<NavBar.Link to="/my-courses"><GraduationCap/> My Courses</NavBar.Link>
				</NavBar.Top>
				<NavBar.Bottom>
					{/*<NavBar.Link to="/help"><MessageCircleQuestionMark/> Help</NavBar.Link>
					<NavBar.Link to="/settings"><Settings/> Settings</NavBar.Link>*/}
					<NavBar.Button onClick={logOut}><LogOut/> Log Out</NavBar.Button>
				</NavBar.Bottom>
			</NavBar>
			<main>
				<Outlet/>
			</main>
		</BaseLayout>
	);
}
