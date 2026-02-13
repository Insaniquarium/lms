import { useTitle, useApi } from "#/hooks";
import { useParams } from "react-router";
import style from "./Module.module.scss";

export default function Module() {
	const {courseID, moduleID} = useParams();
	const [module, loading] = useApi(api => api.getCourseModule(courseID, moduleID));

	useTitle(() => module?.name ?? "Module", [module]);

	if (loading)
		return;

	return (
		<div className={style.Module}>
			<iframe src={module.url} style={{background: "gray"}}></iframe>
		</div>
	);
}
