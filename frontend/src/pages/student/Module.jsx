import { useTitle, useApi } from "#/hooks";
import { useParams } from "react-router";
import style from "./Module.module.scss";

export default function Module() {
	const {courseID, moduleID} = useParams();
	const [module_, loading] = useApi(api => api.getCourseModule(courseID, moduleID));

	if (loading)
		return false;

	return (
		<div className={style.Module}>
			<iframe src={module_.url} style={{background: "gray"}}></iframe>
		</div>
	);
}
